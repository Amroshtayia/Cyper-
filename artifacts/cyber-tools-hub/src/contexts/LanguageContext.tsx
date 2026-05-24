import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return (localStorage.getItem("cth-language") as Language) || "en";
    } catch {
      return "en";
    }
  });

  const isRTL = language === "ar";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("cth-language", lang);
    } catch {}
  };

  useEffect(() => {
    const html = document.documentElement;
    if (language === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      html.classList.add("lang-ar");
      html.classList.remove("lang-en");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      html.classList.add("lang-en");
      html.classList.remove("lang-ar");
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
