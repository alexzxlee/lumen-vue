<template>
    <div>
        Username: <input v-model="username" placeholder="Type username"><br />
        Password: <input v-model="password" placeholder="Type password"><br /><br />
        <span v-if="username || password">You are typing... </span>
        <span v-if="username">{{ username }}</span>
        <span v-if="username && password"> & </span>
        <span v-if="password"> {{ password}} </span>
        <span v-if="username || password"><br /><br /></span>To
        <button @click="register">Register</button>
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
                errorMessage: ''
            }
        },
        methods: {
            register() {
                axios.post('/register', { username: this.username, password: this.password }).then(response => {
                    this.statusDetails = response.data
                    this.errorMessage = ''
                }).catch(error => {
                    this.errorMessage = error.response.data.message // JSON.stringify(error.response)
                    this.statusDetails = ''
                    this.username = ''
                    this.password = ''
                })
            }
        }
    }
</script>