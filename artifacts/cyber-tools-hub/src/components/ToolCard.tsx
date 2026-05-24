import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, Shield } from "lucide-react";
import { Tool, OSType } from "@/data/tools";
import { CommandBlock } from "./CommandBlock";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const categoryColors: Record<string, string> = {
  Network: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Web: "text-green-400 bg-green-400/10 border-green-400/20",
  Forensics: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Recon: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Passwords: "text-red-400 bg-red-400/10 border-red-400/20",
};

interface ToolCardProps {
  tool: Tool;
  selectedOS: OSType;
  index: number;
}

export function ToolCard({ tool, selectedOS, index }: ToolCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const badgeStyle = categoryColors[tool.category] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
  const command = tool.commands[selectedOS];
  const isNA = command === "N/A" || !command;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-card border border-border hover:border-primary/50 transition-all duration-300 rounded-lg p-5 flex flex-col gap-4 shadow-sm hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
      data-testid={`card-tool-${tool.id}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {tool.name}
          </h3>
          <span className={`inline-block px-2 py-0.5 mt-2 rounded text-xs font-semibold border ${badgeStyle}`}>
            {tool.category}
          </span>
        </div>
        {tool.github && (
          <a
            href={tool.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            data-testid={`link-github-${tool.id}`}
            title="View on GitHub"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>

      <p className="text-sm text-muted-foreground flex-1">
        {tool.description}
      </p>

      <div className="mt-auto pt-4 border-t border-border">
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Install ({selectedOS})
        </h4>
        <CommandBlock command={command} isNA={isNA} />

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
          <CollapsibleTrigger asChild>
            <button 
              className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid={`button-toggle-usage-${tool.id}`}
            >
              <span>View Usage Example</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <CommandBlock command={tool.usage} />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </motion.div>
  );
}
