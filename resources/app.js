import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from 'Components/App.vue'
import Axios from 'axios'
import routes from './router'

import "./assets/main.css";

window.axios = Axios

const app = createApp(App)
app.use(createPinia())
app.use(routes)
app.mount('#app')
