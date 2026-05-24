import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { Tool, OSType } from "@/data/tools";
import { ToolCard } from "./ToolCard";
import { SkeletonCard } from "./SkeletonCard";

interface ToolGridProps {
  tools: Tool[];
  selectedOS: "All" | OSType;
  isLoading: boolean;
}

export function ToolGrid({ tools, selectedOS, isLoading }: ToolGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <AnimatePresence mode="popLayout">
        {tools.length > 0 ? (
          tools.map((tool, idx) => (
            <ToolCard
              key={`${tool.id}-${selectedOS}`}
              tool={tool}
              selectedOS={selectedOS === "All" ? "Linux" : selectedOS}
              showAllOS={selectedOS === "All"}
              index={idx}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full py-20 text-center text-muted-foreground glass-card rounded-xl"
          >
            <Terminal className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-base">No tools found matching your criteria.</p>
            <p className="text-sm mt-1 opacity-60">Try adjusting the OS, category, or search query.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
