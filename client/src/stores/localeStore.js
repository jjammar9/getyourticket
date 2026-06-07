import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { locales, translations } from "../i18n/translations.js";

export const useLocaleStore = defineStore("locale", () => {
  const saved = localStorage.getItem("locale") || "en";
  const selectedLocale = ref(saved);

  const localeLabel = computed(() => {
    const found = locales.find((l) => l.code === selectedLocale.value);
    return found ? found.label : "English (United Kingdom)";
  });

  const t = (key, params = {}) => {
    const locale = selectedLocale.value;
    const lang = locale.startsWith("de") ? "de" : locale.startsWith("fr") ? "fr" : locale.startsWith("it") ? "it" : locale.startsWith("nl") ? "nl" : locale.startsWith("pl") ? "pl" : locale.startsWith("pt") ? "pt" : locale.startsWith("es") ? "es" : "en";
    const result = translations[lang]?.[key] || translations.en?.[key];
    if (!result) {
      console.warn("localeStore.t: missing key", { key, locale, lang, hasLang: !!translations[lang], hasEn: !!translations.en, translationsKeys: Object.keys(translations) });
    }
    let text = result || key;
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, "g"), v);
    }
    return text;
  };

  function setLocale(code) {
    selectedLocale.value = code;
    localStorage.setItem("locale", code);
  }

  return { selectedLocale, localeLabel, t, setLocale };
});
