<script setup>
import { ref } from "vue";

const languages = [
  "English (United Kingdom)",
  "English (United States)",
  "Deutsch",
  "Français",
  "Español",
];

const currencies = [
  "Euro (€)",
  "US Dollar ($)",
  "British Pound (£)",
  "Swiss Franc (CHF)",
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
  <footer class="bg-[#162d5e] text-white">
    <div class="max-w-[1400px] mx-auto px-14 pt-8 pb-5">
      <!-- TOP -->
      <div class="flex items-start gap-14">
        <!-- LEFT -->
        <div class="w-[310px] shrink-0">
          <!-- LANGUAGE -->
          <p class="text-[14px] font-extrabold mb-2">Language</p>

          <div class="relative">
            <button
              @click="
                languageOpen = !languageOpen;
                currencyOpen = false;
              "
              class="w-full h-12 bg-white text-[#162d5e] rounded-[10px] px-4 flex items-center justify-between text-[14px] font-semibold"
            >
              <span>{{ selectedLanguage }}</span>

              <svg
                class="transition-transform duration-200"
                :class="languageOpen ? 'rotate-180' : ''"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#162d5e"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              v-if="languageOpen"
              class="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-[10px] shadow-2xl overflow-hidden z-50"
            >
              <button
                v-for="lang in languages"
                :key="lang"
                @click="selectLanguage(lang)"
                class="w-full text-left px-4 py-2.5 text-[13px] text-[#162d5e] font-semibold hover:bg-gray-100"
              >
                {{ lang }}
              </button>
            </div>
          </div>

          <!-- CURRENCY -->
          <p class="text-[14px] font-extrabold mt-4 mb-2">Currency</p>

          <div class="relative">
            <button
              @click="
                currencyOpen = !currencyOpen;
                languageOpen = false;
              "
              class="w-full h-12 bg-white text-[#162d5e] rounded-[10px] px-4 flex items-center justify-between text-[14px] font-semibold"
            >
              <span>{{ selectedCurrency }}</span>

              <svg
                class="transition-transform duration-200"
                :class="currencyOpen ? 'rotate-180' : ''"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#162d5e"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              v-if="currencyOpen"
              class="absolute top-[calc(100%+4px)] left-0 right-0 bg-white rounded-[10px] shadow-2xl overflow-hidden z-50"
            >
              <button
                v-for="curr in currencies"
                :key="curr"
                @click="selectCurrency(curr)"
                class="w-full text-left px-4 py-2.5 text-[13px] text-[#162d5e] font-semibold hover:bg-gray-100"
              >
                {{ curr }}
              </button>
            </div>
          </div>
        </div>

        <!-- MOBILE -->
        <div class="w-[170px]">
          <p class="text-[14px] font-extrabold mb-[10px]">Mobile</p>

          <div class="flex flex-col gap-[10px]">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              class="h-[54px] w-[150px] object-contain"
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              class="h-[44px] w-[150px] object-contain"
            />
          </div>
        </div>

        <!-- SUPPORT -->
        <div class="min-w-[280px]">
          <p class="text-[14px] font-extrabold mb-3">Support</p>

          <div class="flex flex-col gap-[10px]">
            <a href="#" class="text-[13px] font-semibold underline">
              Contact
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              Legal Notice
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              Privacy Policy
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              Cookies and Marketing Preferences
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              General Terms and Conditions
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              Information according to the Digital Services Act
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              Sitemap
            </a>
          </div>
        </div>

        <!-- COMPANY -->
        <div class="min-w-[120px]">
          <p class="text-[14px] font-extrabold mb-3">Company</p>

          <div class="flex flex-col gap-[10px]">
            <a href="#" class="text-[13px] font-semibold underline">
              About Us
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              Careers
            </a>

            <a href="#" class="text-[13px] font-semibold underline"> Blog </a>

            <a href="#" class="text-[13px] font-semibold underline"> Press </a>

            <a href="#" class="text-[13px] font-semibold underline">
              Gift Cards
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              Explorer
            </a>
          </div>
        </div>

        <!-- RIGHT -->
        <div>
          <p class="text-[14px] font-extrabold mb-3">Work With Us</p>

          <div class="flex flex-col gap-[10px]">
            <a href="#" class="text-[13px] font-semibold underline">
              As a Supply Partner
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              As a Content Creator
            </a>

            <a href="#" class="text-[13px] font-semibold underline">
              As an Affiliate Partner
            </a>
          </div>

          <!-- PAYMENTS -->
          <p class="text-[14px] font-extrabold mt-5 mb-2">Ways You Can Pay</p>

          <div class="grid grid-cols-4 gap-1">
            <div
              class="bg-white rounded h-[26px] flex items-center justify-center p-[3px]"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                class="h-3"
              />
            </div>

            <div
              class="bg-white rounded h-[26px] flex items-center justify-center p-[2px]"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                class="h-[18px]"
              />
            </div>

            <div
              class="bg-white rounded h-[26px] flex items-center justify-center"
            >
              <span class="text-[#1a1f71] text-[11px] font-black"> VISA </span>
            </div>

            <div
              class="bg-white rounded h-[26px] flex items-center justify-center p-[3px]"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Maestro_logo.svg"
                class="h-[18px]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM -->
      <div class="flex items-center justify-between mt-[34px]">
        <!-- COPYRIGHT -->
        <p class="text-[12px] text-white/80 font-semibold">
          © 2008 – 2026 GetYourGuide. Made in Zurich & Berlin.
        </p>

        <!-- SOCIALS -->
        <div
          class="flex items-center justify-center gap-[22px] min-w-[220px] -mr-2"
        >
          <!-- FACEBOOK -->
          <a
            href="#"
            class="flex items-center justify-center w-[18px] h-[18px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path
                d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              />
            </svg>
          </a>

          <!-- INSTAGRAM -->
          <a
            href="#"
            class="flex items-center justify-center w-[18px] h-[18px]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          <!-- X -->
          <a
            href="#"
            class="flex items-center justify-center w-[18px] h-[18px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"
              />
            </svg>
          </a>

          <!-- PINTEREST -->
          <a
            href="#"
            class="flex items-center justify-center w-[18px] h-[18px] text-[16px] font-extrabold"
          >
            P
          </a>

          <!-- LINKEDIN -->
          <a
            href="#"
            class="flex items-center justify-center w-[18px] h-[18px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5a6 6 0 0 1 2-1.5z"
              />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
