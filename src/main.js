import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? `http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`
        : `http://${process.env.VUE_APP_SERVER_HOST}`
});

new Vue({
    render: h => h(App),
}).$mount('#app');
