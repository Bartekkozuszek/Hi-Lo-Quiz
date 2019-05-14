<template>
  <div>
    <Menu user="guest" settings="Options"/>
    <setup-game v-if="gameState === 1"></setup-game>
    <game v-else-if="gameState === 2"></game>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
    import Game from "./Game";
    import SetupGame from "./Setup-game.vue";

export default {
  name: "Home",
  components: {
    Game,
      Menu,
    SetupGame
        },
        computed: {
            gameState() {
                return this.$store.state.gameState
            }
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
