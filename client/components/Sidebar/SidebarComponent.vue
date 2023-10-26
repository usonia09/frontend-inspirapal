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
    <div class="logo">
      <img src="@/assets/images/logo.svg" />
      <h1>InspiraPal</h1>
    </div>
    <div class="user-info">
      <font-awesome-icon class="user-icon" icon="circle-user" />
      <button class="login-button" v-if="isLoggedIn">{{ currentUsername }}</button>
      <button class="login-button" v-else @click="navigateToSettings">Please Login!</button>
    </div>
    <div class="icon-series">
      <button class="navigation-icon" @click="navigateToHome">
        <font-awesome-icon icon="house" />
        Home
      </button>
      <button class="navigation-icon" @click="navigateToCalendar">
        <font-awesome-icon icon="calendar" />
        Discussion Calendar
      </button>

      <button class="navigation-icon" @click="navigateToScheduling">
        <font-awesome-icon icon="calendar-plus" />
        Schedule Discussion
      </button>

      <button class="navigation-icon" @click="navigateToSettings">
        <font-awesome-icon icon="gear" />
        Settings
      </button>
    </div>

    <div class="discussions">
      <ConnectSpaceList />
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Ribeye+Marrow&family=The+Nautigal&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.items-bar {
  padding: 20px;
  height: 100%;
  font-size: 18px;
  width: 400px;
  position: fixed;
}
.logo {
  display: flex;
  align-items: center;
}
.logo h1 {
  font-family: "Open Sans", sans-serif;
  font-family: "Ribeye Marrow", serif;
  font-family: "The Nautigal", cursive;
  font-size: 50px;
  margin-left: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  font-size: 20px;
}
.user-info svg {
  font-size: 5em;
  padding-bottom: 5px;
}
.icon-series {
  margin: 10px;
}
button {
  display: flex;
  margin-top: 10px;
  border-color: transparent;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
}
.navigation-icon svg {
  margin-right: 10px;
  width: 20px;
}

button:hover {
  background-color: var(--base-bg);
}

.discussions {
  margin: 10px;
}
</style>
