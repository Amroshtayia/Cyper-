import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink, Shield, Terminal } from "lucide-react";
import { Tool, OSType } from "@/data/tools";
import { CommandBlock } from "./CommandBlock";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const categoryColors: Record<string, { badge: string; dot: string }> = {
  Network:   { badge: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",   dot: "bg-cyan-400" },
  Web:       { badge: "text-green-400 bg-green-400/10 border-green-400/30", dot: "bg-green-400" },
  Forensics: { badge: "text-amber-400 bg-amber-400/10 border-amber-400/30", dot: "bg-amber-400" },
  Recon:     { badge: "text-purple-400 bg-purple-400/10 border-purple-400/30", dot: "bg-purple-400" },
  Passwords: { badge: "text-red-400 bg-red-400/10 border-red-400/30",       dot: "bg-red-400" },
};

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

  const colors = categoryColors[tool.category] ?? { badge: "text-gray-400 bg-gray-400/10 border-gray-400/30", dot: "bg-gray-400" };

  const displayOS = showAllOS ? activeOS : selectedOS;
  const command = tool.commands[displayOS];
  const isNA = !command || command === "N/A";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.28, delay: index * 0.045 }}
      whileHover={{ y: -3, scale: 1.015 }}
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 cursor-default
                 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.12)]
                 transition-colors duration-300 group"
      data-testid={`card-tool-${tool.id}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
              {tool.name}
            </h3>
            <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${colors.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {tool.category}
            </span>
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
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {tool.description}
      </p>

      {/* Divider */}
      <div className="border-t border-border/60" />

      {/* Install Commands Section */}
      <Collapsible open={installOpen} onOpenChange={setInstallOpen}>
        <CollapsibleTrigger asChild>
          <button
            className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 group/btn"
            data-testid={`button-toggle-install-${tool.id}`}
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              View Install Commands
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${installOpen ? "rotate-180" : ""}`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 flex flex-col gap-3">
            {/* OS mini-tabs (shown in "All" mode or always) */}
            <div className="flex gap-1 flex-wrap">
              {OS_TABS.map((os) => (
                <button
                  key={os}
                  onClick={() => setActiveOS(os)}
                  data-testid={`tab-inner-os-${tool.id}-${os}`}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 border ${
                    displayOS === os
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-background/50 border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
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
            className="flex items-center justify-between w-full text-sm text-muted-foreground/70 hover:text-muted-foreground transition-colors duration-200"
            data-testid={`button-toggle-usage-${tool.id}`}
          >
            <span className="text-xs">Usage Example</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${usageOpen ? "rotate-180" : ""}`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2">
            <CommandBlock command={tool.usage} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
}
