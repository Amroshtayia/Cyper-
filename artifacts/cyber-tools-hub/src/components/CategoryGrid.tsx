import { motion } from "framer-motion";
import * as icons from "lucide-react";
import { ToolCategory } from "@/data/tools";
import { Category } from "@/data/categories";

interface CategoryGridProps {
  categories: Category[];
  toolCounts: Record<string, number>;
  onSelect: (cat: ToolCategory | "All") => void;
  selected?: ToolCategory | "All";
}

export function CategoryGrid({ categories, toolCounts, onSelect, selected = "All" }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {categories.map((cat) => {
        const Icon = (icons as any)[cat.icon] || icons.Box;
        const count = toolCounts[cat.name] || 0;
        const isSelected = selected === cat.name;

        return (
          <motion.button
            key={cat.id}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => onSelect(cat.name)}
            className={`glass-card card-glow text-left p-5 rounded-xl transition-all duration-200 border relative overflow-hidden group ${
              isSelected ? "border-primary/50 shadow-[0_0_15px_rgba(0,240,255,0.15)]" : "border-border hover:border-primary/30"
            }`}
          >
            {isSelected && (
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            )}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${cat.bgColor} ${cat.borderColor} ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-muted-foreground bg-white/5 px-2 py-1 rounded-full border border-white/5">
                {count} {count === 1 ? "tool" : "tools"}
              </div>
            </div>
            <h3 className={`text-lg font-bold mb-1 transition-colors ${isSelected ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
              {cat.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {cat.description}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
