import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-vue/styles.css';
import App from './App.vue';
import router from './router.js';
import './style.css';

createApp(App).use(router).mount('#app');
