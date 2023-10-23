<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const props = defineProps(["spaceId"]);
const emit = defineEmits(["refreshMessages"]);

const createMessage = async (content: string) => {
  try {
    await fetchy(`/api/connectspaces/${props.spaceId}/messages`, "PATCH", {
      body: { message: content },
    });
  } catch (_) {
    return;
  }
  emit("refreshMessages");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createMessage(content)">
    <textarea id="content" v-model="content" placeholder="Type your message ..." required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Send</button>
  </form>
</template>

<style scoped></style>
