import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ja from "./locales/ja.json";
import vi from "./locales/vi.json";
import zh from "./locales/zh.json";
import zhTW from "./locales/zh-TW.json";

type Language = "zh" | "zh-TW" | "en" | "ja" | "vi";

const DEFAULT_LANGUAGE: Language = "zh";

const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem("language");
      if (
        stored === "zh" ||
        stored === "zh-TW" ||
        stored === "en" ||
        stored === "ja" ||
        stored === "vi"
      ) {
        return stored;
      }
    } catch (error) {
      console.warn("[i18n] Failed to read stored language preference", error);
    }
  }

  const navigatorLang =
    typeof navigator !== "undefined"
      ? (navigator.language?.toLowerCase() ??
        navigator.languages?.[0]?.toLowerCase())
      : undefined;

  if (navigatorLang === "zh") {
    return "zh";
  }

  if (
    navigatorLang?.startsWith("zh-tw") ||
    navigatorLang?.startsWith("zh-hk") ||
    navigatorLang?.startsWith("zh-mo") ||
    navigatorLang?.startsWith("zh-hant")
  ) {
    return "zh-TW";
  }

  if (navigatorLang?.startsWith("zh")) {
    return "zh";
  }

  if (navigatorLang?.startsWith("ja")) {
    return "ja";
  }

  if (navigatorLang?.startsWith("vi")) {
    return "vi";
  }

  if (navigatorLang?.startsWith("en")) {
    return "en";
  }

  return DEFAULT_LANGUAGE;
};

const resources = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
  vi: {
    translation: vi,
  },
  zh: {
    translation: zh,
  },
  "zh-TW": {
    translation: zhTW,
  },
};

const HTML_LANG: Record<Language, string> = {
  zh: "zh-CN",
  "zh-TW": "zh-TW",
  en: "en",
  ja: "ja",
  vi: "vi",
};

const applyDocumentMeta = (lng?: string) => {
  if (typeof document === "undefined") return;
  document.title = i18n.t("app.title");
  const resolved: Language =
    lng === "zh" ||
    lng === "zh-TW" ||
    lng === "en" ||
    lng === "ja" ||
    lng === "vi"
      ? lng
      : "en";
  document.documentElement.lang = HTML_LANG[resolved];
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },

  debug: false,
});

applyDocumentMeta(i18n.language);
i18n.on("languageChanged", applyDocumentMeta);

export default i18n;
