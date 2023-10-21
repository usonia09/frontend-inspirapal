<script setup lang="ts">
import CategoryListComponent from "@/components/Category/CategoryListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import ConnectSpaceList from "../components/ConnectSpace/ConnectSpaceList.vue";
import CreateConnectSpace from "../components/ConnectSpace/CreateConnectSpace.vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <section>
      <h1 v-if="isLoggedIn">Welcome {{ currentUsername }}!</h1>
      <h1 v-else>Please login!</h1>
    </section>
    <CreateConnectSpace />
    <ConnectSpaceList />
    <p>------</p>
    <CategoryListComponent />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
