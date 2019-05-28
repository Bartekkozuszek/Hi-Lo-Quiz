<template>

    <div id="bot">
        <img v-bind:src="bot.image" v-bind:class="[bot.enabled ? 'inactive' : 'active']" v-on:click="toggleActive(index)" />

            <p>{{bot.name}}</p>
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

}
p {
  font-size: 3vh;	
	color:white;
	}

#bot{
display:inline;
height:100%;
width:100%;
text-align: center;
position:relative;
 width: 33%;
  box-sizing: border-box;
}

img{
height:100%;
width:100%;
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
  #bot{

 width: 33%;

}
  
  
  }
</style>