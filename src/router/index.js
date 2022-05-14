import Vue from "vue";
import VueRouter from "vue-router";
import Calculator from "../components/Calculator.vue";
import List from "../components/List.vue";
import Rules from "../components/Rules.vue";

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
  },
  {
      path: '/rules/:id',
      name: 'Rules',
      component: Rules
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
