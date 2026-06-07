import { ref, computed } from "vue";
import { getListings, getCountries } from "../api.js";

const allSuggestions = ref([]);
let loaded = false;

async function loadSuggestions() {
  if (loaded) return;
  loaded = true;
  try {
    const [listings, countriesList] = await Promise.all([
      getListings(),
      getCountries()
    ]);
    const seen = new Set();
    const result = [];
    for (const exp of listings) {
      const location = exp.location?.trim();
      if (location && !seen.has(location)) {
        seen.add(location);
        result.push({ text: location, type: "location" });
      }
      const title = exp.title?.trim();
      if (title && !seen.has(title)) {
        seen.add(title);
        result.push({ text: title, type: "activity" });
      }
      const category = exp.category?.trim();
      if (category && !seen.has(category)) {
        seen.add(category);
        result.push({ text: category, type: "category" });
      }
    }
    for (const country of countriesList) {
      const name = country.name?.trim();
      if (name && !seen.has(name)) {
        seen.add(name);
        result.push({ text: name, type: "country", slug: country.slug });
      }
    }
    allSuggestions.value = result;
  } catch (e) {
    console.error("Failed to load suggestions", e);
  }
}

export function useSearchSuggestions(searchTerm) {
  loadSuggestions();

  const suggestions = computed(() => {
    const q = searchTerm.value?.toLowerCase().trim() ?? "";
    if (!q || q.length < 1) return [];
    return allSuggestions.value
      .filter((s) => s.text.toLowerCase().includes(q))
      .slice(0, 8);
  });

  return { suggestions };
}
