<script setup lang="ts">
import router from "@/router";

const props = defineProps(["category"]);

function navigateToInCategoryView() {
  void router.push({ path: `categories/${props.category.name}` });
}
</script>

<template>
  <button @click="navigateToInCategoryView">{{ props.category.name }}</button>
</template>

<style scoped></style>
