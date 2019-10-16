import Main from '@/views/main.vue';

export const billRouter = {
	path: '/',
	name: 'billRoute',
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
			path: '/billInList',
			title: '核注清单列表',
			name: 'billInList',
			component: () => import('@/views/business/bsbookrecord/bill/BillIndex.vue')
		},
		{
			path: '/testPage',
			title: '测试页面',
			name: 'testPage',
			component: () => import('@/views/business/test/testPage.vue')
		},
		{
			path: '/userFormTag',
			title: '用户编辑界面',
			name: 'userFormTag',
			component: () => import('_vbue/test/userFormTag.vue')
		}
	]
};
