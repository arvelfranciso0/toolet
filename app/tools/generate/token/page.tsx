"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { MetadataCard } from "@/components/shared/meta-card";
import { CopyItem } from "@/components/shared/copy-item";
import { InfoSection } from "@/components/shared/info-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  TOKEN_FORMATS,
  generateTokens,
  getEntropyBits,
  getEntropyLabel,
} from "@/lib/token-utils";
import { TokenFormat } from "@/types/token";
import {
  Coins,
  Hash,
  KeyRound,
  Layers,
  Lock,
  RefreshCw,
  Ruler,
  ShieldCheck,
} from "lucide-react";

const DEFAULTS = {
  format: "hex" as TokenFormat,
  size: 32,
  count: 1,
  prefix: "",
};

const PREFIX_PRESETS = ["sk_live_", "pk_test_", "api_", "tok_"];

const subscribeNoop = () => () => {};

export default function TokenGenerator() {
  const [format, setFormat] = useState<TokenFormat>(DEFAULTS.format);
  const [size, setSize] = useState<number[]>([DEFAULTS.size]);
  const [count, setCount] = useState<number[]>([DEFAULTS.count]);
  const [prefix, setPrefix] = useState(DEFAULTS.prefix);
  // Bumped by "Regenerate" to get fresh tokens with the same options
  const [seed, setSeed] = useState(0);

  // Tokens are random, so only generate in the browser to avoid hydration mismatches
  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  const tokens = useMemo(
    () =>
      isClient
        ? generateTokens({ format, size: size[0], count: count[0], prefix })
        : [],
    // seed is intentionally a dependency so Regenerate produces new tokens
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isClient, format, size, count, prefix, seed]
  );

  const { sizeUnit } = TOKEN_FORMATS[format];
  const entropyBits = getEntropyBits(format, size[0]);
  const strength = getEntropyLabel(entropyBits);
  const tokenLength = tokens[0]?.length ?? 0;

  const handleReset = () => {
    setFormat(DEFAULTS.format);
    setSize([DEFAULTS.size]);
    setCount([DEFAULTS.count]);
    setPrefix(DEFAULTS.prefix);
    setSeed((value) => value + 1);
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <ToolHeader
        title="Token Generator"
        subtitle="Secure random API keys, secrets and UUIDs"
        icon={<KeyRound />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SETTINGS PANEL */}
        <div className="lg:col-span-1 space-y-6">
          <ActionPanel label="Configuration" onReset={handleReset}>
            <div className="p-6 space-y-8">
              {/* Format */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(TOKEN_FORMATS) as TokenFormat[]).map((item) => (
                    <Button
                      key={item}
                      variant={format === item ? "default" : "ghost"}
                      onClick={() => setFormat(item)}
                      className={cn(
                        "h-10 cursor-pointer border text-xs",
                        format === item
                          ? "border-transparent"
                          : "border-zinc-200 dark:border-zinc-800",
                        item === "uuid" && "col-span-2"
                      )}
                    >
                      {TOKEN_FORMATS[item].label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Size */}
              {sizeUnit && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                      Length ({sizeUnit})
                    </label>
                    <Badge variant="secondary" className="font-mono">
                      {size[0]}
                    </Badge>
                  </div>
                  <Slider
                    value={size}
                    onValueChange={setSize}
                    min={8}
                    max={128}
                    step={1}
                    className="py-4"
                  />
                </div>
              )}

              {/* Count */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                    How Many
                  </label>
                  <Badge variant="secondary" className="font-mono">
                    {count[0]}
                  </Badge>
                </div>
                <Slider
                  value={count}
                  onValueChange={setCount}
                  min={1}
                  max={20}
                  step={1}
                  className="py-4"
                />
              </div>

              {/* Prefix */}
              <div className="space-y-3">
                <label
                  htmlFor="token-prefix"
                  className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400"
                >
                  Prefix (optional)
                </label>
                <Input
                  id="token-prefix"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value.replace(/\s/g, ""))}
                  placeholder="e.g. sk_live_"
                  maxLength={24}
                  className="h-10 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-sm font-mono"
                />
                <div className="flex flex-wrap gap-2">
                  {PREFIX_PRESETS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPrefix(prefix === item ? "" : item)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors cursor-pointer",
                        prefix === item
                          ? "border-amber-400 text-amber-600 dark:text-amber-500"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ActionPanel>
        </div>

        {/* OUTPUT PANEL */}
        <div className="lg:col-span-2 space-y-6">
          <ActionPanel
            label={count[0] > 1 ? `${count[0]} Tokens` : "Token"}
            variant="output"
            copyValue={tokens.join("\n")}
            headers={
              <button
                type="button"
                onClick={() => setSeed((value) => value + 1)}
                className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <RefreshCw size={12} />
                <span className="hidden sm:inline">Regenerate</span>
              </button>
            }
          >
            <div className="p-4 space-y-2">
              {tokens.length === 0 ? (
                <p className="p-6 font-mono text-zinc-400">Generating…</p>
              ) : (
                tokens.map((token, index) => (
                  <div
                    key={`${seed}-${index}`}
                    className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800"
                  >
                    <CopyItem copyValue={token}>
                      <p className="font-mono text-sm md:text-base font-medium normal-case tracking-normal text-zinc-800 dark:text-zinc-100 break-all">
                        {token}
                      </p>
                    </CopyItem>
                  </div>
                ))
              )}
            </div>
          </ActionPanel>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetadataCard
              icon={<Ruler size={14} />}
              label="Entropy"
              value={`${entropyBits} bits`}
            />
            <MetadataCard
              icon={<ShieldCheck size={14} />}
              label="Strength"
              value={strength.label}
              variant={strength.variant}
            />
            <MetadataCard
              icon={<Hash size={14} />}
              label="Characters"
              value={String(tokenLength)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <InfoSection
          title="Which Format Should I Use?"
          icon={Layers}
          description="Use Hex for secrets and signing keys, Base64 URL for tokens that travel in URLs or headers, Alphanumeric for API keys people may copy by hand, and UUID v4 for unique IDs. A prefix like sk_live_ makes keys easy to recognize and scan for in code."
        />
        <InfoSection
          title="How Much Entropy Is Enough?"
          icon={Coins}
          description="128 bits (16 random bytes) is the usual minimum for session tokens and API keys; 256 bits (32 bytes) is a safe default for secrets such as JWT signing keys."
        />
        <InfoSection
          title="Generated Locally"
          icon={Lock}
          description="Every token is created on your device using crypto.getRandomValues, a cryptographically secure random number generator. Nothing is uploaded or stored, so you can safely generate production secrets here."
        />
      </div>
    </div>
  );
}
