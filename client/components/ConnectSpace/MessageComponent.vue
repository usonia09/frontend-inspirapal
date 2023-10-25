<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

library.add(fas);

const props = defineProps(["message", "spaceId"]);
const emit = defineEmits(["refreshMessages", "editMessage"]);
const { currentUsername } = storeToRefs(useUserStore());

const deleteMessage = async () => {
  try {
    await fetchy(`/api/connectspaces/${props.spaceId}/messages/${props.message._id}`, "PATCH");
  } catch {
    return;
  }
  emit("refreshMessages");
};
</script>

<template>
  <p class="author"><font-awesome-icon class="user-icon" icon="circle-user" /> {{ props.message.author }}</p>
  <p class="content">{{ props.message.content }}</p>
  <div class="base">
    <menu v-if="props.message.author == currentUsername">
      <li><button class="btn-small pure-button" @click="emit('editMessage', props.message._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deleteMessage">Delete</button></li>
    </menu>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: 0;
}

.author {
  font-weight: bold;
  margin-bottom: 10px;
}
.content,
.base {
  margin-left: 20px;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  margin-top: 10px;
}
</style>
