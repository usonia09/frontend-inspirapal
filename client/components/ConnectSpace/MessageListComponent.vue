<script setup lang="ts">
import CreateMessage from "@/components/ConnectSpace/CreateMessage.vue";
import MessageComponent from "@/components/ConnectSpace/MessageComponent.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const loaded = ref(false);
const props = defineProps(["spaceId"]);
let messages = ref<Array<Record<string, string>>>([]);

async function getMessages() {
  let query: Record<string, string> = {};
  let messageResults;
  try {
    messageResults = await fetchy(`/api/connectspaces/${props.spaceId}/messages`, "GET", { query });
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
      <MessageComponent :message="message" :spaceId="props.spaceId" @refreshMessages="getMessages" />
    </article>
  </section>
  <p v-else-if="loaded">No message found</p>
  <p v-else>Loading...</p>
  <section v-if="isLoggedIn">
    <CreateMessage :spaceId="props.spaceId" @refreshMessages="getMessages" />
  </section>
</template>

<style scoped></style>
