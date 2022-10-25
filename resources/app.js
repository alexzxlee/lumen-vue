import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from 'Components/App.vue'
import Axios from 'axios'

window.axios = Axios

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
