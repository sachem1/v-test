import Main from '@/views/Main.vue';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import axios from 'axios'
import {
    routers,
    otherRouter
} from '@/router/router.js';

const router = {
    state: {
        routes: [],
        menuList: [],
        routers: [
            otherRouter
        ],
        userRouters: [],
        tagsList: [...otherRouter.children],
        hasGetRouter: false
    },
    mutations: {
        SET_MENU_STATE(state) {
            state.hasGetRouter = true;
        },
        addRoutes(state, newRouters) {
            state.userRouters.push(...newRouters);
            state.routers.push(...newRouters);
        },
        setTagsList(state, list) {
            state.tagsList.push(...list);
        },
        CONCAT_ROUTES(state, routerList) {
            state.routes = routerList.concat(routers)
            state.hasGetRouter = true
        },
        updateMenulist(state) {
            let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];
            let menuCandidates = JSON.parse(JSON.stringify(state.userRouters));
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
        }
    },
    actions: {
        initMenuList1({
            commit
        }) {
            return new Promise((resolve, reject) => {
                try {
                    
                    var name = this.state.login.loginName
                    if (!name)
                        name = 'z';
                    let vm = this;
                    console.log(JSON.stringify(vm.$router))

                    axios.get('/api/auth/menus?loginName=' + name + '&t=' + new Date().getTime())
                        .then(function (response) {
                            var userAppRouters = response.data;
                            userAppRouters.forEach(element => {
                                injectComponent(element);
                            });
                            commit('CONCAT_ROUTES', userAppRouters);
                            commit('addRoutes', userAppRouters);
                            commit('updateMenulist');

                            let tagsList = [];
                            userAppRouters.map((item) => {
                                if (item.children.length <= 1) {
                                    tagsList.push(item.children[0]);
                                } else {
                                    tagsList.push(...item.children);
                                }
                            });
                            commit('setTagsList', tagsList);
                            resolve(userAppRouters);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    commit('SET_MENU_STATE');
                } catch (err) {
                    reject(err)
                }
            });
        }
    }
}


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
            routeRule.component = () => import('@/views/business/' + routeRule.name + '.vue');
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

export default router;


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
            routeRule.component = () => import('@/views/business/' + routeRule.name + '.vue');
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