import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins/vee-validate";
import "@/assets/scss/main.scss";
import api from "./api";
Vue.config.productionTip = false;

Vue.prototype.$api = api;
store.$api = api;
// We could also inject the api in the store

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
