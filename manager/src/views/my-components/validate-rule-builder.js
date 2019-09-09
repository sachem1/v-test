function install(Vue, options) {
    Vue.buildValidateRules = items => {
        var result = new Object();

        for (var i = 0; i < items.length; ++i) {
            var buffer = new Array();        
            var item = items[i];
            if (item.required != undefined && item.required == "true") {
                var rule = {
                        required: true,
                        message: '请输入' + item.label,
                        trigger: 'blur'
                    };
                if (item.type == 'number' || item.validateValueType == 'number')
                    rule['type'] = 'number';
                buffer.push(rule);
            }

            if (item.max != undefined && item.min != undefined) {
                buffer.push({
                    max: item.max,
                    min: item.min,
                    message: item.label + '允许范围为'  + item.min + '-' + item.max,
                    type: 'number'
                });
            } else if (item.max != undefined) {
                buffer.push({
                    max: item.max,
                    message: item.label + '不能超过' + item.max,
                    type: 'number'
                });
            } else if (item.min != undefined) {
                buffer.push({
                    min: item.min,
                    message: item.label + '不能低于' + item.min,
                    type: 'number'
                });
            }

            if (item.maxLength != undefined && item.minLength != undefined && item.maxLength == item.minLength) {
                buffer.push({
                    max: item.maxLength,
                    min: item.minLength,
                    message: item.label + '只允许'  + item.maxLength + '个字',
                    trigger: 'blur'
                });
            } else if (item.maxLength != undefined) {
                buffer.push({
                    max: item.maxLength,
                    message: item.label + '不能多于'  + item.maxLength + '字',
                    trigger: 'blur'
                });
            } else if (item.minLength != undefined) {
                buffer.push({
                    min: item.minLength,
                    message: item.label + '不能少于'  + item.minLength + '字',
                    trigger: 'blur'
                });
            }

            if (item.type === 'condition') {
                buffer.push({
                    validator: validateLogicalSymbol,
                    message: '条件未正确指定。',
                    trigger: 'blur'
                });
                buffer.push({
                    validator: validateBrackets,
                    message: '括号未正确指定。',
                    trigger: 'blur'
                });
            }

            if (buffer.length > 0)
                result[item.prop] = buffer;
        }

        return result;
    };

    function validateLogicalSymbol(rule, expression, callback) {
        if (expression == null) {
            callback();
            return;
        }

        if (expression.indexOf('}{') >= 0) {
            callback(new Error());
            return;
        }

        if (expression.endsWith('AND ') || expression.endsWith('OR ')) {
            callback(new Error());
            return;
        }

        callback();
    }

    function validateBrackets(rule, expression, callback) {
        if (expression == null) {
            callback();
            return;
        }

        var chars = expression.split('');
        var isLeftBracketFound = false;
        for(var i = 0; i < chars.length; ++i) {
            if (chars[i] == '(') {
                if (isLeftBracketFound) {
                    callback(new Error());
                    return;
                }
                
                isLeftBracketFound = true;
            }

            if (chars[i] == ')') {
                if (!isLeftBracketFound) {
                    callback(new Error());
                    return;
                }

                isLeftBracketFound = false;
            }
        }

        if (isLeftBracketFound) {
            callback(new Error());
            return;
        }
        
        callback();;
    }
}

export default install;