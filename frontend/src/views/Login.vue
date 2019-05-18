<template>
    <div>
        <h2>Login</h2>
        <form class="login" @submit.prevent="login">
            <label>Username:</label><br />
            <input required autocomplete="on" v-model="user" placeholder="Type your username here" /><br />
            <label>Password:</label><br />
            <input required type="password" v-model="password" placeholder="Type your password here" /><br />
            <footer>
                <button>Cancel</button>
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
                password: ""
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
                            console.log('wrong')
                        }
                    })
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style></style>
