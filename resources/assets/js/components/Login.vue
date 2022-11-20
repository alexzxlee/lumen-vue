<template>
    <div>
        Username: <input v-model="username" placeholder="Type username"><br />
        Password: <input v-model="password" placeholder="Type password"><br /><br />
        <span v-if="username || password">You are typing... </span>
        <span v-if="username">{{ username }}</span>
        <span v-if="username && password"> & </span>
        <span v-if="password"> {{ password}} </span>
        <span v-if="username || password"><br /><br /></span>To
        <button @click="login">Login</button><br /><br />
    </div><br />
    <div v-if="statusDetails">
        Status details: <pre>{{ statusDetails }}</pre><br />
    </div>
    <div v-if="errorMessage">
        Error message: <pre>{{ errorMessage }}</pre><br />
    </div><br /><br />
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                statusDetails: '',
                apiToken: '',
                errorMessage: ''
            }
        },
        methods: {
            login() {
                axios.put('/login', { username: this.username, password: this.password })
                .then(response => {
                    this.statusDetails = response.data
                    this.errorMessage = ''
                    this.apiToken = response.data.user.api_token
                    // window.token = this.apiToken
                    // window.location = response.data.redirect
                    // window.location.href = "/todonotes?api_token=" + this.apiToken
                    window.axios.defaults.params = { api_token: this.apiToken }
                    localStorage.setItem('api_token', this.apiToken)
                    this.$router.push('/todonotes')
                })
                .catch(error => {
                    this.errorMessage = error.response.data.message
                    this.statusDetails = ''
                    this.apiToken = ''
                })
            },
        }
    }
</script>