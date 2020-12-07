import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import BaseBadge from "./components/UI/BaseBadge";
import BaseButton from "./components/UI/BaseButton";

const app = createApp(App);
app.use(router);
app.component("base-badge", BaseBadge);
app.component("base-button", BaseButton);
app.use(store);

app.mount("#app");
