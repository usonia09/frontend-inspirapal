<script setup lang="ts">
import router from "@/router";

const props = defineProps(["space"]);

function navigateToConnectSpaceView() {
  console.log(props.space);
  void router.push({ path: `/community/${props.space._id}` });
}
</script>

<template>
  <button @click="navigateToConnectSpaceView">{{ props.space.topic }}</button>
</template>

<style scoped></style>
