import Main from '@/views/Main.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const basicRouter = {
    path: '/basicInfo',
    name: 'basicInfo',    
    component: () => import('@/views/login/login.vue')
};