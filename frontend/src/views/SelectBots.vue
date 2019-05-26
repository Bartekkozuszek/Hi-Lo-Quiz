<template>
  <div id="wrap":style="{'background-image': `url(${require('../../public/images/background2fixed.jpg')})`}" >
    <div v-if="!toggle" id="botinfo" >
      <img v-bind:src="loadedBots[num].image"
        v-bind:class="[loadedBots[num].enabled ? 'inactive' : 'active']"
        />
      <h2>Name: {{loadedBots[num].name}}</h2>
      <h2>Wins: {{loadedBots[num].wins}}</h2>
      <h2>Losses: {{loadedBots[num].losses}}</h2>
      <h2>Catchphrase: {{loadedBots[num].catchphrase}}</h2>
      <h2>Description: {{loadedBots[num].description}}</h2>
      <h2>Enabled: {{loadedBots[num].enabled}}</h2>
      <button class="button" v-on:click="setActiveState(num),toggle = !toggle" >Toggle on/off (Beep boop..)</button>
      <button class="button" v-on:click="toggle = !toggle" >Back</button>
    </div>
    <div v-if="toggle"  class="flex-container"  >
      <Bot  v-for='loadedBots, index in loadedBots' 
        v-bind:key='index' v-bind:bot='loadedBots' 
        v-bind:index='index' v-on:click.native="num = index,toggle = !toggle"
        />
    </div>
    <button class="select-btn":style="{'background-image': `url(${require('../../public/images/btnwood.jpg')})`}" id="sbt1" >
      <router-link to="/">
        <h1>DONE!</h1>
      </router-link>
    </button>
  </div>
</template>

<script>
import Bot from "@/components/Bot.vue";
export default {
  name: "SelectBots",
  data() {
    return {
      toggle: true,
      stuff: 'aaaa',
      num: 0
    }
  },
  props: {
    user: String,
    settings: String,
    newGame: String
  },
  computed: {
    //Fetch values from vuex
    loadedBots: function () {
      return this.$store.state.loadedBots
    }
  },
  methods: {
    setActiveState: function (index, bool) {


      this.$store.dispatch('toggleBotChosen', index);


    }
  },
  components: {
    Bot
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrap {
  background-size: cover;
}

#botinfo {
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  width: 50%;
  margin: auto;
  max-height: 80vh;
}

#botinfo>img {
  margin-top: 4vh;
}

.flex-container {
  justify-content: center;
  min-height: 80vh;
  max-height: 80vh;
  text-align: center;
  width: 50%;
  margin: auto;
}

selectbots {
  padding: 1vh;
  text-align: center;
}

h1 {
  color: white;
  font-size: 4vh;
  display: inline;
  padding: 1vh;
  text-align: center;
}

h2 {
  color: white;
  font-size: 2vh;
  text-align: center;
}

#title {
  background-color: yellow;
  font-family: 'Days One', sans-serif;
  font-size: 3vh;
}

select {
  color: WHITE;
  font-size: 3vh;
  display: inline;
  padding: 1vh;
  text-decoration: none;
  border: none;
}

img {
  width: 100%;
  max-width: 500px;
}

.button {
  background-color: burlywood;
  border: none;
  color: white;
  padding: 1vh 3vh;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 3vh;
  margin-bottom: 1vh;
}

.select-btn {
  color: WHITE;
  font-size: 3vh;
  display: inline;
  padding: 1vh;
  background-size: cover;
  min-height: 14.6vh;
  text-decoration: none;
  border: none;
  width: 100%;
}

@media screen and (orientation: portrait) {
  .flex-container {
    width: 100%;
  }
  #botinfo {
    width: 100%;
  }
  img {
    width: auto;
    max-height: 25vh;
  }
}

a:link {
  text-decoration: none;
}

.flex-container>div {
  display: flex;
  justify-content: center;
  text-align: center;
  background-size: 100%;
}

.inactive {
  filter: grayscale(0%);
}

.active {
  filter: grayscale(100%);
}
</style>