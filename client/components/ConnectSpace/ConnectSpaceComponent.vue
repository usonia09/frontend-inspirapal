<script setup lang="ts">
import router from "@/router";

const props = defineProps(["space"]);

function navigateToConnectSpaceView() {
  void router.push({ path: `/community/${props.space._id}/${props.space.topic}/${props.space.organizer}` });
}
</script>

<template>
  <article @click="navigateToConnectSpaceView">{{ props.space.topic }}</article>
</template>

<style scoped>
article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  margin: 10px;
}
</style>
