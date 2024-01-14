import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Konfigurieren von axios mit der Basis-URL Ihres API-Servers
axios.defaults.baseURL = 'http://localhost:8080';

const app = createApp(App);

// Globales zur Verfügung stellen von axios
app.config.globalProperties.$axios = axios;

app.use(router).mount('#app');
