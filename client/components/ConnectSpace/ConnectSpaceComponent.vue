<script setup lang="ts">
import router from "@/router";

const props = defineProps(["space"]);

function navigateToConnectSpaceView() {
  void router.push({ path: `/community/${props.space._id}/${props.space.topic}/${props.space.organizer}` });
}
</script>

<template>
  <button @click="navigateToConnectSpaceView">{{ props.space.topic }}</button>
</template>

<style scoped></style>
