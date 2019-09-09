<template>
    <div style="margin-top: 20px;">
        <div>
            Service Name: <input type="text" style="width: 150px;" v-model="serviceName" />
            <i-button @click="generateJson()">生成</i-button>
            <i-button @click="apply()">预览</i-button>
        </div>
        <div style="float: left;">
            <Input type="textarea" :rows="40" v-model="jsonResultText" style="width: 300px;" />
        </div>
        <div style="float: left; width: calc(100% - 400px); padding-left: 30px;">
            <can-edit-table ref="previewContainer" :metadata="jsonResult"></can-edit-table>
        </div>
        <div style="clear: both;">
            <textarea :value="nativeResultText" style="width: 800px; height: 300px;"></textarea>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import canEditTable from './../my-components/can-edit-table.vue';
import util from '@/libs/util';
import {API_URL_PATTERN} from '@/libs/util';

Vue.component('can-edit-table', canEditTable);

export default {
    name: 'metaGen',
    data() {
        return {
            serviceName: 'CustomerService',
            jsonResult: {
                "entityName": "",
                "serviceName": this.serviceName,
                "defaultModel": {},
                "columns": [],
                "formItems": [],
                "searchItems": []
            },
            nativeResult: {},
            jsonResultText: ''
        };
    },
    methods: {
        async generateJson() {
            let response = await axios.get(API_URL_PATTERN + this.serviceName + '/GetGridHeader');
            
            var template = {
                "entityName": "",
                "serviceName": this.serviceName,
                "defaultModel": {},
                "columns": [{
                    "type": "selection",
                    "width": 53,
                    "align": "center"
                }],
                "formItems": [],
                "searchItems": []
            };

            this.nativeResult = util.wrapResult(response).sort(function(a,b) {return (a.property > b.property) ? 1 : ((b.property > a.property) ? -1 : 0);});
            this.nativeResult.forEach(item => {
                var camelPropertyName = this.formatToCamelStyle(item.property);
                template.defaultModel[camelPropertyName] = this.getDefaultValue(item.type, item.isRequired);

                var column = {			
                    "title": item.name,
                    "align": "center",
                    "key": camelPropertyName,
                    "width": 85
                };
                if (item.type == "Boolean")
                    column.type = 'bool';
                template.columns.push(column);

                var formItem = {
                    "type": this.getFormItemType(item.type),
                    "prop": camelPropertyName,
                    "label": item.name
                };
                if (item.isRequired)
                    formItem.required = "true";
                template.formItems.push(formItem);
            });
            template.columns.push({                
                    "title": "操作",
                    "align": "center",
                    "width": 110,
                    "key": "handle",
                    "handle": ["delete"]
                });

            this.jsonResult = template;
            this.jsonResultText = JSON.stringify(this.jsonResult, null, 4);

            this.$nextTick(() => {
                this.$refs['previewContainer'].init();
            });
        },
        formatToCamelStyle(value) {
            return value.charAt(0).toLowerCase() + value.slice(1);
        },
        getDefaultValue(type, isRequired) {
            if (!isRequired)
                return null;

            switch (type) {
                case 'String' :
                    return '';
                case 'Byte':
                case 'Char':
                case 'Int16':
                case 'Int32':
                case 'Int64':
                    return 0;
                case 'Boolean':
                    return false;
                default:
                    return null;
            }
        },
        getFormItemType(type) {
            switch (type) {
                case 'String' :
                    return 'text';
                case 'Byte':
                case 'Char':
                case 'Int16':
                case 'Int32':
                case 'Int64':
                    return 'number';
                case 'Boolean':
                    return 'bool';
                default:
                    return null;
            }
        },
        apply() {
            this.jsonResult = JSON.parse(this.jsonResultText);

            this.$nextTick(() => {
                this.$refs['previewContainer'].init();
            });
        }
    },
    computed: {        
        nativeResultText: function () {
            return JSON.stringify(this.nativeResult, null, 4);
        }
    }
}
</script>