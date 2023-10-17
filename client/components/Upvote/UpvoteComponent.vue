<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
let upvotes = (await fetchy(`api/posts/${props.post._id}/upvotes`, "GET")).upvotes;
let upvoteCount = ref(upvotes.length);

const upvotePost = async () => {
  try {
    await fetchy(`api/posts/${props.post._id}/upvotes`, "POST");
  } catch {
    return;
  }
  upvoteCount.value++;
};
</script>

<template>
  <div>
    <font-awesome-icon icon="fa-solid fa-thumbs-up" @click="upvotePost" />
    <button @click="upvotePost">Upvote</button>
    <span>{{ upvoteCount }}</span>
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
}
button {
  margin: 5px;
}
</style>
