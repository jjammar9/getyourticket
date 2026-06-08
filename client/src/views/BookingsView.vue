<script setup>
import { ref, computed, onMounted } from "vue";
import { Calendar, Users, XCircle, Star } from "lucide-vue-next";
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
const reviewError = ref("");
const reviewSuccess = ref(false);

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
      if (b) b.status = "cancelled";
    })
    .catch((e) => console.error("Failed to cancel booking", e))
    .finally(() => {
      cancellingId.value = null;
    });
}

function openReview(booking) {
  reviewingId.value = booking.id;
  reviewData.value = { rating: 5, text: '' };
  reviewError.value = "";
  reviewSuccess.value = false;
  showReviewModal.value = true;
}

async function submitReview() {
  if (!reviewData.value.text.trim()) {
    reviewError.value = "Please write your review";
    return;
  }
  const booking = bookings.value.find((b) => b.id === reviewingId.value);
  if (!booking || !booking.listing) return;
  reviewError.value = "";
  try {
    await authStore.createReview({
      listingId: booking.listing.id,
      rating: reviewData.value.rating,
      text: reviewData.value.text.trim(),
    });
    reviewSuccess.value = true;
    setTimeout(() => {
      showReviewModal.value = false;
      reviewSuccess.value = false;
      reviewingId.value = null;
    }, 1200);
  } catch (e) {
    reviewError.value = e.message || "Failed to submit review";
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
        <div class="text-center py-20 text-gray-500">Loading...</div>
      </template>

      <template v-else-if="bookings.length === 0">
        <div class="text-center py-20">
          <Calendar :size="48" class="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p class="text-[16px] text-gray-500 dark:text-gray-400">{{ localeStore.t("bookings.empty") }}</p>
        </div>
      </template>

      <template v-else>
        <div class="flex gap-2 mb-8 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-5 py-2 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap',
              activeTab === tab
                ? 'bg-[#ff5533] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-[#59657b] dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
          >
            {{ localeStore.t("bookings." + tab.toLowerCase()) }}
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="booking in filteredBookings"
            :key="booking.id"
            class="bg-white dark:bg-gray-800 rounded-xl border border-[#d9dee8] dark:border-gray-700 p-4 flex items-start gap-4"
          >
            <img
              loading="lazy"
              :src="booking.listing?.image"
              :alt="booking.listing?.title"
              @error="handleImageError"
              class="w-20 h-20 rounded-lg object-cover shrink-0"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <h3 class="text-[14px] font-bold text-[#0b2343] dark:text-white truncate">{{ booking.listing?.title }}</h3>
                  <p class="text-[12px] text-[#59657b] dark:text-gray-400 mt-0.5">{{ booking.listing?.location }}</p>
                </div>
                <span
                  :class="[
                    'text-[10px] font-bold px-2 py-0.5 rounded-full leading-none shrink-0 mt-0.5',
                    statusClass(booking.status)
                  ]"
                >
                  {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                </span>
              </div>
              <div class="flex items-center gap-4 mt-2 text-[12px] text-[#4f5b72] dark:text-gray-400">
                <span class="flex items-center gap-1">
                  <Calendar :size="13" />
                  {{ booking.date ? new Date(booking.date).toLocaleDateString() : "—" }}
                </span>
                <span class="flex items-center gap-1">
                  <Users :size="13" />
                  {{ booking.guests || 1 }} {{ (booking.guests || 1) === 1 ? "guest" : "guests" }}
                </span>
                <span class="text-[15px] font-bold text-[#e53935] ml-auto">{{ currencyStore.formatPrice(booking.totalPrice) }}</span>
              </div>
              <div class="flex items-center gap-2 mt-2 pt-2 border-t border-[#d9dee8] dark:border-gray-700">
                <button
                  v-if="booking.status.toLowerCase() === 'confirmed'"
                  @click="cancelBooking(booking.id)"
                  :disabled="cancellingId === booking.id"
                  class="flex items-center gap-1 text-[12px] font-semibold text-red-500 dark:text-red-400 hover:text-red-700 transition-colors disabled:opacity-50"
                >
                  <XCircle :size="14" />
                  {{ cancellingId === booking.id ? "..." : localeStore.t("bookings.cancel") }}
                </button>
                <button
                  v-if="booking.status.toLowerCase() === 'confirmed'"
                  @click="openReview(booking)"
                  class="flex items-center gap-1 text-[12px] font-semibold text-[#ff5533] hover:text-[#e6482a] transition-colors"
                >
                  <Star :size="14" />
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </Container>

  <div v-if="showReviewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" @click.self="showReviewModal = false">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
      <template v-if="reviewSuccess">
        <div class="text-center py-4">
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">✓</div>
          <p class="text-[16px] font-bold text-green-600">Review submitted!</p>
        </div>
      </template>
      <template v-else>
        <h3 class="text-[16px] font-bold text-[#0b2343] dark:text-white mb-3">Write a Review</h3>
        <div class="flex gap-1 mb-3">
          <button v-for="i in 5" :key="i" @click="reviewData.rating = i" class="text-2xl cursor-pointer transition-colors" :class="i <= reviewData.rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'">★</button>
        </div>
        <textarea v-model="reviewData.text" placeholder="Share your experience..." class="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-[13px] resize-none h-20 outline-none focus:border-[#ff5533] bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white"></textarea>
        <p v-if="reviewError" class="mt-2 text-[12px] text-red-500">{{ reviewError }}</p>
        <div class="flex gap-2 mt-4">
          <button @click="showReviewModal = false" class="flex-1 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-[13px] font-semibold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition">Cancel</button>
          <button @click="submitReview" class="flex-1 py-2 bg-[#ff5533] text-white rounded-full text-[13px] font-semibold hover:bg-[#e6482a] transition">Submit</button>
        </div>
      </template>
    </div>
  </div>
</template>
