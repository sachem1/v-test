<template>
    <div>
        <div>
            <Button type="primary" icon="android-add" @click="addCondition">添加新项</Button>
        </div>
        <div style="overflow: hidden; clear: both; margin-top: 10px;">
            <parameters-editor v-for="(item, index) in parameters" :propertyList="propertyList" :conditionTypes="conditionTypes" :displayTypes="displayTypes" :operatorMap="operatorMap" :key="item.value.clientId" :controlId="index" v-model="item.value" @on-connector-change="handleConnectorChange" @on-change="handleConditionChange" @on-remove="handleRemove" @on-index-change="handleIndexChange"></parameters-editor>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import VueCircle from 'vue2-circle-progress';
import parametersEditor from './../my-components/parameters-editor.vue';
import draggable from 'vuedraggable';

Vue.component('parameters-editor', parametersEditor);
Vue.component('draggable', draggable);

export default {
    name: 'parameters',
    props: {
        value: {
            type: Array
        },
        controlType:{
            default: function () {
                return '';
            }
        },
        propertyList: {
            default: function () {
                return [];
            }
        },
        operatorMap: {
            default: function () {
                return [];
            }
        }
    },
    data () {
        return {
            isInited : false,
            isExpressionInitialized: false,
            parameters: [],
            idSeed: 0,
            bracketIdSeed: 0,
            expressionItems: [],
            conditionTypes: [],
            displayTypes: []
        };
    },
    methods: {
        async init () {

            if (this.isInited)
                return;

            if(this.conditionTypes.length < 1)
            {
                var conditionTypesBuffer = await this.$store.dispatch({
                    type:'statisticssetting/getConditionType'
                });
                this.conditionTypes.push(...conditionTypesBuffer);
            }

            if(this.displayTypes.length < 1)
            {
                var displayTypesBuffer = await this.$store.dispatch({
                    type:'statisticssetting/getDisplayType'
                });
                this.displayTypes.push(...displayTypesBuffer);
            }
            var parameters = this.value || [];
            this.parameters = [];
            for(var i = 0; i < parameters.length; i++)
            {
                this.parameters.push({
                    value: parameters[i]
                });
            }

            this.isInited = true;
        },
        getNewId() {
            return ++this.idSeed;
        },        
        getBracketNewId() {
            return --this.bracketIdSeed;
        },
        handleConnectorChange(connector, index) {
            if (index != this.parameters.length - 1 || connector == null)
                return;
            
            this.addCondition();
        },
        handleRemove(index) {
            this.parameters.splice(index, 1);
            this.syncExpression();
            this.$emit('input', this.parameters);
        },
        addCondition() {
            var newId = this.getNewId();
            var sequence = this.parameters.length;
            if(this.controlType == 'fieldParameters')
            {
                this.parameters.push({
                    value: {
                        fieldName: '',
                        description: '',
                        displayType: 0,
                        param: '',
                        index: sequence,
                        statisticsId : '0'
                    }
                });
            }
            else{
                this.parameters.push({
                    value: {
                        fieldName: '',
                        description: '',
                        conditionType: 0,
                        displayType: 0,
                        param: '',
                        index: sequence,
                        statisticsId : '0'
                    }
                });
            }
            
            this.syncExpression();
            var emitValue = this.parameters.map(item => {
                return item.value;
            });
            this.$emit('input', emitValue);
        },
        syncExpression() {
            var sequence = 0;
            this.parameters.forEach(item=> {
                if (item.value.sequence == undefined)
                    item.value.sequence = ++sequence;

                var expressionItem = this.matchExpressionItem(item.value.clientId);
                if (expressionItem == null)
                    this.expressionItems.push({
                            "value": {
                                "clientId": item.value.clientId,
                                "sequence": item.value.sequence
                            }
                        });
                else
                    expressionItem.sequence = item.value.sequence;
            });
            this.expressionItems.forEach(item => {
                if (item.value.isBracket)
                    return;

                var parameter = this.matchCondition(item.value.clientId);
                if (parameter == null)
                    this.expressionItems.splice(this.expressionItems.indexOf(item), 1);
            });
        },
        matchExpressionItem(clientId) {
            var result = null;
            this.expressionItems.forEach(item => {
                if (item.value.clientId == clientId) {
                    result = item.value;
                    return;
                }
            });

            return result;
        },
        matchCondition(clientId) {
            var result = null;
            this.parameters.forEach(item => {
                if (item.value.clientId == clientId) {
                    result = item.value;
                    return;
                }
            });

            return result;
        },
        handleIndexChange(newIndex, clientId) {
            var expressionItem = this.matchExpressionItem(clientId);
            expressionItem.sequence = newIndex;
        },
        addLeftBracket() {
            this.expressionItems.push( {
                        "value": {
                            "clientId": this.getBracketNewId(),
                            "isBracket": true,
                            "isLeft": true,
                            "label": "（"
                        }
                    });
        },
        addRightBracket() {
            this.expressionItems.push({
                        "value": {
                            "clientId": this.getBracketNewId(),
                            "isBracket": true,
                            "isLeft": false,
                            "label": "）"
                        }
                    });
        },
        handleConditionChange(newValue) {
            this.parameters.forEach(item=> {
                if(item.id == newValue.id)
                {
                    if(item.id > 0)
                    {
                        item.fieldName = newValue.fieldName;
                        item.description = newValue.description;
                        item.conditionType = newValue.conditionType;
                        item.displayType = newValue.displayType;
                        item.param = newValue.param;
                        item.index = newValue.index;
                        item.statisticsId = newValue.statisticsId;
                    }
                }
            });
            var emitValue = this.parameters.map(item => {
                return item.value;
            });
            this.$emit('on-change', emitValue);
        }
    },
    computed: {
        expressionText: function () {
            if (!this.isExpressionInitialized)
                return '';

            var result = [];
            for (var i = 0; i < this.expressionItems.length; ++i) {
                var item = this.expressionItems[i].value;
                if (item.isBracket) {
                    if (!item.isLeft)
                        continue;
                    
                    result.push('(');
                    continue;
                }

                result.push('{' + item.sequence + '}');

                if (i < this.expressionItems.length - 1) {
                    var nextItem = this.expressionItems[i + 1].value;
                    if (nextItem.isBracket && !nextItem.isLeft) {
                        result.push(')');
                    }
                }

                var parameter = this.matchCondition(item.clientId);
                if (parameter.connectType != null) {
                    result.push(' ' + parameter.connectType + ' ');
                }
            }

            return result.join('');
        }
    },
    watch: {
        value: function () {
            this.init();
        },
        expressionText: function (newValue) {
            if (!this.isExpressionInitialized)
                return;

            this.$emit('on-expression-change', newValue);
        },
        parameters: function (newValue) {
            var emitValue = newValue.map(item => {
                return item.value;
            });
            this.$emit('on-change', emitValue);
        }
    }
};
</script>