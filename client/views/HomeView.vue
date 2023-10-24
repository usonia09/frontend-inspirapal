<script setup lang="ts">
import CategoryListComponent from "@/components/Category/CategoryListComponent.vue";
import ConnectSpaceList from "@/components/ConnectSpace/ConnectSpaceList.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

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
  <div class="container">
    <div class="items-bar">
      <div class="user-info">
        <font-awesome-icon class="user-icon" icon="circle-user" />
        <p>{{ currentUsername }}</p>
      </div>
      <div class="icon-series">
        <font-awesome-icon icon="house" />
        <font-awesome-icon icon="calendar" @click="navigateToCalendar" />
        <font-awesome-icon icon="calendar-plus" @click="navigateToScheduling" />
        <font-awesome-icon icon="comments" />
        <font-awesome-icon icon="gear" />
      </div>
      <div class="discussions">
        <ConnectSpaceList />
      </div>
    </div>
    <div class="category-bar">
      <h2>Choose Category</h2>
      <CategoryListComponent />
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
.items-bar {
  padding: 20px;
  border-right: 1px solid black;
  height: 100%;
}
.category-bar {
  padding: 20px;
}
</style>
