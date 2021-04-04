import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/Home.vue");
const FruitDetail = () => import("@/views/FruitDetail.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:id",
    name: "fruit.detail",
    component: FruitDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
