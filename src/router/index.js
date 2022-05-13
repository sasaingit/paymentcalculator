import Vue from "vue";
import VueRouter from "vue-router";
import Calculator from "../components/Calculator.vue";
import List from "../components/List.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Calculator",
    component: Calculator
  },
  {
    path: "/list",
    name: "List",
    component: List
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
