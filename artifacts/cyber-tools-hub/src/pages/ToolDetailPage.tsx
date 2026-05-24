import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Copy, Check, ExternalLink, Terminal,
  Tag, BookOpen, ChevronRight, Ban,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toolsData, OSType } from "@/data/tools";
import { categoriesData } from "@/data/categories";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { useLanguage } from "@/contexts/LanguageContext";

const OS_TABS: { key: OSType; labelEn: string; labelAr: string }[] = [
  { key: "Linux", labelEn: "Linux", labelAr: "لينكس" },
  { key: "Debian/Ubuntu", labelEn: "Debian / Ubuntu", labelAr: "ديبيان / أوبونتو" },
  { key: "Arch", labelEn: "Arch Linux", labelAr: "آرش لينكس" },
  { key: "Termux", labelEn: "Termux (Android)", labelAr: "تيرموكس (أندرويد)" },
];

function CopyBlock({ command, isNA = false }: { command: string; isNA?: boolean }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (isNA) return;
    navigator.clipboard.writeText(command);
    setCopied(true);
    toast({ title: "Copied!", description: "Command copied to clipboard.", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  if (isNA || command === "N/A") {
    return (
      <div className="flex items-center gap-3 bg-[#060a10] border border-border rounded-xl px-5 py-4 font-mono text-sm text-muted-foreground/50 italic">
        <Ban className="w-4 h-4 flex-shrink-0" />
        Not available on this platform
      </div>
    );
  }

  return (
    <div className="relative bg-[#060a10] border border-primary/15 rounded-xl overflow-hidden group hover:border-primary/30 transition-colors duration-200">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />
      <div className="flex items-start gap-3 px-5 py-4">
        <span className="text-primary/40 font-mono text-sm mt-px select-none flex-shrink-0">$</span>
        <code className="font-mono text-sm text-green-300/90 flex-1 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
          {command}
        </code>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 ml-2 p-1.5 rounded-md text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-colors duration-150"
          aria-label="Copy command"
          data-testid="button-copy-detail"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function ToolDetailPage() {
  const params = useParams<{ id: string }>();
  const [activeOS, setActiveOS] = useState<OSType>("Linux");
  const { language, isRTL } = useLanguage();

  const tool = toolsData.find((t) => t.id === params.id);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col dark">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          <Terminal className="w-16 h-16 text-muted-foreground/20" />
          <h1 className="text-2xl font-bold">
            {language === "ar" ? "الأداة غير موجودة" : "Tool not found"}
          </h1>
          <p className="text-muted-foreground">
            {language === "ar"
              ? "لا توجد أداة بهذا المعرف في المكتبة."
              : "No tool with that identifier exists in the library."}
          </p>
          <Link href="/tools">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              {language === "ar" ? "العودة إلى مكتبة الأدوات" : "Back to Tools Library"}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryDef = categoriesData.find((c) => c.name === tool.category);
  const catColor = categoryDef?.color ?? "text-gray-400";
  const catBg = categoryDef?.bgColor ?? "bg-gray-400/10";
  const catBorder = categoryDef?.borderColor ?? "border-gray-400/30";
  const activeCommand = tool.commands[activeOS];
  const isNA = !activeCommand || activeCommand === "N/A";

  const related = toolsData.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col dark">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 max-w-4xl py-10">

        {/* Breadcrumb with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <BackButton fallbackHref="/tools" />
          <span className="text-border/60 hidden sm:block">|</span>
          <div className={`hidden sm:flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Link href="/" className="hover:text-primary transition-colors">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight className={`w-3.5 h-3.5 opacity-40 ${isRTL ? "rotate-180" : ""}`} />
            <Link href="/tools" className="hover:text-primary transition-colors">
              {language === "ar" ? "الأدوات" : "Tools"}
            </Link>
            <ChevronRight className={`w-3.5 h-3.5 opacity-40 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-foreground font-medium">{tool.name}</span>
          </div>
        </motion.div>

        {/* Tool Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="glass-card rounded-2xl p-8 mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {tool.featured && (
            <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/10 px-2.5 py-1 rounded-full`}>
              {language === "ar" ? "أداة مميزة" : "Featured Tool"}
            </div>
          )}

          <div className={`flex items-start gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/25 shadow-[0_0_20px_rgba(0,240,255,0.15)] flex items-center justify-center">
              <Terminal className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`flex flex-wrap items-start gap-3 justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-right" : ""}>
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">
                    {tool.name}
                  </h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${catColor} ${catBg} ${catBorder}`}>
                    {tool.category}
                  </span>
                </div>
                {tool.github && (
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200 ${isRTL ? "flex-row-reverse" : ""}`}
                    data-testid="link-github-detail"
                  >
                    <ExternalLink className="w-4 h-4" />
                    GitHub
                  </a>
                )}
              </div>
              <p className={`mt-4 text-muted-foreground leading-relaxed ${isRTL ? "text-right" : ""}`}>
                {tool.description}
              </p>

              {/* Tags */}
              <div className={`flex flex-wrap gap-2 mt-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Tag className="w-3.5 h-3.5 text-muted-foreground/50 mt-0.5" />
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-xs font-medium bg-card border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Installation Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.08 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h2 className={`text-lg font-bold mb-5 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Terminal className="w-5 h-5 text-primary" />
            {language === "ar" ? "أوامر التثبيت" : "Installation Commands"}
          </h2>

          <div className={`flex flex-wrap gap-2 mb-5 ${isRTL ? "flex-row-reverse" : ""}`}>
            {OS_TABS.map(({ key, labelEn, labelAr }) => (
              <button
                key={key}
                onClick={() => setActiveOS(key)}
                data-testid={`tab-detail-os-${key}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  activeOS === key
                    ? "bg-primary/15 text-primary border-primary/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                    : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {language === "ar" ? labelAr : labelEn}
              </button>
            ))}
          </div>

          <CopyBlock command={activeCommand} isNA={isNA} />
        </motion.div>

        {/* Usage Example */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.12 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h2 className={`text-lg font-bold mb-5 flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <BookOpen className="w-5 h-5 text-primary" />
            {language === "ar" ? "مثال الاستخدام" : "Usage Example"}
          </h2>
          <CopyBlock command={tool.usage} />
          <p className={`text-xs text-muted-foreground/60 mt-3 italic ${isRTL ? "text-right" : ""}`}>
            {language === "ar"
              ? "للأغراض التعليمية والاختبار المصرح به فقط."
              : "For educational and authorized testing purposes only."}
          </p>
        </motion.div>

        {/* All OS Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.16 }}
          className="glass-card rounded-2xl p-6 mb-10"
        >
          <h2 className={`text-lg font-bold mb-5 ${isRTL ? "text-right" : ""}`}>
            {language === "ar" ? "أوامر جميع المنصات" : "All Platform Commands"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OS_TABS.map(({ key, labelEn, labelAr }) => {
              const cmd = tool.commands[key];
              const na = !cmd || cmd === "N/A";
              return (
                <div key={key} className={`flex flex-col gap-2 ${isRTL ? "items-end" : ""}`}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {language === "ar" ? labelAr : labelEn}
                  </span>
                  <CopyBlock command={cmd} isNA={na} />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Related Tools */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
          >
            <div className={`flex items-center justify-between mb-5 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2 className="text-lg font-bold">
                {language === "ar" ? "أدوات ذات صلة" : "Related Tools"}
              </h2>
              <Link href="/tools" className={`text-sm text-primary/70 hover:text-primary transition-colors flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                {language === "ar" ? "عرض الكل" : "View all"}
                <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? "rotate-180" : ""}`} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rt) => (
                <Link key={rt.id} href={`/tool/${rt.id}`}>
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="glass-card card-glow rounded-xl p-4 cursor-pointer"
                    data-testid={`card-related-${rt.id}`}
                  >
                    <div className={`flex items-center gap-3 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Terminal className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="font-bold text-sm truncate">{rt.name}</span>
                    </div>
                    <p className={`text-xs text-muted-foreground line-clamp-2 ${isRTL ? "text-right" : ""}`}>
                      {rt.description}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <footer className="border-t border-border bg-card mt-auto">
        <div className={`container mx-auto px-4 max-w-6xl py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <span>
            <span className="text-foreground font-medium">Cyber Tools Hub</span>{" "}
            {language === "ar"
              ? "— منصة أدوات وتعليم الأمن السيبراني."
              : "— Educational cybersecurity tools & learning platform."}
          </span>
          <span className="text-xs opacity-50">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
