import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import CalendarView from "../views/CalendarView.vue";
import ConnectSpaceView from "../views/ConnectSpaceView.vue";
import HomeView from "../views/HomeView.vue";
import InCategoryView from "../views/InCategoryView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ScheduleEventView from "../views/ScheduleEventView.vue";
import SettingView from "../views/SettingView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/categories/:category",
      name: "Categories",
      component: InCategoryView,
      props: (route) => ({ category: route.params.category }),
    },

    {
      path: "/calendar",
      name: "Calendar",
      component: CalendarView,
    },

    {
      path: "/scheduler",
      name: "Scheduling",
      component: ScheduleEventView,
    },

    {
      path: "/community/:spaceId/:spaceName/:spaceOrganizer",
      name: "Community",
      component: ConnectSpaceView,
      props: (route) => ({ spaceId: route.params.spaceId, spaceName: route.params.spaceName, spaceOrganizer: route.params.spaceOrganizer }),
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
