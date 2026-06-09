<script setup>
import { ref, onMounted } from "vue";
import { User, Save, CalendarDays, Star, Wallet, Heart, X, Mail, Pencil } from "lucide-vue-next";
import Container from "../components/ui/Container.vue";
import { useAuthStore } from "../stores/authStore.js";
import { useLocaleStore } from "../stores/localeStore.js";
import { useCurrencyStore } from "../stores/currencyStore.js";
import { getUserStats } from "../api.js";

const authStore = useAuthStore();
const localeStore = useLocaleStore();
const currencyStore = useCurrencyStore();

const showEditModal = ref(false);
const editName = ref("");
const editEmail = ref("");
const editPassword = ref("");
const editPasswordConfirm = ref("");
const saving = ref(false);
const saved = ref(false);
const error = ref("");
const stats = ref(null);

onMounted(() => {
  getUserStats().then(data => stats.value = data.stats).catch(() => {});
});

function openEditModal() {
  editName.value = authStore.user?.name || "";
  editEmail.value = authStore.user?.email || "";
  editPassword.value = "";
  editPasswordConfirm.value = "";
  error.value = "";
  saved.value = false;
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
}

  async function saveProfile() {
    saving.value = true;
    error.value = "";
    try {
      if (editPassword.value && editPassword.value !== editPasswordConfirm.value) {
        throw new Error(localeStore.t("profile.passwordMismatch") || "Passwords do not match");
      }
      const data = { name: editName.value, email: editEmail.value };
      if (editPassword.value) {
        data.password = editPassword.value;
      }
      await authStore.updateProfile(data);
      saved.value = true;
      setTimeout(closeEditModal, 1200);
    } catch (e) {
      error.value = e.message || localeStore.t("profile.saveError") || "Failed to save profile";
    } finally {
      saving.value = false;
    }
  }
</script>

