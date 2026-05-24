import { useMemo } from "react";
import { useLocation } from "wouter";
import { Terminal } from "lucide-react";
import { toolsData, ToolCategory } from "@/data/tools";
import { categoriesData } from "@/data/categories";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { CategoryGrid } from "@/components/CategoryGrid";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CategoriesPage() {
  const [, navigate] = useLocation();
  const { language } = useLanguage();

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    toolsData.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCategorySelect = (cat: ToolCategory | "All") => {
    if (cat === "All") {
      navigate("/tools");
    } else {
      navigate(`/tools?cat=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col dark">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-10 max-w-7xl">
        <div className="mb-8 flex flex-col gap-3">
          <BackButton fallbackHref="/" />
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              {language === "ar" ? "تصفح حسب الفئة" : "Browse by Category"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {language === "ar"
                ? "اختر فئة لاستعراض الأدوات المتخصصة في كل مجال أمني."
                : "Select a category to explore specialized tools for different security domains."}
            </p>
          </div>
        </div>

        <CategoryGrid
          categories={categoriesData}
          toolCounts={toolCounts}
          onSelect={handleCategorySelect}
        />
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
