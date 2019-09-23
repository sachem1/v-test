import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {
    routers,
    otherRouter,
    appRouter

} from './router';
import util from '../libs/util';
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
            name: 'home_index'
        });
    } else {
        const curRouterObj = util.getRouterObjByName([otherRouter, ...appRouter], to.name);
        if (curRouterObj && curRouterObj.title) {
            console.log('111');
            util.title(curRouterObj.title, router.app);
        }
        if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
            console.log('222');
            if (curRouterObj.access === parseInt(Cookies.get('access'))) {
                util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
            } else {
                next({
                    replace: true,
                    name: 'error-403'
                });
            }
        } else { // 没有配置权限的路由, 直接通过
            console.log('333');
            util.toDefaultPage([...routers], to.name, router, next);
        }
    }
});

router.afterEach((to) => {
    util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

function getSearch (key) {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);

    return params.get(key);
}

function getQuery (key, url) {
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
