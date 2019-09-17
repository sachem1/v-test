export const getMenuList = () => {
    return [{
            'path': '/TradeService',
            'icon': 'social-buffer',
            'name': 'TradeServiceCategory',
            'title': '账册备案申报',
            'component': 'Main',
            'children': [{
                    'path': '/',
                    'icon': 'compose',
                    'name': 'TradeService',
                    'title': '企业内部编号',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/TradeService1',
                    'icon': 'compose',
                    'name': 'TradeService1',
                    'title': '产品档案管理',
                    'component': 'ListPage'
                },
                {
                    'path': '/TradeService2',
                    'icon': 'compose',
                    'name': 'TradeService2',
                    'title': 'ERP物料关联',
                    'component': 'ListPage'
                    
                },
                {
                    'path': '/TradeService3',
                    'icon': 'compose',
                    'name': 'TradeService3',
                    'title': '企业单耗管理',
                    'component': 'EditaleTable'
                    
                },
                {
                    'path': '/',
                    'icon': 'compose',
                    'name': 'TradeService4',
                    'title': '企业资质',
                    'component': 'EditaleTable'
                    
                },
                {
                    'path': '/',
                    'icon': 'compose',
                    'title': '资质备案查询',
                    'name': 'TradeService5',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '加工贸易账册',
                    'name': 'TradeService6',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '加工贸易账册查询',
                    'name': 'TradeService7',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                }
            ]
        },
        {
            'path': '/Out',
            'icon': 'ios-grid-view',
            'name': 'Outgroup',
            'title': '业务管控',
            'component': 'Main',
            'children': [{
                    'path': '/',
                    'title': '接单管理',
                    'name': 'OutInfo',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '业务单状态跟踪',
                    'name': 'OutMetadata',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '进口业务单管理',
                    'name': 'OutDispatcher',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/',
                    'title': '出口业务单管理',
                    'name': 'AddOutDispatcher',
                    'icon': 'arrow-move',
                    'component': 'FormPage',
                    'meta': {
                        'hideInMenu': true
                    }
                },
                {
                    'path': '/',
                    'title': '流转类型管理',
                    'name': 'EditOutDispatcher',
                    'icon': 'arrow-move',
                    'component': 'FormPage',
                    'meta': {
                        'hideInMenu': true
                    }
                }
            ]
        },
        {
            'path': '/check',
            'icon': 'ios-grid-view',
            'name': 'checkCategory',
            'title': '报核管理',
            'component': 'Main',
            'children': [{
                    'path': '/',
                    'title': '加工貿易账册报核',
                    'name': 'check',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/checkPort',
                    'title': '预核查',
                    'name': 'checkPort',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable'
                },
                {
                    'path': '/checkFieldMap',
                    'title': '响应方接口参数',
                    'name': 'checkFieldMap',
                    'icon': 'arrow-move',
                    'component': 'EditaleTable',
                    'meta': {
                        'hideInMenu': true
                    }
                },
                {
                    'path': '/deafultFieldMap',
                    'icon': 'compose',
                    'name': 'checkDefaultMap',
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