<script setup>
import { useRouter } from "vue-router";
import { useLocaleStore } from "../../stores/localeStore.js";

const router = useRouter();
const localeStore = useLocaleStore();

const props = defineProps({
  title: String,
  links: Array,
});

const linkKeys = {
  "Contact": "footer.linkContact",
  "Legal Notice": "footer.linkLegalNotice",
  "Privacy Policy": "footer.linkPrivacy",
  "Cookies and Marketing Preferences": "footer.linkCookies",
  "General Terms and Conditions": "footer.linkTerms",
  "Information according to the Digital Services Act": "footer.linkDSA",
  "Sitemap": "footer.linkSitemap",
  "About Us": "footer.linkAboutUs",
  "Careers": "footer.linkCareers",
  "News": "footer.linkNews",
  "Media": "footer.linkMedia",
  "Download Center": "footer.linkDownloadCenter",
  "Explorer": "footer.linkExplorer",
  "As a Supply Partner": "footer.linkSupplyPartner",
  "As a Content Creator": "footer.linkContentCreator",
  "As an Affiliate Partner": "footer.linkAffiliatePartner",
};

const titleKey = {
  "Support": "footer.columnSupport",
  "Company": "footer.columnCompany",
  "Work With Us": "footer.columnWorkWithUs",
};

function goTo(link) {
  if (link.to && link.to !== "#") {
    router.push(link.to);
  }
}
</script>

<template>
  <div>
    <p class="text-[15px] font-bold mb-5" style="font-family: var(--font-display);">
      {{ localeStore.t(titleKey[title] || title) }}
    </p>

    <div class="flex flex-col gap-3">
      <button
        v-for="(link, index) in links"
        :key="index"
        class="text-left text-[14px] text-white underline transition-all cursor-pointer bg-transparent border-0 p-0"
        @click="goTo(link)"
      >
        {{ localeStore.t(linkKeys[link.name] || link.name) }}
      </button>
    </div>
  </div>
</template>
