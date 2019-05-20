<template>
    <img v-if="this.$store.state.animatingCharacters" :src="responseLogic"></img>
</template>

<script>
    export default {
        name: "GuessResponse",
        computed:{
            responseLogic:function(){



                return this.$store.state.images.tooHigh;
            }
        }
    }
</script>


<style scoped>
    img {
        position: absolute;
        left: 50%;
        margin-left:-142px;
        top: 50%;
        margin-top:-50px;

        z-index: 1;
    }
</style>