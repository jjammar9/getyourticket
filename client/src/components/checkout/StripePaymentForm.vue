<script setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  amount: { type: Number, required: true },
  currency: { type: String, default: "usd" },
});

const emit = defineEmits(["success", "error"]);

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;

const processing = ref(false);
const isDemo = ref(!STRIPE_KEY);
// Demo-only fields
const cardNumber = ref("4242 4242 4242 4242");
const cardExpiry = ref("12/28");
const cardCvc = ref("123");
const submitError = ref("");

// Stripe Elements refs
let stripe = null;
let elements = null;
const cardElementRef = ref(null);
const stripeReady = ref(false);

const processingLabel = computed(() =>
  processing.value ? "Processing..." : isDemo.value ? "Pay & Confirm (Demo)" : "Pay & Confirm"
);

onMounted(async () => {
  if (isDemo.value) return;
  try {
    const { loadStripe } = await import("@stripe/stripe-js");
    stripe = await loadStripe(STRIPE_KEY);
    stripeReady.value = true;
  } catch {
    isDemo.value = true;
  }
});

async function submit() {
  processing.value = true;
  submitError.value = "";

  try {
    const token = localStorage.getItem("token");
    const amountInDollars = props.amount;

    const res = await fetch("/api/payments/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: amountInDollars, currency: props.currency }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Payment setup failed");

    if (isDemo.value || data.demo) {
      emit("success", { paymentIntentId: `demo_${Date.now()}`, demo: true });
      return;
    }

    // Real Stripe confirmation
    const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
    if (confirmError) {
      throw new Error(confirmError.message);
    }

    emit("success", { paymentIntentId: data.clientSecret?.split("_secret_")[0], demo: false });
  } catch (e) {
    submitError.value = e.message;
    emit("error", e.message);
  } finally {
    processing.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4">
    <!-- Demo mode banner -->
    <div v-if="isDemo" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-4 py-3 text-[13px] text-yellow-800 dark:text-yellow-300">
      <strong>Demo Mode</strong> — No real payment will be processed. Card details are pre-filled for testing.
    </div>

    <!-- Stripe Elements mode -->
    <template v-if="!isDemo && stripeReady">
      <div class="p-3 border border-[#d9dee8] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700">
        <div ref="cardElementRef" id="card-element"></div>
      </div>
    </template>

    <!-- Demo card form -->
    <template v-if="isDemo">
      <div>
        <label class="text-[13px] font-medium text-gray-500 dark:text-gray-400">Card Number</label>
        <input v-model="cardNumber" readonly class="w-full mt-1 px-3 py-2.5 border border-[#d9dee8] dark:border-gray-700 rounded-lg text-[14px] text-[#0b2343] dark:text-white bg-gray-50 dark:bg-gray-700 outline-none cursor-not-allowed" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-[13px] font-medium text-gray-500 dark:text-gray-400">Expiry</label>
          <input v-model="cardExpiry" readonly class="w-full mt-1 px-3 py-2.5 border border-[#d9dee8] dark:border-gray-700 rounded-lg text-[14px] text-[#0b2343] dark:text-white bg-gray-50 dark:bg-gray-700 outline-none cursor-not-allowed" />
        </div>
        <div>
          <label class="text-[13px] font-medium text-gray-500 dark:text-gray-400">CVC</label>
          <input v-model="cardCvc" readonly class="w-full mt-1 px-3 py-2.5 border border-[#d9dee8] dark:border-gray-700 rounded-lg text-[14px] text-[#0b2343] dark:text-white bg-gray-50 dark:bg-gray-700 outline-none cursor-not-allowed" />
        </div>
      </div>
    </template>

    <div class="pt-4 border-t border-[#d9dee8] dark:border-gray-700">
      <div class="flex justify-between items-center mb-4">
        <span class="text-[16px] font-semibold text-[#0b2343] dark:text-white">Total</span>
        <span class="text-[22px] font-extrabold text-[#e53935]">${{ amount.toFixed(2) }}</span>
      </div>
      <button
        type="submit"
        :disabled="processing"
        class="w-full bg-[#ff5a1f] text-white text-[14px] font-semibold py-3 rounded-full hover:bg-[#e44a2b] transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <span v-if="processing" class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        {{ processingLabel }}
      </button>
    </div>

    <p v-if="submitError" class="text-[13px] text-red-500 text-center">{{ submitError }}</p>
  </form>
</template>
