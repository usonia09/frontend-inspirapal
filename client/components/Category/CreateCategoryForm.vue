<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const name = ref("");
const emit = defineEmits(["refreshCategories"]);

const createCategory = async (name: string) => {
  try {
    await fetchy("/api/categories", "POST", {
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
    <textarea id="category-name" v-model="name" placeholder="Add a New Category!" maxlength="20" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Create Category</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 1em;
  padding: 1em;
}

textarea {
  padding-right: 10em;
  text-align: center;
}

button,
textarea {
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
