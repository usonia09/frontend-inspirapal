<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const title = ref("");
const time = ref("");
const emit = defineEmits(["refreshEvents"]);

const scheduleEvent = async (title: string, time: string) => {
  try {
    await fetchy("/api/events", "POST", {
      body: { title, time },
    });
  } catch (_) {
    return;
  }
  emit("refreshEvents");
  emptyForm();
};

const emptyForm = () => {
  title.value = "";
  time.value = "";
};
</script>

<template>
  <form @submit.prevent="scheduleEvent(title, time)">
    <label for="title">Title:</label>
    <input id="title" v-model="title" required />
    <label for="time">Time:</label>
    <input type="date" id="time" v-model="time" required />
    <button type="submit" class="pure-button-primary pure-button">Schedule Event</button>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-dp);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
  width: 60vw;
  margin: auto;
  margin-top: 30px;
}
</style>
