<template>
  <Menu user="Guest" settings="options" newGame="New game" />
 </template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";

export default {
  name: "test",
  components: {
    Menu
  }
};
</script>
