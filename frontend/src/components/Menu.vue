<!-- 
This is the header of the site,contains navigation and logotype.
authored by Wuxxerno 2019 with contribs from the rest of the team.
Items like the logotype and drop down menu are placed in a flex box with the space between layout.
If you want items to be next to each other you can place them both in a wrapper div.
 -->
<template>
	<header class="header">
		<div class="flex-container" :style="{
      'background-image': `url(${require('../../public/images/blue.jpg')})`,
      'background-size':`6%`
      }">
			<div>
				<img src="../../public/images/logo.png">
				</div>
				<div id="rightWrap">
					<label class="dropdown">
						<div id="nameDisplay">
							<h4 v-if="isLoggedIn"> {{ user }} </h4>
						</div>
						<img src="../../public/images/hamburger.png">
							<div class="dd-button"></div>
							<input type="checkbox" class="dd-input" id="test">
								<ul class="dd-menu" :style="{'background-image': `url(${require('../../public/images/blue.jpg')})`,'background-size':`6%`}">
									<li>
										<a href="/about">About</a>
									</li>
									<li>
										<a href="../">Home</a>
									</li>
									<li>
										<a v-if="!isLoggedIn" href="/login">Login</a>
										<a v-else @click="logout">Logout</a>
									</li>
									<li v-if="this.$store.getters.isAdmin">
										<a href="/admin">Admin</a>
									</li>
									<li>
										<a href="/addquestion">Submit a question</a>
									</li>
									<li>
										<a href="/highscores">Highscores</a>
									</li>
								</ul>
							</label>
						</div>
					</div>
				</header>
			</template>
<script>
export default {
	name: "Menu",
	props: {},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isLoggedIn
		},
		user() {
			return this.$store.state.user
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('logout')
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

select {}

select:hover {
    background-color: aqua;
}

button:hover {
    background-color: aqua;
}

.flex-container {
    display: flex;
    justify-content: center;
    justify-content: space-between;
}

img {
    padding-left: 1vh;
    padding-right: 1vh;
    padding-top: 1vh;
    max-height: 3vh;
    color: white
}

.dropdown {
    display: inline-block;
    position: relative;
}

.dd-button {
    display: none;
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
    position: relative;
    top: 10%;
    padding: 0;
    margin: 2px 0 0 0;
    transition: height 2s;
    background-color: #ffffff;
    display: none;
}

.dd-input:checked+.dd-menu {
    display: block;
}

.dd-menu li {
    padding: 10px 20px;
    cursor: pointer;
    color: white;
}

img:hover {
    filter: invert(1);
}

image {
    transition: all .2s ease-in-out;
}

.dd-menu li:hover {
    background-color: #a41a19;
}

.dd-menu li a {
    display: block;
    margin: -10px -20px;
    padding: 10px 20px;
    color: white;
}

#nameDisplay {
    color: white;
    display: inline-block;
    padding-right: 1vw;
    }

#nameDisplay > h4 {
    font-size: 1em;

}

</style>
