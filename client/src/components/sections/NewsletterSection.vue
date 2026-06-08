<script setup>
import { ref } from "vue";
import { Mail } from "lucide-vue-next";
import { useLocaleStore } from "../../stores/localeStore.js";

const localeStore = useLocaleStore();
const email = ref("");
const submitted = ref(false);
const error = ref("");

const submit = async () => {
  error.value = "";
  if (!email.value) {
    error.value = localeStore.t("newsletter.errorEmpty");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = localeStore.t("newsletter.errorInvalid");
    return;
  }
  try {
      const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });
    if (!res.ok) {
      const data = await res.json();
      error.value = data.message || "Subscription failed";
      return;
    }
    submitted.value = true;
  } catch (e) {
    error.value = "Network error. Please try again.";
  }
};
</script>

<template>
  <section class="py-8 mt-10">
    <div class="max-w-[1200px] mx-auto flex flex-col lg:flex-row rounded-[6px] overflow-hidden">
      <div class="lg:w-1/2 h-[200px] lg:h-auto bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80')">
      </div>

      <div class="lg:w-1/2 bg-[#81beff] px-8 lg:px-14 py-8 flex flex-col justify-center">
        <h3 class="text-[2.25rem] font-bold text-[#1a2b49] tracking-[-0.5px] leading-[2.75rem]">
          {{ localeStore.t("newsletter.title") }}
        </h3>
        <p class="text-[#1a2b49]/70 font-medium leading-5 text-[16px] max-w-[440px] mb-4">
          {{ localeStore.t("newsletter.subtitle") }}
        </p>

        <form v-if="!submitted" @submit.prevent="submit" class="w-full">
          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <input
                v-model="email"
                type="email"
                :placeholder="localeStore.t('newsletter.email')"
                class="w-full h-12 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 rounded-xl outline-none px-4 pr-10 text-[#1a2b49] dark:text-gray-100 font-medium transition placeholder:text-gray-400"
              />
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <Mail :size="18" />
              </div>
            </div>
            <button
              type="submit"
              class="h-12 bg-[#0071eb] hover:bg-[#005fd1] text-white font-bold rounded-xl px-6 text-[14px] transition whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {{ localeStore.t("newsletter.signup") }}
            </button>
          </div>
          <p v-if="error" class="mt-2 text-[13px] font-semibold text-red-700">{{ error }}</p>
        </form>

        <p v-else class="text-[15px] font-semibold text-white">
          {{ localeStore.t("newsletter.success") }}
        </p>
      </div>
    </div>

    <p class="text-[#1a2b49] dark:text-gray-300 mt-2 text-[14px] leading-5 max-w-[1200px] mx-auto pr-6">
      {{ localeStore.t("newsletter.privacy") }} <strong class="underline">{{ localeStore.t("newsletter.privacyLink") }}</strong>.
    </p>
  </section>
</template>
