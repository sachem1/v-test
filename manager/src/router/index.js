import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {
    routers
} from './router';
import util from '../libs/util';
import store from '@/store';
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    util.title(to.meta.title, router.app);
    var token = util.getToken();
    if (!token && to.name !== 'login') {
        next({
            name: 'login'
        });
    } else if (!token && to.name === 'login') {
        next();
    } else if (token && to.name === 'login') {
        next({
            name: 'home'
        });
    } else {
        console.log(store.state.app.hasGetRouter)
        if (!store.state.app.hasGetRouter) {
            store.dispatch('loadMenuList').then(res => {
                debugger;
                router.addRoutes(res);
                next([...to]);
                console.log('res-router:' + JSON.stringify(res));
            }).catch(() => {
                next({
                    name: 'login',
                    replace: true
                });
            });
        } else {
            next();
        }
    }
});

router.afterEach((to) => {
    util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

function getSearch(key) {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);

    return params.get(key);
}

function getQuery(key, url) {
    if (!url) {
        return null;
    }

    if (url.indexOf(key + '=') < 0) {
        return null;
    }

    var keyIndex = url.indexOf(key + '=');
    var indexEnd = url.indexOf('&', keyIndex);
    var indexStart = keyIndex + key.length + 1;
    if (indexEnd < 0) indexEnd = url.length - 1;

    return url.substring(indexStart, indexEnd);
}