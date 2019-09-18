function install(Vue) {
    Vue.attachCascadeWatchers = function (vm, items, modelPropName) {        
        items.forEach(async function (item) {
            await attachWatcher(vm, item, modelPropName);
        });
    }
    Vue.markAsInitialized = function (model) {
        model.__initialized = true;
    }
}
async function requestOption(vm, mapper, item, newValue) {
    var query = {};
    query[item.enumQueryKey] = newValue;
    var enumItems = await vm.$store.dispatch({
        type: item.enumUrl,
        data: query
    });
    item.__options = enumItems.map(enumItem => {
        return {
            value: enumItem[mapper.value],
            label: enumItem[mapper.label]
        };
    });
}
async function attachWatcher(vm, item, modelPropName) {    
    if (item.hasOwnProperty('enumUrl')) {
        var __item = item;
        item.__options = [];
        var mapper = {
            value: 'value',
            label: 'text'
        };
        if (item.hasOwnProperty('mapper'))
            mapper = item.mapper;

        if (item.hasOwnProperty('parent') && item.hasOwnProperty('enumQueryKey')) {
            vm.$watch(
                function () {
                    return vm[modelPropName][item.parent];
                },
                async function (newValue, oldValue) {
                    await requestOption(vm, mapper, item, newValue);
                });
            if (item.hasOwnProperty('force')) {
                await requestOption(vm, mapper, item, "");
            }
        } else {
            var parameters = null;
            if (item.hasOwnProperty('routeKey') && item.hasOwnProperty('enumQueryKey')) {
                parameters = {};
                parameters[__item.enumQueryKey] = vm.$route.query[__item.routeKey];
            }

            var enumItems = await vm.$store.dispatch({
                type: __item.enumUrl,
                data: parameters
            });
            __item.__options = enumItems.map(enumItem => {
                var valueBuffer = enumItem[mapper.value];
                if (__item.validateValueType === 'number') {
                    valueBuffer = parseInt(valueBuffer);
                }

                return {
                    value: valueBuffer,
                    label: enumItem[mapper.label]
                };
            });
        }
    }

    if (item.hasOwnProperty('syncFromProp')) {
        vm.$watch(
            function () {
                return vm[modelPropName][item.syncFromProp];
            },
            function (newValue, oldValue) {
                if (vm[modelPropName].__initialized)
                    vm[modelPropName][item.prop] = newValue;
            }
        );
    }

    if (item.hasOwnProperty('children')) {
        item.children.forEach(child => {
            attachWatcher(vm, child, modelPropName);
        });
    }
}

export default install;