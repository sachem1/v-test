import axios from 'axios';
import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';
import {
    router
} from '../router';

export const API_URL_PATTERN = '/api/';

let util = {

};
util.title = function (title, vm) {
    let iTitle = 'Epass关务管理系统';
    if (title) {
        iTitle += ' - ' + (title.i18n ? vm.$t(title.i18n) : title);
    }
    window.document.title = iTitle;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }

    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (item && item.title) {
        if (typeof item.title === 'object') {
            return vm.$t(item.title.i18n);
        } else {
            return item.title;
        }
    }
    return '';
};

util.setCurrentPath = function (vm, name) {
    if (!name) return;
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (!item.children) {
            return;
        }
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter' || item.name === 'customRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    //if (item.name === 'otherRouter' || item.name === 'customRouter') {
                        isOtherRouter = true;
                    //}
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home') {
        currentPathArr = [{
            title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home')),
            path: '',
            name: 'home'
        }];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home') {
        currentPathArr = [{
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home')),
                path: '/home',
                name: 'home'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (!currentPathObj) return;
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [{
                title: '首页',
                path: '',
                name: 'home'
            }];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [{
                    title: '首页',
                    path: '/home',
                    name: 'home'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [{
                    title: '首页',
                    path: '/home',
                    name: 'home'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    if (vm.$store === undefined) {
        return;
    }

    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (!item) {
                console.log(name);
                console.log(query);
            }

            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {};

util.filterRoutersForMenu = function (routers) {
    for (var i = routers.length - 1; i >= 0; --i) {
        var route = routers[i];
        if (route.hideInMenu || (route.meta !== undefined && route.meta.hideInMenu)) {
            routers.splice(i, 1);
        } else if (route.children !== undefined && route.children.length > 0) {
            this.filterRoutersForMenu(route.children);
        }
    }
};

/* Authentication */
/**
 * Sets a cookie value for given key.
 * This is a simple implementation created to be used by ABP.
 * Please use a complete cookie library if you need.
 * @param {string} key
 * @param {string} value
 * @param {Date} expireDate (optional). If not specified the cookie will expire at the end of session.
 * @param {string} path (optional)
 */
util.setCookieValue = function (key, value, expireDate, path, domain) {
    var cookieValue = encodeURIComponent(key) + '=';

    if (value) {
        cookieValue = cookieValue + encodeURIComponent(value);
    }

    if (expireDate) {
        cookieValue = cookieValue + '; expires=' + expireDate.toUTCString();
    }

    if (path) {
        cookieValue = cookieValue + '; path=' + path;
    }

    if (domain) {
        cookieValue = cookieValue + '; domain=' + domain;
    }

    document.cookie = cookieValue;
};

/**
 * Gets a cookie with given key.
 * This is a simple implementation created to be used by ABP.
 * Please use a complete cookie library if you need.
 * @param {string} key
 * @returns {string} Cookie value or null
 */
util.getCookieValue = function (key) {
    var equalities = document.cookie.split('; ');
    for (var i = 0; i < equalities.length; i++) {
        if (!equalities[i]) {
            continue;
        }

        var splitted = equalities[i].split('=');
        if (splitted.length != 2) {
            continue;
        }

        if (decodeURIComponent(splitted[0]) === key) {
            return decodeURIComponent(splitted[1] || '');
        }
    }

    return null;
};

util.tokenCookieName = 'Epass.AuthToken';
util.loginNameCookieName = 'Epass.LoginName';
util.DOMAIN = 'localhost'
util.setToken = function (authToken, expireDate) {
    var _expireDate = new Date(expireDate);
    var validSeconds = 3600;
    _expireDate.setSeconds(_expireDate.getSeconds() + validSeconds);

    this.setCookieValue(this.tokenCookieName, authToken, _expireDate, '/', this.DOMAIN);
    // this.attachAuthHeader();
};
util.setLoginName = function (loginName, expireDate) {
    var _expireDate = new Date(expireDate);
    var validSeconds = 3600;
    _expireDate.setSeconds(_expireDate.getSeconds() + validSeconds);

    this.setCookieValue(this.loginNameCookieName, loginName, _expireDate, '/', this.DOMAIN);

};

util.attachAuthHeader = function () {
    // var authHeader = window.btoa(APPKEY + ':' + APPSECRET);
    // axios.defaults.headers.common['Authorization'] = 'Basic ' + authHeader;
};

util.getToken = function () {
    return this.getCookieValue(this.tokenCookieName);
};

util.clearToken = function () {
    this.setToken(null, new Date());
    this.setCookieValue('account', '', new Date());
};

/* End Authentication */

util.getPropertyType = function (extendInfo) {
    if (extendInfo === undefined || extendInfo === null || extendInfo === 'varchar') {
        return 'text';
    }

    if (extendInfo === 'int' || extendInfo === 'long' || extendInfo === 'number') {
        return 'number';
    }

    if (extendInfo === 'date' || extendInfo === 'datetime') {
        return 'date';
    }

    return extendInfo;
};

util.applyMixins = function (derivedCtor, baseCtor) {
    Object.getOwnPropertyNames(baseCtor).forEach(name => {
        if (name !== 'constructor' && name !== 'actions') {
            derivedCtor[name] = baseCtor[name];
        }
    });
    if (!derivedCtor.actions)
        derivedCtor.actions = {};
    Object.assign(derivedCtor.actions, baseCtor.actions);
};

util.wrapResult = function (response) {
    if (response.data && response.data.data) {
        return response.data.data;
    }

    if (response.data) {
        return response.data;
    }
    
    return response;
};
util.mkLinks = function (num) {
    var str = 'QWERTYUIOPASDFGHJKLZXCVBNMzxcvbnmasdfghjklqwertyuiop0123456789';
    var res = '';
    for (var i = 0; i < num; i++) {
        res += str[Math.floor(Math.random() * str.length)];
    }
    return res;
};
export default util;