import Vue from 'vue';
import iView from 'iview';
import {
    router
} from './router/index';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import Main from '@/views/Main.vue';
import axios from 'axios';

if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.use(VueI18n);
Vue.use(iView);

axios.defaults.baseURL = API_BASE_URL;
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created() {
        var vm = this;
        // util.attachAuthHeader();

        axios.get('/metadata/routerrules.json?t=' + new Date().getTime())
            .then(function (response) {
                var userAppRouters = response.data;
                userAppRouters.forEach(element => {
                    injectComponent(element);
                });
                vm.$router.addRoutes(userAppRouters);
                vm.$store.commit('addRoutes', userAppRouters);
                vm.$store.commit('updateMenulist');

                let tagsList = [];
                userAppRouters.map((item) => {
                    if (item.children.length <= 1) {
                        tagsList.push(item.children[0]);
                    } else {
                        tagsList.push(...item.children);
                    }
                });
                vm.$store.commit('setTagsList', tagsList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

function injectComponent(routeRule) {

    switch (routeRule.component) {
        case 'Main':
            routeRule.component = Main;
            break;
        case 'EditaleTable':
            routeRule.component = () => import('@/views/my-components/common-page.vue');
            break;
        case 'FormPage':
            routeRule.component = () => import('@/views/my-components/form-page.vue');
            break;
        case 'ListPage':
            routeRule.component = () => import('@/views/my-components/list-page.vue');
            break;
        default:
            console.log(routeRule.component + ' not resolved.');
            break;
    }

    if (routeRule.hasOwnProperty('children')) {
        routeRule.children.forEach(item => {
            injectComponent(item);
        });
    }
}