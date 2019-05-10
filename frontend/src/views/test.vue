<template>
    <div>
        <Menu banner="Hi-Lo-Pros" settings="Options" newGame="New game" />
        <question-display></question-display>
    </div>
</template>

<script>
// @ is an alias to /src
    import Menu from "@/components/Menu.vue";
    import QuestionDisplay from '@/components/QuestionDisplay.vue';


export default {
  name: "test",
  components: {
      Menu,
      QuestionDisplay
  }
};
</script>
