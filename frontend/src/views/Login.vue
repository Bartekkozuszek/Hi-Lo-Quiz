<template>
    <div>
        <h2>Login</h2>
        <form class="login" @submit.prevent="login">
            <label>Username:</label><br />
            <input required autocomplete="on" v-model="user" placeholder="Type your username here" /><br />
            <label>Password:</label><br />
            <input required type="password" v-model="password" placeholder="Type your password here" /><br />
            <footer>
                <button @click="goBack">Cancel</button>
                <button type="submit">OK</button>
            </footer>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: "",
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
                let user = this.user
                let password = this.password
                this.$store.dispatch('login', { user, password })
                    .then(() => {
                        if (this.isLoggedIn) this.$router.push('/')
                        else {
                            console.log('wrong') //to be replaced with a modal or notification with appropriate message
                        }
                    })
                    .catch(err => console.log(err))
            },
            goBack() {
                this.$router.push('/')
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
</style>
