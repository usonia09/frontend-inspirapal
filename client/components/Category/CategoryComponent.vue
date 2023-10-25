<script setup lang="ts">
import router from "@/router";

const props = defineProps(["category"]);

function navigateToInCategoryView() {
  void router.push({ path: `categories/${props.category.name}` });
}
</script>

<template>
  <button @click="navigateToInCategoryView">
    <h2>{{ props.category.name }}</h2>
  </button>
</template>

<style scoped>
button {
  width: 1400px;
  height: 120px;
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  border-color: transparent;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  margin: 10px;
  justify-content: center;
  text-transform: capitalize;
}
</style>
