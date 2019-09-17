const Trade = {}

Trade.Data = {
    totalCount: 20,
    items: []
}

Trade.getPageList = function () {
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
    }
}

Trade.Create = function () {
    this.Data.items.push({
        name: '122',
        Address: '323e'
    })
}

Trade.Delete = function (name) {

}

Trade.GetTitle = function () {
    return {
        'entityName': '账册测试',
        'serviceName': 'TradeService',
        'tableTitleField': 'TestName',
        'autoClose': false,
        'defaultModel': {
            'accessOrResult': null,
            'dataType': '',
            'defaultValue': null,
            'description': '',
            'isFixed': false,
            'length': '',
            'name': '',
            'productId': 0,
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
                'width': 285
            },
            {
                'title': '年龄',
                'align': 'center',
                'key': 'Age',
                'width': 100
            },
            {
                'title': '邮箱',
                'align': 'center',
                'key': 'Email',
                'width': 285
            },
            {
                'title': '地址',
                'align': 'center',
                'key': 'Address',
                'width': 100
            }
        ],
        'formItems': [{
                'type': 'text',
                'prop': 'Email',
                'label': '邮箱',
                'required': 'false'
            },
            {
                'type': 'text',
                'prop': 'Name',
                'label': '名称',
                'required': 'true'
            },
            {
                'type': 'text',
                'prop': 'Address',
                'label': '地址'
            }
        ],
        'searchItems': []
    }
}


export default Trade