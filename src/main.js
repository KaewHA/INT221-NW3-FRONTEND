import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QuillEditor } from '@vueup/vue-quill'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.component('QuillEditor', QuillEditor)
app.mount('#app')

