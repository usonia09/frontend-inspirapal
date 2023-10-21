<script setup lang="ts">
import router from "@/router";
const props = defineProps(["space"]);

function navigateToConnectSpaceView() {
  void router.push({ path: `/community/${props.space}` });
}
</script>

<template>
  <button @click="navigateToConnectSpaceView">{{ props.space.topic }}</button>
</template>

<style scoped></style>
