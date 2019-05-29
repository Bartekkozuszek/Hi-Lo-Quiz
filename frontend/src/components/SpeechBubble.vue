<template>
    <div class ="container">
        <img v-if="showBubble" :src="imageBubble"></img>
        <p class="firstLine" v-if="showBubble">{{catchphrase}}</p>

        <p class="secondLine" v-if="showBubble">{{computedText}}</p>
    </div>

</template>

<script>

    export default {
        name: "SpeechBubble",
        methods:{

        },
        computed:{
            imageBubble:function(){
                return this.$store.state.images.bubble;
            },
            showBubble:function(){
                if(this.$store.state.animatingCharacters==false &&
                this.$store.getters.currentPlayer.isPlayer === false){
                    return true;
                }else{
                    return false;
                }
            },
            catchphrase:function(){
                return (this.$store.state.sessionPlayersArray[this.$store.state.currentPlayerIndex].catchphrase);
            },
            computedText:function(){
                console.log(this.$store.state.moveHistory.moves[this.$store.state.moveHistory.moves.length-1]);
                let answerArray=[
                    "i guess: ",
                    this.$store.state.moveHistory.moves[this.$store.state.moveHistory.moves.length-1].guess
                ];
                return answerArray.join(' ');
            }
        }
    }
</script>

<style scoped>
    .container{
         position: absolute;
         width:20vw;
        left:50%;
     }
    img{
        position: absolute;
        width:20vw;
        left:0;
        z-index: 1;
    }
    p{
        font-family: 'Source Sans Pro', sans-serif;;
        font-size:1.5vw;
    }
    .firstLine{
        position:center;
        font-family: 'Source Sans Pro', sans-serif;
        text-align: center;
        text-transform: uppercase;

        left:2vw;
        z-index: 100;
    }
    .secondLine{
        position:absolute;
        font-family: 'Source Sans Pro', sans-serif;
        text-align: center;
        text-transform: uppercase;
        font-size: 30px;
        left:2vw;
        top:2vw;
        z-index: 100;
    }
    @media screen and (max-width: 600px){
        .firstLine{
            position:center;
            font-family: 'Source Sans Pro', sans-serif;
            text-align: center;
            text-transform: uppercase;

            left:2vw;
            z-index: 100;
        }
        .secondLine{
            position:absolute;
            font-family: 'Source Sans Pro', sans-serif;
            text-align: center;
            text-transform: uppercase;
            font-size: 10px;
            left:2vw;
            top:2vw;
            z-index: 100;
        }

    }
</style>
