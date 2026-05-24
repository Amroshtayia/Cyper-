import { useState, useMemo, useEffect } from "react";
import { Terminal, Shield, Cpu } from "lucide-react";
import { toolsData, ToolCategory, OSType } from "@/data/tools";
import { Navbar } from "@/components/Navbar";
import { FilterTabs } from "@/components/FilterTabs";
import { SearchBar } from "@/components/SearchBar";
import { ToolGrid } from "@/components/ToolGrid";

const CATEGORIES: ("All" | ToolCategory)[] = ["All", "Network", "Web", "Forensics", "Recon", "Passwords"];
const OS_OPTIONS: ("All" | OSType)[] = ["All", "Linux", "Debian/Ubuntu", "Arch", "Termux"];

const OS_LABELS: Record<"All" | OSType, string> = {
  "All": "All Tools",
  "Linux": "Linux",
  "Debian/Ubuntu": "Debian / Ubuntu",
  "Arch": "Arch Linux",
  "Termux": "Termux",
};

const categoryCount = (cat: "All" | ToolCategory) =>
  cat === "All" ? toolsData.length : toolsData.filter((t) => t.category === cat).length;

export default function Home() {
  const [selectedOS, setSelectedOS] = useState<"All" | OSType>("All");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ToolCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        Object.entries(tool.commands).some(
          ([os, cmd]) => os.toLowerCase().includes(q) || (cmd !== "N/A" && cmd.toLowerCase().includes(q))
        );
      const matchesOS =
        selectedOS === "All" ||
        (tool.commands[selectedOS as OSType] && tool.commands[selectedOS as OSType] !== "N/A");
      return matchesCategory && matchesSearch && matchesOS;
    });
  }, [selectedCategory, searchQuery, selectedOS]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans dark">
      <Navbar />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="relative container mx-auto px-4 py-16 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 shadow-[0_0_24px_rgba(0,240,255,0.2)]">
                <Terminal className="w-7 h-7 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Cyber Tools{" "}
              <span className="text-primary glow-text">Hub</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Installer Edition — Ethical Cybersecurity Tools Installer Guide
            </p>
            <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-primary/60" />
                <strong className="text-foreground">{toolsData.length}</strong> Tools
              </span>
              <span className="w-px h-4 bg-border" />
              <span><strong className="text-foreground">4</strong> Platforms</span>
              <span className="w-px h-4 bg-border" />
              <span><strong className="text-foreground">5</strong> Categories</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky controls */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl py-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <FilterTabs
              selectedOS={selectedOS}
              onOSChange={setSelectedOS}
              options={OS_OPTIONS}
              labels={OS_LABELS}
            />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Category filters + result count */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  data-testid={`filter-category-${cat}`}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 border ${
                    selectedCategory === cat
                      ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_8px_rgba(0,240,255,0.2)]"
                      : "bg-transparent border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-[10px] ${selectedCategory === cat ? "text-primary/70" : "text-muted-foreground/50"}`}>
                    {categoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} shown
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-10 max-w-6xl">
        <ToolGrid tools={filteredTools} selectedOS={selectedOS} isLoading={isLoading} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 max-w-6xl py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary/60" />
            <span>
              <span className="text-foreground font-medium">Cyber Tools Hub</span> — Educational cybersecurity installation guide only.
            </span>
          </div>
          <span className="text-xs opacity-50">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
