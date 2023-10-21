<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["message", "space"]);
const emit = defineEmits(["refreshMessages"]);
const { currentUsername } = storeToRefs(useUserStore());

const deleteMessage = async () => {
  try {
    await fetchy(`/connectspaces/${props.space._id}/messages/${props.message._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshMessages");
};
</script>

<template>
  <p class="author">{{ props.message.author }}</p>
  <p>{{ props.message.content }}</p>
  <div class="base">
    <menu v-if="props.message.author == currentUsername">
      <li><button class="button-error btn-small pure-button" @click="deleteMessage">Delete</button></li>
    </menu>
    <article class="timestamp">
      <p>Created on: {{ formatDate(props.message.dateCreated) }}</p>
    </article>
  </div>
</template>

<style scoped></style>
