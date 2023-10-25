<script setup lang="ts">
import { useUserStore } from "@/stores/user";
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
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: 0;
}
.author {
  font-weight: bold;
}
menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
}
button {
  padding: 5px;
  border-radius: 5px;
}
</style>
