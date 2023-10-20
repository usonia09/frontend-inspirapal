<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
const props = defineProps(["category"]);
</script>

<template>
  <p class="category">{{ props.category }}</p>
  <PostListComponent :category="props.category" />
</template>

<style scoped></style>
