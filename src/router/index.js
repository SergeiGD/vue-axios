import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from '@/stores/user'
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import TagsListView from "../views/TagsListView.vue";
import TagsCreateView from "../views/TagsCreateView.vue";
import TagsDetailView from "../views/TagsDetailView.vue";
import TagsUpdateView from "../views/TagsUpdateView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/tags",
    name: "Tags",
    component: TagsListView
  },
  {
    meta: { requiresAuth: true },
    path: "/tags/create",
    name: "TagsCreate",
    component: TagsCreateView
  },
  {
    path: "/tags/:id",
    name: "TagsDetail",
    component: TagsDetailView
  },
  {
    meta: { requiresAuth: true },
    path: "/tags/:id/edit",
    name: "TagsUpdate",
    component: TagsUpdateView
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const store = useUserStore()
    const isAuthenticated = storeToRefs(store);
    if (isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
