import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";

import LoginView from "../views/LoginView.vue";
import RequestResetView from "../views/RequestResetView.vue";
import ConfirmResetView from "../views/ConfirmResetView.vue";

import TagsListView from "../views/TagsListView.vue";
import TagsCreateView from "../views/TagsCreateView.vue";
import TagsDetailView from "../views/TagsDetailView.vue";
import TagsUpdateView from "../views/TagsUpdateView.vue";

import CategoriesListView from "../views/CategoriesListView.vue";
import CategoriesCreateView from "../views/CategoriesCreateView.vue";
import CategoriesDetailView from "../views/CategoriesDetailView.vue";
import CategoriesUpdateView from "../views/CategoriesUpdateView.vue";
import CategoriesTagsUpdateView from "../views/CategoriesTagsUpdateView.vue";
import CategoriesTagsAddView from "../views/CategoriesTagsAddView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/tags",
    name: "Tags",
    component: TagsListView,
  },
  {
    meta: { requiresAuth: true },
    path: "/tags/create",
    name: "TagsCreate",
    component: TagsCreateView,
  },
  {
    path: "/tags/:id",
    name: "TagsDetail",
    component: TagsDetailView,
  },
  {
    meta: { requiresAuth: true },
    path: "/tags/:id/edit",
    name: "TagsUpdate",
    component: TagsUpdateView,
  },
  {
    path: "/categories",
    name: "Categories",
    component: CategoriesListView,
  },
  {
    meta: { requiresAuth: true },
    path: "/categories/create",
    name: "CategoriesCreate",
    component: CategoriesCreateView,
  },
  {
    path: "/categories/:id",
    name: "CategoriesDetail",
    component: CategoriesDetailView,
  },
  {
    meta: { requiresAuth: true },
    path: "/categories/:id/edit",
    name: "CategoriesUpdate",
    component: CategoriesUpdateView,
  },
  {
    meta: { requiresAuth: true },
    path: "/categories/:id/tags",
    name: "CategoriesTagsUpdate",
    component: CategoriesTagsUpdateView,
  },
  {
    meta: { requiresAuth: true },
    path: "/categories/:id/tags/add",
    name: "CategoriesTagsAdd",
    component: CategoriesTagsAddView,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/auth/request_reset",
    name: "RequestReset",
    component: RequestResetView,
  },
  {
    path: "/auth/reset_password/:token",
    name: "ResetPassword",
    component: ConfirmResetView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // если для страницы требуется быть авторизированным
    const store = useUserStore();
    const userProps = storeToRefs(store);
    if (userProps.isAuthenticated.value) {
      // если авторизированы, то пропускам дальше
      next();
      return;
    }
    // иначе отправляем на страницу авторизации
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
