<template>
  



		<div><h1>Bot</h1></div>
		
		
	

 
</template>

<script>
export default {
  name: "Bot",
  props: {
    user: String,
    settings: String,
	newGame: String
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
  justify-content: space-between;
  text-align: center;
}

.flex-container > div {
flex: 2;
padding-bottom: 50vh;
  text-align: center;

}
</style>
