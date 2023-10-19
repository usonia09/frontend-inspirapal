<script setup lang="ts">
import { fetchy } from "../../utils/fetchy";
import { ref } from "vue";

const name = ref("");
const emit = defineEmits(["refreshCategories"]);

const createCategory = async (name: string) => {
  try {
    await fetchy("api/categories", "POST", {
      body: { name },
    });
  } catch {
    return;
  }
  emit("refreshCategories");
  emptyForm();
};

const emptyForm = () => {
  name.value = "";
};
</script>

<template>
  <form @submit.prevent="createCategory(name)">
    <textarea id="category-name" v-model="name" placeholder="Add a New Category!" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Category</button>
  </form>
</template>

<style scoped></style>
