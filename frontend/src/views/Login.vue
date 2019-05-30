<template>
        <div id="loginWindow">
            <h2>Login</h2>
            <form class="form" @submit.prevent="login">
                <label>Username:</label><br />
                <input class="username" required autofocus autocomplete="on" v-model="userName" placeholder=" Type your username here" /><br />
                <label>Password:</label><br />
                <input class="password" required type="password" v-model="password" placeholder=" Type your password here" /><br />
                <footer>
                    <button class="cancel" type="button" @click="goBack">Cancel</button>
                    <button class="login" type="submit" @click="login">OK</button>
                </footer>
            </form>
            <div id="regLink">
                <router-link to="/register"><span>Register new user</span></router-link>
            </div>
            <modal :width=250 :height=100 class="md" name="loginFail">
                <div class="md-content">Wrong username and/or password.</div>
            </modal>
        </div>
    
</template>

<script>
    import Vmodal from 'vue-js-modal';

    export default {
        name: 'Login',
        components: {Vmodal },
        data() {
            return {
                userName: "",
                password: "",
                isValid: true
            }
        },
        computed: {
            isLoggedIn() {
                 return this.$store.getters.isLoggedIn
            }
        },
        methods: {
            login() {
                let userName = this.userName
                let password = this.password
                this.$store.dispatch('login', { userName, password })
                    .then(() => {
                        if (this.isLoggedIn) {
                             this.$router.push('/')
                        }
                        else {
                            this.showLoginFail()
                        }
                    })
                    .catch(err => console.log(err))
            },
            goBack() {
                this.$router.push('/')
            },
            showLoginFail() {
                this.$modal.show('loginFail')
            }
        }
    }
</script>

<style scoped>
    #loginWindow{
        background: url(../../public/images/bg.jpg);
        height: 100vh;
        background-position: center;
        background-size: 310vh;
        font-family: 'Source Sans Pro', sans-serif;
        color: white;

    }

    input {
        width: 20em;
        height: 2em;
        margin: 1em 2em;
        border-radius: 7px;
    }

    footer {
        margin: 3vw
    }

     .md-content {
        padding: 10px;
        text-align: center;
        font-weight: 600;
        overflow: auto;
        color: chocolate;
    }

     #regLink{
         font-size: x-large;
     }

    button{
        background-color: var(--themeColor2); /* Green */
        border: none;
        color: white;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 13px;
        margin: 4px 2px;
        cursor: pointer;
        min-width: 200px;
        border-radius: 22px;
        font-family: 'Source Sans Pro', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
        margin: 10px 0;
    }

    button:hover {
        background-color: #ce4010;
        transition: 0.4s;
    }
</style>
