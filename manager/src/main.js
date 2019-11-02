import Vue from 'vue';
import ViewUI from 'view-design';
import { router } from './router/index';
import store from './store';
import App from './app.vue';

import 'view-design/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import VueResource from 'vue-resource';
import Print from 'vue-print-nb';


if (process.env.NODE_ENV !== 'production') require('./mock');

Vue.use(VueI18n);
Vue.use(ViewUI,{
    size: 'small'
});
Vue.use(VueResource);
Vue.use(Print);
axios.defaults.baseURL = API_BASE_URL;
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: '',
        eventBus:new Vue()

    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表Custome
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
    },
    created () {
        // 权限菜单过滤相关
        // this.$store.commit('updateMenulist');
    }
});
