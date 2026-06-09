<script setup>
import FooterSelect from "../footer/FooterSelect.vue";
import FooterColumn from "../footer/FooterColumn.vue";
import FooterPayments from "../footer/FooterPayments.vue";
import FooterSocials from "../footer/FooterSocials.vue";
import FooterMobileApps from "../footer/FooterMobileApps.vue";
import Container from "../ui/Container.vue";
import { ref, onMounted } from "vue";
import { getSiteContent } from "../../api.js";
import { useLocaleStore } from "../../stores/localeStore.js";

const localeStore = useLocaleStore();

const supportLinks = ref([]);
const companyLinks = ref([]);
const workLinks = ref([]);

onMounted(async () => {
  try {
    const footerLinks = await getSiteContent("footerLinks");
    supportLinks.value = footerLinks?.support || [];
    companyLinks.value = footerLinks?.company || [];
    workLinks.value = footerLinks?.work || [];
  } catch (e) {
    console.error("Failed to load footer links", e);
  }
});
</script>

<template>
  <footer
    class="w-full bg-[#0f2147] text-white"
  >
    <Container>
      <div class="py-20">
        <!-- TOP ROW -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            <div class="sm:col-span-2 lg:col-span-1">
              <FooterSelect />

              <p class="text-[13px] font-medium text-white mt-6">
                {{ localeStore.t("footer.copyright") }}
              </p>
            </div>

            <div class="sm:col-span-2 lg:col-span-1">
              <FooterMobileApps />
            </div>

            <FooterColumn :title="localeStore.t('footer.columnSupport')" :links="supportLinks" />

            <FooterColumn :title="localeStore.t('footer.columnCompany')" :links="companyLinks" />

            <div class="sm:col-span-2 lg:col-span-1">
              <FooterColumn :title="localeStore.t('footer.columnWorkWithUs')" :links="workLinks" />

              <div class="mt-8">
                <FooterPayments />
              </div>

              <div class="mt-8">
                <FooterSocials />
              </div>
            </div>
          </div>
      </div>
    </Container>
  </footer>
</template>
