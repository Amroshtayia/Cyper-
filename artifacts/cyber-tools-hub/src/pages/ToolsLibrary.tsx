import { useState, useMemo, useEffect } from "react";
import { Terminal } from "lucide-react";
import { toolsData, ToolCategory, OSType } from "@/data/tools";
import { filterTools } from "@/utils/filterTools";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { FilterBar } from "@/components/FilterBar";
import { ToolGrid } from "@/components/ToolGrid";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ToolsLibrary() {
  const [selectedOS, setSelectedOS] = useState<"All" | OSType>("All");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ToolCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
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
      query: searchQuery,
    });
  }, [selectedCategory, searchQuery, selectedOS]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col dark">
      <Navbar />

      {/* Sticky search + filters bar — sits directly below fixed navbar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
        {/* Page title row */}
        <div className="container mx-auto px-4 max-w-7xl pt-4 pb-2 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <BackButton fallbackHref="/" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight leading-tight">
                {language === "ar" ? "مكتبة الأدوات" : "Tools Library"}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {language === "ar"
                  ? `تصفح ${toolsData.length} أداة متخصصة`
                  : `Browse ${toolsData.length} specialized tools`}
              </p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground mt-1 flex-shrink-0">
            {filteredTools.length}
            {language === "ar" ? " نتيجة" : " results"}
          </span>
        </div>

        {/* Filter controls */}
        <div className="container mx-auto px-4 max-w-7xl pb-3">
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
      </div>

      {/* Scrollable tools grid — gets its own scroll context */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <ToolGrid tools={filteredTools} selectedOS={selectedOS} isLoading={isLoading} />
      </main>

      <footer className="border-t border-border bg-card/50 mt-auto">
        <div className="container mx-auto px-4 max-w-7xl py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary/60" />
            <span>
              <span className="text-foreground font-semibold">Cyber Tools Hub</span>{" "}
              {language === "ar"
                ? "— منصة أدوات وتعليم الأمن السيبراني."
                : "— Educational cybersecurity tools & learning platform."}
            </span>
          </div>
          <span className="opacity-70">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
