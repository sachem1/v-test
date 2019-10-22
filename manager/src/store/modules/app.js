import {
    otherRouter,
    routers
} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
import axios from '@/libs';
import Main from '@/views/Main.vue';
import store from '..';
import util from '../../libs/util';

const app = {
    state: {
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPath: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }], // 面包屑数组
        menuList: [],
        routers: [],
        userRouters: [],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
        hasGetRouter: false
    },
    getters: {
        routerList: state => {
            return store.state.app.routers;
        }
    },
    mutations: {
        setRouterState(state) {
            state.hasGetRouter = true;
        },
        setTagsList(state, list) {
            state.tagsList.push(...list);
        },
        updateMenulist(state) {
            let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];
            let menuCandidates = JSON.parse(JSON.stringify(state.routers));
            Util.filterRoutersForMenu(menuCandidates);

            menuCandidates.forEach((item, index) => {
                if (item.access !== undefined) {
                    if (Util.showThisRoute(item.access, accessCode)) {
                        if (item.children === undefined || item.children.length === 1) {
                            menuList.push(item);
                        } else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter(child => {
                                if (child.access !== undefined) {
                                    if (child.access === accessCode) {
                                        return child;
                                    }
                                } else {
                                    return child;
                                }
                            });
                            menuList[len - 1].children = childrenArr;
                        }
                    }
                } else {
                    if (item.children === undefined || item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (Util.showThisRoute(child.access, accessCode)) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        if (childrenArr === undefined || childrenArr.length === 0) {
                            menuList.splice(len - 1, 1);
                        } else {
                            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                            handledItem.children = childrenArr;
                            menuList.splice(len - 1, 1, handledItem);
                        }
                    }
                }
            });

            state.menuList = menuList;
        },
        changeMenuTheme(state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme(state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu(state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage(state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage(state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag(state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList(state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags(state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList(state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName(state, name) {
            state.currentPageName = name;
        },
        setAvator(state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang(state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu(state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount(state, count) {
            state.messageCount = count;
        },
        increateTag(state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        addRoutes(state, newRouters) {
            //state.userRouters.push(...newRouters);
            //state.routers.push(...newRouters);
            //this.$router.addRoutes(newRouters);    
            state.routers = newRouters.concat(routers)
            state.userRouters = newRouters;
        }
    },
    actions: {
        loadMenuList({
            commit
        }) {
            let vm = this;
            return new Promise((resolve, reject) => {
                try {
                    var name = vm.state.login.loginName
                    if (!name) {
                        resolve();
                    }

                    //axios.get('/api/getMetadata?name=routerrules&_t' + new Date().getTime())
                    axios.request({
                            url: '/auth/menus?loginName=' + name + '&t=' + new Date().getTime(),
                            method: 'get'
                        }).then(function (response) {
                            var userAppRouters = Util.wrapResult(response);
                            if (!userAppRouters || userAppRouters.length===0) {
                                userAppRouters=[];                                
                                resolve(userAppRouters);
                                util.clearToken();
                                return;
                            }
                            userAppRouters.forEach(element => {
                                injectComponent(element);
                            });
                            //
                            commit('addRoutes', userAppRouters);
                            commit('updateMenulist');

                            let tagsList = [];
                            vm.state.app.routers.map((item) => {
                                if (item.children) {
                                    if (item.children.length <= 1) {
                                        tagsList.push(item.children[0]);
                                    } else {
                                        tagsList.push(...item.children);
                                    }
                                }
                            });
                            commit('setTagsList', tagsList);
                            resolve(userAppRouters);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    commit('setRouterState');
                } catch (err) {
                    reject(err)
                }
            });
        }
    }

};

export default app;



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
        case 'CustomPage':
            if (routeRule.module) {
                routeRule.component = () => import('@/views/business/' + routeRule.module + '/' + routeRule.name + '.vue');
            } else {
                routeRule.component = () => import('@/views/business/' + routeRule.name + '.vue');
            }
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