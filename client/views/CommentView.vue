<script setup lang="ts">
import CommentListComponent from "@/components/Comment/CommentListComponent.vue";
import PostComponent from "@/components/Post/PostComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

// TODO:somehow get the prop for which post we are checking out comment for
// use that to filter which postcomponet to show as welll as the commentlist to show

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Comment Page</h1>
    <section>
      <PostComponent />
    </section>
    <CommentListComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
