import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Zap, Shield, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { toolsData, OSType } from "@/data/tools";
import { Navbar } from "@/components/Navbar";
import { ToolCard } from "@/components/ToolCard";

const OS_TABS: ("All" | OSType)[] = ["All", "Linux", "Debian/Ubuntu", "Arch", "Termux"];
const OS_LABELS: Record<string, string> = {
  All: "All Platforms",
  Linux: "Linux",
  "Debian/Ubuntu": "Debian / Ubuntu",
  Arch: "Arch Linux",
  Termux: "Termux",
};

const featuredTools = toolsData.filter((t) => t.featured);

export default function FeaturedPage() {
  const [selectedOS, setSelectedOS] = useState<"All" | OSType>("All");

  const displayed =
    selectedOS === "All"
      ? featuredTools
      : featuredTools.filter(
          (t) => t.commands[selectedOS as OSType] && t.commands[selectedOS as OSType] !== "N/A"
        );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col dark">
      <Navbar />

      {/* Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="relative container mx-auto px-4 max-w-6xl py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-start gap-4"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary/70">
              <Star className="w-3.5 h-3.5 fill-primary/50" />
              Curated Selection
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Featured <span className="text-primary glow-text">Tools</span>
            </h1>
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Hand-picked essential tools every security professional should know.
              Battle-tested, widely trusted, and actively maintained.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary/60" />
                <strong className="text-foreground">{featuredTools.length}</strong> Featured Tools
              </span>
              <span className="w-px h-4 bg-border" />
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary/60" />
                Educational Use Only
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* OS Filter */}
      <div className="sticky top-16 z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {OS_TABS.map((os) => (
              <button
                key={os}
                onClick={() => setSelectedOS(os)}
                data-testid={`tab-featured-os-${os}`}
                className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedOS === os
                    ? "bg-primary text-primary-foreground shadow-[0_0_14px_rgba(0,240,255,0.3)]"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {OS_LABELS[os]}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {displayed.length} tool{displayed.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Grid */}
      <main className="flex-1 container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((tool, idx) => (
            <ToolCard
              key={`${tool.id}-${selectedOS}`}
              tool={tool}
              selectedOS={selectedOS === "All" ? "Linux" : selectedOS}
              showAllOS={selectedOS === "All"}
              index={idx}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Link href="/tools">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 px-6 py-3 rounded-xl glass-card border border-primary/30 text-primary font-medium cursor-pointer hover:bg-primary/10 transition-colors duration-200"
              data-testid="link-view-all-tools"
            >
              Browse Full Tool Library
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 max-w-6xl py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
        <span>
          <span className="text-foreground font-medium">Cyber Tools Hub</span> — Educational
          cybersecurity tools &amp; learning platform.
        </span>
        <span className="text-xs opacity-50">© {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  );
}
