<template>
  <header class="header">
    <div class="flex-container"
        
    >

      <div>
       
	    <img src="../../public/images/logo.png"> 
      </div>
      <div>

      </div>

      <div id="gg">

	  
	  
	  
	  
	  
	  
	  
	  
<label class="dropdown">
<img src="../../public/images/hamburger.png"> 
  <div class="dd-button">
    
  </div>

  <input type="checkbox" class="dd-input" id="test">

  <ul class="dd-menu">
    <li><a href="/rules">Rules</a></li>
    <li><a href="../">Home</a></li>
      <li><a href="/login">Login</a></li>
  
     
    
  </ul>
  
</label>
	  
	  
	  
	  
	  
	  
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
  background-color: darkblue;
  justify-content: space-between;


  
  }
img{
padding-left:1vh;
padding-right:1vh;

padding-top:1vh;
max-height:3vh;
    color: white
}





/* Dropdown */

.dropdown {
  display: inline-block;
  position: relative;

  }

.dd-button {
display:none;
}

.dd-button:after {
  content: '';
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;

  }




.dd-input {
  display: none;
}

.dd-menu {
    overflow: auto;
  position:relative;
  top: 10%;
  padding: 0;
  margin: 2px 0 0 0;
  transition: height 2s;
  background-color: #ffffff;

 display: none;
  }



.dd-input:checked + .dd-menu {
  display: block;
} 

.dd-menu li {
  padding: 10px 20px;
  cursor: pointer;
  background-color:darkblue;
color:white;
  
  }



.dd-menu li a {
  display: block;
  margin: -10px -20px;
  padding: 10px 20px;
color:white;
  }






</style>
