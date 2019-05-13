<template>
  <div id="wrap">
  <Menu user="Guest" settings="options" newGame="New game" />
 <SelectBots />
 </div>
 </template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import SelectBots from "@/components/SelectBots.vue";

export default {
  name: "test",
  components: {
    Menu,SelectBots
  }
};
</script>
