<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Container from "../components/ui/Container.vue";
import { ChevronDown, Search, MessageCircle, Mail, Phone, ExternalLink } from "lucide-vue-next";


const faqs = ref([
  {
    q: "How do I cancel or reschedule a booking?",
    a: "You can cancel or reschedule directly from your booking details page. Go to Profile \u2192 My Bookings, find your reservation, and select 'Cancel' or 'Modify'. Most tours offer free cancellation up to 24 hours before the start time.",
    open: false,
  },
  {
    q: "How do I get a refund?",
    a: "Refunds are processed automatically when you cancel within the free cancellation window. Depending on your payment method, it may take 5\u201310 business days to appear in your account. If you believe you're entitled to a refund outside the policy, contact our support team.",
    open: false,
  },
  {
    q: "Can I change the date or time of my booking?",
    a: "Date and time changes depend on the tour operator's policy. You can request a change from your booking page \u2014 if the operator allows it, you'll be able to pick a new slot instantly. Otherwise, you may need to cancel and rebook.",
    open: false,
  },
  {
    q: "How do I contact my tour operator?",
    a: "Your booking confirmation email includes the operator's contact details and meeting point instructions. You can also find them in the 'Tour Provider' section on your booking page in your profile.",
    open: false,
  },
  {
    q: "What happens if my tour is cancelled by the operator?",
    a: "If the operator cancels, you'll receive a full refund automatically. In some cases, we'll offer you a similar alternative. You'll be notified via email and can also check your booking status in your profile.",
    open: false,
  },
  {
    q: "Do I need travel insurance?",
    a: "Travel insurance is highly recommended but not required to book. It covers cancellations, medical emergencies, lost luggage, and other unforeseen events. Check with your provider to ensure your policy covers the activities you've booked.",
    open: false,
  },
  {
    q: "What documents do I need to travel internationally?",
    a: "A valid passport is required for international travel. Some destinations also require a visa \u2014 check entry requirements well in advance. Make sure your passport has at least 6 months validity from your return date.",
    open: false,
  },
  {
    q: "How early should I arrive for a tour or activity?",
    a: "We recommend arriving 15\u201330 minutes before the scheduled start time. Some tours with strict entry times (like the Colosseum or Eiffel Tower) may not allow late arrivals. Check your booking confirmation for specific instructions.",
    open: false,
  },
  {
    q: "Are children allowed on tours? Do they get a discount?",
    a: "Most tours allow children, and many offer discounted rates for kids under a certain age. Infant pricing is sometimes available for children under 2. Check the tour details on the booking page for age policies and pricing.",
    open: false,
  },
  {
    q: "What should I bring on a day tour or excursion?",
    a: "Comfortable walking shoes, weather-appropriate clothing, sunscreen, a refillable water bottle, and your camera are good basics. Some tours may have specific requirements \u2014 check the 'What to bring' section in your booking.",
    open: false,
  },
  {
    q: "Can I book for a large group?",
    a: "Yes, many tours offer group pricing. For parties larger than 10 people, you may need to contact the tour operator directly for availability and custom pricing. Look for 'private tour' options on the activity page.",
    open: false,
  },
  {
    q: "How do I find my meeting point?",
    a: "The meeting point is listed on your booking confirmation and on the booking page in your profile. Many tours include a map link. If you can't find the spot, contact the operator directly using the details provided.",
    open: false,
  },
  {
    q: "What happens if I miss my tour?",
    a: "If you miss the departure, the tour is generally considered a no-show and refunds are not available. Contact support as soon as possible \u2014 in some cases the operator may be able to move you to a later time if available.",
    open: false,
  },
  {
    q: "Are accessibility accommodations available?",
    a: "Accessibility varies by tour. Many popular attractions offer wheelchair access and special assistance. Check the 'Accessibility' section on the tour page before booking, or contact the operator to confirm your needs.",
    open: false,
  },
  {
    q: "Can I get a voucher as a gift?",
    a: "Yes, you can purchase gift vouchers for many tours and activities. After purchase, you'll receive a voucher code that can be redeemed by the recipient when booking. Gift vouchers are typically valid for 12 months.",
    open: false,
  },
]);

const router = useRouter();
const searchQuery = ref("");
const showHelpSuggestions = ref(false);

const helpSuggestions = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q || q.length < 2) return [];
  const results = [];
  for (const faq of faqs.value) {
    if (faq.q.toLowerCase().includes(q) && !results.includes(faq.q)) {
      results.push({ text: faq.q, type: "FAQ" });
    }
  }
  return results.slice(0, 6);
});

const filteredFaqs = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return faqs.value;
  return faqs.value.filter(
    (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
  );
});

function toggleFaq(idx) {
  faqs.value[idx].open = !faqs.value[idx].open;
}
</script>

