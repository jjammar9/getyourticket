<script setup>
import { ref } from "vue";
import { useLocaleStore } from "../../stores/localeStore.js";
import { useCurrencyStore } from "../../stores/currencyStore.js";
import { locales } from "../../i18n/translations.js";

const localeStore = useLocaleStore();
const currencyStore = useCurrencyStore();

const currencyOptions = [
  { code: "EUR", label: "Euro (\u20AC)" },
  { code: "USD", label: "US Dollar ($)" },
  { code: "GBP", label: "British Pound (\u00A3)" },
  { code: "CHF", label: "Swiss Franc (CHF)" },
  { code: "JPY", label: "Japanese Yen (\u00A5)" },
  { code: "AUD", label: "Australian Dollar (A$)" },
  { code: "CAD", label: "Canadian Dollar (CA$)" },
];

const languageOpen = ref(false);
const currencyOpen = ref(false);
</script>

<template>
  <div class="w-full max-w-[240px]">
    <p class="text-[13px] font-bold mb-[6px]" style="font-family: var(--font-display);">{{ localeStore.t("footer.language") }}</p>
    <div class="relative">
      <button
        @click="
          languageOpen = !languageOpen;
          currencyOpen = false;
        "
        class="w-full bg-white rounded-lg px-4 h-[44px] flex items-center justify-between text-[13px] font-semibold border-0 cursor-pointer"
        style="color: #0f2147;"
      >
        <span>{{ localeStore.localeLabel }}</span>
        <svg
          :class="languageOpen ? 'rotate-180' : 'rotate-0'"
          class="transition-transform duration-200 shrink-0"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="#0f2147" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        v-if="languageOpen"
        class="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-lg z-50 overflow-hidden"
        style="box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18)"
      >
        <button
          v-for="loc in locales"
          :key="loc.code"
          @click="localeStore.setLocale(loc.code); languageOpen = false"
          class="block w-full text-left px-4 py-[9px] text-[13px] font-medium border-0 cursor-pointer transition-colors"
          :class="localeStore.selectedLocale === loc.code ? 'bg-[#f0f4ff]' : 'bg-white hover:bg-[#f0f4ff]'"
          style="color: #0f2147;"
        >
          {{ loc.label }}
        </button>
      </div>
    </div>

    <p class="text-[13px] font-bold mt-4 mb-[6px]" style="font-family: var(--font-display);">{{ localeStore.t("footer.currency") }}</p>
    <div class="relative">
      <button
        @click="
          currencyOpen = !currencyOpen;
          languageOpen = false;
        "
        class="w-full bg-white rounded-lg px-4 h-[44px] flex items-center justify-between text-[13px] font-semibold border-0 cursor-pointer"
        style="color: #0f2147;"
      >
        <span>{{ currencyStore.label }}</span>
        <svg
          :class="currencyOpen ? 'rotate-180' : 'rotate-0'"
          class="transition-transform duration-200 shrink-0"
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="#0f2147" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        v-if="currencyOpen"
        class="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-lg z-50 overflow-hidden"
        style="box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18)"
      >
        <button
          v-for="opt in currencyOptions"
          :key="opt.code"
          @click="currencyStore.setCurrency(opt.code); currencyOpen = false"
          class="block w-full text-left px-4 py-[9px] text-[13px] font-medium border-0 cursor-pointer transition-colors"
          :class="currencyStore.selectedCurrency === opt.code ? 'bg-[#f0f4ff]' : 'bg-white hover:bg-[#f0f4ff]'"
          style="color: #0f2147;"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>
  </div>
</template>
