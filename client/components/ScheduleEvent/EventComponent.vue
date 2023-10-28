<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
      <li><font-awesome-icon class="pencil" icon="pencil" @click="emit('editEvent', props.event._id)" /></li>
      <li><font-awesome-icon class="cancel" icon="xmark" @click="cancelEvent" style="color: red; font-size: 24px" /></li>
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
  align-items: center;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base article:only-child {
  margin-left: auto;
}

svg:hover {
  cursor: pointer;
}
</style>
