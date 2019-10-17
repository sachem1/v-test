import Main from '@/views/Main.vue';

export const billRouter = {
	path: '/',
	name: 'billRoute',
	redirect: '/home',
	component: Main,
	hideInMenu: true,
	children: [{
		path: '/billInList',
		title: '核注清单列表',
		name: 'billInList',
		component: () => import('@/views/business/bsbookrecord/bill/BillIndex.vue')
	}]
};
