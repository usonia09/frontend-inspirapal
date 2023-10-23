<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount } from "vue";
import MessageListComponent from "../components/ConnectSpace/MessageListComponent.vue";

const props = defineProps(["spaceId", "spaceName"]);

onBeforeMount(async () => {
  await fetchy(`/api/connectspaces/${props.spaceId}/join`, "PATCH");
});
</script>

<template>
  <p>{{ props.spaceName }}</p>
  <MessageListComponent :spaceId="props.spaceId" />
</template>

<style scoped></style>
