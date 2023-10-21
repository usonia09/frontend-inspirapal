<script setup lang="ts">
import ConnectSpaceComponent from "@/components/ConnectSpace/ConnectSpaceComponent.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";

const props = defineProps(["space"]);
const loaded = ref(false);
let spaces = ref<Array<Record<string, string>>>([]);

async function getSpaces() {
  let connectSpaceResult;
  try {
    connectSpaceResult = await fetchy("/api/events", "GET", {});
  } catch (_) {
    return;
  }
  connectSpaceResult.value = connectSpaceResult;
}

onBeforeMount(async () => {
  await getSpaces();
  loaded.value = true;
});
</script>

<template>
  <section class="spaces" v-if="loaded && spaces.length !== 0">
    <article v-for="space in spaces" :key="space._id">
      <ConnectSpaceComponent :space="space" @refreshConnectSpace="getSpaces" />
    </article>
  </section>
  <p v-else-if="loaded">No open discussions!</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
