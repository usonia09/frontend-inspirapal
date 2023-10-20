<script setup lang="ts">
import router from "@/router";
// import InCategoryView from "../../views/InCategoryView.vue";
const props = defineProps(["category"]);

function navigateToInCategoryView() {
  void router.push({ path: `categories/${props.category.name}` });
}
</script>

<template>
  <button @click="navigateToInCategoryView">{{ props.category.name }}</button>
  <!-- <InCategoryView :category="props.category" /> -->
</template>

<style scoped></style>
