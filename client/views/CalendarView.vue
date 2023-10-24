<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const loaded = ref(false);
let events = ref<Array<Record<string, string>>>([]);
let editing = ref("");

async function getEvents(scheduler?: string) {
  let query: Record<string, string> = scheduler !== undefined ? { scheduler } : {};
  let eventResults;
  try {
    eventResults = await fetchy("/api/posts", "GET", { query });
  } catch (_) {
    return;
  }

  events.value = eventResults;
}

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getEvents();
  loaded.value = true;
});
</script>

<template>
  <section class="events" v-if="loaded && events.length !== 0">
    <article v-for="event in events" :key="event._id">
      <EventComponent v-if="editing !== event._id" :event="event" @refreshEvents="getEvents" @editEvent="updateEditing" />
      <EditEventComponent v-else :event="event" @refreshPosts="getEvents" @editEvent="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No scheduled events</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.events {
  padding: 1em;
}
</style>
