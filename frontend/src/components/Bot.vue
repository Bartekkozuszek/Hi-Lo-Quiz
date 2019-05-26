<template>
	
		<div id="bot">  
		<img v-bind:src="bot.image" 
		v-bind:class="[bot.enabled ? 'inactive' : 'active']"
		v-on:click="toggleActive(index)"
		
		/>
 <div class="top-right"><p>{{bot.name}}</p></div>
</div>
</template>

<script>
export default {
name: "Bot",
props: ['bot','index'],
methods:{
		toggleActive: function(index) {
			
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
  font-size: 2vh;	
	color:white;

	}

.top-right {
  position: absolute;
  top: 8px;
  right: 16px;

}
#bot{
display: inline;
margin:2vh;
height:100%;
width:100%;
text-align: center;
position:relative;
margin-bottom:100vh;
}
#test{
display: inline;
margin:2vh;
height:100%;
width:100%;
text-align: center;


}
img{
height:20%;
width:20%;
transition: all .2s ease-in-out;
margin-top:5vh;
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