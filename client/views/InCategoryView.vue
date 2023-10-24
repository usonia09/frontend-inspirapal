<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
const props = defineProps(["category"]);
</script>

<template>
  <div class="category">
    <h1>{{ props.category }}</h1>
    <PostListComponent :category="props.category" />
  </div>
</template>

<style scoped>
.category {
  margin: 2em;
}
h1 {
  text-align: center;
}
</style>
