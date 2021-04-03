import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// Vue.prototype.$api = api;
// We could also inject the api in the store
// store.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
