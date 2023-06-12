import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/style.scss";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./axiosSettings";

// TODO: хлебные крошки

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
