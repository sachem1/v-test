<template>
    <div style=" overflow: hidden; border-bottom: 1px dotted #E8EAEC; margin-bottom: 15px; padding-bottom: 15px;">
        <div class="ivu-form-item" style="width: 100%;">
            <span class="ivu-icon ivu-icon-ios-close-empty" style="float: right; font-size: 25px; cursor: pointer; color: red; margin-right: 10%;" @click="removeCurrent"></span>
        </div>
        <div class="ivu-form-item">
            <label class="ivu-form-item-label" style="width: 150px;">字段名：</label>
            <div class="ivu-form-item-content" style="margin-left: 150px;">
                <div style="display: inline-block; width: 250px;">
                    <div class="ivu-input-wrapper ivu-input-type">
                        <i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                        <input autocomplete="off" spellcheck="false" type="text" placeholder="" class="ivu-input" v-model="fieldName">
                    </div>
                </div>
            </div>
        </div>
        <div class="ivu-form-item">
            <label class="ivu-form-item-label" style="width: 150px;">描述：</label>
            <div class="ivu-form-item-content" style="margin-left: 150px;">
                <div style="display: inline-block; width: 250px;">
                    <div class="ivu-input-wrapper ivu-input-type">
                        <i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                        <input autocomplete="off" spellcheck="false" type="text" placeholder="" class="ivu-input" v-model="description">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="hasConditionType" class="ivu-form-item"><label class="ivu-form-item-label" style="width: 150px;">条件类型：</label>
            <div class="ivu-form-item-content" style="margin-left: 150px;">
                <div style="display: inline-block; width: 250px;">
                    <div class="ivu-select ivu-select-single">
                        <div tabindex="0" class="ivu-select-selection">
                            <i-select transfer v-model="conditionType">
                                <i-option v-for="item in conditionTypes" :key="item.value" :value="item.value">{{ item.text }}</i-option>
                            </i-select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ivu-form-item"><label class="ivu-form-item-label" style="width: 150px;">显示方式：</label>
            <div class="ivu-form-item-content" style="margin-left: 150px;">
                <div style="display: inline-block; width: 250px;">
                    <div class="ivu-select ivu-select-single">
                        <div tabindex="0" class="ivu-select-selection">
                            <i-select transfer v-model="displayType">
                                <i-option v-for="item in displayTypes" :key="item.value" :value="item.value">{{ item.text }}</i-option>
                            </i-select>
                        </div>
                        <!---->
                    </div>
                </div>
                <!---->
            </div>
        </div>
        <div class="ivu-form-item"><label class="ivu-form-item-label" style="width: 150px;">参数：</label>
            <div class="ivu-form-item-content" style="margin-left: 150px;">
                <div style="display: inline-block; width: 250px;">
                    <div class="ivu-input-wrapper ivu-input-type">
                        <i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                        <input
                            autocomplete="off" spellcheck="false" type="text" placeholder="" class="ivu-input" v-model="param">
                    </div>
                </div>
            </div>
        </div>
        <div class="ivu-form-item"><label class="ivu-form-item-label" style="width: 150px;">排序：</label>
            <div class="ivu-form-item-content" style="margin-left: 150px;">
                <div style="display: inline-block; width: 250px;">
                    <div class="ivu-input-number">
                        <div class="ivu-input-number-handler-wrap"><a class="ivu-input-number-handler ivu-input-number-handler-up"><span class="ivu-input-number-handler-up-inner ivu-icon ivu-icon-ios-arrow-up"></span></a>                            <a class="ivu-input-number-handler ivu-input-number-handler-down"><span class="ivu-input-number-handler-down-inner ivu-icon ivu-icon-ios-arrow-down"></span></a></div>
                        <div class="ivu-input-number-input-wrap">
                            <input autocomplete="off" spellcheck="false" placeholder="" class="ivu-input-number-input" v-model="index">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import Vue from 'vue';
    import alSelector from './../my-components/area-linkage/components/al-selector.vue';

    Vue.component('al-selector', alSelector);

    export default {
        name: 'parametersEditor',
        props: {
            value: {
                type: Object
            },
            controlId: {
                type: Number | String
            },
            propertyList: {
                default: function () {
                    return [];
                }
            },
            conditionTypes: {
                default: function () {
                    return [];
                }
            },
            displayTypes: {
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
        data() {
            return {
                isInited: false,
                hasConditionType: false,
                fieldName: '',
                description: '',
                conditionType: 0,
                displayType: 0,
                param: '',
                index: 0,
                id: '0',
                statisticsId : '0'
            };
        },
        created() {
            this.init();
        },
        methods: {
            async init() {
                this.hasConditionType = this.value.hasOwnProperty('conditionType')
                this.fieldName = this.value.fieldName;
                this.description = this.value.description;
                this.conditionType = this.value.conditionType;
                this.displayType = this.value.displayType;
                this.param = this.value.param;
                this.index = this.value.index;
                this.id = this.value.id;
                this.statisticsId = this.value.statisticsId;

                this.$nextTick(()=> {
                    this.isInited = true;
                });
            },
            async handlePropertyChange() {
                var __selectedProperty = this.selectedProperty;
                if (__selectedProperty == null)
                    return;

                if (__selectedProperty.type == 'enum') {
                    this.enumOptions = await this.$store.dispatch({
                        type: __selectedProperty.enumUrl
                    });
                }
            },
            syncResult() {
                if (!this.isInited)
                    return;

                if (this.value == null)
                    return;

                var value = {
                    hasConditionType : this.hasConditionType,
                    fieldName : this.fieldName,
                    description : this.description,
                    conditionType : this.conditionType,
                    displayType : this.displayType,
                    param : this.param,
                    index : this.index,
                    id : this.id,
                    statisticsId : this.statisticsId
                };

                this.$emit('input', value);
                this.$emit('on-change', value);
            },
            removeCurrent() {
                this.$emit('on-remove', this.controlId);
            }
        },
        computed: {
            selectedProperty: function () {
                var selectedProperty = null;
                if (this.propertyList == undefined || this.propertyList.length == 0)
                    return selectedProperty;

                var vm = this;
                this.propertyList.forEach(item => {
                    if (item.code == vm.propertyCode) {
                        selectedProperty = item;
                        return;
                    }
                });

                return selectedProperty;
            },
            availableOperators: function () {
                var result = [];
                var __selectedProperty = this.selectedProperty;
                if (__selectedProperty == null)
                    return result;

                this.operatorMap.forEach(item => {
                    if (item.type == __selectedProperty.type) {
                        result = item.operators;
                        return;
                    }
                });

                this.operator = result[0];

                return result;
            },
            availableControlType: function () {
                var __selectedProperty = this.selectedProperty;
                if (__selectedProperty == null)
                    return '';

                return __selectedProperty.type;
            }
        },
        watch: {
            // value: function () {
            //     this.syncResult();
            // },
            controlId: function (newValue) {
                this.$emit('on-index-change', newValue, this.clientId);
            },
            hasConditionType: function () {
                this.syncResult();
            },
            fieldName: function () {
                this.syncResult();
            },
            description: function () {
                this.syncResult();
            },
            conditionType: function () {
                this.syncResult();
            },
            displayType: function () {
                this.syncResult();
            },
            param: function () {
                this.syncResult();
            },
            index: function () {
                this.syncResult();
            }
        }
    };
</script>