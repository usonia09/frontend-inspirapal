<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, onUnmounted } from "vue";
import MessageListComponent from "../components/ConnectSpace/MessageListComponent.vue";

const props = defineProps(["spaceId", "spaceName", "spaceOrganizer"]);
const emit = defineEmits(["refreshConnectSpaces"]);
const { currentUsername } = storeToRefs(useUserStore());

onBeforeMount(async () => {
  await fetchy(`/api/connectspaces/${props.spaceId}/join`, "PATCH");
});

const endDiscussion = async () => {
  try {
    await fetchy(`/api/connectspaces/${props.spaceId}/end`, "DELETE");
    void router.push({ name: "Home" });
  } catch {
    return;
  }
  emit("refreshConnectSpaces");
};

onUnmounted(async () => {
  await fetchy(`/api/connectspaces/${props.spaceId}/leave`, "PATCH");
});
</script>

<template>
  <div class="space">
    <h2>{{ props.spaceName }}</h2>
    <MessageListComponent :spaceId="props.spaceId" />
    <button v-if="props.spaceOrganizer == currentUsername" @click="endDiscussion">End Discussion</button>
  </div>
</template>

<style scoped>
.space {
  margin: 0 auto;
}
h2 {
  text-align: center;
}
</style>
