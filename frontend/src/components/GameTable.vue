<template>
    <div id="table-component">
        <img :src="playerImage"></img>
        <p>{{this.$store.getters.currentPlayer.name}}</p>
    </div>
</template>

<script>
    export default {
        name: "GameTable",
        computed:{
            playerImage(){
                return this.$store.getters.currentPlayer.image;
            }
        }
    }
</script>

<style scoped>
    #table-component{
        display: grid;
        grid-template-rows: auto auto;
        justify-content: center;

    }
</style>
