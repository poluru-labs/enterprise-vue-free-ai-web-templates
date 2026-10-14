import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@poluru-labs/enterprise-design-system-vue/styles.css';
import './style.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';

createApp(App).use(router).mount('#app');
