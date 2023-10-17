<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
let upvotes = (await fetchy(`api/posts/${props.post._id}/upvotes`, "GET")).upvotes;
let upvoteCount = ref(upvotes.length);
const { currentUsername } = storeToRefs(useUserStore());

const upvotePost = async () => {
  try {
    await fetchy(`api/posts/${props.post._id}/upvotes`, "POST");
    upvoteCount.value++;
  } catch {
    //    try {
    //      await removeUpvote(upvotes, currentUsername);
    //      upvoteCount.value--;
    //    } catch {
    //      return;
    //    }
    await removeUpvote(upvotes, currentUsername);
    upvoteCount.value--;
    return;
  }
};

async function removeUpvote(upvotes, currentUsername) {
  let userUpvote = upvotes.filter((upvote) => upvote.upvoter === currentUsername.value)[0];
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
