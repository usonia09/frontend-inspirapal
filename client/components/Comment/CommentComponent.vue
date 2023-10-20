<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["comment"]);
const emit = defineEmits(["editComment", "refreshComments"]);
const { currentUsername } = storeToRefs(useUserStore());

const deleteComment = async () => {
  try {
    await fetchy(`/api/comments/${props.comment._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshComments");
};
</script>

<template>
  <p class="author">{{ props.comment.author }}</p>
  <p>{{ props.comment.content }}</p>
  <div class="base">
    <menu v-if="props.comment.author == currentUsername">
      <li><button class="btn-small pure-button" @click="emit('editComment', props.comment._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deleteComment">Delete</button></li>
    </menu>
    <article class="timestamp">
      <p v-if="props.comment.dateCreated !== props.comment.dateUpdated">Edited on: {{ formatDate(props.comment.dateUpdated) }}</p>
      <p v-else>Created on: {{ formatDate(props.comment.dateCreated) }}</p>
    </article>
  </div>
</template>

<style scoped></style>
