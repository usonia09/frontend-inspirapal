<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const topic = ref("");
const emit = defineEmits(["refreshConnectSpaces"]);

const createSpace = async (topic: string) => {
  try {
    await fetchy("/api/connectspaces", "POST", {
      body: { topic },
    });
  } catch {
    return;
  }
  emit("refreshConnectSpaces");
  emptyForm();
};

const emptyForm = () => {
  topic.value = "";
};
</script>

<template>
  <form @submit.prevent="createSpace(topic)">
    <textarea id="space-topic" v-model="topic" placeholder="Add a topic..." maxlength="27" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Start A New Discussion</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
textarea,
button {
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  background-color: var(--base-3);
}
button:hover {
  background-color: var(--base-4);
}
</style>
