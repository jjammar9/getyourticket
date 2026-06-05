<script setup>
import FooterSelect from "../footer/FooterSelect.vue";
import FooterColumn from "../footer/FooterColumn.vue";
import FooterPayments from "../footer/FooterPayments.vue";
import FooterSocials from "../footer/FooterSocials.vue";
import FooterMobileApps from "../footer/FooterMobileApps.vue";
import Container from "../ui/Container.vue";

import {
  supportLinks,
  companyLinks,
  workLinks,
  footerCopyright,
} from "../../data/footerData.js";
</script>

<template>
  <footer
    class="w-full bg-[#0f2147] text-white"
  >
    <Container>
      <div class="py-20">
        <!-- TOP ROW -->
        <div class="flex items-start justify-between gap-x-8 lg:gap-x-16">
            <div>
              <FooterSelect />

              <p class="text-[13px] font-medium text-white mt-6">
                {{ footerCopyright }}
              </p>
            </div>

            <FooterMobileApps />

            <FooterColumn title="Support" :links="supportLinks" />

            <FooterColumn title="Company" :links="companyLinks" />

            <div>
              <FooterColumn title="Work With Us" :links="workLinks" />

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
