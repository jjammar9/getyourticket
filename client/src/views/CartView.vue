<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Trash2, ShoppingCart, ChevronRight } from "lucide-vue-next";
import Container from "../components/ui/Container.vue";
import StripePaymentForm from "../components/checkout/StripePaymentForm.vue";
import { useBookingStore } from "../stores/bookingStore.js";
import { useAuthStore } from "../stores/authStore.js";
import { useLocaleStore } from "../stores/localeStore.js";
import { useCurrencyStore } from "../stores/currencyStore.js";
import { handleImageError } from "../constants/placeholder.js";

const router = useRouter();
const bookingStore = useBookingStore();
const authStore = useAuthStore();
const localeStore = useLocaleStore();
const currencyStore = useCurrencyStore();

const step = ref(1);
const formName = ref("");
const formEmail = ref("");
const formDate = ref("");
const confirming = ref(false);
const confirmError = ref("");
const processing = ref(false);
const bookingRef = ref("");

const cartItems = computed(() => bookingStore.bookings);

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.guests || 1), 0);
});

function removeItem(index) {
  bookingStore.bookings.splice(index, 1);
}

function goToPayment() {
  if (!formName.value || !formEmail.value || !formDate.value) return;
  step.value = 2;
}

  async function onPaymentSuccess() {
    processing.value = true;
    confirmError.value = "";
    try {
      for (const item of cartItems.value) {
        await authStore.createBooking({
          listingId: item.id || item.listingId,
          date: formDate.value || new Date().toISOString().split("T")[0],
          guests: item.guests || 1,
          totalPrice: (Number(item.price) || 0) * (item.guests || 1),
        });
        await authStore.removeWishlistItem(item.id || item.listingId);
      }
      bookingStore.bookings.splice(0, bookingStore.bookings.length);
      bookingRef.value = "GYT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      authStore.fetchWishlistData();
      authStore.fetchBookingCount();
      step.value = 3;
    } catch (e) {
      confirmError.value = e.message || "Booking failed";
    } finally {
      processing.value = false;
    }
  }

