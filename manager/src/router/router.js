import Main from '@/views/Main.vue';
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
    name: 'logout'
};

export const page404 = {
    path: '/*',
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
    component: Main,
    children: [{
        path: 'home',
        title: '首页',
        name: 'home_index',
        component: () => import('@/views/home/home.vue')
    }]
};
export const testRouter = {
    path: '/test',
    name: 'test',
    component: () => import('@/views/my-components/test.vue')
};

export const CustomRouter = {
    path: '/',
    name: 'customRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: '/trade2',
            name: 'trade2',
            component: () => import('@/views/business/trade2.vue')
        },
        {
            path: '/trade3',
            name: 'trade3',
            component: () => import('@/views/business/trade3.vue')
        }
    ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    logout,
    otherRouter,
    testRouter,
    CustomRouter
];
export const errorRouters = [
    page500,
    page403,
    page404
];