<template>
    <div>
        <Card :bordered="false">
            <div slot="title">
                <Button type="primary" icon="android-add" @click="addCondition">添加条件</Button>
                <Button icon="android-add" @click="addBrackets" style="margin-left: 10px;">添加括号</Button>
            </div>
            <div style="overflow: hidden;">
                <draggable v-model="expressionItems" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                    <div v-for="(item) in expressionItems" :key="item.value.clientId" style="float: left; margin-right: 5px;">
                        <Tag closable @on-close="removeCurrentBracket(item)" v-if="item.value.isBracket">{{item.value.label}}</Tag>
                        <Tag type="border" v-if="item.value.sequence>=0">条件{{item.value.sequence+1}}</Tag>
                    </div>
                </draggable>
            </div>                
            <div style="overflow: hidden; clear: both; margin-top: 10px;">
                <condition-editor v-for="(item, index) in conditions" :propertyList="propertyList" :operatorMap="operatorMap" :key="item.value.clientId" :controlId="index" v-model="item.value" @on-connector-change="handleConnectorChange" @on-change="handleConditionChange" @on-remove="handleRemove" @on-index-change="handleIndexChange"></condition-editor>
            </div>
        </Card>
    </div>
</template>
<script>
import Vue from 'vue';
import VueCircle from 'vue2-circle-progress';
import conditionEditor from './../my-components/condition-editor.vue';
import draggable from 'vuedraggable';

Vue.component('condition-editor', conditionEditor);
Vue.component('draggable', draggable);

export default {
    name: 'conditionGroup',
    props: {
        value: {
            type: Array
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
            isExpressionInitialized: false,
            conditions: [],
            idSeed: 0,
            bracketIdSeed: 0,
            expressionItems: []
        };
    },
    methods: {
        init () {
            this.conditions = this.value;  
        },
        buildExpressionItems(expression) {
            var vm = this;
            var candidates = expression.split(' ');
            candidates.forEach(candidate => { 
                var sequence = parseInt(candidate.replace('{', '').replace('}', '').replace('(', '').replace(')', ''));
                if (sequence >= 0) {
                    if (candidate.startsWith('(')) {
                        this.addLeftBracket();
                    }

                    vm.expressionItems.push({
                            "value": {
                                "clientId": sequence,
                                "sequence": sequence
                            }
                        });
                    ++this.idSeed;
                    
                    if (candidate.endsWith(')')) {
                        this.addRightBracket();
                    }
                }
            });

            this.isExpressionInitialized = true;
        },
        getNewId() {
            return ++this.idSeed;
        },        
        getBracketNewId() {
            return --this.bracketIdSeed;
        },
        handleConnectorChange(connector, index) {
            if (index != this.conditions.length - 1 || connector == null)
                return;
            
            this.addCondition();
        },
        handleRemove(index) {
            this.conditions.splice(index, 1);
            this.syncExpression();
            this.$emit('input', this.conditions);
        },
        addCondition() {
            var newId = this.getNewId();
            var sequence = this.conditions.length;
            this.conditions.push({
                    value: {
                        clientId: newId,
                        metadataId: '',
                        operatorType: null,
                        connectType: null,
                        conditionValue: null,
                        conditionValueForBind: null,
                        sequence: sequence
                    }
                });
            this.syncExpression();
            this.$emit('input', this.conditions);
        },
        syncExpression() {
            var sequence = 0;
            this.conditions.forEach(item=> {
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

                var condition = this.matchCondition(item.value.clientId);
                if (condition == null)
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
            this.conditions.forEach(item => {
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
        addBrackets() {
            this.addLeftBracket();
            this.addRightBracket();
        },
        removeCurrentBracket(item) {
            var index = this.expressionItems.indexOf(item);
            this.expressionItems.splice(index, 1);
        },
        handleConditionChange() {
            this.$emit('on-change', this.conditions);
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

                var condition = this.matchCondition(item.clientId);
                if (condition.connectType != null) {
                    result.push(' ' + condition.connectType + ' ');
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
        conditions: function (newValue) {
            this.$emit('on-change', newValue);
        }
    }
};
</script>