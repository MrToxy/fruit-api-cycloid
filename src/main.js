import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins/vee-validate";
import "@/assets/scss/main.scss";
import api from "./api";
import eventBus from "./utils/eventBus";
Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.prototype.$events = eventBus;

store.$api = api;
store.$events = eventBus;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
