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
            showBubble:function(){
                return true;
            }
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
    .firstLine{
        position:absolute;
        left:2vw;
        z-index: 100;
    }
    .secondLine{
        position:absolute;
        left:2vw;
        top:2vw;
        z-index: 100;
    }
</style>