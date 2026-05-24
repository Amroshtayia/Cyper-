import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, Shield, Terminal } from "lucide-react";
import { Tool, OSType } from "@/data/tools";
import { categoriesData } from "@/data/categories";
import { CommandBlock } from "./CommandBlock";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const OS_TABS: OSType[] = ["Linux", "Debian/Ubuntu", "Arch", "Termux"];
const OS_SHORT: Record<OSType, string> = {
  "Linux": "Linux",
  "Debian/Ubuntu": "Debian",
  "Arch": "Arch",
  "Termux": "Termux",
};

interface ToolCardProps {
  tool: Tool;
  selectedOS: OSType;
  showAllOS?: boolean;
  index: number;
}

export function ToolCard({ tool, selectedOS, showAllOS = false, index }: ToolCardProps) {
  const [installOpen, setInstallOpen] = useState(false);
  const [usageOpen, setUsageOpen] = useState(false);
  const [activeOS, setActiveOS] = useState<OSType>(selectedOS);

  const categoryDef = categoriesData.find(c => c.name === tool.category);
  const catColorClass = categoryDef ? categoryDef.color : "text-gray-400";
  const catBgClass = categoryDef ? categoryDef.bgColor : "bg-gray-400/10";
  const catBorderClass = categoryDef ? categoryDef.borderColor : "border-gray-400/30";

  const displayOS = showAllOS ? activeOS : selectedOS;
  const command = tool.commands[displayOS];
  const isNA = !command || command === "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="glass-card card-glow relative overflow-hidden rounded-xl p-5 flex flex-col gap-4 cursor-default group"
      data-testid={`card-tool-${tool.id}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {tool.featured && (
        <div className="absolute top-0 right-0 -mr-6 mt-3 origin-center rotate-45 bg-primary/20 border-b border-primary/30 w-24 text-center py-0.5">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Star</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 pr-6">
          <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-card border border-border shadow-sm flex items-center justify-center">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight truncate">
              {tool.name}
            </h3>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${catColorClass} ${catBgClass} ${catBorderClass}`}>
                {tool.category}
              </span>
              {tool.tags.slice(0, 2).map(tag => (
                <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-border bg-background/50 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        {tool.github && (
          <a
            href={tool.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-muted-foreground/50 hover:text-primary transition-colors duration-200 p-1 mt-0.5"
            data-testid={`link-github-${tool.id}`}
            title="View on GitHub"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mt-1">
        {tool.description}
      </p>

      {/* Divider */}
      <div className="border-t border-border/60" />

      {/* Install Commands Section */}
      <Collapsible open={installOpen} onOpenChange={setInstallOpen}>
        <CollapsibleTrigger asChild>
          <button
            className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 group/btn bg-card/40 px-3 py-2 rounded-lg border border-transparent hover:border-border"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Installation Commands
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${installOpen ? "rotate-180" : ""}`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 flex flex-col gap-3 px-1">
            <div className="flex gap-1 flex-wrap">
              {OS_TABS.map((os) => (
                <button
                  key={os}
                  onClick={() => setActiveOS(os)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 border ${
                    displayOS === os
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-background/50 border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
                  }`}
                >
                  {OS_SHORT[os]}
                </button>
              ))}
            </div>
            <CommandBlock command={command} isNA={isNA} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Usage Example Section */}
      <Collapsible open={usageOpen} onOpenChange={setUsageOpen}>
        <CollapsibleTrigger asChild>
          <button
            className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-1"
          >
            <span className="text-xs uppercase tracking-wider font-semibold">Usage Example</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${usageOpen ? "rotate-180" : ""}`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 px-1">
            <CommandBlock command={tool.usage} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}
