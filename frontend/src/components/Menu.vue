<template>
  <header class="header">
    <div class="flex-container">
      <div>
        <button class="select-btn" id="sbt1">{{ user }}</button>
      </div>
      <div>
        <select id="subject" v-on:change="goToLink">
          <option>{{ settings }}</option>
          <option v-bind:value="start.value">{{ start.name }}</option>
          <option v-bind:value="rules.value">{{ rules.name }}</option>
        </select>
      </div>

      <div>
        <button class="select-btn" id="sbt1">
          <router-link to="/login" v-if="!isLoggedIn">Login</router-link><span v-if="isLoggedIn" @click="logout">Logout</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Menu",
  props: {
    user: String,
    settings: String,
    newGame: String
  },
  data: function() {
    return {
      rules: {
        name: "rules",
        value: 2
      },
      start: {
        name: "startpage",
        value: 1
      }
    };
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn
            }
        },
  methods: {
    goToLink: function(event) {
      if (event.target.value == 1) {
        this.$router.push({ path: "/" });
      } else if (event.target.value == 2) {
        this.$router.push({ path: "/rules" });
      }
      },
      logout() {
          this.$store.dispatch('logout').then(() => {
              this.$router.push("/login")
          })
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  text-align: center;
}

h1 {
  color: green;
  font-size: 4vh;
  display: inline;
}

#title {
  background-color: yellow;
  font-family: "Days One", sans-serif;
  font-size: 3vh;
}

select {
  color: WHITE;
  font-size: 3vh;
  display: inline;
  padding: 1vh;
  background-color: purple;
  max-height: 5.4vh;

  text-decoration: none;
  border: none;
}
select:hover {
  background-color: aqua;
}
.select-btn {
  max-height: 5.4vh;
  color: WHITE;
  font-size: 3vh;
  display: inline;
  padding: 1vh;
  background-color: purple;

  text-decoration: none;
  border: none;
}

button:hover {
  background-color: aqua;
}

.flex-container {
  display: flex;
  justify-content: center;
  background-color: pink;
  justify-content: space-between;
}

.flex-container > div {
  text-align: center;
}
</style>
