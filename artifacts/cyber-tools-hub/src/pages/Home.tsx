import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Terminal, Cpu, ArrowRight } from "lucide-react";
import { toolsData, ToolCategory, OSType } from "@/data/tools";
import { categoriesData } from "@/data/categories";
import { Navbar } from "@/components/Navbar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FilterBar } from "@/components/FilterBar";
import { ToolGrid } from "@/components/ToolGrid";

export default function Home() {
  const [, navigate] = useLocation();
  const [selectedOS, setSelectedOS] = useState<"All" | OSType>("All");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ToolCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    toolsData.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const featuredTools = useMemo(() => toolsData.filter(t => t.featured).slice(0, 6), []);

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      if (selectedCategory !== "All" && tool.category !== selectedCategory) return false;
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesSearch =
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q) ||
          tool.tags.some(tag => tag.toLowerCase().includes(q)) ||
          Object.entries(tool.commands).some(
            ([os, cmd]) => os.toLowerCase().includes(q) || (cmd !== "N/A" && cmd.toLowerCase().includes(q))
          );
        if (!matchesSearch) return false;
      }
      if (selectedOS !== "All") {
        const cmd = tool.commands[selectedOS];
        if (!cmd || cmd === "N/A") return false;
      }
      return true;
    }).slice(0, 6); // Only show first 6 in dashboard preview
  }, [selectedCategory, searchQuery, selectedOS]);

  const handleCategorySelect = (cat: ToolCategory | "All") => {
    if (cat === "All") {
      navigate("/tools");
    } else {
      navigate(`/tools?cat=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans dark">
      <Navbar />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="relative container mx-auto px-4 py-20 max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 shadow-[0_0_30px_rgba(0,240,255,0.15)] mb-2">
              <Terminal className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Cyber Tools{" "}
              <span className="text-primary glow-text">Hub</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              The professional repository for security auditing, penetration testing, and digital forensics tools.
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary/70" />
                <span className="text-foreground">{toolsData.length}</span> Tools
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span><span className="text-foreground">4</span> Platforms</span>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span><span className="text-foreground">{categoriesData.length}</span> Categories</span>
            </div>
            <div className="pt-6">
              <Link href="/tools" className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                Browse Library
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-20 py-16 container mx-auto px-4 max-w-7xl">
        
        {/* Featured Tools */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-header">Featured Tools</h2>
            <Link href="/tools" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ToolGrid tools={featuredTools} selectedOS="All" isLoading={isLoading} />
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-header">Browse by Category</h2>
            <Link href="/categories" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <CategoryGrid 
            categories={categoriesData} 
            toolCounts={toolCounts} 
            onSelect={handleCategorySelect}
          />
        </section>

        {/* Quick Browse */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-header">All Tools</h2>
          </div>
          <div className="mb-8">
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
          
          <div className="mt-10 text-center">
            <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors font-medium">
              Explore the full library <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </section>

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
