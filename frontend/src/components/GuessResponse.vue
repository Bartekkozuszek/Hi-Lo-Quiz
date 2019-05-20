<template>
    <img v-if="this.$store.state.animatingCharacters" :src="responseLogic"></img>
</template>

<script>
    export default {
        name: "GuessResponse",
        computed:{
            responseLogic:function(){
                if (this.$store.state.animatingCharacters){
                   console.log (this.$store.state.moveHistory.moves[this.$store.state.moveHistory.moves.length-1].guess)

                   if(this.$store.state.moveHistory.moves[this.$store.state.moveHistory.moves.length-1].guess>
                        this.$store.state.currentQuestion.answer){
                        return this.$store.state.images.tooHigh;
                    }else {
                        return this.$store.state.images.tooLow;
                    }
                }
            }
        }
    }
</script>


<style scoped>
    img {
        width:20vw;
        position: absolute;
        left: 50%;
        margin-left:-40px;
        top: 60%;
        margin-top:-50px;

        z-index: 1;
    }
</style>