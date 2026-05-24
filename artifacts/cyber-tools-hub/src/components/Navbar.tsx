import { Link, useLocation } from "wouter";
import { Terminal, Github, Shield } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 h-16 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 max-w-7xl h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <Terminal className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
              Cyber Tools <span className="text-primary glow-text">Hub</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/" 
              className={`nav-link ${location === "/" ? "active" : ""}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/tools" 
              className={`nav-link ${location === "/tools" ? "active" : ""}`}
            >
              Tools Library
            </Link>
            <Link 
              href="/categories" 
              className={`nav-link ${location === "/categories" ? "active" : ""}`}
            >
              Categories
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-amber-400/90 border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5" />
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
