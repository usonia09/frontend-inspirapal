<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["event"]);
const emit = defineEmits(["editEvent", "refreshEvents"]);
const { currentUsername } = storeToRefs(useUserStore());

const cancelEvent = async () => {
  try {
    await fetchy(`/api/events/${props.event._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshEvents");
};
</script>

<template>
  <p class="title">{{ props.event.title }}</p>
  <p>Organized by: {{ props.event.scheduler }}</p>
  <p>Scheduled on: {{ props.event.time }}</p>
  <div class="base">
    <menu v-if="props.event.scheduler == currentUsername">
      <li><button class="btn-small pure-button" @click="emit('editEvent', props.event._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="cancelEvent">Cancel</button></li>
    </menu>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.title {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base article:only-child {
  margin-left: auto;
}
</style>
