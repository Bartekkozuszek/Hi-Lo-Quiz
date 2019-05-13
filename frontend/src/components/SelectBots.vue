
<template>
  

<div class="flex-container">

		<div>
		<Bot v-for="value in count" />
		
		</div>
		
		
		</div>

 
</template>

<script>
import Bot from "./Bot.vue";
export default {
  name: "SelectBots",
  props: {
    user: String,
    settings: String,
	newGame: String
  },
   data: function () {
  return {
    count:[0,0,0,0,0,0,0]
  }
},
    components: {
    Bot
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

	text-decoration: none;
	border: none;
	}
.flex-container {
  display: flex;
  justify-content: center;
  background-color: green;
padding-bottom:50vh;
  text-align: center;
}

.flex-container > div {
  display: flex;
flex: 2;
  justify-content: center;
  text-align: center;

}
</style>
