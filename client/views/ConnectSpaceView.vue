<script setup lang="ts">
import MessageListComponent from "../components/ConnectSpace/MessageListComponent.vue";

const props = defineProps(["space"]);
</script>

<template>
  <p>{{ props.space.topics }}</p>
  <MessageListComponent :space="props.space" />
</template>

<style scoped></style>
