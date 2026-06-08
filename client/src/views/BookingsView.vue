<script setup>
import { ref, computed, onMounted } from "vue";
import { Calendar, Users, XCircle, Star, MessageSquare } from "lucide-vue-next";
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
const reviewingId = ref(null);
const showReviewModal = ref(false);
const reviewData = ref({ rating: 5, text: '' });

const tabs = ["All", "confirmed", "cancelled"];

const filteredBookings = computed(() => {
  if (activeTab.value === "All") return bookings.value;
  return bookings.value.filter((b) => b.status.toLowerCase() === activeTab.value);
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

function openReview(booking) {
  reviewingId.value = booking.id;
  reviewData.value = { rating: 5, text: '' };
  showReviewModal.value = true;
}

async function submitReview() {
  const booking = bookings.value.find((b) => b.id === reviewingId.value);
  if (!booking) return;
  try {
    await authStore.createReview({
      listingId: booking.listing.id,
      rating: reviewData.value.rating,
      text: reviewData.value.text,
    });
    reviewData.value = { rating: 5, text: '' };
    showReviewModal.value = false;
    reviewingId.value = null;
  } catch (e) {
    console.error("Failed to submit review", e);
  }
}

function statusClass(status) {
  if (status.toLowerCase() === "confirmed") return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
  if (status.toLowerCase() === "cancelled") return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300";
  return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
}
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] dark:text-white mb-8">
        {{ localeStore.t("bookings.title") }}
      </h1>

      <div v-if="!authStore.isLoggedIn" class="text-center py-20">
        <p class="text-[16px] text-gray-500 dark:text-gray-400">{{ localeStore.t("bookings.login") }}</p>
      </div>

      <template v-else-if="loading">
        <div class="text-center py-20">
          <p class="text-[16px] text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </template>

      <template v-else-if="bookings.length === 0">
        <div class="text-center py-20">
          <Calendar :size="48" class="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p class="text-[16px] text-gray-500 dark:text-gray-400">{{ localeStore.t("bookings.empty") }}</p>
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
                : 'bg-gray-100 dark:bg-gray-800 text-[#59657b] dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
          >
            {{ localeStore.t("bookings." + tab.toLowerCase()) }}
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="booking in filteredBookings"
            :key="booking.id"
            class="bg-white dark:bg-gray-800 rounded-[18px] border border-[#d9dee8] dark:border-gray-700 overflow-hidden flex flex-col sm:flex-row"
          >
            <img
              loading="lazy"
              :src="booking.listing.image"
              :alt="booking.listing.title"
              @error="handleImageError"
              class="w-full sm:w-48 h-40 sm:h-auto object-cover shrink-0"
            />
            <div class="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-4">
                  <h3 class="text-[16px] font-extrabold text-[#0b2343] dark:text-white">{{ booking.listing.title }}</h3>
                  <span
                    :class="[
                      'text-[11px] font-extrabold px-3 py-1 rounded-full leading-none shrink-0 mt-0.5',
                      statusClass(booking.status)
                    ]"
                  >
                    {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                  </span>
                </div>
                <p class="text-[13px] text-[#59657b] dark:text-gray-400 font-medium mt-1">{{ booking.listing.location }}</p>
                <div class="flex items-center gap-4 mt-3 text-[13px] text-[#4f5b72] dark:text-gray-400">
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
              <div class="flex items-center justify-between mt-4 pt-3 border-t border-[#d9dee8] dark:border-gray-700">
                <span class="text-[20px] font-extrabold text-[#e53935]">{{ currencyStore.formatPrice(booking.totalPrice) }}</span>
                <div class="flex items-center gap-2">
                  <button
                    v-if="booking.status.toLowerCase() === 'confirmed'"
                    @click="cancelBooking(booking.id)"
                    :disabled="cancellingId === booking.id"
                    class="flex items-center gap-1 text-[13px] font-semibold text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                  >
                    <XCircle :size="16" />
                    {{ cancellingId === booking.id ? "..." : localeStore.t("bookings.cancel") }}
                  </button>
                  <button
                    v-if="booking.status.toLowerCase() === 'confirmed'"
                    @click="openReview(booking)"
                    class="flex items-center gap-1 text-[13px] font-semibold text-[#ff5533] hover:text-[#e6482a] transition-colors"
                  >
                    <Star :size="16" />
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </Container>

  <div v-if="showReviewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showReviewModal = false">
    <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
      <h3 class="text-[18px] font-bold text-[#0b2343] mb-4">Write a Review</h3>
      <div class="flex gap-1 mb-4">
        <button v-for="i in 5" :key="i" @click="reviewData.rating = i" class="text-2xl cursor-pointer" :class="i <= reviewData.rating ? 'text-yellow-400' : 'text-gray-200'">★</button>
      </div>
      <textarea v-model="reviewData.text" placeholder="Share your experience..." class="w-full border border-gray-200 rounded-xl p-3 text-[14px] resize-none h-24 outline-none focus:border-[#ff5533]"></textarea>
      <div class="flex gap-3 mt-4">
        <button @click="showReviewModal = false" class="flex-1 py-2.5 border border-gray-200 rounded-full text-[14px] font-semibold text-gray-500 hover:bg-gray-50 transition">Cancel</button>
        <button @click="submitReview" class="flex-1 py-2.5 bg-[#ff5533] text-white rounded-full text-[14px] font-semibold hover:bg-[#e6482a] transition">Submit</button>
      </div>
    </div>
  </div>
</template>
