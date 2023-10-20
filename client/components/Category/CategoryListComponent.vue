<script setup lang="ts">
import CategoryComponent from "@/components/Category/CategoryComponent.vue";
import CreateCategoryForm from "@/components/Category/CreateCategoryForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const loaded = ref(false);
let categories = ref<Array<Record<string, string>>>([]);
const { isLoggedIn } = storeToRefs(useUserStore());

async function getCategories(name?: string) {
  let query: Record<string, string> = name !== undefined ? { name } : {};
  let categoryResults;
  try {
    categoryResults = await fetchy("api/categories", "GET", { query });
  } catch (_) {
    return;
  }
  categories.value = categoryResults;
}

onBeforeMount(async () => {
  await getCategories();
  loaded.value = true;
});
</script>

<template>
  <section class="categories" v-if="loaded && categories.length !== 0">
    <article v-for="category in categories" :key="category._id">
      <CategoryComponent :category="category" />
    </article>
  </section>
  <p v-else-if="loaded">No Category Found</p>
  <p v-else>Loading...</p>
  <section v-if="isLoggedIn">
    <h2>Can't find a category?</h2>
    <CreateCategoryForm @refreshCategories="getCategories" />
  </section>
</template>

<style scoped></style>
