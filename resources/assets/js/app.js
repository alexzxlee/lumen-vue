import { createApp } from 'vue'
import App from 'Components/App.vue'
import Axios from 'axios'

window.axios = Axios

const app = createApp(App)
app.mount('#app')