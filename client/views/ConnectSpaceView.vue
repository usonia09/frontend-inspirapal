<script setup lang="ts">
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
  <p>{{ props.spaceName }}</p>
  <MessageListComponent :spaceId="props.spaceId" />
  <button v-if="props.spaceOrganizer == currentUsername" @click="endDiscussion">End Discussion</button>
</template>

<style scoped></style>
