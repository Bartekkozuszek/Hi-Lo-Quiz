<template>
  <div id="wrap":style="{'background-image': `url(${require('../../public/images/blue.jpg')})`}" >
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
      <button class="startButton" v-on:click="setActiveState(num),toggle = !toggle" >Toggle on/off (Beep boop..)</button>
      <button class="startButton" v-on:click="toggle = !toggle" >Back</button>
    </div>
    <div v-if="toggle"  class="flex-container"  >
      <Bot  v-for='loadedBots, index in loadedBots'
        v-bind:key='index' v-bind:bot='loadedBots'
        v-bind:index='index' v-on:click.native="num = index,toggle = !toggle"
        />
    </div>
       <button class="startButton">     <router-link to="/">
        <h1>DONE!</h1>
      </router-link></button>
 
    
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
  min-height: 85.5vh;
  text-align: center;
  width: 100%;
  margin: auto;
  max-height: 100vh;
}
#botinfo>img {
  margin-top: 4vh;
}
.flex-container {
padding-top:4vh; 
 display:flex;
flex-wrap: wrap;
  min-height: 85.5vh;
  max-height: 100vh;
  text-align: center;
  width:50%;
  margin: auto;
flex-direction: row;
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
  font-size: 3vh;	
	color:white;
  text-align: center;
}
#title {
  background-color: yellow;
  font-family: 'Source Sans Pro', sans-serif;
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
    width: auto;
    max-height: 25vh;
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
.startButton {

    background-color: var(--themeColor2); /* Green */
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 13px;
    margin: 4px 2px;
    cursor: pointer;
    min-width: 200px;
    border-radius: 22px;
    font-family: 'Source Sans Pro', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
    margin: 10px 0;
	
	}
    .startButton:hover{
        background-color: #ce4010;
        transition: 0.4s;
    }



</style>
