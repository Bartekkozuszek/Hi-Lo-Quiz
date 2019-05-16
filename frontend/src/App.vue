<template>
  <div id="app">
    <Menu user="guest" settings="Options" />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
export default {
  name: "App",
  components: { Menu },
  created() {
    this.$store.dispatch("toggleBotChosen", 0);
    this.$store.dispatch("toggleBotChosen", 1);
    this.$store.dispatch("toggleBotChosen", 2);
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
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
