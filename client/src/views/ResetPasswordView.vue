<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Lock, Eye, EyeOff, LoaderCircle, CheckCircle } from "lucide-vue-next";
import Container from "../components/ui/Container.vue";

const route = useRoute();
const router = useRouter();
const token = ref("");
const password = ref("");
const passwordConfirm = ref("");
const showPassword = ref(false);
const submitting = ref(false);
const submitted = ref(false);
const error = ref("");

onMounted(() => {
  token.value = route.query.token || "";
  if (!token.value) {
    error.value = "Invalid or missing reset token.";
  }
});

async function handleReset() {
  error.value = "";
  if (!password.value) {
    error.value = "Please enter a new password";
    return;
  }
  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters";
    return;
  }
  if (password.value !== passwordConfirm.value) {
    error.value = "Passwords do not match";
    return;
  }
  submitting.value = true;
  try {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token.value, password: password.value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    submitted.value = true;
  } catch (e) {
    error.value = e.message;
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <Container>
    <div class="pt-32 pb-16 max-w-sm mx-auto">
      <div v-if="submitted" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <CheckCircle :size="48" class="mx-auto text-green-500 mb-4" />
        <h1 class="text-[22px] font-bold text-[#0b2343] dark:text-white mb-2">Password Reset</h1>
        <p class="text-[14px] text-gray-500 dark:text-gray-400 mb-6">Your password has been reset successfully.</p>
        <button
          @click="router.push('/')"
          class="bg-[#ff5a1f] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#e44a2b] transition-colors"
        >
          Go to Home
        </button>
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
        <h1 class="text-[22px] font-bold text-[#0b2343] dark:text-white mb-2">Reset Password</h1>
        <p class="text-[13px] text-gray-500 dark:text-gray-400 mb-6">Enter your new password below.</p>

        <form @submit.prevent="handleReset" class="space-y-4">
          <div>
            <label class="block text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">New Password</label>
            <div class="relative">
              <Lock :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Min. 6 characters"
                class="w-full pl-9 pr-10 py-2.5 text-[14px] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]/20 focus:border-[#ff5a1f] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <component :is="showPassword ? EyeOff : Eye" :size="16" />
              </button>
            </div>
          </div>
          <div>
            <label class="block text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">Confirm Password</label>
            <div class="relative">
              <Lock :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                v-model="passwordConfirm"
                type="password"
                placeholder="Repeat password"
                class="w-full pl-9 pr-3 py-2.5 text-[14px] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5a1f]/20 focus:border-[#ff5a1f] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div v-if="error" class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p class="text-[13px] text-red-700 dark:text-red-400">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="submitting || !token"
            class="w-full py-3 rounded-lg text-[14px] font-bold text-white transition-colors flex items-center justify-center gap-2"
            :class="submitting || !token ? 'bg-[#ff5a1f]/70 cursor-not-allowed' : 'bg-[#ff5a1f] hover:bg-[#e44a2b]'"
          >
            <LoaderCircle v-if="submitting" :size="18" class="animate-spin" />
            <span>{{ submitting ? "Resetting..." : "Reset Password" }}</span>
          </button>
        </form>
      </div>
    </div>
  </Container>
</template>