<template>
  <div class="pt-28 pb-16">
    <!-- Hero -->
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-2xl mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-blue-300 mb-2 flex-wrap">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span class="text-blue-400/50">›</span>
            <span class="text-white font-semibold">Support</span>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">How can we help?</h1>
          <p class="text-blue-200 mt-2 text-[16px]">Search our help centre or browse the FAQs below.</p>

          <div class="mt-8 relative">
            <div class="flex items-center bg-white rounded-full overflow-hidden">
              <div class="pl-5 pr-2 text-gray-400">
                <Search :size="18" />
              </div>
              <input
                v-model="searchQuery"
                @focus="showHelpSuggestions = true"
                @blur="setTimeout(() => showHelpSuggestions = false, 200)"
                @input="showHelpSuggestions = true"
                type="text"
                placeholder="Search help articles..."
                class="flex-1 px-3 py-3.5 outline-none text-[14px] text-gray-800 placeholder:text-gray-400"
              />
            </div>
            <div
              v-if="showHelpSuggestions && helpSuggestions.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
            >
              <div
                v-for="s in helpSuggestions"
                :key="s.text"
                @mousedown.prevent="searchQuery = s.text; showHelpSuggestions = false"
                class="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <div>
                  <span class="text-[13px] text-gray-700 dark:text-gray-200">{{ s.text }}</span>
                  <span class="text-[11px] text-gray-400 ml-2">\u2014 {{ s.type }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>

    <Container>
      <!-- Contact options -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-8 relative z-10 mb-14">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto">
            <MessageCircle :size="24" class="text-[#0a6cff]" />
          </div>
          <h3 class="mt-4 text-[16px] font-bold text-[#0b2343] dark:text-white">Live chat</h3>
          <p class="mt-1 text-[13px] text-gray-500 dark:text-gray-400">Chat with our support team in real time.</p>
          <button class="mt-4 w-full bg-[#0a6cff] hover:bg-[#0057d8] text-white text-[14px] font-semibold py-2.5 rounded-xl transition">
            Start chat
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto">
            <Mail :size="24" class="text-[#0a6cff]" />
          </div>
          <h3 class="mt-4 text-[16px] font-bold text-[#0b2343] dark:text-white">Email us</h3>
          <p class="mt-1 text-[13px] text-gray-500 dark:text-gray-400">We'll get back to you within 24 hours.</p>
          <button class="mt-4 w-full bg-white dark:bg-gray-700 border-2 border-[#0a6cff] dark:border-blue-500 text-[#0a6cff] dark:text-blue-400 text-[14px] font-semibold py-2.5 rounded-xl transition hover:bg-blue-50 dark:hover:bg-gray-600">
            Send email
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
          <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto">
            <Phone :size="24" class="text-[#0a6cff]" />
          </div>
          <h3 class="mt-4 text-[16px] font-bold text-[#0b2343] dark:text-white">Phone support</h3>
          <p class="mt-1 text-[13px] text-gray-500 dark:text-gray-400">Available Mon\u2013Fri, 9 AM \u2013 6 PM.</p>
          <button class="mt-4 w-full bg-white dark:bg-gray-700 border-2 border-[#0a6cff] dark:border-blue-500 text-[#0a6cff] dark:text-blue-400 text-[14px] font-semibold py-2.5 rounded-xl transition hover:bg-blue-50 dark:hover:bg-gray-600">
            Call now
          </button>
        </div>
      </div>

      <!-- FAQ -->
      <div class="max-w-3xl mx-auto">
        <h2 class="text-[24px] font-bold text-[#0b2343] dark:text-white mb-6">Frequently asked questions</h2>

        <div v-if="filteredFaqs.length === 0" class="text-center py-12 text-gray-500 dark:text-gray-400">
          <p class="text-[16px] font-medium">No results found for "{{ searchQuery }}"</p>
          <button @click="searchQuery = ''" class="mt-3 text-[#0a6cff] text-[14px] font-semibold hover:underline">
            Clear search
          </button>
        </div>

        <div v-for="(faq, i) in filteredFaqs" :key="i" class="border-b border-gray-200 dark:border-gray-700">
          <button
            @click="toggleFaq(i)"
            class="w-full flex items-center justify-between py-5 text-left transition"
          >
            <span class="text-[15px] font-semibold text-[#0b2343] dark:text-white pr-4">{{ faq.q }}</span>
            <ChevronDown
              :size="18"
              class="text-gray-400 shrink-0 transition-transform duration-200"
              :class="faq.open ? 'rotate-180' : ''"
            />
          </button>
          <div
            v-if="faq.open"
            class="pb-5 text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {{ faq.a }}
          </div>
        </div>

        <div class="mt-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-center">
          <p class="text-[15px] font-semibold text-[#0b2343] dark:text-white">Still need help?</p>
          <p class="text-[13px] text-gray-500 dark:text-gray-400 mt-1">Visit our help centre for detailed guides and troubleshooting.</p>
          <button class="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#0a6cff] hover:underline">
            Go to help centre <ExternalLink :size="14" />
          </button>
        </div>
      </div>
    </Container>
  </div>
</template>
