<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Heart, List, Trash2 } from "lucide-vue-next";
import Container from "../components/ui/Container.vue";
import { useAuthStore } from "../stores/authStore.js";
import { useLocaleStore } from "../stores/localeStore.js";

const router = useRouter();
const authStore = useAuthStore();
const localeStore = useLocaleStore();

const lists = ref([]);
const loading = ref(true);
const deletingId = ref(null);

onMounted(async () => {
  if (!authStore.isLoggedIn) {
    loading.value = false;
    return;
  }
  try {
    const data = await authStore.getWishlistLists();
    lists.value = data.lists || [];
  } catch (e) {
    console.error("Failed to load wishlist lists", e);
  } finally {
    loading.value = false;
  }
});

async function deleteList(e, listId) {
  e.stopPropagation();
  if (!confirm("Delete this list?")) return;
  deletingId.value = listId;
  try {
    await authStore.deleteWishlistList(listId);
    authStore.fetchWishlistData();
    lists.value = lists.value.filter((l) => l.id !== listId);
  } catch (e) {
    console.error("Failed to delete list", e);
  } finally {
    deletingId.value = null;
  }
}
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343] dark:text-white mb-8">
        {{ localeStore.t("wishlist.title") }}
      </h1>

      <div v-if="!authStore.isLoggedIn" class="text-center py-20">
        <p class="text-[16px] text-gray-500 dark:text-gray-400">{{ localeStore.t("wishlist.login") }}</p>
      </div>

      <div v-else-if="loading" class="text-center py-20">
        <p class="text-[16px] text-gray-500 dark:text-gray-400">Loading...</p>
      </div>

      <div v-else-if="lists.length === 0" class="text-center py-20">
        <Heart :size="48" class="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <p class="text-[16px] text-gray-500 dark:text-gray-400">{{ localeStore.t("wishlist.empty") }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div
          v-for="list in lists"
          :key="list.id"
          @click="router.push(`/wishlist/${list.id}`)"
          class="bg-white dark:bg-gray-800 rounded-[18px] border border-[#d9dee8] dark:border-gray-700 overflow-hidden cursor-pointer group flex flex-col hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300"
        >
          <div class="relative h-[175px] overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              loading="lazy"
              v-if="list.previewImage"
              :src="list.previewImage"
              :alt="list.name"
              class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <List :size="40" class="text-gray-300 dark:text-gray-600" />
            </div>
            <div class="absolute bottom-0 left-0 w-full h-[10px] bg-[#ff5a1f]"></div>
            <div class="absolute top-3 left-3 bg-[#0b2343]/80 dark:bg-gray-900/80 text-white text-[10px] font-extrabold px-3 py-1 rounded-[10px]">
              {{ list.name }}
            </div>
            <button
              @click="(e) => deleteList(e, list.id)"
              :disabled="deletingId === list.id"
              class="absolute top-3 right-3 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-sm flex items-center justify-center z-10 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            >
              <Trash2 :size="16" class="text-[#e53935]" />
            </button>
          </div>
          <div class="px-4 py-3 flex items-center gap-2">
            <div class="flex-1">
              <p class="text-[13px] text-[#6d788d] dark:text-gray-400 font-medium">
                <span v-if="list.previewLocation">{{ list.previewLocation }} · </span>
                {{ list.itemCount }} {{ list.itemCount === 1 ? "activity" : "activities" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
