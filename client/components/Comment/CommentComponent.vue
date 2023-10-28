<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { fetchy } from "../../utils/fetchy";

library.add(fas);

const props = defineProps(["comment"]);
const emit = defineEmits(["editComment", "refreshComments"]);
const { currentUsername } = storeToRefs(useUserStore());

const deleteComment = async () => {
  try {
    await fetchy(`/api/comments/${props.comment._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshComments");
};
</script>

<template>
  <p class="author">{{ props.comment.author }}</p>
  <p>{{ props.comment.content }}</p>
  <div class="base">
    <menu v-if="props.comment.author == currentUsername">
      <li><font-awesome-icon class="pencil" icon="pencil" @click="emit('editComment', props.comment._id)" /></li>
      <li><font-awesome-icon id="trash" icon="trash" @click="deleteComment" /></li>
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
}
menu {
  list-style-type: none;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 1em;
}
button {
  padding: 5px;
  border-radius: 5px;
}

svg:hover {
  cursor: pointer;
}
</style>