<template>
  <Container>
    <div class="pt-32 pb-16 max-w-2xl">
      <!-- Not logged in -->
      <div v-if="!authStore.isLoggedIn" class="text-center py-24">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <User :size="28" class="text-gray-400" />
        </div>
        <p class="text-[16px] text-gray-500">{{ localeStore.t("profile.login") }}</p>
      </div>

      <!-- Profile Content -->
      <div v-else>
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-[28px] font-bold tracking-[-0.3px] text-[#0b2343]">
            {{ localeStore.t("profile.title") }}
          </h1>
        </div>

        <!-- Profile Card -->
        <div class="bg-white rounded-2xl border border-[#e8ebf0] shadow-sm overflow-hidden">
          <!-- Profile Header Section -->
          <div class="px-8 pt-8 pb-6">
            <div class="flex items-center gap-5">
              <div class="relative">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff5a1f] to-[#ff7e4a] flex items-center justify-center text-white text-[24px] font-bold shadow-sm">
                  {{ (authStore.user?.name || "?").charAt(0).toUpperCase() }}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[20px] font-bold text-[#0b2343]">{{ authStore.user?.name }}</p>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <Mail :size="14" class="text-gray-400" />
                  <p class="text-[14px] text-[#6d788d]">{{ authStore.user?.email }}</p>
                </div>
              </div>
              <button
                @click="openEditModal"
                class="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-[#ff5a1f] border border-[#ff5a1f]/25 rounded-full hover:bg-[#ff5a1f]/5 transition-colors"
              >
                <Pencil :size="14" />
                {{ localeStore.t("profile.edit") || "Edit" }}
              </button>
            </div>
          </div>

          <!-- Stats -->
          <div v-if="stats" class="px-8 pb-6">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="rounded-xl px-4 py-3.5 border border-gray-200">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                    <CalendarDays :size="17" class="text-[#ff5a1f]" />
                  </div>
                  <div>
                    <p class="text-[20px] font-bold text-[#0b2343] leading-none">{{ stats.totalBookings }}</p>
                    <p class="text-[12px] text-gray-500 mt-0.5">{{ localeStore.t("profile.statBookings") || "Bookings" }}</p>
                  </div>
                </div>
              </div>
              <div class="rounded-xl px-4 py-3.5 border border-gray-200">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                    <Wallet :size="17" class="text-green-600" />
                  </div>
                  <div>
                    <p class="text-[20px] font-bold text-[#0b2343] leading-none">{{ currencyStore.formatPrice(stats.totalSpent) }}</p>
                    <p class="text-[12px] text-gray-500 mt-0.5">{{ localeStore.t("profile.statSpent") || "Spent" }}</p>
                  </div>
                </div>
              </div>
              <div class="rounded-xl px-4 py-3.5 border border-gray-200">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <Star :size="17" class="text-yellow-600" />
                  </div>
                  <div>
                    <p class="text-[20px] font-bold text-[#0b2343] leading-none">{{ stats.totalReviews }}</p>
                    <p class="text-[12px] text-gray-500 mt-0.5">{{ localeStore.t("profile.statReviews") || "Reviews" }}</p>
                  </div>
                </div>
              </div>
              <div class="rounded-xl px-4 py-3.5 border border-gray-200">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                    <Heart :size="17" class="text-red-500" />
                  </div>
                  <div>
                    <p class="text-[20px] font-bold text-[#0b2343] leading-none">{{ stats.wishlistItems }}</p>
                    <p class="text-[12px] text-gray-500 mt-0.5">{{ localeStore.t("profile.statSaved") || "Saved" }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" @click.self="closeEditModal">
          <div class="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm mx-4 shadow-2xl overflow-hidden">
            <div class="flex items-center justify-between px-6 pt-6 pb-4">
              <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white">{{ localeStore.t("profile.editTitle") || "Edit Profile" }}</h2>
              <button @click="closeEditModal" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <X :size="18" class="text-gray-400" />
              </button>
            </div>

            <div class="px-6 pb-2">
              <div class="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100 dark:border-gray-700">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff5a1f] to-[#ff7e4a] flex items-center justify-center text-white text-[18px] font-bold shrink-0">
                  {{ (authStore.user?.name || "?").charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="text-[15px] font-bold text-[#0b2343] dark:text-white">{{ authStore.user?.name }}</p>
                  <p class="text-[12px] text-gray-400 dark:text-gray-500">{{ localeStore.t("profile.updateDetails") || "Update your details below" }}</p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="text-[13px] font-semibold text-[#59657b] dark:text-gray-400">{{ localeStore.t("profile.fullName") || "Full Name" }}</label>
                  <input
                    v-model="editName"
                    type="text"
                    class="w-full mt-1.5 px-3.5 py-2.5 border border-[#d9dee8] dark:border-gray-600 rounded-xl text-[14px] text-[#0b2343] dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]/20 transition-colors"
                  />
                </div>
                <div>
                  <label class="text-[13px] font-semibold text-[#59657b] dark:text-gray-400">{{ localeStore.t("profile.emailAddress") || "Email Address" }}</label>
                  <input
                    v-model="editEmail"
                    type="email"
                    class="w-full mt-1.5 px-3.5 py-2.5 border border-[#d9dee8] dark:border-gray-600 rounded-xl text-[14px] text-[#0b2343] dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]/20 transition-colors"
                  />
                </div>
                <div>
                  <label class="text-[13px] font-semibold text-[#59657b] dark:text-gray-400">{{ localeStore.t("profile.newPassword") || "New Password" }}</label>
                  <input
                    v-model="editPassword"
                    type="password"
                    :placeholder="localeStore.t('profile.passwordHint') || 'Leave blank to keep current'"
                    class="w-full mt-1.5 px-3.5 py-2.5 border border-[#d9dee8] dark:border-gray-600 rounded-xl text-[14px] text-[#0b2343] dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]/20 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label class="text-[13px] font-semibold text-[#59657b] dark:text-gray-400">{{ localeStore.t("profile.repeatPassword") || "Repeat Password" }}</label>
                  <input
                    v-model="editPasswordConfirm"
                    type="password"
                    :placeholder="localeStore.t('profile.confirmPassword') || 'Confirm new password'"
                    class="w-full mt-1.5 px-3.5 py-2.5 border border-[#d9dee8] dark:border-gray-600 rounded-xl text-[14px] text-[#0b2343] dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-[#ff5a1f] focus:ring-1 focus:ring-[#ff5a1f]/20 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div v-if="saved" class="mt-4 flex items-center gap-2.5 px-4 py-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center shrink-0">
                  <Save :size="13" class="text-green-700 dark:text-green-300" />
                </div>
                <span class="text-[13px] font-semibold text-green-800 dark:text-green-300">{{ localeStore.t("profile.saved") }}</span>
              </div>
              <div v-if="error" class="mt-4 flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                <div class="w-6 h-6 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center shrink-0">
                  <span class="text-[13px] font-bold text-red-600 dark:text-red-300">!</span>
                </div>
                <span class="text-[13px] font-semibold text-red-700 dark:text-red-300">{{ error }}</span>
              </div>
            </div>

            <div class="px-6 pt-4 pb-6 flex gap-3">
              <button
                @click="closeEditModal"
                class="flex-1 text-[14px] font-semibold py-2.5 rounded-xl border border-[#d9dee8] dark:border-gray-600 text-[#59657b] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {{ localeStore.t("common.cancel") || "Cancel" }}
              </button>
              <button
                @click="saveProfile"
                :disabled="saving"
                class="flex-1 bg-[#ff5a1f] text-white text-[14px] font-semibold py-2.5 rounded-xl hover:bg-[#e44a2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                <Save :size="16" />
                {{ saving ? (localeStore.t("common.saving") || "Saving...") : (localeStore.t("profile.save") || "Save Changes") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
