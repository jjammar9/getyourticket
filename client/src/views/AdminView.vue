<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";
import { getListings, getBookings } from "../api.js";
import Container from "../components/ui/Container.vue";
import { BarChart3, ShoppingBag, DollarSign, CalendarDays } from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();
const listingsCount = ref(0);
const allBookings = ref([]);
const loading = ref(true);

onMounted(async () => {
  if (!authStore.isLoggedIn || authStore.user?.role !== "admin") {
    router.push("/");
    return;
  }
  try {
    const [listingsRes, bookingsRes] = await Promise.all([
      getListings({ limit: 1 }),
      fetch("/api/user/bookings", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(r => r.json()),
    ]);
    listingsCount.value = listingsRes.total || 0;
    allBookings.value = bookingsRes.bookings || [];
  } catch (e) {
    console.error("Admin load failed", e);
  } finally {
    loading.value = false;
  }
});

const totalRevenue = computed(() => allBookings.value.reduce((s, b) => s + b.totalPrice, 0));
</script>

<template>
  <Container>
    <div class="pt-32 pb-16">
      <h1 class="text-[28px] font-bold tracking-[-0.3px] text-[#0b2343] dark:text-white mb-8">Admin Dashboard</h1>

      <div v-if="loading" class="text-center py-24 text-gray-400">Loading...</div>

      <template v-else>
        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <BarChart3 :size="18" class="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p class="text-[22px] font-bold text-[#0b2343] dark:text-white leading-none">{{ listingsCount }}</p>
                <p class="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Total Listings</p>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <ShoppingBag :size="18" class="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p class="text-[22px] font-bold text-[#0b2343] dark:text-white leading-none">{{ allBookings.length }}</p>
                <p class="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Total Bookings</p>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                <DollarSign :size="18" class="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p class="text-[22px] font-bold text-[#0b2343] dark:text-white leading-none">${{ totalRevenue.toFixed(0) }}</p>
                <p class="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Bookings -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div class="flex items-center gap-2">
              <CalendarDays :size="16" class="text-gray-400 dark:text-gray-500" />
              <h2 class="text-[15px] font-bold text-[#0b2343] dark:text-white">Recent Bookings</h2>
            </div>
            <span class="text-[12px] text-gray-400 dark:text-gray-500">{{ allBookings.length }} total</span>
          </div>
          <table class="w-full text-[13px]">
            <thead>
              <tr class="border-b border-gray-100 dark:border-gray-700">
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Listing</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-gray-700/50">
              <tr v-for="b in allBookings" :key="b.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td class="px-5 py-3.5 font-medium text-[#0b2343] dark:text-white">{{ b.user?.name || b.userId?.slice(0, 8) }}</td>
                <td class="px-5 py-3.5 text-gray-600 dark:text-gray-300">{{ b.listing?.title?.slice(0, 40) }}...</td>
                <td class="px-5 py-3.5 text-gray-500 dark:text-gray-400">{{ b.date }}</td>
                <td class="px-5 py-3.5 font-semibold text-[#0b2343] dark:text-white">${{ b.totalPrice }}</td>
                <td class="px-5 py-3.5">
                  <span
                    class="text-[11px] font-bold px-2.5 py-1 rounded-full"
                    :class="b.status === 'confirmed' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'"
                  >{{ b.status }}</span>
                </td>
              </tr>
              <tr v-if="!allBookings.length">
                <td colspan="5" class="px-5 py-12 text-center text-gray-400 dark:text-gray-500">No bookings yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </Container>
</template>
