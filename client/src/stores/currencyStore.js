import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCurrencyStore = defineStore("currency", () => {
  const selectedCurrency = ref("EUR");

  const rates = {
    EUR: 1,
    USD: 1.08,
    GBP: 0.85,
    CHF: 0.96,
    JPY: 162.5,
    AUD: 1.65,
    CAD: 1.47,
  };

  const symbolMap = {
    EUR: "\u20AC",
    USD: "$",
    GBP: "\u00A3",
    CHF: "CHF",
    JPY: "\u00A5",
    AUD: "A$",
    CAD: "CA$",
  };

  const symbol = computed(() => symbolMap[selectedCurrency.value] || "\u20AC");

  const label = computed(() => {
    const map = {
      EUR: "Euro (\u20AC)",
      USD: "US Dollar ($)",
      GBP: "British Pound (\u00A3)",
      CHF: "Swiss Franc (CHF)",
      JPY: "Japanese Yen (\u00A5)",
      AUD: "Australian Dollar (A$)",
      CAD: "Canadian Dollar (CA$)",
    };
    return map[selectedCurrency.value] || "Euro (\u20AC)";
  });

  function setCurrency(code) {
    selectedCurrency.value = code;
  }

  function formatPrice(price) {
    if (price == null) return "";
    const rate = rates[selectedCurrency.value] || 1;
    const converted = (price * rate).toFixed(2);
    return `${symbol.value}${converted}`;
  }

  function formatOldPrice(price) {
    if (price == null) return null;
    return formatPrice(price);
  }

  return { selectedCurrency, rates, symbol, label, setCurrency, formatPrice, formatOldPrice };
});
