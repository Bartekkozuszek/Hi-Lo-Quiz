<template>
    <div>
        <h2>Login</h2>
        <form class="form" @submit.prevent="login">
            <label>Username:</label><br />
            <input required autofocus autocomplete="on" v-model="userName" placeholder="Type your username here" /><br />
            <label>Password:</label><br />
            <input required type="password" v-model="password" placeholder="Type your password here" /><br />
            <footer>
                <button type="button" @click="goBack">Cancel</button>
                <button type="submit">OK</button>
            </footer>
        </form>
        <div>
            <router-link to="/register"><span>Register new user</span></router-link>
        </div>
        <modal :width=250 :height=100 class="md" name="loginFail">
            <div class="md-content">Wrong username and/or password.</div>
        </modal>
    </div>
    
</template>

<script>
    export default {
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
    input{
        width: 20em;
        height: 2em;
        margin: 1em 2em;
    }

    footer {
        margin: 3vw
    }

     .md-content {
        padding: 10px;
        text-align: center;
        font-weight: 600;
        overflow: auto;
    }
</style>