function onPaymentError(msg) {
  confirmError.value = msg;
}
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] dark:text-white mb-8">
        {{ localeStore.t("cart.title") }}
      </h1>

      <div v-if="cartItems.length === 0 && step !== 3" class="text-center py-20">
        <ShoppingCart :size="48" class="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <p class="text-[16px] text-gray-500 dark:text-gray-400 mb-4">{{ localeStore.t("cart.empty") }}</p>
        <router-link to="/experiences" class="inline-block bg-[#ff5533] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#e6482a] transition-colors">
          {{ localeStore.t("cart.continue") }}
        </router-link>
      </div>

      <div v-else-if="step === 3" class="text-center py-20">
        <ShoppingCart :size="48" class="mx-auto text-green-500 mb-4" />
        <p class="text-[22px] font-bold text-[#0b2343] dark:text-white mb-2">{{ localeStore.t("cart.confirmed") || "Booking Confirmed!" }}</p>
        <p class="text-[14px] text-gray-500 dark:text-gray-400 mb-4">{{ localeStore.t("cart.bookingRef") || "Your booking reference" }}</p>
        <p class="text-[18px] font-extrabold text-[#ff5533] mb-8">{{ bookingRef }}</p>
        <router-link to="/bookings" class="inline-block bg-[#ff5533] text-white text-[14px] font-semibold px-6 py-3 rounded-full hover:bg-[#e6482a] transition-colors">{{ localeStore.t("cart.viewBookings") || "View my bookings" }}</router-link>
      </div>

      <div v-else>
        <div class="flex items-center justify-center gap-4 mb-10">
          <div v-for="(s, i) in [localeStore.t('cart.stepReview') || 'Review', localeStore.t('cart.stepPayment') || 'Payment', localeStore.t('cart.stepConfirmed') || 'Confirmed']" :key="i" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold" :class="step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-[#ff5533] text-white' : 'bg-gray-200 text-gray-500'">{{ step > i + 1 ? '✓' : i + 1 }}</div>
            <span class="text-[13px] font-medium" :class="step === i + 1 ? 'text-[#ff5533]' : step > i + 1 ? 'text-green-500' : 'text-gray-400'">{{ s }}</span>
            <ChevronRight v-if="i < 2" :size="16" class="text-gray-300" />
          </div>
        </div>

        <div v-if="step === 1" class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div class="lg:col-span-2 space-y-4">
            <div
              v-for="(item, index) in cartItems"
              :key="index"
              class="flex gap-4 bg-white dark:bg-gray-800 rounded-[18px] border border-[#d9dee8] dark:border-gray-700 p-4"
            >
              <img
                loading="lazy"
                :src="item.image"
                :alt="item.title"
                @error="handleImageError"
                class="w-24 h-24 object-cover rounded-xl shrink-0"
              />
              <div class="flex-1 min-w-0">
                <h3 class="text-[15px] font-extrabold text-[#0b2343] dark:text-white truncate">{{ item.title }}</h3>
                <p class="text-[18px] font-extrabold text-[#e53935] mt-1">{{ currencyStore.formatPrice(item.price) }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <div>
                    <label class="text-[12px] font-medium text-gray-500 dark:text-gray-400 block">{{ localeStore.t("cart.guests") }}</label>
                    <input
                      type="number"
                      min="1"
                      v-model="item.guests"
                      class="w-16 mt-1 px-2 py-1 border border-[#d9dee8] dark:border-gray-700 rounded-lg text-[14px] text-[#0b2343] dark:text-white bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
              <button
                @click="removeItem(index)"
                class="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                <Trash2 :size="16" class="text-[#e53935]" />
              </button>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-[18px] border border-[#d9dee8] dark:border-gray-700 p-6 h-fit">
            <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-4">{{ localeStore.t("cart.checkout") }}</h2>

            <div class="space-y-3">
              <div>
                <label class="text-[13px] font-medium text-[#59657b] dark:text-gray-400">{{ localeStore.t("cart.name") }}</label>
                <input
                  v-model="formName"
                  type="text"
                  class="w-full mt-1 px-3 py-2 border border-[#d9dee8] dark:border-gray-700 rounded-lg text-[14px] text-[#0b2343] dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-[#ff5533]"
                />
              </div>
              <div>
                <label class="text-[13px] font-medium text-[#59657b] dark:text-gray-400">{{ localeStore.t("cart.email") }}</label>
                <input
                  v-model="formEmail"
                  type="email"
                  class="w-full mt-1 px-3 py-2 border border-[#d9dee8] dark:border-gray-700 rounded-lg text-[14px] text-[#0b2343] dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-[#ff5533]"
                />
              </div>
              <div>
                <label class="text-[13px] font-medium text-[#59657b] dark:text-gray-400">{{ localeStore.t("cart.date") }}</label>
                <input
                  v-model="formDate"
                  type="date"
                  class="w-full mt-1 px-3 py-2 border border-[#d9dee8] dark:border-gray-700 rounded-lg text-[14px] text-[#0b2343] dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:border-[#ff5533]"
                />
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-[#d9dee8] dark:border-gray-700">
              <div class="flex justify-between items-center">
                <span class="text-[16px] font-semibold text-[#0b2343] dark:text-white">{{ localeStore.t("cart.total") }}</span>
                <span class="text-[22px] font-extrabold text-[#e53935]">{{ currencyStore.formatPrice(totalPrice) }}</span>
              </div>
            </div>

            <p v-if="confirmError" class="mt-3 text-[13px] text-red-500">{{ confirmError }}</p>

            <button
              @click="goToPayment"
              :disabled="!formName || !formEmail || !formDate"
              class="mt-4 w-full bg-[#ff5533] text-white text-[14px] font-semibold py-3 rounded-full hover:bg-[#e6482a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ localeStore.t("cart.continuePayment") || "Continue to Payment" }}
            </button>
          </div>
        </div>

        <div v-if="step === 2" class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-[18px] border border-[#d9dee8] dark:border-gray-700 p-6">
          <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white mb-6">{{ localeStore.t("cart.paymentDetails") || "Payment Details" }}</h2>

          <StripePaymentForm
            :amount="totalPrice"
            :currency="'usd'"
            @success="onPaymentSuccess"
            @error="onPaymentError"
          />

          <p v-if="confirmError" class="mt-3 text-[13px] text-red-500 text-center">{{ confirmError }}</p>
        </div>
      </div>
    </div>
  </Container>
</template>
