<template>
  <div id="wrap">

<div class="flex-container">
		<Bot v-for='loadedBots, index in loadedBots'
		v-bind:key='index' v-bind:bot='loadedBots'
		v-bind:index='index'/>
		</div>
 <button class="select-btn" id="sbt1">
 <router-link to="/"><h1>DONE!</h1></router-link>
        </button>
 </div>
</template>

<script>
import Bot from "/components/Bot.vue";
export default {
  name: "SelectBots",
  props: {
    user: String,
    settings: String,
	newGame: String
	},
    computed: {
        //Fetch values from vuex
		loadedBots: function() {
            return this.$store.state.loadedBots
        }}
		,
	components: {
		Bot
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wrap{
background-color: orange;
}
selectbots{
	padding: 1vh;
	text-align: center;
	}

h1 {
	color: orange;
	font-size: 4vh;
	display: inline;
	padding: 1vh;
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
	background-color:purple;
	text-decoration: none;
	border: none;
	}
.select-btn {
	color: WHITE;
	font-size: 3vh;
	display: inline;
	padding: 1vh;
	background-color:purple;
min-height: 20vh;
	text-decoration: none;
	border: none;
	width: 100%;
	}
.flex-container {
  justify-content: center;
  background-color: green;
  min-height: 75vh;
  text-align: center;
  width:50%;
  margin:auto;
  }
  @media screen and (orientation: portrait) {
  .flex-container {
	width:100%;
  }
  }

.flex-container > div {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
