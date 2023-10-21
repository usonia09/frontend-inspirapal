<script setup lang="ts">
import ConnectSpaceComponent from "@/components/ConnectSpace/ConnectSpaceComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import CreateConnectSpace from "./CreateConnectSpace.vue";

const loaded = ref(false);
let spaces = ref<Array<Record<string, string>>>([]);
const { isLoggedIn } = storeToRefs(useUserStore());

async function getSpaces() {
  let connectSpaceResult;
  try {
    connectSpaceResult = await fetchy("/api/events", "GET", {});
  } catch (_) {
    return;
  }
  spaces.value = connectSpaceResult;
}

onBeforeMount(async () => {
  await getSpaces();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Start a new Discussion:</h2>
    <CreateConnectSpace @refreshConnectSpacs="getSpaces" />
  </section>
  <section class="spaces" v-if="loaded && spaces.length !== 0">
    <h2>Ongoing Discussions:</h2>
    <article v-for="space in spaces" :key="space._id">
      <ConnectSpaceComponent :space="space" />
    </article>
  </section>
  <p v-else-if="loaded">No open discussions!</p>
  <p v-else>Loading...</p>
</template>

<style scoped></style>
