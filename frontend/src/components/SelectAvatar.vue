<template>
    <div class="selectAvatar">
        <div v-on:click="back">Back</div>
        <div id="images">
            <img class="tableSlot tableSlot0"  :src="slot0Image" v-bind:class="{slot0Animate: this.animating,slot0AnimateRight: this.animatingRight}">

            <img class="tableSlot tableSlot1"  :src="slot1Image" v-bind:class="{slot1Animate: this.animating,slot1AnimateRight: this.animatingRight}">

            <img class="tableSlot tableSlot2"  :src="slot2Image" v-bind:class="{slot2Animate: this.animating,slot2AnimateRight: this.animatingRight}">
        </div>
        <div v-on:click="forward">Front</div>
        <p>{{this.animating}}</p>
    </div>

</template>



<script>


    export default {
        name: "SelectAvatar",
        data : function() {
            return {
            selectedIndex : 0,
                animating:false,
                animatingRight:false
            }
        },
        methods:{
            whatPlayer:function(offSet){

                let suposedSlot = this.selectedIndex+offSet;
                if ( suposedSlot> this.$store.state.avatarList.length-1) {
                    suposedSlot=0;
                } else if(suposedSlot<0){
                    suposedSlot=this.$store.state.avatarList.length-1
                }
                let supposedImage = this.$store.state.avatarList[suposedSlot]
                return supposedImage;

            },
            back:function(){
                this.animatingRight=true;
                setTimeout(()=>{
                    this.animatingRight=false;
                    if(this.selectedIndex===0){
                        this.selectedIndex= this.$store.state.avatarList.length-1;
                    } else{
                        this.selectedIndex--
                    }
                },500)

            },
            forward:function(){
                this.animating=true;
                setTimeout(() => {
                    this.animating=false;
                    if(this.selectedIndex ===this.$store.state.avatarList.length-1){
                        this.selectedIndex=0;
                    } else{
                        this.selectedIndex++
                    }
                },500)



            }
        },
        computed:{
            slot0Image:function(){ return this.whatPlayer(-1);},
            slot1Image:function(){ return this.whatPlayer(0);},
            slot2Image:function(){ return this.whatPlayer(1);},



        }
    }
</script>

<style>


    .selectAvatar{
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
        height: 22vh;
        background-color: pink;

    }
    .tableSlot0 {
        position: absolute;
        left: -30%
    }
    .tableSlot{
        top:0vh;
        height: 22vw;
    }

    .slot0AnimateRight{
        transition: all 0.5s;
        position: absolute ;
        left:33%;
        padding:-15vw;

    }
    .tableSlot1{
        position: absolute ;
        left:33%;
        padding:-15vw;
    }
    .tableSlot2{
        position: absolute;
        left:100%;
    }

    .slot1Animate{
        transition: all 1s;
        left: -30%;
    }

    .slot2Animate{
        transition: all 0.5s;
        left: 33%;
    }
    .slot1AnimateRight{
        transition: all 0.5s;
        left:100%;
    }


</style>