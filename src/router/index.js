import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import TagsListView from "../views/TagsListView.vue";
import TagsCreateView from "../views/TagsCreateView.vue";
import TagsDetailView from "../views/TagsDetailView.vue";
import TagsUpdateView from "../views/TagsUpdateView.vue";

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
    path: "/tags/:id/edit",
    name: "TagsUpdate",
    component: TagsUpdateView
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

export default router;
