<script setup lang="ts">
import CategoryListComponent from "@/components/Category/CategoryListComponent.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import ConnectSpaceList from "../components/ConnectSpace/ConnectSpaceList.vue";

library.add(fas);

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());

function navigateToScheduling() {
  void router.push({ path: `/scheduler` });
}

function navigateToCalendar() {
  void router.push({ path: `/calendar` });
}
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <font-awesome-icon icon="calendar" @click="navigateToCalendar" />
    <font-awesome-icon icon="calendar-plus" @click="navigateToScheduling" />

    <ConnectSpaceList />
    <CategoryListComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
