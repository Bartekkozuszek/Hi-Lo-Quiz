<template>
    <header class="header">
        <div id="title">
             <select id="subject">
                    <option value="22">{{settings}}</option>
					</select><h1>{{banner}}</h1><button onclick="start()" class="select-btn" id="sbt1">{{newGame}}</button>
        </div>
    </header>
</template>

<script>
export default {
  name: "Menu",
  props: {
    settings: String,
    banner: String,
	newGame: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
background: pink;

	padding: 1vh;
	text-align: center;

	}
	
h1 {
	color: WHITE;
	font-size: 3vh;
	display: inline;
	padding: 1vh;

	margin-top:1vh;
	margin-left:5vh;
	}

#title {
	margin-left: auto;
	margin-right: auto;
	display: inline;
	color: WHITE;
	font-family: 'Days One', sans-serif;
	font-size: 3vh;
	}

select {
	color: WHITE;
	font-size: 3vh;
	display: inline;
	padding: 1vh;
	background-color:purple;
	margin-top:1vh;
	margin-left:5vh;
	text-decoration: none;
	border: none;
	}

.select-btn {
	color: WHITE;
	font-size: 3vh;
	display: inline;
	padding: 1vh;
	background-color:purple;
	margin-top:1vh;
	margin-left:5vh;
	text-decoration: none;
	border: none;
	}
</style>
