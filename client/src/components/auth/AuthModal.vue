<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "../../stores/authStore.js";
import { useLocaleStore } from "../../stores/localeStore.js";
import { Mail, Lock, User, Eye, EyeOff, X, LoaderCircle } from "lucide-vue-next";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["close"]);

const authStore = useAuthStore();
const localeStore = useLocaleStore();

const tab = ref("login");
const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const error = ref("");
const submitting = ref(false);

function reset() {
  name.value = "";
  email.value = "";
  password.value = "";
  error.value = "";
}

watch(() => props.show, (v) => { if (v) reset(); });

async function handleLogin() {
  error.value = "";
  if (!email.value || !password.value) {
    error.value = localeStore.t("auth.required");
    return;
  }
  submitting.value = true;
  try {
    await authStore.login(email.value, password.value);
    emit("close");
  } catch (e) {
    error.value = e.message;
  } finally {
    submitting.value = false;
  }
}

async function handleRegister() {
  error.value = "";
  if (!name.value || !email.value || !password.value) {
    error.value = localeStore.t("auth.required");
    return;
  }
  submitting.value = true;
  try {
    await authStore.register(name.value, email.value, password.value);
    emit("close");
  } catch (e) {
    error.value = e.message;
  } finally {
    submitting.value = false;
  }
}

function switchTab(t) {
  tab.value = t;
  error.value = "";
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-[300] flex items-center justify-center bg-black/40"
      @click.self="emit('close')"
    >
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="show"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] w-full max-w-[420px] mx-4 overflow-hidden"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 pt-6 pb-2">
            <h2 class="text-[22px] font-bold text-[#0b2343] dark:text-white">
              {{ tab === "login" ? localeStore.t("auth.login") : localeStore.t("auth.signup") }}
            </h2>
            <button
              @click="emit('close')"
              class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X :size="20" class="text-gray-500" />
            </button>
          </div>

          <!-- Tabs -->
          <div class="flex mx-6 mt-4 border-b border-gray-200 dark:border-gray-700">
            <button
              @click="switchTab('login')"
              class="pb-3 px-1 text-[14px] font-semibold transition-colors relative"
              :class="tab === 'login' ? 'text-[#ff5533]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
            >
              {{ localeStore.t("auth.login") }}
              <div
                v-if="tab === 'login'"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5533] rounded-full"
              />
            </button>
            <button
              @click="switchTab('signup')"
              class="pb-3 px-1 ml-8 text-[14px] font-semibold transition-colors relative"
              :class="tab === 'signup' ? 'text-[#ff5533]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
            >
              {{ localeStore.t("auth.signup") }}
              <div
                v-if="tab === 'signup'"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5533] rounded-full"
              />
            </button>
          </div>

          <!-- Form -->
          <div class="px-6 pt-6 pb-8">
            <form @submit.prevent="tab === 'login' ? handleLogin() : handleRegister()">
              <!-- Name field (signup only) -->
              <div v-if="tab === 'signup'" class="mb-4">
                <label class="block text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  {{ localeStore.t("auth.name") }}
                </label>
                <div class="relative">
                  <User :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    v-model="name"
                    type="text"
                    :placeholder="localeStore.t('auth.namePlaceholder')"
                    class="w-full pl-9 pr-3 py-2.5 text-[14px] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5533]/20 focus:border-[#ff5533] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="mb-4">
                <label class="block text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  {{ localeStore.t("auth.email") }}
                </label>
                <div class="relative">
                  <Mail :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    v-model="email"
                    type="email"
                    :placeholder="localeStore.t('auth.emailPlaceholder')"
                    class="w-full pl-9 pr-3 py-2.5 text-[14px] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5533]/20 focus:border-[#ff5533] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="mb-6">
                <label class="block text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  {{ localeStore.t("auth.password") }}
                </label>
                <div class="relative">
                  <Lock :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    :placeholder="localeStore.t('auth.passwordPlaceholder')"
                    class="w-full pl-9 pr-10 py-2.5 text-[14px] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5533]/20 focus:border-[#ff5533] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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

              <!-- Error -->
              <div
                v-if="error"
                class="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              >
                <p class="text-[13px] text-red-700 dark:text-red-400">{{ error }}</p>
              </div>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="submitting"
                class="w-full py-3 rounded-lg text-[14px] font-bold text-white transition-colors flex items-center justify-center gap-2"
                :class="submitting ? 'bg-[#ff5533]/70 cursor-not-allowed' : 'bg-[#ff5533] hover:bg-[#e44a2b]'"
              >
                <LoaderCircle v-if="submitting" :size="18" class="animate-spin" />
                <span>{{ tab === "login" ? localeStore.t("auth.loginButton") : localeStore.t("auth.signupButton") }}</span>
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
