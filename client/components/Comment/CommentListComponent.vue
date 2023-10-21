<script setup lang="ts">
import CommentComponent from "@/components/Comment/CommentComponent.vue";
import CreateComment from "@/components/Comment/CreateComment.vue";
import EditComment from "@/components/Comment/EditComment.vue";
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
    commentResults = await fetchy(`/api/posts/${props.post._id}/comments`, "GET", {});
  } catch (_) {
    return;
  }
  comments.value = commentResults;
}

function updateEditing(id: string) {
  editing.value = id;
  console.log(editing.value);
}

onBeforeMount(async () => {
  await getComments();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <CreateComment :post="props.post" @refreshComments="getComments" />
  </section>
  <section class="comments" v-if="loaded && comments.length !== 0">
    <article v-for="comment in comments" :key="comment._id">
      {{ "comment id: " + comment._id }}
      {{ "editing val:" + editing }}
      <CommentComponent v-if="editing !== comment._id" :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
      <EditComment v-else :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No comments found!</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
