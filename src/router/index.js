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
    path: "/admin",
    name: "admin",
    component: () =>
      import("../views/Admin/AdminMain.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
        import("../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
