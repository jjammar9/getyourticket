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
    class="w-full bg-[#0f2147] text-white mt-24"
    style="
      font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
    "
  >
    <Container>
      <div class="py-20">
        <!-- TOP ROW -->
        <div class="max-w-[1100px] mx-auto">
          <div class="flex items-start justify-between">
            <FooterSelect />

            <FooterMobileApps />

            <FooterColumn title="Support" :links="supportLinks" />

            <FooterColumn title="Company" :links="companyLinks" />

            <div>
              <FooterColumn title="Work With Us" :links="workLinks" />

              <div class="mt-8">
                <FooterPayments />
              </div>
            </div>
          </div>
        </div>

        <!-- BOTTOM BAR -->
        <div
          class="flex items-center justify-between mt-20 pt-8 border-t border-white/10"
        >
          <p class="text-[13px] font-medium text-white/70">
            {{ footerCopyright }}
          </p>

          <FooterSocials />
        </div>
      </div>
    </Container>
  </footer>
</template>
