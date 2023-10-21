<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import CreateMessage from "../ConnectSpace/CreateMessage.vue";
import MessageComponent from "../ConnectSpace/MessageComponent.vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
const props = defineProps(["space"]);
let messages = ref<Array<Record<string, string>>>([]);

async function getMessages() {
  let messageResults;
  try {
    messageResults = await fetchy(`/connectspaces/${props.space._id}/messages`, "GET", {});
  } catch (_) {
    return;
  }
  messages.value = messageResults;
}

onBeforeMount(async () => {
  await getMessages();
  loaded.value = true;
});
</script>

<template>
  <section class="messages" v-if="loaded && messages.length !== 0">
    <article v-for="message in messages" :key="message._id">
      <MessageComponent :message="message" :space="props.space" @refreshMessages="getMessages" />
    </article>
  </section>
  <p v-else-if="loaded">No message found</p>
  <p v-else>Loading...</p>
  <section v-if="isLoggedIn">
    <CreateMessage :space="props.space" @refreshMessages="getMessages" />
  </section>
</template>

<style scoped></style>
