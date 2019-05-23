import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Rules from "./components/Rules";
import SelectBots from "./views/SelectBots.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/bots",
      name: "selectBots",
      component: SelectBots
    },

    {
      path: "/rules",
      name: "rules",
      component: Rules
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    }
  ]
});
