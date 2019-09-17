import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {
    routers,
    otherRouter,
    appRouter
    
} from './router';
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title, router.app);
    var accessToken = getSearch('Token');
    if (accessToken && Util.getCookieValue('loginRandom')) {
        var expireDate = new Date();
        var validSeconds = 31536000;
        expireDate.setSeconds(expireDate.getSeconds() + validSeconds);

        Util.setToken(accessToken, expireDate)
        var account = getSearch('Account');
        Util.setCookieValue('account', account, expireDate);
        Util.setCookieValue('loginRandom', null, new Date());
        var name = getSearch('Name');
        Util.setCookieValue('user', name, expireDate);

        Util.title();
        // eslint-disable-next-line no-undef
        location.href = WEB_BASE_URL;
        return;
    }

    if (!Util.getToken() && to.name !== 'login') {
        expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + 36000);
        Util.setToken('mocktoken', expireDate);
        Cookies.set('user', 'mockuser');
        Util.title();
        next({
            name: 'home_index'
        });
        return;

        next({
            name: 'login'
        });
    } else if (Util.getToken() && to.name === 'login') { 
        Util.title();
        next({
            name: 'home_index'
        });
    } else {
        const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
        if (curRouterObj && curRouterObj.title) {
            Util.title(curRouterObj.title, router.app);
        }
        if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
            if (curRouterObj.access === parseInt(Cookies.get('access'))) {
                Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
            } else {
                next({
                    replace: true,
                    name: 'error-403'
                });
            }
        } else { // 没有配置权限的路由, 直接通过
            Util.toDefaultPage([...routers], to.name, router, next);
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

function getSearch (key) {
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