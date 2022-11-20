<template>
        <div>
            <br />{{ message }}
        </div><br />
        <div v-if="apiErrorMessage">
            API error message:
            <pre>{{ apiErrorMessage }}</pre><br />
        </div>
</template>

<script>
export default {
    created() {
        this.getMessage()
    },
    data() {
        return {
            message: '',
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
    }
}
</script>