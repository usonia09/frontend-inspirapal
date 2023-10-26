<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

library.add(fas);

const { isLoggedIn } = storeToRefs(useUserStore());
const props = defineProps(["space"]);

function navigateToConnectSpaceView() {
  void router.push({ path: `/community/${props.space._id}/${props.space.topic}/${props.space.organizer}` });
}
</script>

<template>
  <div class="space-item">
    <span><font-awesome-icon icon="comments" />{{ props.space.topic }}</span>
    <button @click="navigateToConnectSpaceView" v-if="isLoggedIn">Join</button>
  </div>
</template>

<style scoped>
.space-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
}
span svg {
  margin-right: 10px;
}
button {
  margin-right: 10px;
  border-color: transparent;
  background-color: rgb(28, 99, 170);
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  color: white;
}

button:hover {
  background-color: rgb(5, 74, 144);
}
</style>
