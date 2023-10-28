<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const content = ref("");
const emit = defineEmits(["refreshComments"]);

const addComment = async (content: string) => {
  try {
    await fetchy(`/api/posts/${props.post._id}/comments`, "POST", {
      body: { content },
    });
  } catch (e) {
    return;
  }
  emit("refreshComments");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="addComment(content)">
    <textarea id="content" v-model="content" placeholder="Add a comment..." required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Comment</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}
button {
  background-color: var(--base-3);
}
button:hover {
  background-color: var(--base-4);
}
</style>
