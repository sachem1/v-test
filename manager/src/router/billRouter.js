import Main from '@/views/Main.vue';

export const billRouter = {
	path: '/',
	name: 'billRoute',
	redirect: '/home',
	component: Main,
	hideInMenu: true,
	children: [{
		path: '/billInIndex',
		title: '进口核注清单列表',
		name: 'billInIndex',
		hideInMenu: true,
		component: () => import('@/views/business/bsbookrecord/bill/billIn/billInIndex.vue')
	}]
};
