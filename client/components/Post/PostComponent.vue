<script setup lang="ts">
import CommentListComponent from "@/components/Comment/CommentListComponent.vue";
import UpvoteComponent from "@/components/Upvote/UpvoteComponent.vue";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const commentsShowing = ref(false);
const commentCount = ref(0);
const emit = defineEmits(["editPost", "refreshPosts"]);
const { currentUsername } = storeToRefs(useUserStore());

const deletePost = async () => {
  try {
    await fetchy(`/api/posts/${props.post._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshPosts");
};

function showCommentsToggle() {
  commentsShowing.value = !commentsShowing.value;
}

const getCommentCount = async () => {
  let comments;
  try {
    comments = await fetchy(`/api/posts/${props.post._id}/comments`, "GET");
  } catch {
    return;
  }
  commentCount.value = comments.length;
};

onBeforeMount(async () => {
  await getCommentCount();
});
</script>

<template>
  <p class="author">{{ props.post.author }}</p>
  <p>{{ props.post.content }}</p>
  <div class="base">
    <menu v-if="props.post.author == currentUsername">
      <li><font-awesome-icon class="pencil" icon="pencil" @click="emit('editPost', props.post._id)" /></li>
      <li><font-awesome-icon class="trash" icon="trash" @click="deletePost" /></li>
    </menu>
    <Suspense>
      <UpvoteComponent :post="props.post" />
    </Suspense>
    <span><font-awesome-icon icon="comment" @click="showCommentsToggle" /> {{ commentCount }}</span>

    <article class="timestamp">
      <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
    </article>
  </div>
  <CommentListComponent v-if="commentsShowing" :post="props.post" @refreshCommentsCount="getCommentCount" />
</template>

<style scoped>
p {
  margin: 0em;
}

span {
  cursor: pointer;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}

svg:hover {
  cursor: pointer;
}
</style>
