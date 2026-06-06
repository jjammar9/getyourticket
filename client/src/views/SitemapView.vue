<script setup>
import Container from "../components/ui/Container.vue";

const continents = [
  {
    name: "North America",
    countries: [
      "Anguilla", "Antigua and Barbuda", "Aruba", "Bahamas", "Barbados",
      "Belize", "Bermuda", "Bonaire", "British Virgin Islands", "Canada",
      "Cayman Islands", "Costa Rica", "Curacao", "Dominica", "Dominican Republic",
      "El Salvador", "Greenland", "Grenada", "Guadeloupe", "Guatemala",
      "Honduras", "Jamaica", "Martinique", "Mexico", "Montserrat",
      "Nicaragua", "Panama", "Puerto Rico", "Saint Barthelemy", "Saint Kitts and Nevis",
      "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines",
      "Sint Maarten", "Trinidad and Tobago", "Turks and Caicos Islands", "U.S. Virgin Islands", "United States",
    ],
  },
  {
    name: "South America",
    countries: [
      "Argentina", "Bolivia", "Brazil", "Chile", "Colombia",
      "Ecuador", "Falkland Islands", "French Guiana", "Guyana", "Paraguay",
      "Peru", "Suriname", "Uruguay", "Venezuela",
    ],
  },
  {
    name: "Europe",
    countries: [
      "Albania", "Andorra", "Austria", "Belgium", "Bosnia and Herzegovina",
      "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark",
      "England", "Estonia", "Faroe Islands", "Finland", "France",
      "Georgia", "Germany", "Gibraltar", "Great Britain", "Greece",
      "Guernsey", "Hungary", "Iceland", "Ireland", "Isle of Man",
      "Italy", "Jersey", "Kosovo", "Latvia", "Liechtenstein",
      "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco",
      "Montenegro", "Netherlands", "North Macedonia", "Northern Ireland", "Norway",
      "Poland", "Portugal", "Republic of San Marino", "Romania", "Russia",
      "Scotland", "Serbia", "Slovakia", "Slovenia", "Spain",
      "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Turkiye", "United Kingdom",
      "Wales", "Aland Islands",
    ],
  },
  {
    name: "Asia",
    countries: [
      "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bhutan",
      "Brunei", "Cambodia", "China", "Hong Kong", "India",
      "Indonesia", "Iraq", "Israel", "Japan", "Jordan",
      "Kazakhstan", "Kuwait", "Kyrgyz Republic", "Laos", "Lebanon",
      "Macao", "Malaysia", "Maldives", "Mongolia", "Myanmar",
      "Nepal", "North Korea", "Oman", "Pakistan", "Palestine",
      "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea",
      "Sri Lanka", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste",
      "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen",
    ],
  },
  {
    name: "Africa",
    countries: [
      "Algeria", "Angola", "Benin", "Botswana", "Burundi",
      "Cameroon", "Cape Verde", "Comoros", "Cote d'Ivoire", "Democratic Republic of the Congo",
      "Djibouti", "Egypt", "Eritrea", "Eswatini", "Ethiopia",
      "Gabon", "Gambia", "Ghana", "Guinea-Bissau", "Kenya",
      "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi",
      "Mali", "Mauritania", "Mauritius", "Mayotte", "Morocco",
      "Mozambique", "Namibia", "Nigeria", "Republic of the Congo", "Rwanda",
      "Reunion", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
      "South Africa", "South Sudan", "Sudan", "Sao Tome and Principe", "Tanzania",
      "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe",
    ],
  },
  {
    name: "Oceania",
    countries: [
      "Australia", "Cook Islands", "Fiji", "French Polynesia", "Guam",
      "Nauru", "New Caledonia", "New Zealand", "Palau", "Papua New Guinea",
      "Samoa", "Solomon Islands", "Tonga", "Vanuatu",
    ],
  },
];

function makeSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
</script>

<template>
  <div class="pt-28 pb-16">
    <div class="bg-gradient-to-br from-[#0b2343] to-[#163d7a] text-white py-16">
      <Container>
        <div class="max-w-2xl mx-auto">
          <nav class="flex items-center gap-2 text-[13px] text-blue-300 mb-2 flex-wrap">
            <router-link to="/" class="hover:text-white transition-colors">Home</router-link>
            <span class="text-blue-400/50">›</span>
            <span class="text-white font-semibold">Sitemap</span>
          </nav>
          <h1 class="text-[36px] font-bold tracking-[-0.5px]">Sitemap</h1>
          <p class="text-blue-200 mt-2 text-[15px]">Discover every destination across the globe</p>
        </div>
      </Container>
    </div>

    <Container>
      <div class="max-w-6xl mx-auto -mt-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="continent in continents"
            :key="continent.name"
            class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-600 shadow-sm overflow-hidden"
          >
            <div class="bg-blue-50 px-5 py-4 text-center">
              <h3 class="text-[14px] font-bold text-[#0b2343]">{{ continent.name }}</h3>
            </div>
            <div class="p-5">
              <div class="flex flex-wrap gap-2">
                <router-link
                  v-for="country in continent.countries"
                  :key="country"
                  :to="'/country/' + makeSlug(country)"
                  class="text-[13px] px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-[#fcb034] hover:text-white dark:hover:bg-[#fcb034] dark:hover:text-white transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-[#fcb034] font-medium"
                >
                  {{ country }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
