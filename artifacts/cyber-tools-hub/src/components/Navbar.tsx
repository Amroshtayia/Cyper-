import { Terminal, Github, Shield } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-16 bg-background/80 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 max-w-6xl h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-bold text-lg tracking-tight">
            Cyber Tools <span className="text-primary glow-text">Hub</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-amber-400/80 border border-amber-400/20 bg-amber-400/5 px-2.5 py-1 rounded-full">
            <Shield className="w-3 h-3" />
            Educational Use Only
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
