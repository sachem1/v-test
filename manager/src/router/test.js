import Main from '@/views/Main.vue';

export const testRouter = {
  path: '/',
  name: 'testRouter',
  redirect: '/home',
  component: Main,
  hideInMenu: true,
  children: [{
      path: '/buttonPage',
      name: 'buttonPage',
      meta: {
        title: ' 测试按钮页面'
      },
      component: () => import('@/views/business/test/buttonPage.vue')
    },
    {
      path: '/testList',
      title: '测试列表页面',
      name: 'testList',
      component: () => import('@/views/business/test/testList.vue')
    },
    {
      path: '/testPage',
      title: '测试页面',
      name: 'testPage',
      component: () => import('@/views/business/testPage.vue')
    },
    {
      path: '/userFormTag',
      title: '用户编辑界面',
      name: 'userFormTag',
      component: () => import('_vbue/test/userFormTag.vue')
    }
  ]
};
