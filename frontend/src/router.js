import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import SelectBots from "./components/SelectBots.vue";
import Login from "./views/Login.vue";
import About from "./components/About.vue";
import Register from "./components/Register.vue";
import AddQuestion from "./views/AddQuestion.vue"


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
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
      },
      {
          path: "/addquestion",
          name: "addquestion",
          component: AddQuestion
      },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
