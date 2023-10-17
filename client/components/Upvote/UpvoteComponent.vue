<script setup lang="ts">
import { ref } from "vue";
import { ObjectId } from "mongodb";
import { storeToRefs } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/stores/user";
import { fetchy } from "../../utils/fetchy";

library.add(fas);
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
    <font-awesome-icon icon="thumbs-up" @click="upvotePost" />
    <span>{{ upvoteCount }}</span>
  </div>
</template>

<style scoped>
div {
  font-size: 1em;
  display: flex;
  padding: 5px;
}
span {
  margin-left: 5px;
}
</style>
