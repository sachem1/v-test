const User = {};

User.Data = {
    totalCount: 20,
    items: []
};

User.getPageList = function () {
    return {
        'totalCount': 20,
        'items': [{
            'Name': 'test1',
            'Address': 'public123',
            'Age': 12,
            'Email': 'ddd@dd.com',
            'CreateDate': '2019-02-22'
        },
        {
            'Name': 'test2',
            'Address': 'public123',
            'Age': 55,
            'Email': 'ddd@dd.com',
            'CreateDate': '2019-02-22'
        }
        ]
    };
};

User.Create = function () {
    this.Data.items.push({
        name: '122',
        Address: '323e'
    });
};

User.Delete = function (name) {

};

User.GetTitle = function () {
    return {
        'entityName': '账册测试',
        'serviceName': 'UserService',
        'tableTitleField': 'TestName',
        'autoClose': true,
        'defaultModel': {
            'Name': '',
            'LoginName': '',
            'Password': '',
            'Address': '',
            'Age': 0,
            'seq': 0
        },
        'columns': [{
            'type': 'selection',
            'width': 53,
            'align': 'center'
        },
        {
            'title': '名称',
            'align': 'center',
            'key': 'Name',
            'width': 185
        },
        {
            'title': '年龄',
            'align': 'center',
            'key': 'Age',
            'width': 100
        },
        {
            'title': '登录名',
            'align': 'center',
            'key': 'LoginName',
            'width': 185
        }, {
            'title': '密码',
            'align': 'center',
            'key': 'Password',
            'width': 185
        },
        {
            'title': '地址',
            'align': 'center',
            'key': 'Address',
            'width': 100
        },
        {
            'title': '创建日期',
            'align': 'center',
            'key': 'CreateDate'
        },
        {
            'title': '操作',
            'align': 'center',
            'width': 120,
            'key': 'handle',
            'handle': ['edit']
        }
        ],
        'formItems': [{
            'type': 'text',
            'prop': 'Name',
            'label': '名称',
            'required': 'true'
        },
        {
            'type': 'number',
            'prop': 'Age',
            'label': '年龄'
        },
        {
            'type': 'text',
            'prop': 'LoginName',
            'label': '登录名称'
        },
        {
            'type': 'text',
            'prop': 'Password',
            'label': '密码'
        }, {
            'type': 'longtext',
            'prop': 'Address',
            'label': '地址'
        }
        ],
        'searchItems': [{
            'type': 'text',
            'prop': 'Name',
            'label': '名称',
            'maxLength': 8
        }, {
            'type': 'text',
            'prop': 'Name',
            'label': '名称',
            'maxLength': 8
        }, {
            'type': 'text',
            'prop': 'Name',
            'label': '名称',
            'maxLength': 8
        }, {
            'type': 'text',
            'prop': 'Name',
            'label': '名称',
            'maxLength': 8
        }]
    };
};
export default User;
