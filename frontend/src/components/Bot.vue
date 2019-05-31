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
    font-family: 'Source Sans Pro', sans-serif;
	color:white;
	}

#bot{
    display:inline;
    height:100%;
    width:100%;
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
    letter-spacing: 0.5px;
    position:relative;
    width: 25%;
    box-sizing: border-box;
}

img{
height:100%;
width:100%;
transition: all .2s ease-in-out;

}
img:hover{
	filter:hue-rotate(180deg);
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

 width: 25%;

}


  }
</style>
