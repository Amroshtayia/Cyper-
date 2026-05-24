import React, { useState } from "react";
import { Copy, Check, Ban } from "lucide-react";

interface CommandBlockProps {
  command: string;
  isNA?: boolean;
}

export function CommandBlock({ command, isNA = false }: CommandBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (isNA || !command || command === "N/A") return;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isNA || !command || command === "N/A") {
    return (
      <div className="flex items-center gap-2 bg-background/60 border border-border rounded-lg px-3 py-2.5 font-mono text-xs text-muted-foreground/50 italic">
        <Ban className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Not available on this platform</span>
      </div>
    );
  }

  return (
    <div className="relative group/cmd bg-[#080c14] border border-primary/15 rounded-lg overflow-hidden hover:border-primary/30 transition-colors duration-200">
      {/* left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 to-primary/20" />
      <div className="flex items-start gap-3 px-4 py-3">
        <span className="text-primary/40 font-mono text-xs mt-px select-none flex-shrink-0">$</span>
        <code className="font-mono text-xs text-primary/90 flex-1 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
          {command}
        </code>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 text-muted-foreground/40 hover:text-primary transition-colors duration-150 p-0.5 mt-0.5"
          aria-label="Copy command"
          data-testid="button-copy-command"
        >
          {copied
            ? <Check className="w-3.5 h-3.5 text-green-400" />
            : <Copy className="w-3.5 h-3.5" />
          }
        </button>
      </div>
    </div>
  );
}
