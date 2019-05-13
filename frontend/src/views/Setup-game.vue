<template>
    <div id="setup">
        <button class="startButton" >Start!</button>
        <div><h4>Bots coming soon here</h4></div>
    </div>
</template>

<script>
    export default {
        name: 'Setupgame',
        components: {

        },
        methods: {
            startGame() {

            }
        }
    }
</script>

<style scoped>
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