import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CommandBlockProps {
  command: string;
  isNA?: boolean;
}

export function CommandBlock({ command, isNA = false }: CommandBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (isNA) return;
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isNA || command === "N/A") {
    return (
      <div className="bg-black/50 border border-muted/50 rounded-md p-3 font-mono text-sm text-muted-foreground italic flex items-center justify-between">
        <span>N/A — GUI app or unsupported</span>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#0d0d0d] border border-primary/20 rounded-md p-3 overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
      <div className="flex items-start justify-between gap-4">
        <code className="font-mono text-sm text-primary overflow-x-auto whitespace-pre-wrap flex-1 block">
          $ {command}
        </code>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-primary transition-colors p-1"
          aria-label="Copy command"
          data-testid="button-copy-command"
        >
          {copied ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
