export type TokenFormat =
  | "hex"
  | "base64"
  | "base64url"
  | "alphanumeric"
  | "uuid";

export interface TokenOptions {
  format: TokenFormat;
  // Random bytes for hex/base64/base64url, characters for alphanumeric; ignored for uuid
  size: number;
  count: number;
  prefix: string;
}
