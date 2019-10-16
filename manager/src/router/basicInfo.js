import Main from '@/views/Main.vue';

export const basicInfo = {
  path: '/',
  name: 'basicInfoRouter',
  redirect: '/home',
  component: Main,
  hideInMenu: true,
  children: [{
    path: '/testpage1',
    title: '测试页面',
    name: 'testpage1',
    component: () => import('@/views/business/test/testPage.vue')
  }]
};