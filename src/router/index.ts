import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Store from "../store/index";
import Types from "../store/categories/types";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: route => ({ category: route.query.category })
  },
  {
    path: "/random",
    name: "Random",
    component: () =>
      import(/* webpackChunkName: "random" */ "../views/Random.vue")
  },
  {
    path: "/detail/:id",
    name: "Detail",
    props: true,
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  },
  {
    path: "*",
    name: "not_found",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  Store.dispatch(`Categories/${Types.actions.LOADCATEGORIES}`);
  next();
});

export default router;
