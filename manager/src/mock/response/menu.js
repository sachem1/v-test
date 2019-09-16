export const getMenuList = () => {
    return [{
            'path': '/CustomerService',
            'icon': 'social-buffer',
            'name': 'CustomerServiceCategory',
            'title': '账册备案申报',
            'component': 'Main',
            'children': [{
                    'path': '/',
                    'icon': 'compose',
                    'name': 'CustomerService',
                    'title': '企业内部编号',
                    'component': 'ListPage'
                },
                {
                    'path': '/CustomerService1',
                    'icon': 'compose',
                    'name': 'CustomerService1',
                    'title': '产品档案管理',
                    'component': 'ListPage'
                },
                {
                    'path': '/CustomerService2',
                    'icon': 'compose',
                    'name': 'CustomerService2',
                    'title': 'ERP物料关联',
                    'component': 'ListPage'
                    
                },
                {
                    'path': '/CustomerService3',
                    'icon': 'compose',
                    'name': 'CustomerService3',
                    'title': '企业单耗管理',
                    'component': 'EditaleTable'
                    
                },
                {
                    'path': '/',
                    'icon': 'compose',
                    'name': 'CustomerService4',
                    'title': '企业资质',
                    'component': 'EditaleTable'
                    
                },
                {
                    'path': '/',
                    'icon': 'compose',
                    'title': '资质备案查询',
                    'name': 'CustomerService5',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '加工贸易账册',
                    'name': 'CustomerService6',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '加工贸易账册查询',
                    'name': 'CustomerService7',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                }
            ]
        },
        {
            'path': '/product',
            'icon': 'ios-grid-view',
            'name': 'productgroup',
            'title': '业务管控',
            'component': 'Main',
            'children': [{
                    'path': '/',
                    'title': '接单管理',
                    'name': 'ProductInfo',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '业务单状态跟踪',
                    'name': 'ProductMetadata',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '进口业务单管理',
                    'name': 'ProductDispatcher',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '出口业务单管理',
                    'name': 'AddProductDispatcher',
                    'icon': 'arrow-move',
                    'component': 'FormPage',
                    'meta': {
                        'hideInMenu': true
                    }
                },
                {
                    'path': '/',
                    'title': '流转类型管理',
                    'name': 'EditProductDispatcher',
                    'icon': 'arrow-move',
                    'component': 'FormPage',
                    'meta': {
                        'hideInMenu': true
                    }
                }
            ]
        },
        {
            'path': '/responder',
            'icon': 'ios-grid-view',
            'name': 'ResponderCategory',
            'title': '报核管理',
            'component': 'Main',
            'children': [{
                    'path': '/',
                    'title': '加工貿易账册报核',
                    'name': 'Responder',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/responderPort',
                    'title': '预核查',
                    'name': 'ResponderPort',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/responderFieldMap',
                    'title': '响应方接口参数',
                    'name': 'ResponderFieldMap',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable',
                    'meta': {
                        'hideInMenu': true
                    }
                },
                {
                    'path': '/deafultFieldMap',
                    'icon': 'compose',
                    'name': 'ResponderDefaultMap',
                    'title': '参数默认映射',
                    'component': 'EditaleTable'
                }
            ]
        },
        {
            'path': '/businessLog',
            'icon': 'ios-grid-view',
            'name': 'LogCategory',
            'title': '内销管理',
            'component': 'Main',
            'children': [{
                    'path': '/',
                    'title': '内销登记',
                    'name': 'BusinessLog',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/historyLog',
                    'title': '内销匹配',
                    'name': 'HistoryLog',
                    'icon': 'arrow-move'
                },
                {
                    'path': '/errorLog',
                    'title': '内销清单',
                    'name': 'ErrorLog',
                    'icon': 'arrow-move'
                }
            ]
        },
        {
            'path': '/systemSetting',
            'icon': 'ios-grid-view',
            'name': 'SystemSetting',
            'title': '数据对接服务',
            'component': 'Main',
            'children': [{
                    'path': '/validatesetting',
                    'title': '企业BOM',
                    'name': 'Validatesetting',
                    'icon': 'compose',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/glossarysetting',
                    'title': '物料关系',
                    'name': 'Glossarysetting',
                    'icon': 'compose',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/cacheSetting',
                    'title': '单次合同要素',
                    'name': 'CacheSetting',
                    'icon': 'arrow-move',
                    'component': 'ListPage'
                },
                {
                    'path': '/systemmaintain',
                    'title': '中方采购订单',
                    'name': 'Systemmaintain',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                }
            ]
        }        
    ]
}