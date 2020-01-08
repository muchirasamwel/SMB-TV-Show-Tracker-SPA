import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () =>
        import("../views/Main.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
