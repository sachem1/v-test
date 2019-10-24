import Vue from 'vue';
import ViewUI from 'view-design';
import VueRouter from 'vue-router';
import {
    routers,
    errorRouters
} from './router';
import util from '../libs/util';
import store from '@/store';
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    routes: routers.concat(errorRouters)
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    util.title(to.meta.title, router.app);
    // if (to.path === '/') {
    //     var routerList=store.state.app.routers;
    //     router.addRoutes(routerList);
    // }
    var token = util.getToken();
    if (!token && to.name !== 'login') {
        next({
            name: 'login'
        });
    } else if (!token && to.name === 'login') {
        next();
    } else if (token && to.name === 'login') {
        next({
            name: 'home_index'
        });
    } else {

        if (!store.state.app.hasGetRouter) {
            let fromPath = GetUrlRelativePath(window.location.href);

            store.dispatch('loadMenuList').then(res => {
                router.addRoutes(res);
                if (from.name === 'login' && res.length > 0) {
                    next();
                } else {
                    next({
                        path: fromPath
                    });
                }
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
    ViewUI.LoadingBar.finish();
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

function GetUrlRelativePath(url) {
    var arrUrl = url.split('/#');

    var start = arrUrl[1].indexOf('/');
    var relUrl = arrUrl[1].substring(start);

    if (relUrl.indexOf('?') !== -1) {
        relUrl = relUrl.split('?')[0];
    }
    return relUrl;
}