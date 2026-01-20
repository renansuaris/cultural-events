import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { registerFontAwesome } from './plugins/fontAwesome'
import { registerToast } from './plugins/toast'

const app = createApp(App)

app.use(createPinia())
app.use(router)

registerFontAwesome(app)
registerToast(app)

app.mount('#app')
