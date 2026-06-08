<script setup>
import { ref, onMounted } from "vue";
import { X, Plus, Check } from "lucide-vue-next";
import { useAuthStore } from "../../stores/authStore.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const props = defineProps({
  listingId: { type: [Number, String], required: true },
});

const emit = defineEmits(["close", "saved"]);

const authStore = useAuthStore();
const localeStore = useLocaleStore();

const lists = ref([]);
const loading = ref(true);
const savingId = ref(null);
const savedId = ref(null);
const showCreateForm = ref(false);
const newListName = ref("");
const creating = ref(false);

onMounted(async () => {
  try {
    const data = await authStore.getWishlistLists();
    lists.value = data.lists || [];
  } catch (e) {
    console.error("Failed to load wishlist lists", e);
  } finally {
    loading.value = false;
  }
});

async function selectList(listId) {
  savingId.value = listId;
  try {
    await authStore.addToWishlistList(listId, props.listingId);
    savedId.value = listId;
    setTimeout(() => {
      emit("saved");
      emit("close");
    }, 1200);
  } catch (e) {
    if (e.message && e.message.includes("Already")) {
      savedId.value = listId;
      setTimeout(() => emit("close"), 1200);
    }
  } finally {
    savingId.value = null;
  }
}

async function createList() {
  if (!newListName.value.trim()) return;
  creating.value = true;
  try {
    const data = await authStore.createWishlistList(newListName.value.trim());
    if (data.list) {
      const newList = {
        id: data.list.id,
        name: data.list.name,
        itemCount: 0,
        previewImage: null,
        previewLocation: null,
        items: [],
      };
      lists.value.unshift(newList);
      showCreateForm.value = false;
      newListName.value = "";
    }
  } catch (e) {
    console.error("Failed to create list", e);
  } finally {
    creating.value = false;
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
    @click.self="emit('close')"
  >
    <div class="fixed inset-0 bg-black/20" @click="emit('close')"></div>

    <div @click.stop class="relative bg-white rounded-xl shadow-xl w-[360px] max-h-[420px] flex flex-col z-10">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button @click="emit('close')" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <X :size="18" class="text-[#4f5b72]" />
        </button>
        <span class="text-[14px] font-bold text-[#0b2343] tracking-tight">{{ localeStore.t("wishlist.modal.title") }}</span>
        <button
          @click="showCreateForm = !showCreateForm"
          class="text-[13px] font-semibold text-[#245fb8] underline underline-offset-2 hover:text-[#163d7a] transition-colors"
        >
          {{ localeStore.t("wishlist.modal.newList") }}
        </button>
      </div>

      <!-- Create form -->
      <div v-if="showCreateForm" class="px-4 py-3 border-b border-gray-100">
        <div class="flex gap-2">
          <input
            v-model="newListName"
            :placeholder="localeStore.t('wishlist.modal.namePlaceholder')"
            @keyup.enter="createList"
            class="flex-1 text-[13px] px-3 py-2 border border-[#d9dee8] rounded-lg outline-none focus:border-[#245fb8] transition-colors"
          />
          <button
            @click="createList"
            :disabled="creating || !newListName.trim()"
            class="px-4 py-2 bg-[#245fb8] text-white text-[13px] font-semibold rounded-lg hover:bg-[#163d7a] disabled:opacity-50 transition-colors"
          >
            <span v-if="creating" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span v-else>{{ localeStore.t("wishlist.modal.create") }}</span>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-4 py-2">
        <div v-if="loading" class="flex items-center justify-center py-10">
          <div class="w-6 h-6 border-2 border-[#245fb8] border-t-transparent rounded-full animate-spin"></div>
        </div>

        <div v-else-if="lists.length === 0 && !showCreateForm" class="text-center py-10">
          <p class="text-[13px] text-[#6d788d]">{{ localeStore.t("wishlist.modal.noLists") }}</p>
          <button
            @click="showCreateForm = true"
            class="mt-3 text-[13px] font-semibold text-[#245fb8] underline underline-offset-2"
          >
            {{ localeStore.t("wishlist.modal.createFirst") }}
          </button>
        </div>

        <div v-else class="space-y-1 py-1">
          <button
            v-for="list in lists"
            :key="list.id"
            @click="selectList(list.id)"
            :disabled="savingId === list.id"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-60"
          >
            <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
              <img
                loading="lazy"
                v-if="list.previewImage"
                :src="list.previewImage"
                :alt="list.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                <Plus :size="18" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-semibold text-[#0b2343] truncate">{{ list.name }}</p>
              <p class="text-[11px] text-[#6d788d] mt-0.5">
                <span v-if="list.previewLocation">{{ list.previewLocation }} · </span>
                {{ list.itemCount }} {{ list.itemCount === 1 ? "activity" : "activities" }}
              </p>
            </div>
            <div v-if="savedId === list.id" class="flex-shrink-0">
              <Check :size="18" class="text-[#22c55e]" />
            </div>
            <div v-else-if="savingId === list.id" class="flex-shrink-0">
              <div class="w-5 h-5 border-2 border-[#245fb8] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
