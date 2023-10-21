<script setup lang="ts">
import CommentListComponent from "@/components/Comment/CommentListComponent.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const props = defineProps(["post"]);
const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Comment Page</h1>
    <section>
      <PostComponent :post="props.post" />
    </section>
    <CommentListComponent :post="props.post" />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
