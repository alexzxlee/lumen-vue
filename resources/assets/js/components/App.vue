<script setup>
import TodoNotes from 'Components/TodoNotes.vue'
</script>

<template>
    <div>
        Hello Chao, I'm Vue!
        <br />{{ message }}
    </div><br />
    <div>
        Username: <input v-model="username" placeholder="Type username"><br />
        Password: <input v-model="password" placeholder="Type password"><br /><br />
        <span v-if="username || password">You are typing... </span>
        <span v-if="username">{{ username }}</span>
        <span v-if="username && password"> & </span>
        <span v-if="password"> {{ password}} </span>
        <span v-if="username || password"><br /><br /></span>To
        <button @click="login">Log in</button> or 
        <button @click="register">Register</button>
    </div><br />
    <div v-if="statusDetails">
        Status details: <pre>{{ statusDetails }}</pre><br />
    </div>
    <div v-if="apiErrorMessage">
        API error message: <pre>{{ apiErrorMessage }}</pre><br />
    </div>
    <div v-if="errorMessage">
        Error message: <pre>{{ errorMessage }}</pre><br />
    </div>
    <div v-if="apiToken">
        To <button @click="logout">Log out</button> {{ username }}<br /><br />
    </div>
    <div v-if="apiToken">
        <TodoNotes :apiToken="apiToken"/>
    </div><br /><br />
</template>

<script>
    export default {
        name: "App",
        components: {
            TodoNotes
        },
        created() {
            this.getMessage()
        },
        data() {
            return {
                message: '',
                username: '',
                password: '',
                statusDetails: '',
                apiToken: '',
                apiErrorMessage: '',
                errorMessage: ''
            }
        },
        methods: {
            getMessage() {
                axios.get('/api').then(response => {
                    this.message = response.data
                }).catch(error => {
                    this.apiErrorMessage = error
                })
            },
            register() {
                axios.post('/register', { username: this.username, password: this.password }).then(response => {
                    this.statusDetails = response.data
                    this.errorMessage = ''
                }).catch(error => {
                    this.errorMessage = error.response.data.message // JSON.stringify(error.response)
                    this.statusDetails = ''
                    this.apiToken = ''
                    this.username = ''
                    this.password = ''
                })
            },
            login() {
                axios.put('/login', { username: this.username, password: this.password }).then(response => {
                    this.statusDetails = response.data
                    this.errorMessage = ''
                    this.apiToken = response.data.user.api_token
                    // window.location = response.data.redirect
                    // window.location.href = "/todonotes?api_token=" + this.apiToken
                }).catch(error => {
                    this.errorMessage = error.response.data.message
                    this.statusDetails = ''
                    this.apiToken = ''
                })
            },
            logout() {
                axios.put('/logout', { api_token: this.apiToken }).then(response => {
                    this.statusDetails = response.data
                    this.errorMessage = ''
                    this.apiToken = ''
                }).catch(error => {
                    this.errorMessage = error.response.data.message
                    this.statusDetails = ''
                })
            }
        }
    }
</script>

<style scoped>

</style>