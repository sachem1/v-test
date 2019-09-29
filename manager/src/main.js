import Vue from 'vue';
import iView from 'iview'
import {
    router
} from './router/index';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from '@/libs/util.js';
import Main from '@/views/Main.vue';
import axios from 'axios';
import VueResource from 'vue-resource'
import config from '@/config'

if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.use(VueI18n);
Vue.use(iView);
Vue.use(VueResource);


axios.defaults.baseURL = API_BASE_URL;
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表Custome
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    }
});
