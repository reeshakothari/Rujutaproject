import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CONTENT } from "@/data/content";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("rutuja_lang") || "en";
    }
    return "en";
  });

  useEffect(() => {
    window.localStorage.setItem("rutuja_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback((code) => setLang(code), []);

  const t = CONTENT[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
