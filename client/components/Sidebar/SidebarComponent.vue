<script setup lang="ts">
import ConnectSpaceList from "@/components/ConnectSpace/ConnectSpaceList.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

library.add(fas);

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

function navigateToSettings() {
  void router.push({ name: "Settings" });
}

function navigateToHome() {
  void router.push({ name: "Home" });
}

function navigateToScheduling() {
  void router.push({ path: `/scheduler` });
}

function navigateToCalendar() {
  void router.push({ path: `/calendar` });
}
</script>

<template>
  <div class="items-bar">
    <div class="user-info">
      <font-awesome-icon class="user-icon" icon="circle-user" />
      <p v-if="isLoggedIn">{{ currentUsername }}</p>
      <p v-else>Please Login!</p>
    </div>
    <div class="icon-series">
      <div class="navigation-icon" @click="navigateToHome">
        <font-awesome-icon icon="house" />
        <p>Home</p>
      </div>
      <div class="navigation-icon" @click="navigateToCalendar">
        <font-awesome-icon icon="calendar" />
        <p>Event Calendar</p>
      </div>

      <div class="navigation-icon" @click="navigateToScheduling">
        <font-awesome-icon icon="calendar-plus" />
        <p>Schedule Event</p>
      </div>

      <div class="navigation-icon">
        <font-awesome-icon icon="comments" />
        <p>Start a Discussion</p>
      </div>

      <div class="navigation-icon" @click="navigateToSettings">
        <font-awesome-icon icon="gear" />
        <p>Settings</p>
      </div>
    </div>
    <div class="discussions">
      <ConnectSpaceList />
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
}

.user-info {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  align-items: center;
  margin-bottom: 30px;
}
.user-info svg {
  margin-bottom: 10px;
  font-size: 8em;
}
.navigation-icon {
  display: flex;
  margin-top: 10px;
  font-size: 18px;
  align-items: center;
}
.navigation-icon :hover {
  cursor: pointer;
  color: rgb(30, 103, 207);
}
.navigation-icon svg {
  font-size: 30px;
  margin-right: 10px;
}

.items-bar {
  padding: 20px;
  height: 100%;
}

.category-bar h2 {
  padding: 20px;
}
</style>
