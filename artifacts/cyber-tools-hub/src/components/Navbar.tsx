import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Terminal, Github, Shield, Menu, X, Star, BookOpen, LayoutDashboard, Wrench, Grid3x3, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const NAV_LINKS = [
  { href: "/", labelEn: "Dashboard", labelAr: "الرئيسية", icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: "/tools", labelEn: "Tools", labelAr: "الأدوات", icon: <Wrench className="w-4 h-4" /> },
  { href: "/categories", labelEn: "Categories", labelAr: "الفئات", icon: <Grid3x3 className="w-4 h-4" /> },
  { href: "/featured", labelEn: "Featured", labelAr: "المميزة", icon: <Star className="w-4 h-4" /> },
  { href: "/learning", labelEn: "Learning", labelAr: "التعلم", icon: <BookOpen className="w-4 h-4" /> },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, isRTL } = useLanguage();

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const getLabel = (link: (typeof NAV_LINKS)[number]) =>
    language === "ar" ? link.labelAr : link.labelEn;

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 max-w-7xl h-full flex items-center justify-between">
          {/* Logo + Desktop Nav */}
          <div className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Terminal className="w-4 h-4 text-primary" />
              </div>
              <span className="font-bold text-base tracking-tight text-foreground group-hover:text-primary transition-colors hidden sm:block">
                {language === "ar" ? (
                  <><span className="text-primary">مركز</span> أدوات السيبر</>
                ) : (
                  <>Cyber Tools <span className="text-primary">Hub</span></>
                )}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                  data-testid={`nav-link-${link.labelEn.toLowerCase()}`}
                >
                  {getLabel(link)}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              data-testid="button-language-toggle"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-150"
              title={language === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              <Languages className="w-3.5 h-3.5" />
              {language === "en" ? "عربي" : "EN"}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-amber-400/90 border border-amber-400/25 bg-amber-400/8 px-3 py-1.5 rounded-full">
              <Shield className="w-3 h-3" />
              {language === "ar" ? "للتعليم فقط" : "Educational Use Only"}
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
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed top-0 bottom-0 z-50 w-72 bg-card border-border flex flex-col md:hidden ${
                isRTL ? "left-0 border-r" : "right-0 border-l"
              }`}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-border">
                <span className="font-bold text-primary">
                  {language === "ar" ? "التنقل" : "Navigation"}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-mobile-menu-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`mobile-nav-link-${link.labelEn.toLowerCase()}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive(link.href)
                        ? "bg-primary/10 border border-primary/25 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-background border border-transparent"
                    } ${isRTL ? "flex-row-reverse text-right" : ""}`}
                  >
                    <span className={isActive(link.href) ? "text-primary" : "text-muted-foreground/60"}>
                      {link.icon}
                    </span>
                    {getLabel(link)}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-border flex flex-col gap-2">
                <button
                  onClick={() => {
                    setLanguage(language === "en" ? "ar" : "en");
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Languages className="w-4 h-4" />
                  {language === "en" ? "التبديل إلى العربية" : "Switch to English"}
                </button>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-amber-400/80 border border-amber-400/20 bg-amber-400/8 px-3 py-2 rounded-lg">
                  <Shield className="w-3 h-3" />
                  {language === "ar" ? "للتعليم فقط" : "Educational Use Only"}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
