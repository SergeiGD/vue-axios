import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/style.scss";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// TODO: сделай свой popup

const app = createApp(App);
app.use(router);
app.mount("#app");
