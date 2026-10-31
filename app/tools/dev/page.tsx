import { JsonLd } from "@/components/shared/json-ld";
import { categorySchemas, getRouteMetadata } from "@/lib/seo";
import { FileCode, GitCompare, GitBranch, Terminal } from "lucide-react";
import { ToolGrid } from "@/components/shared/tool-grid";
import { Tool } from "@/types/tools";
import Header from "@/components/shared/header";

const tools: Tool[] = [
  {
    title: "Markdown Preview",
    desc: "Real-time GitHub-flavored Markdown editor and renderer with tables, task lists, and syntax-highlighted code blocks.",
    href: "/tools/dev/markdown",
    icon: <FileCode size={18} />,
    status: "ready",
  },
  {
    title: "Diff Checker",
    desc: "Perform side-by-side or unified visual comparisons between code snippets to track changes and resolve conflicts.",
    href: "/tools/dev/diff",
    icon: <GitCompare size={18} />,
    status: "ready",
  },
  {
    title: "Git Commands",
    desc: "A comprehensive reference for advanced Git workflows, including conventional commits and branching strategies.",
    href: "/tools/dev/git",
    icon: <GitBranch size={18} />,
    status: "ready",
  },
  {
    title: "Linux & WSL Commands",
    desc: "Searchable Ubuntu terminal and WSL reference: packages, files, permissions, processes, networking, and Windows interop.",
    href: "/tools/dev/linux",
    icon: <Terminal size={18} />,
    status: "ready",
  },
];

const path = "/tools/dev";

export const metadata = getRouteMetadata(path);

export default function DevToolsHome() {
  return (
    <div className="p-8 space-y-12">
      <JsonLd data={categorySchemas(path)} />
      <Header
        category="Developer Tools"
        title="Developer Tools"
        description="Preview Markdown, compare code side by side, and look up Git, Linux, and WSL commands."
      />
      <ToolGrid tools={tools} columns={3} />
    </div>
  );
}
