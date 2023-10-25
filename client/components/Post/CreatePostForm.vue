<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const props = defineProps(["categoryName"]);
const label = ref(props.categoryName);
const emit = defineEmits(["refreshPosts"]);

const createPost = async (content: string, label: string) => {
  try {
    await fetchy("/api/posts", "POST", {
      body: { content, label },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createPost(content, label)">
    <label for="content"><b>Post Contents:</b></label>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <p>Post Category</p>
    <label for="content">Common categories:</label>
    <select name="label" id="label" v-model="label">
      <option value="Photography">Photography</option>
      <option value="Drawing">Drawing</option>
      <option value="Painting">Painting</option>
      <option value="Poetry">Poetry</option>
      <option value="Dance">Dance</option>
      <option value="Cooking">Cooking</option>
    </select>
    <label for="content">Create a new category:</label>
    <input id="label" v-model="label" required />
    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
  </form>
</template>

<style scoped>
p {
  font-weight: bold;
}
form {
  background-color: rgb(143, 139, 139);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
