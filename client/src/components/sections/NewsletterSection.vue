<script setup>
import { ref } from "vue";
import { Mail } from "lucide-vue-next";

const email = ref("");
const submitted = ref(false);

const submit = () => {
  if (email.value) {
    submitted.value = true;
  }
};
</script>

<template>
  <section class="py-8 mt-10">
    <div class="max-w-[1200px] mx-auto flex flex-col lg:flex-row rounded-[6px] overflow-hidden">
      <!-- LEFT: Image -->
      <div class="lg:w-1/2 h-[200px] lg:h-auto bg-cover bg-center" style="background-image: url('https://cdn.getyourguide.com/tf/assets/static/newsletter-signup/newsletter-background.jpg')">
      </div>

      <!-- RIGHT: Content -->
      <div class="lg:w-1/2 bg-[#81beff] px-8 lg:px-14 py-8 flex flex-col justify-center">
        <h3 class="text-[2.25rem] font-bold text-[#1a2b49] tracking-[-0.5px] leading-[2.75rem]" style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          Discover the wonder of travel every week
        </h3>
        <p class="text-[#1a2b49]/70 font-medium leading-[1.25rem]" style="margin-bottom: 16px; font-size: 1rem; max-width: 440px;">
          Get personalized travel inspiration, the latest travel hacks, and exclusive deals straight to your inbox.
        </p>

        <form v-if="!submitted" @submit.prevent="submit" class="mt-4 w-full">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="position: relative; flex: 1;">
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="w-full outline-none font-medium"
                style="background: white; border: 2px solid black; border-radius: 10px; font-size: inherit; line-height: inherit; font-family: inherit; padding: 14px 40px 14px 14px; color: #1a2b49; transition: border-color 0.3s; height: 48px; box-sizing: border-box;"
              />
              <div style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #1a2b49/40;">
                <Mail :size="18" />
              </div>
            </div>
            <button
              type="submit"
              class="bg-[#0071eb] hover:bg-[#005fd1] text-white font-bold rounded-xl px-6 py-3 text-[14px] transition whitespace-nowrap"
              style="height: 48px; box-sizing: border-box;"
            >
              Sign up
            </button>
          </div>
        </form>

        <p v-else class="mt-6 text-[15px] font-semibold text-white">
          You're signed up! Check your inbox for exclusive deals.
        </p>
      </div>
    </div>

    <p style="color: #1a2b49; margin-top: 8px; font-size: 0.875rem; font-weight: 400; line-height: 1.25rem; max-width: 1200px; margin-left: auto; margin-right: auto; padding-right: 1.5rem;">
      By signing up, you agree to receive promotional emails on activities and insider tips. You can unsubscribe or withdraw your consent at any time with future effect. For more information, read our <strong style="text-decoration: underline;">Privacy statement</strong>.
    </p>
  </section>
</template>
