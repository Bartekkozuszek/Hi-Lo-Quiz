<template>
    <header class="header">
    <div id="title"><h1>Hi-Lo-Pros</h1></div> 
<div class="flex-container">
  <div><button class="select-btn" id="sbt1">{{user}}</button></div>
  <div> <select id="subject">
                    <option>{{settings}}</option>
					</select></div>

  <div><button class="select-btn" id="sbt1">Login</button></div>  
</div>
    </header>
</template>

<script>
export default {
  name: "Menu",
  props: {
    user: String,
    settings: String,
	newGame: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{


	padding: 1vh;
	text-align: center;

	}
	
h1 {
	color: green;
	font-size: 4vh;
	display: inline;
	padding: 1vh;


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
  background-color: pink;
  justify-content: space-between;
}

.flex-container > div {

  text-align: center;

}
</style>
