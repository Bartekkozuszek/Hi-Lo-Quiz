<template>
    <div id="setup">
        <button @click="startGame" class="startButton">Start!</button>
        <div class="loadedBots" v-for="bot in bots"> <img class="image" v-bind:src="bot.image" /></div>
        <div ><router-link class="link" to="/bots">Change players</router-link></div>
   
    </div>
</template>

<script>
    import SelectBots from './SelectBots.vue';
    
    export default {
        name: 'SetupGame',
        //mounted() {
        //    this.$store.dispatch('loadQuestions')
        //},
        components: {
            SelectBots
        },
        methods: {
            startGame() {
                this.$store.dispatch('changeGameState', 2)

            },
           },
        computed: {
            bots() {
                return this.$store.state.sessionPlayersArray
            }
        }
    }
</script>

<style scoped>
    .image{
        width: 20%;
    }
    .link {
        color: white;
    }
    .loadedBots {
        color: white;
        display: inline;
        padding-top: 2em;
        margin-bottom: 3em;
    }
    #setup {
        background-image: linear-gradient(#1e1c1c, #645c5c);
        height: 20em;
    }
    .startButton{
        margin: 2em;
        padding: 1em;
        width: 60%;
        background-color: lightsteelblue;
        font-size: large;
    }
</style>