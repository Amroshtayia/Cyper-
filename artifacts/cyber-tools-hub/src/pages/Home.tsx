import React, { useState, useMemo } from "react";
import { Terminal, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toolsData, ToolCategory, OSType } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CATEGORIES: ("All" | ToolCategory)[] = ["All", "Network", "Web", "Forensics", "Recon", "Passwords"];
const OS_OPTIONS: OSType[] = ["Linux", "Debian/Ubuntu", "Arch", "Termux"];

export default function Home() {
  const [selectedOS, setSelectedOS] = useState<OSType>("Linux");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ToolCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans dark">
      {/* Header / Hero */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2 border border-primary/20">
              <Terminal className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Cyber Tools <span className="text-primary">Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Ethical Cybersecurity Tools Installer Guide
            </p>
            <p className="text-xs text-muted-foreground/60 border border-muted-foreground/20 px-3 py-1 rounded-full bg-background/50">
              ⚠️ For educational and authorized testing use only.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl flex flex-col gap-8">
        
        {/* Controls Section */}
        <div className="flex flex-col gap-6 sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b border-border/50">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* OS Tabs */}
            <Tabs 
              value={selectedOS} 
              onValueChange={(val) => setSelectedOS(val as OSType)}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-card border border-border">
                {OS_OPTIONS.map((os) => (
                  <TabsTrigger 
                    key={os} 
                    value={os}
                    data-testid={`tab-os-${os}`}
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    {os}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                data-testid="input-search-tools"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-testid={`filter-category-${cat}`}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,240,255,0.3)]" 
                    : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          <AnimatePresence mode="popLayout">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool, idx) => (
                <ToolCard 
                  key={`${tool.id}-${selectedOS}`} 
                  tool={tool} 
                  selectedOS={selectedOS} 
                  index={idx} 
                />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center text-muted-foreground"
              >
                <Terminal className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No tools found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto py-8">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Cyber Tools Hub.</p>
          <div className="flex items-center gap-4">
            <span>Built with precision.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
