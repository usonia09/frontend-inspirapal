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

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: 0;
}
form {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-left: 50px;
}
textarea {
  margin-right: 15px;
  width: 600px;
  padding-top: 10px;
  padding-left: 10px;
  border-radius: 10px;
}
button {
  padding: 10px;
  width: 100px;
  border-radius: 5px;
}
</style>
