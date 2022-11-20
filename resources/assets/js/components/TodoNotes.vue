<template>
    <div>
        <form @submit.prevent="addTodo">
            <input v-model="newTodo">
            <button>Add Todo</button>
        </form>
        <ol>
            <li v-for="todonote in filteredTodos" :key="todonote.id">
                <input type="checkbox" v-model="todonote.done" @click="toggleComplete(todonote)">
                <span :class="{ done: todonote.done }">{{ todonote.id }} : {{ todonote.content }}</span>
                <button @click="removeTodo(todonote)">Delete</button>
            </li>
        </ol>
        <button @click="hideCompleted = !hideCompleted">
            {{ hideCompleted ? 'Show all' : 'Hide completed' }}
        </button>
    </div>
    <br /><br />
    <div v-if="apiErrorMessage">
        API error message: <pre>{{ apiErrorMessage }}</pre>
    </div>
</template>

<script>
export default {
    data() {
        return {
            apiErrorMessage: '',
            newTodo: '',
            todonotes: null,
            hideCompleted: false,
            apiToken: ''
        }
    },
    created() {
        this.getTodoNotes()
    },
    computed: {
        filteredTodos() {
            return this.hideCompleted ? this.todonotes.filter(t => !t.completion_time) : this.todonotes
        }
    },
    methods: {
        getTodoNotes() {
            this.apiToken = localStorage.getItem('api_token')
            axios.get('/todonotes?api_token=' + this.apiToken).then(response => {
                let todos = response.data.todonotes
                response.data.todonotes.forEach((todo, index) => {
                    todos[index].done = (todo.completion_time != null) ? true :false
                })
                this.todonotes = todos
            }).catch(error => {
                this.apiErrorMessage = error.response
            })
        },
        addTodo() {
            axios.post('/todonotes', { content: this.newTodo, api_token: this.apiToken }).then(response => {
                this.newTodo = ''
            }).catch(error => {
                this.apiErrorMessage = error.response.data
            })
        },
        removeTodo(todonote) {
            let id = todonote.id
            let uri = '/todonotes/' + id + '?api_token=' + this.apiToken
            axios.delete(uri).then(response => {
                this.getTodoNotes()
            }).catch(error => {
                this.apiErrorMessage = error.response
            })
        },
        toggleComplete(todonote) {
            let id = todonote.id
            let uri = (todonote.completion_time) 
            ? '/todonotes/' + id + '/incomplete' 
            : '/todonotes/' + id + '/complete'
            axios.put(uri, { api_token: this.apiToken }).then(response => {
                this.getTodoNotes()
            }).catch(error => {
                this.apiErrorMessage = error.response
            })
        }
    },
    watch: {
        apiToken() {
            this.getTodoNotes()
        },
        newTodo() {
            this.getTodoNotes()
        },
        hideCompleted() {
            this.getTodoNotes()
        }
    }
}
</script>

<style scoped>
.done {
    text-decoration: line-through;
}
</style>