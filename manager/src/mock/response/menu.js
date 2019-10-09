export const getMenuList = () => {
    return [{
        'path': '/TradeService',
        'icon': 'social-buffer',
        'name': 'TradeServiceParent',
        'title': '账册备案申报',
        'component': 'Main',
        'children': [{
            'path': '/TradeService',
            'icon': 'compose',
            'name': 'TradeService',
            'title': '企业内部编号',
            'meta': {
                access: '1'
            },
            'component': 'EditaleTable'
        },
        {
            'path': '/userService',
            'icon': 'compose',
            'name': 'userService',
            'title': '增删改查测试',
            'component': 'CustomPage'
        },
        {
            'path': '/userList',
            'icon': 'compose',
            'name': 'userList',
            'title': 'ERP物料关联',
            'component': 'CustomPage'

        }]
    }];
};
