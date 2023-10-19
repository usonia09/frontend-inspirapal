<script setup lang="ts">
const props = defineProps(["category"]);
</script>

<template>
  <p class="category">{{ props.category.name }}</p>
</template>

<style scoped></style>
