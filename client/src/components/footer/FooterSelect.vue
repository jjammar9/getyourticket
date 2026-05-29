<script setup>
import { ref } from "vue";

const languages = [
  "English (United Kingdom)",
  "English (United States)",
  "Deutsch",
  "Français",
  "Español",
  "Italiano",
  "Nederlands",
  "Polski",
  "Português",
];

const currencies = [
  "Euro (€)",
  "US Dollar ($)",
  "British Pound (£)",
  "Swiss Franc (CHF)",
  "Japanese Yen (¥)",
  "Australian Dollar (A$)",
  "Canadian Dollar (CA$)",
];

const selectedLanguage = ref("English (United Kingdom)");
const selectedCurrency = ref("Euro (€)");
const languageOpen = ref(false);
const currencyOpen = ref(false);

function selectLanguage(lang) {
  selectedLanguage.value = lang;
  languageOpen.value = false;
}
function selectCurrency(curr) {
  selectedCurrency.value = curr;
  currencyOpen.value = false;
}
</script>

<template>
  <div class="shrink-0" style="width: 280px">
    <p class="text-[13px] font-bold mb-[6px]">Language</p>
    <div class="relative">
      <button
        @click="
          languageOpen = !languageOpen;
          currencyOpen = false;
        "
        class="w-full bg-white rounded-lg px-4 h-[44px] flex items-center justify-between text-[13px] font-semibold border-0 cursor-pointer"
        style="
          color: #0f2147;
          font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
        "
      >
        <span>{{ selectedLanguage }}</span>
        <svg
          :class="languageOpen ? 'rotate-180' : 'rotate-0'"
          class="transition-transform duration-200 shrink-0"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0f2147"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
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
          v-for="lang in languages"
          :key="lang"
          @click="selectLanguage(lang)"
          class="block w-full text-left px-4 py-[9px] text-[13px] font-medium border-0 cursor-pointer transition-colors"
          :class="
            selectedLanguage === lang
              ? 'bg-[#f0f4ff]'
              : 'bg-white hover:bg-[#f0f4ff]'
          "
          style="
            color: #0f2147;
            font-family:
              &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
          "
        >
          {{ lang }}
        </button>
      </div>
    </div>

    <p class="text-[13px] font-bold mt-4 mb-[6px]">Currency</p>
    <div class="relative">
      <button
        @click="
          currencyOpen = !currencyOpen;
          languageOpen = false;
        "
        class="w-full bg-white rounded-lg px-4 h-[44px] flex items-center justify-between text-[13px] font-semibold border-0 cursor-pointer"
        style="
          color: #0f2147;
          font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
        "
      >
        <span>{{ selectedCurrency }}</span>
        <svg
          :class="currencyOpen ? 'rotate-180' : 'rotate-0'"
          class="transition-transform duration-200 shrink-0"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0f2147"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
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
          v-for="curr in currencies"
          :key="curr"
          @click="selectCurrency(curr)"
          class="block w-full text-left px-4 py-[9px] text-[13px] font-medium border-0 cursor-pointer transition-colors"
          :class="
            selectedCurrency === curr
              ? 'bg-[#f0f4ff]'
              : 'bg-white hover:bg-[#f0f4ff]'
          "
          style="
            color: #0f2147;
            font-family:
              &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
          "
        >
          {{ curr }}
        </button>
      </div>
    </div>
  </div>
</template>
