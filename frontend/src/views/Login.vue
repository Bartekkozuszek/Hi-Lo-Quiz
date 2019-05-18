<template>
    <div>
        <h2>Login</h2>
        <form class="login" @submit.prevent="login">
            <label>Username:</label><br />
            <input required v-model="user" placeholder="Type your username here" /><br />
            <label>Password:</label><br />
            <input required v-model="password" placeholder="Type your password here" /><br />
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
        methods: {
            login() {
                let user = this.user
                let password = this.password
                this.$store.dispatch('login', { user, password })
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style></style>
