import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'; // Import von Axios hinzugefügt

const app = createApp(App);

app.use(router);

// Axios als $http in Vue-Instanz einbinden
app.config.globalProperties.$http = axios;

app.mount('#app');

