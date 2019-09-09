<template>
    <div style="overflow: hidden; margin-bottom: 20px; min-height: 44px;">
        <div style="width: 120px; float: left; padding-top: 4px;">
            <tag type="dot" closable color="primary" @on-close="removeCurrent">条件{{controlId+1}}</tag>
        </div>
        <div style="width: 200px; float: left; margin-right: 5px; padding-top: 6px;">
            <i-select transfer v-model="propertyCode" @on-change="handlePropertyChange" style="width: 200px;">
                <i-option v-for="item in propertyList" :key="item.code" :value="item.code">{{ item.text }}</i-option>
            </i-select>
        </div>
        <div style="width: 80px; float: left; margin-right: 5px; padding-top: 6px;">
            <i-select clearable transfer v-model="operator">
                <i-option v-for="item in availableOperators" :key="item" :value="item">{{ item }}</i-option>
            </i-select>
        </div>
        <div style="width: 500px; float: left; margin-right: 5px;" :style="{'padding-top': (availableControlType == 'geolocation' ? 0 : 6) + 'px'}">
            <Input-number v-model="numberValue" style="width: 100%;" v-if="availableControlType == 'number'"></Input-number>
            <DatePicker v-model="dateValue" type="date" style="width: 100%;" v-if="availableControlType == 'date'"></DatePicker>
            <Input v-model="textValue" v-if="availableControlType == 'text'" />
            <i-select transfer v-model="enumValue" multiple v-if="availableControlType == 'enum'">
                <i-option v-for="item in enumOptions" :key="item.value" :value="item.value">{{ item.label }}</i-option>
            </i-select>
            <div style="border: 1px solid #ccc; border-radius: 10px; padding: 5px;" v-if="availableControlType == 'geolocation'">
                <div style="float: left;width: 420px;margin-right: 10px;">
                    <al-selector v-model="operatingGeoNodes" searchable level="2"/>
                </div>
                <Button @click="addGeoLocation" style="float: left;">添加</Button>
                <div style="clear: both;">
                    <Tag type="border" v-for="item in geoSelection" :key="item.code" closable @on-close="handleClose(item)">{{item.fullName}}</Tag>
                </div>
            </div>
        </div>
        <div style="width: 100px; float: left; margin-right: 5px; padding-top: 6px;">
             <i-select transfer v-model="connector" clearable :placeholder="'逻辑运算符'">
                <i-option v-for="item in selectOptions.connectorList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
            </i-select>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import alSelector from './../my-components/area-linkage/components/al-selector.vue';

Vue.component('al-selector', alSelector);

export default {
    name: 'conditionEditor',
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
        operatorMap: {
            default: function () {
                return [];
            }
        }
    },
    data () {
        return {
            isInited: false,
            propertyCode: null,
            operator: null,
            numberValue: null,
            dateValue: null,
            textValue: null,
            enumValue: null,
            connector: null,
            geoSelection: [],
            operatingGeoNodes: [],
            enumOptions: [],
            selectOptions: {
                connectorList: [
                    {label: '并且', value: 'AND'},
                    {label: '或者', value: 'OR'}
                ]
            }
        };
    },
    created () {
        this.init();
    },
    methods: {
        async init () {
            if (this.value.metadataId) {
                this.propertyCode = this.value.metadataId;
                this.connector = this.value.connectType;

                var __selectedProperty = this.selectedProperty;
                if (__selectedProperty.type == 'enum') {
                    this.enumOptions = await this.$store.dispatch({
                        type: __selectedProperty.enumUrl
                    });

                    this.$nextTick(()=> {   
                        if (this.value.conditionValue)
                            this.enumValue = this.value.conditionValue.split(',');
                    });
                } else {
                    switch(__selectedProperty.type)
                    {
                        case 'text':
                            this.textValue = this.value.conditionValue;
                            break;
                        case 'number':
                            this.numberValue = this.value.conditionValue;
                            break;
                        case 'date':
                            this.dateValue = this.value.conditionValue;
                            break;
                        case 'geolocation':
                            this.geoSelection = this.value.conditionValueForBind;
                            break;
                    }
                }

                this.$nextTick(()=> {   
                    this.operator = this.value.operatorType;                 
                });

                // if (this.propertyList.length > 0 && (this.value == undefined || this.value.propertyCode == null))
                //     this.propertyCode = this.propertyList[0].code;
            }

            this.$nextTick(()=> {
                this.isInited = true;
            });
        },
        handleClose (item) {
            this.geoSelection.splice(this.geoSelection.indexOf(item), 1);
        },
        addGeoLocation() {
            if (this.operatingGeoNodes.length == 0)
                return;

            var selectedItem = this.operatingGeoNodes[this.operatingGeoNodes.length - 1];        
            var isExistingItem = false;
            this.geoSelection.forEach(item=> {
                if (item.code == selectedItem.code) {
                    isExistingItem = true;
                    return;
                }

                // this.operatingGeoNodes.forEach(geoNode=> {
                //     if (geoNode.code == selectedItem.code) {
                //         isExistingItem = true;
                //         return;
                //     }
                // })
            });
            if (!isExistingItem) {
                selectedItem.fullName = this.operatingGeoNodes.map(item => {
                    return item.name
                }).join('');
                selectedItem.path = JSON.parse(JSON.stringify(this.operatingGeoNodes));
                this.geoSelection.push(selectedItem);
            }
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
        getResult() {
            var __selectedProperty = this.selectedProperty;
            if (__selectedProperty == null)
                return null;

            if (this.operator == null)
                return null;
            
            var result = this.value;
            result.metadataId = __selectedProperty.code;
            result.operatorType = this.operator;
            result.connectType = this.connector;

            switch(__selectedProperty.type)
            {
                case 'text':
                    result.conditionValue = this.textValue;
                    break;
                case 'number':
                    result.conditionValue = this.numberValue;
                    break;
                case 'date':
                    result.conditionValue = this.dateValue;
                    break;
                case 'enum':
                    result.conditionValue = (this.enumValue == null ? null : this.enumValue.join(','));
                    break;
                case 'geolocation':
                    result.conditionValue = this.geoSelection.map(item=> { return item.code; }).join(',');
                    break;
            }

            if (result.conditionValue == null)
                return null;

            return result;
        },
        syncResult() {
            if (!this.isInited)
                return;

            var result = this.getResult();
            if (result == null)
                return;
            
            this.$emit('input', result);
            this.$emit('on-change', result);
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
        value: function() {
            this.init();
        },
        controlId: function (newValue) {
            this.$emit('on-index-change', newValue, this.clientId);
        },
        propertyCode: function () {
            this.syncResult();
        },
        operator: function () {
            this.syncResult();
        },
        numberValue: function () {
            this.syncResult();
        },
        dateValue: function () {
            this.syncResult();
        },
        textValue: function () {
            this.syncResult();
        },
        enumValue: function () {
            this.syncResult();
        },
        geoSelection: function () {
            this.syncResult();
        },
        connector: function (newValue) {
            this.syncResult();

            this.$emit('on-connector-change', newValue, this.controlId);
        }
    }    
};
</script>