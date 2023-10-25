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
    connectSpaceResult = await fetchy("/api/connectspaces", "GET", {});
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
  <h2>Ongoing Discussions:</h2>
  <section class="spaces" v-if="loaded && spaces.length !== 0">
    <article v-for="space in spaces" :key="space._id">
      <ConnectSpaceComponent :space="space" />
    </article>
  </section>
  <p v-else-if="loaded">No open discussions!</p>
  <p v-else>Loading...</p>
  <section v-if="isLoggedIn">
    <CreateConnectSpace @refreshConnectSpaces="getSpaces" />
  </section>
</template>

<style scoped></style>
