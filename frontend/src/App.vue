<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div>
      <Menu banner="Hi-Lo-Pros" settings="Options" newGame="New game" />
      <game></game>
    </div>

  </div>
</template>

<script>

  // @ is an alias to /src
  import Menu from "@/components/Menu.vue";
  import Game from "./views/Game";


  export default {
    name: "test",
    components: {
      Game,
      Menu,
    }
  };
  
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>