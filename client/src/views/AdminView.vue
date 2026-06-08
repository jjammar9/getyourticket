<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";
import { getListings, getBookings } from "../api.js";
import Container from "../components/ui/Container.vue";
import { BarChart3, ShoppingBag, DollarSign, CalendarDays, List, Users, Settings, Plus, Pencil, Trash2, X, Save, Search } from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();
const listingsCount = ref(0);
const allBookings = ref([]);
const loading = ref(true);
const tab = ref("overview");

// Listings
const allListings = ref([]);
const listingsLoading = ref(false);
const searchQuery = ref("");
const showListingModal = ref(false);
const editingListing = ref(null);
const listingForm = ref({ title: "", slug: "", description: "", price: "", location: "", duration: "", badge: "", categoryId: "", countryId: "" });
const savingListing = ref(false);

// Users
const allUsers = ref([]);
const usersLoading = ref(false);

// Countries & Categories for forms
const countries = ref([]);
const categories = ref([]);

onMounted(async () => {
  if (!authStore.isLoggedIn || authStore.user?.role !== "admin") {
    router.push("/");
    return;
  }
  try {
    const [listingsRes, bookingsRes, countriesRes, categoriesRes] = await Promise.all([
      getListings({ limit: 1 }),
      fetch("/api/user/bookings", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(r => r.json()),
      fetch("/api/countries").then(r => r.json()),
      fetch("/api/categories").then(r => r.json()),
    ]);
    listingsCount.value = listingsRes.total || 0;
    allBookings.value = bookingsRes.bookings || [];
    countries.value = countriesRes.countries || countriesRes || [];
    categories.value = categoriesRes.categories || categoriesRes || [];
  } catch (e) {
    console.error("Admin load failed", e);
  } finally {
    loading.value = false;
  }
});

const totalRevenue = computed(() => allBookings.value.reduce((s, b) => s + b.totalPrice, 0));

async function loadListings() {
  listingsLoading.value = true;
  try {
    const params = new URLSearchParams({ limit: "100" });
    if (searchQuery.value) params.set("search", searchQuery.value);
    const res = await fetch(`/api/admin/listings?${params}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    allListings.value = data.listings || [];
  } catch (e) {
    console.error("Failed to load listings", e);
  } finally {
    listingsLoading.value = false;
  }
}

async function loadUsers() {
  usersLoading.value = true;
  try {
    const res = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    allUsers.value = data.users || [];
  } catch (e) {
    console.error("Failed to load users", e);
  } finally {
    usersLoading.value = false;
  }
}

function openCreateListing() {
  editingListing.value = null;
  listingForm.value = { title: "", slug: "", description: "", price: "", location: "", duration: "", badge: "", categoryId: "", countryId: "" };
  showListingModal.value = true;
}

function openEditListing(listing) {
  editingListing.value = listing;
  listingForm.value = {
    title: listing.title || "",
    slug: listing.slug || "",
    description: listing.description || "",
    price: listing.price?.toString() || "",
    location: listing.location || "",
    duration: listing.duration || "",
    badge: listing.badge || "",
    categoryId: listing.categoryId || "",
    countryId: listing.countryId || "",
  };
  showListingModal.value = true;
}

async function saveListing() {
  savingListing.value = true;
  try {
    const method = editingListing.value ? "PUT" : "POST";
    const url = editingListing.value ? `/api/admin/listings/${editingListing.value.id}` : "/api/admin/listings";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(listingForm.value),
    });
    if (!res.ok) throw new Error("Failed to save listing");
    showListingModal.value = false;
    await loadListings();
  } catch (e) {
    alert(e.message);
  } finally {
    savingListing.value = false;
  }
}

async function deleteListing(id) {
  if (!confirm("Delete this listing?")) return;
  try {
    await fetch(`/api/admin/listings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    allListings.value = allListings.value.filter(l => l.id !== id);
  } catch (e) {
    console.error("Failed to delete listing", e);
  }
}

async function updateUserRole(userId, role) {
  try {
    await fetch(`/api/admin/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ role }),
    });
    allUsers.value = allUsers.value.map(u => u.id === userId ? { ...u, role } : u);
  } catch (e) {
    console.error("Failed to update user role", e);
  }
}

async function deleteUser(userId) {
  if (!confirm("Delete this user? This cannot be undone.")) return;
  try {
    await fetch(`/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    allUsers.value = allUsers.value.filter(u => u.id !== userId);
  } catch (e) {
    console.error("Failed to delete user", e);
  }
}

function switchTab(t) {
  tab.value = t;
  if (t === "listings" && !allListings.value.length) loadListings();
  if (t === "users" && !allUsers.value.length) loadUsers();
}
</script>

<template>
  <Container>
    <div class="pt-32 pb-16">
      <h1 class="text-[28px] font-bold tracking-[-0.3px] text-[#0b2343] dark:text-white mb-8">Admin Dashboard</h1>

      <!-- Tabs -->
      <div class="flex gap-1 mb-8 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
        <button
          v-for="t in [{ id: 'overview', label: 'Overview', icon: BarChart3 }, { id: 'listings', label: 'Listings', icon: List }, { id: 'users', label: 'Users', icon: Users }]"
          :key="t.id"
          @click="switchTab(t.id)"
          class="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold rounded-lg transition-colors"
          :class="tab === t.id ? 'bg-white dark:bg-gray-700 text-[#ff5a1f] shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        >
          <component :is="t.icon" :size="16" />
          {{ t.label }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-24 text-gray-400">Loading...</div>

      <!-- Overview Tab -->
      <template v-else-if="tab === 'overview'">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center"><BarChart3 :size="18" class="text-blue-600 dark:text-blue-400" /></div>
              <div><p class="text-[22px] font-bold text-[#0b2343] dark:text-white leading-none">{{ listingsCount }}</p><p class="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Total Listings</p></div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center"><ShoppingBag :size="18" class="text-green-600 dark:text-green-400" /></div>
              <div><p class="text-[22px] font-bold text-[#0b2343] dark:text-white leading-none">{{ allBookings.length }}</p><p class="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Total Bookings</p></div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center"><DollarSign :size="18" class="text-orange-600 dark:text-orange-400" /></div>
              <div><p class="text-[22px] font-bold text-[#0b2343] dark:text-white leading-none">${{ totalRevenue.toFixed(0) }}</p><p class="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Total Revenue</p></div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div class="flex items-center gap-2"><CalendarDays :size="16" class="text-gray-400" /><h2 class="text-[15px] font-bold text-[#0b2343] dark:text-white">Recent Bookings</h2></div>
            <span class="text-[12px] text-gray-400 dark:text-gray-500">{{ allBookings.length }} total</span>
          </div>
          <table class="w-full text-[13px]">
            <thead><tr class="border-b border-gray-100 dark:border-gray-700">
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Listing</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-50 dark:divide-gray-700/50">
              <tr v-for="b in allBookings" :key="b.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td class="px-5 py-3.5 font-medium text-[#0b2343] dark:text-white">{{ b.user?.name || b.userId?.slice(0, 8) }}</td>
                <td class="px-5 py-3.5 text-gray-600 dark:text-gray-300">{{ b.listing?.title?.slice(0, 40) }}...</td>
                <td class="px-5 py-3.5 text-gray-500 dark:text-gray-400">{{ b.date }}</td>
                <td class="px-5 py-3.5 font-semibold text-[#0b2343] dark:text-white">${{ b.totalPrice }}</td>
                <td class="px-5 py-3.5">
                  <span class="text-[11px] font-bold px-2.5 py-1 rounded-full" :class="b.status === 'confirmed' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'">{{ b.status }}</span>
                </td>
              </tr>
              <tr v-if="!allBookings.length"><td colspan="5" class="px-5 py-12 text-center text-gray-400 dark:text-gray-500">No bookings yet</td></tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- Listings Tab -->
      <template v-else-if="tab === 'listings'">
        <div class="flex items-center justify-between mb-4">
          <div class="relative">
            <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input v-model="searchQuery" @input="loadListings" placeholder="Search listings..." class="pl-9 pr-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[#0b2343] dark:text-white outline-none focus:border-[#ff5a1f] w-64" />
          </div>
          <button @click="openCreateListing" class="flex items-center gap-2 bg-[#ff5a1f] text-white text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-[#e44a2b] transition-colors"><Plus :size="16" /> New Listing</button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table class="w-full text-[13px]">
            <thead><tr class="border-b border-gray-100 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">ID</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Title</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Location</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Price</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-50 dark:divide-gray-700/50">
              <tr v-for="l in allListings" :key="l.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td class="px-4 py-3 text-gray-500">{{ l.id }}</td>
                <td class="px-4 py-3 font-medium text-[#0b2343] dark:text-white max-w-[260px] truncate">{{ l.title }}</td>
                <td class="px-4 py-3 text-gray-500">{{ l.location }}</td>
                <td class="px-4 py-3 font-semibold text-[#0b2343] dark:text-white">${{ l.price }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <button @click="openEditListing(l)" class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Pencil :size="15" class="text-gray-500" /></button>
                    <button @click="deleteListing(l.id)" class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"><Trash2 :size="15" class="text-red-500" /></button>
                  </div>
                </td>
              </tr>
              <tr v-if="!allListings.length && !listingsLoading"><td colspan="5" class="px-4 py-12 text-center text-gray-400">No listings found</td></tr>
              <tr v-if="listingsLoading"><td colspan="5" class="px-4 py-12 text-center text-gray-400">Loading...</td></tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- Users Tab -->
      <template v-else-if="tab === 'users'">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table class="w-full text-[13px]">
            <thead><tr class="border-b border-gray-100 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Name</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Email</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Role</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Joined</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-50 dark:divide-gray-700/50">
              <tr v-for="u in allUsers" :key="u.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td class="px-4 py-3.5 font-medium text-[#0b2343] dark:text-white">{{ u.name }}</td>
                <td class="px-4 py-3.5 text-gray-500">{{ u.email }}</td>
                <td class="px-4 py-3.5">
                  <select :value="u.role" @change="updateUserRole(u.id, $event.target.value)" class="text-[12px] border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td class="px-4 py-3.5 text-gray-400 text-[12px]">{{ new Date(u.createdAt).toLocaleDateString() }}</td>
                <td class="px-4 py-3.5">
                  <button @click="deleteUser(u.id)" class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"><Trash2 :size="15" class="text-red-500" /></button>
                </td>
              </tr>
              <tr v-if="!allUsers.length && !usersLoading"><td colspan="5" class="px-4 py-12 text-center text-gray-400">No users found</td></tr>
              <tr v-if="usersLoading"><td colspan="5" class="px-4 py-12 text-center text-gray-400">Loading...</td></tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>

    <!-- Listing Modal -->
    <div v-if="showListingModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" @click.self="showListingModal = false">
      <div class="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg mx-4 shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 class="text-[18px] font-bold text-[#0b2343] dark:text-white">{{ editingListing ? "Edit Listing" : "New Listing" }}</h2>
          <button @click="showListingModal = false" class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><X :size="18" class="text-gray-400" /></button>
        </div>
        <div class="px-6 pb-6 space-y-3 max-h-[70vh] overflow-y-auto">
          <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Title</label><input v-model="listingForm.title" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none focus:border-[#ff5a1f]" /></div>
          <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Slug</label><input v-model="listingForm.slug" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none focus:border-[#ff5a1f]" /></div>
          <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Description</label><textarea v-model="listingForm.description" rows="3" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none focus:border-[#ff5a1f]"></textarea></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Price</label><input v-model="listingForm.price" type="number" step="0.01" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none focus:border-[#ff5a1f]" /></div>
            <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Location</label><input v-model="listingForm.location" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none focus:border-[#ff5a1f]" /></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Duration</label><input v-model="listingForm.duration" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none focus:border-[#ff5a1f]" /></div>
            <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Badge</label><input v-model="listingForm.badge" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none focus:border-[#ff5a1f]" /></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Category</label>
              <select v-model="listingForm.categoryId" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none">
                <option value="">None</option>
                <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
            <div><label class="text-[12px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">Country</label>
              <select v-model="listingForm.countryId" class="w-full px-3 py-2 text-[13px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-[#0b2343] dark:text-white outline-none">
                <option value="">None</option>
                <option v-for="c in countries" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <button @click="showListingModal = false" class="flex-1 text-[13px] font-semibold py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
            <button @click="saveListing" :disabled="savingListing" class="flex-1 bg-[#ff5a1f] text-white text-[13px] font-semibold py-2.5 rounded-xl hover:bg-[#e44a2b] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <Save :size="15" /> {{ savingListing ? "Saving..." : "Save" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
