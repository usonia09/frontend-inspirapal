<script setup lang="ts">
import MessageListComponent from "../components/ConnectSpace/MessageListComponent.vue";

const props = defineProps(["spaceId", "spaceName"]);
</script>

<template>
  <p>{{ props.spaceName }}</p>
  <MessageListComponent :spaceId="props.spaceId" />
</template>

<style scoped></style>
