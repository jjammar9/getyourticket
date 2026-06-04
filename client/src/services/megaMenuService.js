const COUNTRIES_URL = "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population";
const WIKI_SEARCH = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrlimit=8&prop=pageimages|extracts&pithumbsize=200&exintro&explaintext";

const REGION_GROUPS = {
  Europe: ["Europe"],
  Asia: ["Asia"],
  "North America": ["Americas"],
  "Africa & Middle East": ["Africa"],
  Oceania: ["Oceania"],
  "Latin America": ["Americas"],
};

const LATIN_AMERICA = [
  "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Costa Rica",
  "Cuba", "Dominican Republic", "Ecuador", "El Salvador", "Guatemala",
  "Haiti", "Honduras", "Mexico", "Nicaragua", "Panama", "Paraguay",
  "Peru", "Uruguay", "Venezuela",
];

const THINGS_QUERIES = [
  ["City tours", "sightseeing"],
  ["Hiking & nature", "hiking"],
  ["Cruises & sailing", "cruise ship"],
  ["Water activities", "scuba diving"],
  ["Museums & culture", "museum"],
  ["Food & drink", "cooking"],
];

const INSPIRATION_QUERIES = [
  ["Weekend escapes", "weekend getaway"],
  ["Beach breaks", "beach resort"],
  ["Mountain retreats", "mountain resort"],
  ["Cultural journeys", "cultural tourism"],
  ["Adventure travel", "adventure travel"],
  ["Road trips", "road trip"],
];

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchCountries() {
  const data = await fetchJson(COUNTRIES_URL);
  const groups = {};
  const latinSet = new Set(LATIN_AMERICA);

  for (const c of data) {
    const name = c.name.common;
    const region = c.region || "Other";
    let group = "Other";

    if (region === "Americas") {
      if (latinSet.has(name)) {
        group = "Latin America";
      } else {
        group = "North America";
      }
    } else {
      for (const [g, regions] of Object.entries(REGION_GROUPS)) {
        if (regions.includes(region) && g !== "Latin America") {
          group = g;
          break;
        }
      }
    }

    if (!groups[group]) groups[group] = [];
    groups[group].push({
      title: name,
      subtitle: c.capital?.[0] || "",
      image: c.flags?.png || "",
    });
  }

  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => a.title.localeCompare(b.title));
  }

  return groups;
}

async function searchWikipedia(searchTerm) {
  const url = `${WIKI_SEARCH}&gsrsearch=${encodeURIComponent(searchTerm)}`;
  const data = await fetchJson(url);
  const pages = data.query?.pages;
  if (!pages) return [];

  return Object.values(pages).map((p) => ({
    title: p.title,
    subtitle: (p.extract || "").replace(/<[^>]*>/g, "").split(".")[0].substring(0, 80) || "",
    image: p.thumbnail?.source || "",
  }));
}

async function fetchThings() {
  const categories = {};
  for (const [name, query] of THINGS_QUERIES) {
    categories[name] = (await searchWikipedia(query)).slice(0, 8);
  }
  return categories;
}

async function fetchInspiration() {
  const categories = {};
  for (const [name, query] of INSPIRATION_QUERIES) {
    categories[name] = (await searchWikipedia(query)).slice(0, 8);
  }
  return categories;
}

export async function fetchNavData() {
  const [places, things, inspiration] = await Promise.all([
    fetchCountries(),
    fetchThings(),
    fetchInspiration(),
  ]);

  return {
    places: { label: "Places to see", categories: places },
    things: { label: "Things to do", categories: things },
    inspiration: { label: "Trip inspiration", categories: inspiration },
  };
}
