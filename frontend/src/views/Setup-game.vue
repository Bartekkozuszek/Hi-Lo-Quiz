<template>
    <div id="setup">
        <button @click="startGame" class="startButton">Start!</button>
        <div class="loadedBots" v-for="bot in bots">{{bot.name}}</div>
        <!--<div><select-bots v-show="select"></select-bots></div>-->
        <div ><router-link class="link" to="/bots">Change players</router-link></div>

    </div>
</template>

<script>
    import SelectBots from './SelectBots.vue'
    export default {
        name: 'SetupGame',
        components: {
            SelectBots
        },
        methods: {
            startGame() {
                this.$store.dispatch('changeGameState', 2)
            },
            selectPlayers() {
                console.log('click')
            }
        },
        computed: {
            bots() {
                return this.$store.state.sessionPlayersArray
            }
        }
    }
</script>

<style scoped>
    .link {
        color: white
    }
    .loadedBots {
        color: white
    }
    #setup {
        background-image: linear-gradient(#1e1c1c, #645c5c);
        height: 20em;
    }
    .startButton{
        padding: 1em;
        width: 50%;
        background-color: lightsteelblue;
        font-size: large;
    }
</style>