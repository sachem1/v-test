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
    }
  ]
};