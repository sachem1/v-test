import Main from "@/views/Main.vue";

export const itRecordRouter = {
  path: "/",
  name: "itRecordRouter",
  redirect: '/home',
  component: Main,
  hideInMenu: true,
  children: [
    {
      path: "/itRecordSearch",
      title: "搜索",
      name: "itRecordSearch",
      hideInMenu: true,
      component: () => import( "@/views/business/bsbookrecord/itrecord/itRecordSearch.vue")
    },
    {
      path: "/itRecordList",
      title: "企业资质",
      name: "itRecordList",
      hideInMenu: true,
      component: () => import( "@/views/business/bsbookrecord/itrecord/itRecordList.vue")
    },
    {
      path: "/itRecordImport",
      title: "企业资质导入",
      name: "itRecordImport",
      hideInMenu: true,
      component: () => import( "@/views/business/bsbookrecord/itrecord/itRecordImport.vue")
    },
    {
      path: "/itRecordEdit",
      title: "企业资质编辑",
      name: "itRecordEdit",
      hideInMenu: true,
      component: () => import( "@/views/business/bsbookrecord/itrecord/itRecordEdit.vue")
    }
  ]  
};