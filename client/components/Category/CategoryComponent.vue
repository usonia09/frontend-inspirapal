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
  width: 1200px;
  height: 120px;
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  border-color: transparent;
  flex-direction: column;
  padding: 1em;
  margin: 20px;
  justify-content: center;
  text-transform: capitalize;
}
</style>
