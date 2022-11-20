<template>
    <div v-if="statusDetails">
        You have logged out!
        <br /><br />
        Status details:
        <pre>{{ statusDetails }}</pre><br />
    </div>
    <div v-if="errorMessage">
        Error message:
        <pre>{{ errorMessage }}</pre><br />
    </div><br /><br />
</template>

<script>
    export default {
        created() {
            this.logout()
        },
        data() {
            return {
                statusDetails: '',
                apiToken: '',
                errorMessage: ''
            }
        },
        methods: {
            logout() {
                let apiToken = localStorage.getItem('api_token')
                axios.put('/logout', { api_token: apiToken }).then(response => {
                    this.statusDetails = response.data
                    this.errorMessage = ''
                    this.apiToken = ''
                    localStorage.removeItem('api_token')
                }).catch(error => {
                    this.errorMessage = error.response.data.message
                    this.statusDetails = ''
                })
            }
        }
    }
</script>