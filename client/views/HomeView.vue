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

.category-bar h2 {
  padding: 20px;
}
</style>

<!-- 
.logo {
  display: flex;
  font-family: "Open Sans", sans-serif;
  font-family: "Ribeye Marrow", serif;
  font-family: "The Nautigal", cursive;
  font-size: 30px;
  justify-content: center;
}
.logo h1 {
  padding-left: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  align-items: center;
  margin: 20px;
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
} -->
