<script setup lang="ts">
import router from "@/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

const props = defineProps(["space"]);

function navigateToConnectSpaceView() {
  void router.push({ path: `/community/${props.space._id}/${props.space.topic}/${props.space.organizer}` });
}
</script>

<template>
  <button @click="navigateToConnectSpaceView"><font-awesome-icon icon="comments" />{{ props.space.topic }}</button>
</template>

<style scoped>
button {
  display: flex;
  margin-top: 10px;
  border-color: transparent;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
}
button svg {
  margin-right: 10px;
}

button:hover {
  background-color: var(--base-bg);
}
</style>
