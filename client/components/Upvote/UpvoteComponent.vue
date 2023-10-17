<script setup lang="ts">
import { ref } from "vue";
import { ObjectId } from "mongodb";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
let upvoteCount = ref((await fetchy(`api/posts/${props.post._id}/upvotes`, "GET")).upvotes.length);
const { currentUsername } = storeToRefs(useUserStore());

const upvotePost = async () => {
  try {
    await fetchy(`api/posts/${props.post._id}/upvotes`, "POST");
    upvoteCount.value++;
  } catch {
    await removeUpvote();
    upvoteCount.value--;
  }
};

async function removeUpvote() {
  let upvotes = (await fetchy(`api/posts/${props.post._id}/upvotes`, "GET")).upvotes;
  let userUpvote = upvotes.filter((upvote: { upvoter: string; upvote_id: ObjectId }) => upvote.upvoter == currentUsername.value)[0];
  await fetchy(`api/upvotes/${userUpvote.upvote_id}`, "DELETE");
}
</script>

<template>
  <div>
    <!--<font-awesome-icon icon="fa-solid fa-thumbs-up" @click="upvotePost" /> -->
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
