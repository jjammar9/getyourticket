<script setup>
import { ref } from "vue";

const email = ref("");
const submitted = ref(false);

const submit = () => {
  if (email.value) {
    submitted.value = true;
  }
};
</script>

<template>
  <section class="py-16 bg-[#f2f5f9] rounded-3xl mt-10">
    <div class="text-center max-w-[560px] mx-auto px-6">
      <p class="text-[32px] font-bold text-[#0b2343] tracking-[-0.5px]" style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        Get 10% off your first booking
      </p>
      <p class="text-[16px] text-[#6d788d] mt-3 font-medium">
        Sign up for our newsletter and receive exclusive deals straight to your inbox.
      </p>

      <form v-if="!submitted" @submit.prevent="submit" class="mt-8 flex gap-3 max-w-[440px] mx-auto">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="flex-1 px-5 py-3.5 rounded-full border border-[#d9dee8] text-[15px] outline-none focus:border-[#ff5a1f] transition"
        />
        <button
          type="submit"
          class="px-7 py-3.5 rounded-full bg-[#ff5a1f] text-white text-[15px] font-bold hover:bg-[#e04e0f] transition whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>

      <p v-else class="mt-8 text-[16px] font-semibold text-[#0b2343]">
        You're signed up! Check your inbox for your discount code.
      </p>
    </div>
  </section>
</template>
