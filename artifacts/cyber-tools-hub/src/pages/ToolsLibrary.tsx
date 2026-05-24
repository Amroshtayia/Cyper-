import { useState, useMemo, useEffect } from "react";
import { Terminal } from "lucide-react";
import { toolsData, ToolCategory, OSType } from "@/data/tools";
import { filterTools } from "@/utils/filterTools";
import { Navbar } from "@/components/Navbar";
import { FilterBar } from "@/components/FilterBar";
import { ToolGrid } from "@/components/ToolGrid";

export default function ToolsLibrary() {
  const [selectedOS, setSelectedOS] = useState<"All" | OSType>("All");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ToolCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read category from URL search params if available
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("cat");
    if (catParam) {
      setSelectedCategory(catParam as ToolCategory);
    }
    
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filteredTools = useMemo(() => {
    return filterTools(toolsData, {
      category: selectedCategory,
      os: selectedOS,
      query: searchQuery
    });
  }, [selectedCategory, searchQuery, selectedOS]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans dark">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-10 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Tools Library</h1>
          <p className="text-muted-foreground text-lg">
            Browse {toolsData.length} specialized tools across multiple categories.
          </p>
        </div>

        <div className="sticky top-20 z-40 mb-8">
          <FilterBar 
            selectedOS={selectedOS}
            onOSChange={setSelectedOS}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={filteredTools.length}
            totalCount={toolsData.length}
          />
        </div>

        <ToolGrid tools={filteredTools} selectedOS={selectedOS} isLoading={isLoading} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-auto">
        <div className="container mx-auto px-4 max-w-7xl py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary/60" />
            <span>
              <span className="text-foreground font-semibold">Cyber Tools Hub</span> — Educational cybersecurity installation guide only.
            </span>
          </div>
          <span className="opacity-70">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
