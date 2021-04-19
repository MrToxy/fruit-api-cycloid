import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/Home.vue");
const FruitDetail = () => import("@/views/FruitDetail.vue");
const NotFound = () => import("@/views/NotFound.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/fruit/:id",
    name: "fruit.detail",
    props: true,
    component: FruitDetail,
  },
  {
    name: "notfound",
    path: "/404",
    props: true,
    component: NotFound,
  },
  {
    path: "*",
    redirect: { name: "notfound" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
