import Main from '@/views/Main.vue';
//新增不同模块路由
import {
    basicInfo
} from './basicInfo';

// 测试页面路由
import {
    testRouter
} from './test';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    // beforeEnter(to, from, next) {
    //     var randomNumber = util.mkLinks(12);
    //     util.setCookieValue('loginRandom', randomNumber);
    //     window.location = +"/login?redirectUri=" + WEB_BASE_URL + '&authmode=plain';
    // }
    meta: {
        title: ' 登录',
        hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
};

export const logout = {
    path: '/logout',
    name: 'logout',
    meta: {
        title: ' 登出',
        hideInMenu: true
    },
};

export const page404 = {
    path: '*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    hideInMenu: true,
    component: Main,
    children: [{
            path: 'home',
            title: '首页',
            name: 'home_index',
            component: () => import('@/views/home/home.vue')
        }, {
            path: '/userTab',
            title: '用户tab',
            name: 'userTab',
            component: () => import('@/views/business/userTab.vue')
        },
        {
            path: '/usercreate',
            title: '用户单页面',
            name: 'usercreate',
            component: () => import('@/views/business/userCreate.vue')
        },
        {
            path: '/test',
            title: '测试页面',
            name: 'testpage',
            component: () => import('@/views/business/testPage.vue')
        },
        {
            path: '/select',
            title: '下拉页面',
            name: 'selectPage',
            component: () => import('@/views/business/selectPage.vue')
        },
        {
            path: '/parent',
            title: '父页面',
            name: 'parent',
            component: () => import('@/views/business/parent.vue')
        },
        {
            path: '/test1',
            title: '測試页面',
            name: 'test1',
            component: () => import('@/views/business/test1.vue')
        },
        {
            path: '/testForm',
            title: '測試页面',
            name: 'testForm',
            component: () => import('@/views/business/testForm.vue')
        },
       
    ]
};


// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = {
    path: '/',
    name: 'appRouter',
    redirect: '/home',
    component: Main,
    children: []
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    logout,
    otherRouter,
    basicInfo,
    testRouter
];
export const errorRouters = [
    page500,
    page403,
    page404
];