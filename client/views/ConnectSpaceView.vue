<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { onBeforeMount, onUnmounted, ref } from "vue";
import MessageListComponent from "../components/ConnectSpace/MessageListComponent.vue";

library.add(fas);

const props = defineProps(["spaceId", "spaceName", "spaceOrganizer"]);
const participantCount = ref(0);
const emit = defineEmits(["refreshConnectSpaces"]);
const { currentUsername } = storeToRefs(useUserStore());

onBeforeMount(async () => {
  await fetchy(`/api/connectspaces/${props.spaceId}/join`, "PATCH");
  await getParticipantCount();
});

const endDiscussion = async () => {
  try {
    await fetchy(`/api/connectspaces/${props.spaceId}/end`, "DELETE");
    void router.push({ name: "Home" });
  } catch {
    return;
  }
  emit("refreshConnectSpaces");
};

const getParticipantCount = async () => {
  let participants;
  try {
    participants = await fetchy(`/api/connectspaces/${props.spaceId}/participants`, "GET");
  } catch (_) {
    return;
  }
  participantCount.value = participants.length;
};

const leave = async () => {
  try {
    await fetchy(`/api/connectspaces/${props.spaceId}/leave`, "PATCH");
    void router.push({ name: "Home" });
  } catch (_) {
    return;
  }
};

onUnmounted(async () => {
  await leave();
});
</script>

<template>
  <div class="space">
    <div class="space-description">
      <div class="name">
        <font-awesome-icon icon="comments" />
        <h2>{{ props.spaceName }}</h2>
      </div>
      <div class="participants">
        <font-awesome-icon icon="people-group" />
        <p>{{ participantCount }}</p>
      </div>
    </div>
    <div class="engage">
      <div class="message-area">
        <MessageListComponent :spaceId="props.spaceId" />
      </div>
      <div class="action-items">
        <button id="leave" @click="leave"><font-awesome-icon icon="right-from-bracket" /> Leave</button>
        <button id="end" v-if="props.spaceOrganizer == currentUsername" @click="endDiscussion">End Discussion</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.space-description {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}
.name {
  display: flex;
  align-items: center;
}
.name svg {
  font-size: 40px;
  margin-left: 15px;
  margin-right: 15px;
}
.participants {
  display: flex;
  margin-right: 40px;
  align-items: center;
}

.participants svg {
  font-size: 30px;
  margin-right: 15px;
}
.engage {
  display: flex;
  position: relative;
}
.message-area {
  width: 84%;
}
.action-items {
  position: absolute;
  bottom: 20px;
  right: 40px;
}

.action-items button {
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  border-color: transparent;
}
button:hover {
  cursor: pointer;
}

#end {
  color: white;
  font-weight: bold;
  background-color: var(--red);
}
</style>
