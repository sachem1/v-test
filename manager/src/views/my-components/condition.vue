<template>
    <div style="clear: both;">
        <Alert type="error" v-show="error">{{error}}</Alert>
        <condition-group ref="mainGroup" v-model="conditionsForBind" :propertyList="propertyList" :operatorMap="operatorMap" :expression="expressionForBind" @on-change="handleConditionChange" @on-expression-change="handleExpressionChange"></condition-group>
    </div>
</template>
<script>
import Vue from 'vue';
import areaPath from './../my-components/area-linkage/components/areapath.js';
import conditionGroup from './../my-components/condition-group.vue';

Vue.component('condition-group', conditionGroup);

export default {
    name: 'condition',
    props: {
        value: {
            default: ''
        },
        conditions: {            
            type: Array,
            default: function () { return []; }
        },
        propertyFilter: {
            default: function () {
                return [];
            }
        }
    },
    data () {
        return {
            conditionsForBind: [],
            error: '',
            expressionForBind: '',
            isInited: false,
            propertyList: [],
            operatorMap: []
        };
    },
    async created () {
        await this.init();
    },
    methods: {
        async init () {
            var vm = this;

            if (this.$route.query.id && (this.value == undefined || this.value == null))
                return;

            if (this.propertyFilter == undefined)
                return;

            if (this.isInited)
                return;

            this.isInited = true;
            var propertyQuery = this.buildPropertyFilter();            
            var propertyListBuffer = await this.$store.dispatch({
                        type:'customer/getPropertyList',
                        data: propertyQuery
                    });
            this.propertyList.push(...propertyListBuffer);
            var operatorMapBuffer = await this.$store.dispatch({
                        type:'customer/getOperatorMap'
                    });
            this.operatorMap.push(...operatorMapBuffer);
            
            this.expressionForBind = this.value;
            if (this.$route.query.id) {
                var conditionsBuffer = this.conditions;
                conditionsBuffer.sort(function (a, b) {
                    return a.orderNo - b.orderNo;
                });
                conditionsBuffer.forEach(element => {
                    var condition = {
                        "value": {
                            "metadataId": element.fieldName,
                            "operatorType": element.operater,
                            "conditionValue": element.value,
                            "sequence": element.orderNo,
                            "clientId": element.orderNo
                        }
                    };
                    condition.value.connectType = this.getConnectType(element.orderNo, vm.expressionForBind);

                    var getSelectedProperty = this.getSelectedProperty(element.fieldName, this.propertyList);
                    if (getSelectedProperty.type == 'geolocation') {
                        var areaCodes = element.value.split(',');
                        var geoObjects = [];
                        areaCodes.forEach(code => {
                            var path = areaPath[code];
                            if (path) {
                                var obj = path[path.length - 1];
                                obj.path = path;
                                geoObjects.push(obj)
                            }
                        });

                        condition.value.conditionValueForBind = geoObjects;
                    }

                    vm.conditionsForBind.push(condition);
                });
                
                this.$nextTick(()=> {   
                    this.$refs['mainGroup'].buildExpressionItems(this.expressionForBind);
                });
            }
            else {
                this.$nextTick(()=> {
                    this.$refs['mainGroup'].buildExpressionItems('');
                });
            }
        },
        getConnectType(index, expression) {
            var segments = expression.split(' ');
            for (var i = 0; i < segments.length; ++i) {
                var indexInSegment = segments[i].replace('{', '').replace('}', '').replace('(', '').replace(')', '');
                if (indexInSegment == index)
                    return i == segments.length - 1 ? null : segments[i + 1];
            }

            return null;
        },
        buildPropertyFilter() {
            var result = {};

            this.propertyFilter.forEach(item => {
                if (this.$route.query.hasOwnProperty(item.valueField)) {
                    result[item.keyName] = this.$route.query[item.valueField];                    
                }
            });

            return result;
        },
        getSelectedProperty: function (propertyCode, propertyList) {
            var selectedProperty = null;
            if (propertyList == undefined || propertyList.length == 0)
                return selectedProperty;

            propertyList.forEach(item => {
                if (item.code == propertyCode) {
                    selectedProperty = item;
                    return;
                }
            });

            return selectedProperty;
        },
        validateLogicalSymbol(expression) {
            if (expression.indexOf('}{') >= 0)
                return false;

            if (expression.endsWith('AND ') || expression.endsWith('OR '))
                return false;

            return true;
        },
        validateBrackets(expression) {
            var chars = expression.split('');
            var isLeftBracketFound = false;
            for(var i = 0; i < chars.length; ++i) {
                if (chars[i] == '(') {
                    if (isLeftBracketFound)
                        return false;
                    
                    isLeftBracketFound = true;
                }

                if (chars[i] == ')') {
                    if (!isLeftBracketFound)
                        return false;

                    isLeftBracketFound = false;
                }
            }

            if (isLeftBracketFound)
                return false;
            
            return true;
        },
        validate() {
            var vm = this;
            if (!this.validateLogicalSymbol(this.expressionForBind)) {
                this.error = '条件连接符AND/OR未正确指定。';
                return;
            } else if (!this.validateBrackets(this.expressionForBind)) {
                this.error = '括号未正确指定。';
                return;
            } else {
                this.error = null;
            }

            var model = {
                "connector": this.expressionForBind,
                "conditions": this.conditionsForBind.map(item => {
                    return {
                        "fieldName": item.value.metadataId,
                        "operater": item.value.operatorType,
                        "value": item.value.conditionValue,
                        "orderNo": item.value.sequence
                    };
                })
            };
        },
        handleExpressionChange(newValue) {
            this.expressionForBind = newValue;

            this.$emit('on-expression-change', newValue);
            this.dispatch('FormItem', 'on-form-blur', newValue);
        },
        handleConditionChange(newValue) {
            var emitValue = newValue.map(item => {
                            return {
                                "fieldName": item.value.metadataId,
                                "operater": item.value.operatorType,
                                "value": item.value.conditionValue,
                                "orderNo": item.value.sequence
                            };
                        });

            this.$emit('on-change', emitValue);
        },
        dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        }
    },
    watch: {
        conditionsForBind: function (newValue) {
            var emitValue = newValue.map(item => {
                            return {
                                "fieldName": item.value.metadataId,
                                "operater": item.value.operatorType,
                                "value": item.value.conditionValue,
                                "orderNo": item.value.sequence
                            };
                        });
            this.$emit('on-change', emitValue);
        },
        conditions: function () {
            this.init();
        },
        propertyFilter: function () {
            this.init();
        },
        value: function () {
            this.init();
        }
    }
};
</script>