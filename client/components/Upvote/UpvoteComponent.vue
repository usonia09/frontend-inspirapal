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
let upvotes = (await fetchy(`api/posts/${props.post._id}/upvotes`, "GET")).upvotes;
let upvoteCount = ref(upvotes.length);
let upvoters = upvotes.map((upvote: { upvoter: string; upvote_id: ObjectId }) => upvote.upvoter);
const { currentUsername } = storeToRefs(useUserStore());
let iconColor = ref("");

if (upvoters.includes(currentUsername.value)) {
  iconColor.value = "#0078e7";
}

const upvotePost = async () => {
  try {
    await fetchy(`api/posts/${props.post._id}/upvotes`, "POST");
    upvoteCount.value++;
    iconColor.value = "#0078e7";
  } catch {
    await removeUpvote();
    upvoteCount.value--;
    iconColor.value = "";
  }
};

async function removeUpvote() {
  let upvotes = (await fetchy(`api/posts/${props.post._id}/upvotes`, "GET")).upvotes;
  let userUpvote = upvotes.filter((upvote: { upvoter: string; upvote_id: ObjectId }) => upvote.upvoter == currentUsername.value)[0];
  await fetchy(`api/upvotes/${userUpvote.upvote_id}`, "DELETE");
}

function upvoteColor() {}
</script>

<template>
  <div>
    <font-awesome-icon icon="thumbs-up" @click="upvotePost" :style="{ color: iconColor }" />
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
svg-inline-fa {
  color: "#0078e7";
}
</style>
