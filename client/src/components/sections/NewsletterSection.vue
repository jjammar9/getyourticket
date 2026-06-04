<script setup>
import { ref } from "vue";
import { Mail } from "lucide-vue-next";

const email = ref("");
const submitted = ref(false);
const error = ref("");

const submit = () => {
  error.value = "";
  if (!email.value) {
    error.value = "Please enter your email address.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = "Please enter a valid email address.";
    return;
  }
  submitted.value = true;
  const existing = JSON.parse(localStorage.getItem("newsletter_emails") || "[]");
  existing.push({ email: email.value, subscribedAt: new Date().toISOString() });
  localStorage.setItem("newsletter_emails", JSON.stringify(existing));
};
</script>

<template>
  <section class="py-8 mt-10">
    <div class="max-w-[1200px] mx-auto flex flex-col lg:flex-row rounded-[6px] overflow-hidden">
      <div class="lg:w-1/2 h-[200px] lg:h-auto bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80')">
      </div>

      <div class="lg:w-1/2 bg-[#81beff] px-8 lg:px-14 py-8 flex flex-col justify-center">
        <h3 class="text-[2.25rem] font-bold text-[#1a2b49] tracking-[-0.5px] leading-[2.75rem]">
          Discover the wonder of travel every week
        </h3>
        <p class="text-[#1a2b49]/70 font-medium leading-5 text-[16px] max-w-[440px] mb-4">
          Get personalized travel inspiration, the latest travel hacks, and exclusive deals straight to your inbox.
        </p>

        <form v-if="!submitted" @submit.prevent="submit" class="w-full">
          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="w-full h-12 bg-white border-2 border-black rounded-xl outline-none px-4 pr-10 text-[#1a2b49] font-medium transition placeholder:text-gray-400"
              />
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <Mail :size="18" />
              </div>
            </div>
            <button
              type="submit"
              class="h-12 bg-[#0071eb] hover:bg-[#005fd1] text-white font-bold rounded-xl px-6 text-[14px] transition whitespace-nowrap"
            >
              Sign up
            </button>
          </div>
          <p v-if="error" class="mt-2 text-[13px] font-semibold text-red-700">{{ error }}</p>
        </form>

        <p v-else class="text-[15px] font-semibold text-white">
          You're signed up! Check your inbox for exclusive deals.
        </p>
      </div>
    </div>

    <p class="text-[#1a2b49] dark:text-gray-300 mt-2 text-[14px] leading-5 max-w-[1200px] mx-auto pr-6">
      By signing up, you agree to receive promotional emails on activities and insider tips. You can unsubscribe or withdraw your consent at any time with future effect. For more information, read our <strong class="underline">Privacy statement</strong>.
    </p>
  </section>
</template>
