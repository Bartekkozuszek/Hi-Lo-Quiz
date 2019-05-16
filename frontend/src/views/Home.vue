<template>
  <div>
    <setupgame v-if="gameState === 1"></setupgame>
    <game v-else-if="gameState === 2"></game>
    <WinScreen v-else-if="gameState === 3"></WinScreen>
  </div>
</template>

<script>
// @ is an alias to /src
import Game from "./Game";
import Setupgame from "./Setup-game.vue";
import WinScreen from "./Win-screen";

export default {
  name: "Home",
  components: {
    Game,
    WinScreen,
    Setupgame
  },
  computed: {
    gameState() {
      return this.$store.state.gameState;
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
