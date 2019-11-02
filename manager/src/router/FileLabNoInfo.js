import Main from '@/views/Main.vue';

export const FileLabNoRouter = {
    path: '/',
    name: 'FileLabNoRouter',
    redirect: '/home',
    component: Main,
    hideInMenu: true,
    children: [
      {
        path: '/BsFileLabNo',
        title: '企业内部编号',
        name: 'BsFileLabNo',
        component: () => import('@/views/business/bsbookrecord/FileLabNo/BsFileLabNo.vue')
      },

      {
        path: '/FileLibraryNotab',
        title: '企业内部编号详情',
        name: 'FileLibraryNotab',
        component: () => import('_vbue/bsbookrecord/FileLabNo/FileLibraryNotab.vue')
      },
      {
        path: '/formItRecordInfo',
        title: '资质备案查询',
        name: 'formItRecordInfo',
        component: () => import('@/views/business/bsbookrecord/itRecordInfo/formItRecordInfo.vue')
      },
        {
            path: '/heBaseConfig',
            title: '资质备案查询',
            name: 'heBaseConfig',
            component: () => import('@/views/business/bsbookrecord/heBaseConfigInfo/heBaseConfig.vue')
        }
    ]
  };
