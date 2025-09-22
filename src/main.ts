import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/core/config/themes/style.css'
import router from './core/config/router'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.use(createPinia())
app.use(VueApexCharts)
app.component('apexchart', VueApexCharts)
app.use(router)

app.mount('#app')
