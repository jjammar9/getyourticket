import { useLocaleStore } from "../stores/localeStore.js";

export function useI18n() {
  const store = useLocaleStore();
  return { t: store.t, selectedLocale: store.selectedLocale, setLocale: store.setLocale };
}
