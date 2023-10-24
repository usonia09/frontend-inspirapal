<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["event"]);
const title = ref(props.event.title);
const time = ref(props.event.time);
const emit = defineEmits(["editEvent", "refreshEvents"]);

const editEvent = async (title: string, time: string) => {
  try {
    await fetchy(`/api/events/${props.event._id}`, "PATCH", { body: { update: { title: title, time: time } } });
  } catch (_) {
    return;
  }
  emit("editEvent");
  emit("refreshEvents");
};
</script>

<template>
  <form @submit.prevent="editEvent(title, time)">
    <input id="title" v-model="title" required />
    <input id="time" v-model="time" required />
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editEvent')">Cancel</button></li>
      </menu>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

p {
  margin: 0em;
}

.author {
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

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
