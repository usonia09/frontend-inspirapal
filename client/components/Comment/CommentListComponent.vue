<script setup lang="ts">
import CreateComment from "@/components/Comment/CreateComment.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const props = defineProps(["post"]);
const loaded = ref(false);
let comments = ref<Array<Record<string, string>>>([]);
let editing = ref("");

async function getComments() {
  let commentResults;
  try {
    commentResults = await fetchy(`/posts/${props.post._id}/comments`, "GET", {});
  } catch (_) {
    return;
  }
  comments.value = commentResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getComments();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <CreateComment @refreshComments="getComments" />
  </section>
  <section class="comments" v-if="loaded && comments.length !== 0">
    <article v-for="comment in comments" :key="comment._id">
      <PostComponent v-if="editing !== comment._id" :comment="comment" @refreshComments="getComments" @editCommit="updateEditing" />
      <EditPostForm v-else :comment="comment" @refreshComments="getComments" @editPost="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No comments found!</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
