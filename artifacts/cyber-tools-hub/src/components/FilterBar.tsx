import { Search } from "lucide-react";
import { ToolCategory, OSType } from "@/data/tools";
import { categoriesData } from "@/data/categories";

const OS_OPTIONS: ("All" | OSType)[] = ["All", "Linux", "Debian/Ubuntu", "Arch", "Termux"];

const OS_LABELS: Record<"All" | OSType, string> = {
  "All": "All OS",
  "Linux": "Linux",
  "Debian/Ubuntu": "Debian/Ubuntu",
  "Arch": "Arch Linux",
  "Termux": "Termux",
};

interface FilterBarProps {
  selectedOS: "All" | OSType;
  onOSChange: (os: "All" | OSType) => void;
  selectedCategory: "All" | ToolCategory;
  onCategoryChange: (cat: "All" | ToolCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  resultCount: number;
  totalCount: number;
}

export function FilterBar({
  selectedOS,
  onOSChange,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 bg-card/50 p-4 rounded-xl border border-border backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* OS Tabs */}
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Operating System">
          {OS_OPTIONS.map((os) => (
            <button
              key={os}
              role="tab"
              aria-selected={selectedOS === os}
              onClick={() => onOSChange(os)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedOS === os
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,240,255,0.25)]"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {OS_LABELS[os]}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools, commands, tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-background border border-border rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 text-foreground"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange("All")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 border ${
              selectedCategory === "All"
                ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_8px_rgba(0,240,255,0.2)]"
                : "bg-transparent border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            All Categories
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.name)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 border ${
                selectedCategory === cat.name
                  ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_8px_rgba(0,240,255,0.2)]"
                  : "bg-transparent border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="text-xs font-medium text-muted-foreground shrink-0 bg-background/50 px-2 py-1 rounded-md border border-border/50">
          Showing {resultCount} of {totalCount} tools
        </div>
      </div>
    </div>
  );
}
