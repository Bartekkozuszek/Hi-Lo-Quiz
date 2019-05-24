<template>
  <div id="app">
    <Menu :user="user" settings="Options"/>
    <router-view></router-view>
  </div>
</template>

<script>
    import Menu from "@/components/Menu.vue";

export default {
  name: "App",
        components: { Menu },
  computed: {
            isLoggedIn() {
                 return this.$store.getters.isLoggedIn
      },
      user() {
          //when someone logs in, their username is displayed instead of guest
          if (this.isLoggedIn) {
              return this.$store.getters.user
          } else return 'guest'
      }
        },
  created() {
    this.$store.dispatch('tryAutoLogin')
    this.$store.dispatch("toggleBotChosen", 0);
    this.$store.dispatch("toggleBotChosen", 1);
    this.$store.dispatch("toggleBotChosen", 2);
    this.$store.dispatch("toggleBotChosen", 3);
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
