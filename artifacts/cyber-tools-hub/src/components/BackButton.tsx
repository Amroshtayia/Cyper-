import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
  className?: string;
}

export function BackButton({
  fallbackHref = "/",
  label,
  className = "",
}: BackButtonProps) {
  const [, navigate] = useLocation();
  const { isRTL } = useLanguage();

  const defaultLabel = isRTL ? "رجوع" : "Back";
  const displayLabel = label ?? defaultLabel;

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      data-testid="button-back"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card border border-transparent hover:border-border transition-all duration-150 ${className}`}
      aria-label={displayLabel}
    >
      {isRTL ? (
        <>
          {displayLabel}
          <ArrowRight className="w-4 h-4 flex-shrink-0" />
        </>
      ) : (
        <>
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          {displayLabel}
        </>
      )}
    </button>
  );
}
