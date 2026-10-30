import { TokenFormat, TokenOptions } from "@/types/token";

const ALPHANUMERIC =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Largest multiple of 62 that fits in a byte; values above it are rejected to avoid modulo bias
const ALPHANUMERIC_LIMIT = 256 - (256 % ALPHANUMERIC.length);

// sizeUnit is what the size slider controls; UUIDs have a fixed size
export const TOKEN_FORMATS: Record<
  TokenFormat,
  { label: string; sizeUnit?: "bytes" | "characters" }
> = {
  hex: { label: "Hex", sizeUnit: "bytes" },
  base64: { label: "Base64", sizeUnit: "bytes" },
  base64url: { label: "Base64 URL", sizeUnit: "bytes" },
  alphanumeric: { label: "Alphanumeric", sizeUnit: "characters" },
  uuid: { label: "UUID v4" },
};

const randomBytes = (length: number) =>
  crypto.getRandomValues(new Uint8Array(length));

const toBase64 = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes));

const randomAlphanumeric = (length: number) => {
  let result = "";
  while (result.length < length) {
    for (const byte of randomBytes(length - result.length)) {
      if (byte < ALPHANUMERIC_LIMIT) {
        result += ALPHANUMERIC[byte % ALPHANUMERIC.length];
      }
    }
  }
  return result;
};

const randomUuid = () => {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  // RFC 4122 v4 fallback for browsers without randomUUID (e.g. non-secure contexts)
  const bytes = randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

export const generateToken = (format: TokenFormat, size: number) => {
  switch (format) {
    case "hex":
      return Array.from(randomBytes(size), (b) =>
        b.toString(16).padStart(2, "0")
      ).join("");
    case "base64":
      return toBase64(randomBytes(size));
    case "base64url":
      return toBase64(randomBytes(size))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    case "alphanumeric":
      return randomAlphanumeric(size);
    case "uuid":
      return randomUuid();
  }
};

export const generateTokens = ({ format, size, count, prefix }: TokenOptions) =>
  Array.from({ length: count }, () => `${prefix}${generateToken(format, size)}`);

// Bits of randomness in one token (the prefix adds none)
export const getEntropyBits = (format: TokenFormat, size: number) => {
  if (format === "uuid") return 122;
  if (format === "alphanumeric") return Math.floor(size * Math.log2(ALPHANUMERIC.length));
  return size * 8;
};

export const getEntropyLabel = (bits: number) => {
  if (bits >= 256) return { label: "Very Strong", variant: "success" as const };
  if (bits >= 128) return { label: "Strong", variant: "success" as const };
  if (bits >= 80) return { label: "Fair", variant: "warning" as const };
  return { label: "Weak", variant: "error" as const };
};
