<template>
    <div id="setup">
        <button @click="startGame" class="startButton">Start!</button>
        
        <div class="botContainer" v-dragscroll.x="true">
            <div></div>
            <div class="loadedBots" v-for="bot in bots"
                 :style="{'background-image': `url(${require('../../public/images/header1.png')})`}"
                 >
                <img class="image" v-bind:src="bot.image"> {{bot.name}}
            </div>
            <div></div>
        </div>
        <div class="link"><router-link  to="/bots">Change players</router-link></div>
   
    </div>
</template>

<script>
    import SelectBots from './SelectBots.vue';
    import { dragscroll } from 'vue-dragscroll';
    export default {
        directives: {
            dragscroll
        },
        name: 'SetupGame',
        //mounted() {
        //    this.$store.dispatch('loadQuestions')
        //},
        components: {
            SelectBots
        },
        methods: {
            startGame() {
                this.$store.dispatch('assignQuestion', 4)
                this.$store.dispatch('changeGameState', 2)

            },
           },
        computed: {
            bots() {
                return this.$store.state.sessionPlayersArray
            },

        }
    }
</script>

<style scoped>
    .botContainer {
        width: 42vw;
        margin-left: auto;
        margin-right: auto;
        height:12vw;
        display:grid;
        grid-template-columns: 1vw repeat(var(--playerAmount), 12vw) 1vw;
        grid-template-rows: minmax(150px, 1fr);
        grid-column-gap: 1vw;
        background-color:black;
        overflow: hidden;
       
    }
    .image{
        grid-column: 2 / -2;
        height: 9vw;
    }
    .link {
        color: white;
        padding: 2em;
    }
    .loadedBots {
        height: 90%;
        color: white;
        display: inline;
        border: thick;
        background-color: darkseagreen;
        font-size: 2vw;
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