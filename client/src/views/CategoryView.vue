<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Container from "../components/ui/Container.vue";
import Breadcrumbs from "../components/ui/Breadcrumbs.vue";

const route = useRoute();

const title = computed(() => {
  const slug = route.params.slug || "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
});

const breadcrumbs = computed(() => [
  { label: title.value },
]);
</script>

<template>
  <Container>
    <div class="pt-32 pb-12">
      <Breadcrumbs :pages="breadcrumbs" />
      <h1 class="text-[32px] font-bold tracking-[-0.5px] text-[#0b2343]">
        {{ title }}
      </h1>
    </div>
  </Container>
</template>
