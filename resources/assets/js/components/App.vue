<template>
    <div>
        Hello Alex, I'm Vue!
        <br />{{message}}
    </div>
</template>

<script>
    export default {
        name: "App",
        created() {
            this.getMessage()
        },
        methods: {
            getMessage() {
                axios.get('/api').then(response => {
                    this.message = response.data
                }).catch(error => {

                })
            }
        },
        data() {
            return {
                message: ''
            }
        }
    }
</script>

<style scoped>

</style>