<script setup>
import FooterSelect from "./FooterSelect.vue";
import FooterColumn from "./FooterColumn.vue";
import FooterPayments from "./FooterPayments.vue";
import FooterSocials from "./FooterSocials.vue";
import FooterMobileApps from "./FooterMobileApps.vue";

import {
  supportLinks,
  companyLinks,
  workLinks,
  footerCopyright,
} from "../../data/footerData.js";
</script>

<template>
  <footer
    class="text-white w-full"
    style="
      background-color: #0f2147;
      font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
    "
  >
    <div style="width: 80%; margin: 0 auto; padding: 40px 0 32px">
      <!-- TOP ROW: 5 columns, last one pushed to far right -->
      <div
        style="
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        "
      >
        <FooterSelect />

        <FooterMobileApps />

        <FooterColumn title="Support" :links="supportLinks" />

        <FooterColumn title="Company" :links="companyLinks" />

        <div>
          <FooterColumn title="Work With Us" :links="workLinks" />
          <FooterPayments />
        </div>
      </div>

      <!-- BOTTOM BAR -->
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
        "
      >
        <p
          style="
            font-size: 13px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
          "
        >
          {{ footerCopyright }}
        </p>
        <FooterSocials />
      </div>
    </div>
  </footer>
</template>
