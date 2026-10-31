"use client";

import { useState } from "react";
import {
  Terminal,
  Search,
  RotateCcw,
  FileText,
  Keyboard,
  Lightbulb,
  CheckCircle2,
  MonitorCog,
  ShieldAlert,
  FolderSync,
} from "lucide-react";
import { ToolHeader } from "@/components/shared/tool-header";
import { ActionPanel } from "@/components/shared/action-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoSection } from "@/components/shared/info-section";
import { CopyItem } from "@/components/shared/copy-item";
import { LINUX_COMMANDS, TERMINAL_SHORTCUTS } from "@/configs/linux-commands";
import { cn } from "@/lib/utils";

type ShellFilter = "All" | "PowerShell" | "Bash";

const SHELL_FILTERS: { value: ShellFilter; label: string }[] = [
  { value: "All", label: "All" },
  { value: "PowerShell", label: "Windows (PowerShell)" },
  { value: "Bash", label: "Ubuntu (Bash)" },
];

const TIPS = [
  "Run sudo apt update before installing packages",
  "Keep projects in ~/ (not /mnt/c) for faster builds",
  "Run wsl --shutdown to free memory",
  "Double-check paths before rm -rf",
];

export default function LinuxCheatSheet() {
  const [search, setSearch] = useState("");
  const [shell, setShell] = useState<ShellFilter>("All");

  const query = search.toLowerCase();
  const filteredCommands = LINUX_COMMANDS.filter(
    (section) => shell === "All" || section.shell === shell
  )
    .map((section) => ({
      ...section,
      commands: section.commands.filter(
        (c) =>
          c.cmd.toLowerCase().includes(query) ||
          c.desc.toLowerCase().includes(query)
      ),
    }))
    .filter((section) => section.commands.length > 0);

  const isFiltered = search !== "" || shell !== "All";

  return (
    <div className="flex flex-col p-4 lg:p-8 space-y-6 h-full">
      <ToolHeader
        title="Linux & WSL Cheat Sheet"
        subtitle="Ubuntu terminal and WSL commands, ready to copy"
        icon={<Terminal />}
      />

      <ActionPanel
        label="Linux & WSL Reference"
        icon={<FileText size={14} />}
        variant="output"
      >
        <div className="flex flex-col space-y-8 p-6 min-h-125 bg-zinc-50/50 dark:bg-zinc-900/30">
          {/* Search & Shell Filter */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 shrink-0">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={16}
              />
              <Input
                placeholder="Search commands..."
                aria-label="Search commands"
                className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-1 rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950">
              {SHELL_FILTERS.map((item) => (
                <Button
                  key={item.value}
                  variant={shell === item.value ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setShell(item.value)}
                  className="cursor-pointer text-xs"
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setShell("All");
                }}
                className="text-zinc-500"
              >
                <RotateCcw size={14} className="mr-2" /> Reset
              </Button>
            )}
          </div>

          {/* Grid of Commands */}
          {filteredCommands.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No commands match &ldquo;{search}&rdquo;.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCommands.map((section) => (
                <ActionPanel
                  label={section.category}
                  key={section.category}
                  variant="output"
                  headers={
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-md border text-xs font-bold normal-case tracking-normal",
                        section.shell === "PowerShell"
                          ? "border-sky-500/30 text-sky-600 dark:text-sky-400"
                          : "border-amber-500/30 text-amber-600 dark:text-amber-500"
                      )}
                    >
                      {section.shell}
                    </span>
                  }
                >
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {section.commands.map((item) => (
                      <CopyItem
                        copyValue={item.cmd}
                        key={item.cmd}
                        className="group p-4 hover:bg-amber-500/5 transition-colors cursor-pointer"
                      >
                        <div className="flex flex-col gap-1">
                          <code className="text-sm font-bold text-amber-600 dark:text-amber-500 font-mono break-all normal-case tracking-normal">
                            {item.cmd}
                          </code>
                          <p className="text-xs text-zinc-500 leading-tight normal-case tracking-normal">
                            {item.desc}
                          </p>
                        </div>
                      </CopyItem>
                    ))}
                  </div>
                </ActionPanel>
              ))}
            </div>
          )}

          {/* Keyboard Shortcuts */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-6">
              <Keyboard className="text-amber-500" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">
                Terminal Shortcuts
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TERMINAL_SHORTCUTS.map((item) => (
                <div
                  key={item.keys}
                  className="flex flex-col p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                >
                  <kbd className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 mb-1">
                    {item.keys}
                  </kbd>
                  <span className="text-xs text-zinc-500 leading-normal">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-amber-500" size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">
                WSL Tips
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {TIPS.map((tip) => (
                <div
                  key={tip}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                >
                  <CheckCircle2
                    size={14}
                    className="text-emerald-500 shrink-0"
                  />
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ActionPanel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 border-t pt-12">
        <InfoSection
          title="PowerShell vs Bash"
          icon={MonitorCog}
          description="Commands that start with wsl manage your Linux distros and run from Windows PowerShell or Terminal. Everything else runs inside the Ubuntu shell once WSL is open."
        />
        <InfoSection
          title="Where to Keep Your Code"
          icon={FolderSync}
          description="Store projects in your Linux home folder (~/) rather than under /mnt/c. File access across the Windows/Linux boundary is much slower, so installs and builds run faster inside the Linux file system."
        />
        <InfoSection
          title="Use sudo Carefully"
          icon={ShieldAlert}
          description="sudo runs a command with full system rights. Read commands before running them, and be especially careful with rm -rf and wsl --unregister, which permanently delete files."
        />
      </div>
    </div>
  );
}
