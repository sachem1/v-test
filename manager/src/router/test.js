import Main from '@/views/Main.vue'

export const testRouter = {
	path: '/',
	name: 'testRouter',
	redirect: '/home',
	component: Main,
	hideInMenu: true,
	children: [
		{
			path: '/buttonPage',
			name: 'buttonPage',
			meta: {
				title: ' 测试按钮页面'
			},
			component: () => import('_vbue/test/buttonPage.vue')
		},
		{
			path: '/testList',
			title: '测试列表页面',
			name: 'testList',
			component: () => import('_vbue/test/testList.vue')
		},
		{
			path: '/testPage',
			title: '测试页面',
			name: 'testPage',
			component: () => import('_vbue/test/testPage.vue')
		},
		{
			path: '/userFormTag',
			title: '用户编辑界面',
			name: 'userFormTag',
			component: () => import('_vbue/test/userFormTag.vue')
		},
		{
			path: '/userFormSecond',
			title: '用户编辑界面',
			name: 'userFormSecond',
			component: () => import('_vbue/test/userForm-second.vue')
		},
		{
			path: '/testPrint',
			title: '打印测试',
			name: 'testPrint',
			component: () => import('_vbue/test/print.vue')
		}
	]
}
