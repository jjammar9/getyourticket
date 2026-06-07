<script setup>
import { ref, onMounted } from "vue";
import { User, Save } from "lucide-vue-next";
import Container from "../components/ui/Container.vue";
import { useAuthStore } from "../stores/authStore.js";
import { useLocaleStore } from "../stores/localeStore.js";

const authStore = useAuthStore();
const localeStore = useLocaleStore();

const formName = ref("");
const formEmail = ref("");
const formPassword = ref("");
const saving = ref(false);
const saved = ref(false);
const error = ref("");

onMounted(() => {
  if (authStore.isLoggedIn && authStore.user) {
    formName.value = authStore.user.name || "";
    formEmail.value = authStore.user.email || "";
  }
});

async function saveProfile() {
  saving.value = true;
  saved.value = false;
  error.value = "";
  try {
    const data = { name: formName.value, email: formEmail.value };
    if (formPassword.value) {
      data.password = formPassword.value;
    }
    await authStore.updateProfile(data);
    saved.value = true;
    formPassword.value = "";
  } catch (e) {
    error.value = e.message || "Failed to save profile";
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <Container>
    <div class="pt-32 pb-12 max-w-lg mx-auto">
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-8">
        {{ localeStore.t("profile.title") }}
      </h1>

      <div v-if="!authStore.isLoggedIn" class="text-center py-20">
        <p class="text-[16px] text-gray-500">{{ localeStore.t("profile.login") }}</p>
      </div>

      <div v-else class="bg-white rounded-[18px] border border-[#d9dee8] p-8">
        <div class="flex items-center gap-3 mb-6 pb-4 border-b border-[#d9dee8]">
          <div class="w-12 h-12 rounded-full bg-[#ff5533] flex items-center justify-center">
            <User :size="22" class="text-white" />
          </div>
          <div>
            <p class="text-[16px] font-bold text-[#0b2343]">{{ authStore.user?.name }}</p>
            <p class="text-[13px] text-[#59657b]">{{ authStore.user?.email }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-[13px] font-medium text-[#59657b]">{{ localeStore.t("auth.name") }}</label>
            <input
              v-model="formName"
              type="text"
              class="w-full mt-1 px-3 py-2 border border-[#d9dee8] rounded-lg text-[14px] text-[#0b2343] focus:outline-none focus:border-[#ff5533]"
            />
          </div>
          <div>
            <label class="text-[13px] font-medium text-[#59657b]">{{ localeStore.t("auth.email") }}</label>
            <input
              v-model="formEmail"
              type="email"
              class="w-full mt-1 px-3 py-2 border border-[#d9dee8] rounded-lg text-[14px] text-[#0b2343] focus:outline-none focus:border-[#ff5533]"
            />
          </div>
          <div>
            <label class="text-[13px] font-medium text-[#59657b]">{{ localeStore.t("auth.password") }}</label>
            <input
              v-model="formPassword"
              type="password"
              :placeholder="localeStore.t('profile.passwordHint')"
              class="w-full mt-1 px-3 py-2 border border-[#d9dee8] rounded-lg text-[14px] text-[#0b2343] focus:outline-none focus:border-[#ff5533]"
            />
          </div>
        </div>

        <p v-if="saved" class="mt-4 text-[13px] text-green-600 flex items-center gap-1">
          <Save :size="14" /> {{ localeStore.t("profile.saved") }}
        </p>
        <p v-if="error" class="mt-4 text-[13px] text-red-500">{{ error }}</p>

        <button
          @click="saveProfile"
          :disabled="saving"
          class="mt-6 w-full bg-[#ff5533] text-white text-[14px] font-semibold py-3 rounded-full hover:bg-[#e6482a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save :size="16" />
          {{ saving ? "Saving..." : localeStore.t("profile.save") }}
        </button>
      </div>
    </div>
  </Container>
</template>
