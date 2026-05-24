import { Tool, ToolCategory, OSType } from "@/data/tools";

export function filterTools(
  tools: Tool[],
  opts: {
    category: "All" | ToolCategory;
    os: "All" | OSType;
    query: string;
  }
): Tool[] {
  return tools.filter((tool) => {
    // category
    if (opts.category !== "All" && tool.category !== opts.category) return false;
    // os
    if (opts.os !== "All") {
      const cmd = tool.commands[opts.os];
      if (!cmd || cmd === "N/A") return false;
    }
    // search
    const q = opts.query.toLowerCase().trim();
    if (q) {
      const haystack = [
        tool.name,
        tool.description,
        tool.category,
        ...tool.tags,
        ...Object.keys(tool.commands),
      ].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
