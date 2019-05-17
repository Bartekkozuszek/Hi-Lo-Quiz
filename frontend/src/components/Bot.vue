<template>
		<div id="bot">  
		<img v-bind:src="bot.image" 
		v-bind:class="[bot.enabled ? 'active' : 'inactive']"
		v-on:click="toggleActive(index)"
		
		/>
</div>
</template>

<script>
export default {
name: "Bot",
props: ['bot','index'],

methods:{
		toggleActive: function(index) {
			this.$store.dispatch('toggleBotChosen',index);
            }
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
margin-left:2vh;
margin-right:2vh;
}

p {
  font-size: 5vh;	
	}

#bot{
display: inline;
margin:2vh;
height:100%;
width:100%;
}

img{
height:25%;
width:25%;
transition: all .2s ease-in-out;
}

img:hover{
	transform: scale(1.1);
}

.inactive{
  filter: grayscale(0%);
}

.active{
  filter: grayscale(100%);
}

 @media screen and (orientation: portrait) {
 
 *{
margin-left:0;
margin-right:0;
}
  }
</style>