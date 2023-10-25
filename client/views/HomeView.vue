<script setup lang="ts">
import CategoryListComponent from "@/components/Category/CategoryListComponent.vue";
import SidebarComponent from "@/components/Sidebar/SidebarComponent.vue";
</script>

<template>
  <div class="container">
    <div class="items-bar">
      <SidebarComponent />
    </div>
    <div class="category-bar">
      <h2>Choose Category:</h2>
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
.category-bar {
  position: absolute;
  margin-left: 360px;
}
.category-bar h2 {
  padding: 20px;
}
</style>
