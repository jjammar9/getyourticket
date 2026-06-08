import { ref } from "vue";

const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS = 12;

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to persist recently viewed", e);
  }
}

const recentlyViewed = ref(loadFromStorage());

export function useRecentlyViewed() {
  function addRecentlyViewed(exp) {
    const idx = recentlyViewed.value.findIndex((e) => e.id === exp.id);
    if (idx !== -1) {
      recentlyViewed.value.splice(idx, 1);
    }
    recentlyViewed.value.unshift({
      id: exp.id,
      title: exp.title,
      image: exp.image,
      location: exp.location,
      price: exp.price,
      slug: exp.slug,
      viewedAt: Date.now(),
    });
    if (recentlyViewed.value.length > MAX_ITEMS) {
      recentlyViewed.value = recentlyViewed.value.slice(0, MAX_ITEMS);
    }
    saveToStorage(recentlyViewed.value);
  }

  return { recentlyViewed, addRecentlyViewed };
}
