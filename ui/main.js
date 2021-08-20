import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import BrowserNote from './BrowserNote.vue'
import './index.css'

if (window.ethereum) {
  const app = createApp(App)
  app.use(store.init())
  app.mount('#app')
} else {
  const app = createApp(BrowserNote)
  app.mount('#app')
}