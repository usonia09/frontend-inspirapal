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

<style scoped>
button {
  width: 1400px;
  height: 120px;
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  margin: 10px;
}
</style>
