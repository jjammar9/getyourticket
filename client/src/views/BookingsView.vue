<script setup>
import { ref, computed, onMounted } from "vue";
import { Calendar, Users, XCircle } from "lucide-vue-next";
import Container from "../components/ui/Container.vue";
import { useAuthStore } from "../stores/authStore.js";
import { useLocaleStore } from "../stores/localeStore.js";
import { useCurrencyStore } from "../stores/currencyStore.js";
import { handleImageError } from "../constants/placeholder.js";

const authStore = useAuthStore();
const localeStore = useLocaleStore();
const currencyStore = useCurrencyStore();

const bookings = ref([]);
const loading = ref(true);
const activeTab = ref("All");
const cancellingId = ref(null);

const tabs = ["All", "Confirmed", "Cancelled"];

const filteredBookings = computed(() => {
  if (activeTab.value === "All") return bookings.value;
  return bookings.value.filter((b) => b.status === activeTab.value);
});

onMounted(async () => {
  if (!authStore.isLoggedIn) {
    loading.value = false;
    return;
  }
  try {
    const data = await authStore.getBookings();
    bookings.value = data.bookings || [];
  } catch (e) {
    console.error("Failed to load bookings", e);
  } finally {
    loading.value = false;
  }
});

function cancelBooking(id) {
  if (!confirm(localeStore.t("bookings.cancelConfirm"))) return;
  cancellingId.value = id;
  authStore
    .cancelBooking(id)
    .then(() => {
      const b = bookings.value.find((item) => item.id === id);
      if (b) b.status = "Cancelled";
    })
    .catch((e) => console.error("Failed to cancel booking", e))
    .finally(() => {
      cancellingId.value = null;
    });
}

function statusClass(status) {
  if (status === "Confirmed") return "bg-green-100 text-green-700";
  if (status === "Cancelled") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
}
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] mb-8">
        {{ localeStore.t("bookings.title") }}
      </h1>

      <div v-if="!authStore.isLoggedIn" class="text-center py-20">
        <p class="text-[16px] text-gray-500">{{ localeStore.t("bookings.login") }}</p>
      </div>

      <template v-else-if="loading">
        <div class="text-center py-20">
          <p class="text-[16px] text-gray-500">Loading...</p>
        </div>
      </template>

      <template v-else-if="bookings.length === 0">
        <div class="text-center py-20">
          <Calendar :size="48" class="mx-auto text-gray-300 mb-4" />
          <p class="text-[16px] text-gray-500">{{ localeStore.t("bookings.empty") }}</p>
        </div>
      </template>

      <template v-else>
        <div class="flex gap-2 mb-8">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-5 py-2 rounded-full text-[13px] font-semibold transition-colors',
              activeTab === tab
                ? 'bg-[#ff5533] text-white'
                : 'bg-gray-100 text-[#59657b] hover:bg-gray-200'
            ]"
          >
            {{ localeStore.t("bookings." + tab.toLowerCase()) }}
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="booking in filteredBookings"
            :key="booking.id"
            class="bg-white rounded-[18px] border border-[#d9dee8] overflow-hidden flex flex-col sm:flex-row"
          >
            <img
              :src="booking.listing.image"
              :alt="booking.listing.title"
              @error="handleImageError"
              class="w-full sm:w-48 h-40 sm:h-auto object-cover shrink-0"
            />
            <div class="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-[16px] font-extrabold text-[#0b2343]">{{ booking.listing.title }}</h3>
                  <span
                    :class="[
                      'text-[11px] font-extrabold px-3 py-1 rounded-full leading-none shrink-0 mt-0.5',
                      statusClass(booking.status)
                    ]"
                  >
                    {{ booking.status }}
                  </span>
                </div>
                <p class="text-[13px] text-[#59657b] font-medium mt-1">{{ booking.listing.location }}</p>
                <div class="flex items-center gap-4 mt-3 text-[13px] text-[#4f5b72]">
                  <span class="flex items-center gap-1">
                    <Calendar :size="14" />
                    {{ booking.date ? new Date(booking.date).toLocaleDateString() : "—" }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Users :size="14" />
                    {{ booking.guests }} {{ booking.guests === 1 ? "guest" : "guests" }}
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-between mt-4 pt-3 border-t border-[#d9dee8]">
                <span class="text-[20px] font-extrabold text-[#e53935]">{{ currencyStore.formatPrice(booking.totalPrice) }}</span>
                <button
                  v-if="booking.status === 'Confirmed'"
                  @click="cancelBooking(booking.id)"
                  :disabled="cancellingId === booking.id"
                  class="flex items-center gap-1 text-[13px] font-semibold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  <XCircle :size="16" />
                  {{ cancellingId === booking.id ? "..." : localeStore.t("bookings.cancel") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </Container>
</template>
