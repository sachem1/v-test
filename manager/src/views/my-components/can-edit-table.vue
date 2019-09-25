<template>
	<div>
		<div style="position: relative; height: 100%;"
			
				 v-if="!isInline">
			<paged-table ref="testTable"
									 :enums="commonEnums"
									 :serviceName="serviceName"
									 :listUrl="listUrl"
									 :searchModel="searchModel"
									 :searchItems="searchItems"
									 :columns="columns"
									 :bus="bus"
									 :addBehaviorSetting="addBehaviorSetting"
									 :title="tableTitle"
									 :disableImportExport="disableImportExport"
									 :disableAdd="disableAdd"
									 :disableBatchDelete="disableBatchDelete"
									 @on-request-inline-page="handleInlinePageRequest"></paged-table>
			<smart-form ref="mainForm"
									v-model="editingModel"
									:autoClose="autoClose"
									:visible="showModalForm"
									:validateRules="validateRules"
									:operationMode="operationMode"
									:entityName="entityName"
									:serviceName="serviceName"
									:enums="commonEnums"
									:formItems="formItems"
									@on-visible-change="onMainFormVisibleChanged"
									@on-model-change="onMainFormSaved"></smart-form>
		</div>
		<div style="position: relative; height: 100%;"
				 v-if="isInline">
			<smart-form ref="mainForm"
									v-model="editingModel"
									:autoClose="autoClose"
									:visible="showModalForm"
									:isInline="true"
									:validateRules="validateRules"
									:operationMode="operationMode"
									:entityName="entityName"
									:serviceName="serviceName"
									:enums="commonEnums"
									:formItems="formItems"
									@on-visible-change="onMainFormVisibleChanged"
									@on-model-change="onMainFormSaved"></smart-form>
			<paged-table ref="testTable"
									 :enums="commonEnums"
									 :serviceName="serviceName"
									 :listUrl="listUrl"
									 :searchModel="searchModel"
									 :searchItems="searchItems"
									 :columns="columns"
									 :pageSize="pageSize"
									 :bus="bus"
									 :title="tableTitle"
									 :disableImportExport="disableImportExport"
									 :disableAdd="disableAdd"
									 :disableBatchDelete="disableBatchDelete"
									 :addBehaviorSetting="addBehaviorSetting"
									 @on-request-inline-page="handleInlinePageRequest"></paged-table>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import axios from 'axios';
	import validaterulebuilder from './../my-components/validate-rule-builder.js';
	import cascademediator from './../my-components/cascade-mediator.js';
	import smartForm from './../my-components/smart-form.vue';
	import pagedTable from './../my-components/paged-table.vue';
debugger;
	// let WEB_BASE_URL = 'http://localhost:8080';
	Vue.use(validaterulebuilder);
	Vue.use(cascademediator);
	Vue.component('smart-form', smartForm);
	Vue.component('paged-table', pagedTable);

	export default {
	    name: 'canEditTable',
	    props: {
	        isInline: {
	            default: function () {
	                return false;
	            }
	        },
	        metaFileName: String,
	        pageSize: {
	            default: function () {
	                return 13;
	            }
	        },
	        metadata: Object
	    },
	    data () {
	        return {
	            operationMode: null,
	            entityName: '',
	            serviceName: '',
	            listUrl: null,
	            columns: [],
	            thisTableData: [],
	            pageIndex: 1,
	            recordCount: 0,
	            searchModel: {},
	            showModalForm: false,
	            showChildModalForm: false,
	            modal_loading: false,
	            defaultModel: {},
	            editingModel: {},
	            validateRules: {},
	            commonEnums: {},
	            selectedRows: [],
	            formItems: [],
	            searchItems: [],
	            bus: new Vue(),
	            childFormTitle: ' ',
	            addBehaviorSetting: {},
	            tableTitle: null,
	            disableImportExport: false,
	            autoClose: true,
	            disableAdd: false,
	            disableBatchDelete: false
	        };
	    },
	    created () {
	        this.init();
	        this.bus.$on('prepareAdd', this.prepareAdd);
	        this.bus.$on('prepareEdit', this.prepareEdit);
	    },
	    beforeDestroy () {
	        this.bus.$off('prepareAdd', this.prepareAdd);
	        this.bus.$off('prepareEdit', this.prepareEdit);
	    },
	    methods: {
	        init () {
				debugger;
	            var vm = this;
	            if (this.metadata != undefined) {
	                this.buildUiConfig(vm, this.metadata);
	            } else {
	                axios.get('/api/getMetadata?name=' + this.metaFileNameForBind)
	                    .then(function (response) {
	                        console.log(response);
	                        if (response.status != 200) {
	                            vm.$Message.error('网络故障，请稍候再试。');
	                            return;
	                        }

	                        vm.buildUiConfig(vm, response.data);
	                    })
	                    .catch(function (error) {
	                        console.log(error);
								        });
	            }
	        },
	        buildUiConfig (vm, config) {
				debugger;
	            vm.serviceName = config.serviceName;
	            vm.entityName = config.entityName;
	            if (vm.isChild) {
	                vm.$parent.childFormTitle = vm.entityName;
	            }
	            if (config.hasOwnProperty('enums')) {
	                vm.commonEnums = config.enums;
	            }
	            if (config.hasOwnProperty('listUrl')) { this.listUrl = config.listUrl; }
	            vm.defaultModel = config.defaultModel;
	            vm.editingModel = JSON.parse(JSON.stringify(vm.defaultModel));
	            if (config.searchModel) { vm.searchModel = config.searchModel; } else { vm.searchModel = {}; }
	            vm.validateRules = Vue.buildValidateRules(config.formItems);
	            var columns = config.columns;
	            vm.columns = columns;
	            if (config.searchItems) {
	                Vue.attachCascadeWatchers(vm, config.searchItems, 'searchModel');
	                vm.searchItems = config.searchItems;
	            }
				vm.addBehaviorSetting = config.addBehaviorSetting;
				console.log('addBehaviorSetting:'+JSON.stringify(vm.addBehaviorSetting))
	            vm.$nextTick(() => {
	                vm.bus.$emit('on-data-changed');
	            });

	            Vue.attachCascadeWatchers(vm, config.formItems, 'editingModel');
	            vm.formItems = config.formItems;

	            if (config.tableTitleField && vm.$route.query.hasOwnProperty(config.tableTitleField)) {
	                vm.tableTitle = [vm.$route.query[config.tableTitleField]];
	            } else if (config.tableTitleParams) {
	                var buffer = [];
	                config.tableTitleParams.forEach(item => {
	                    if (vm.$route.query.hasOwnProperty(item.valueField)) {
	                        buffer.push(item.label + vm.$route.query[item.valueField]);
	                    }
	                });

	                if (buffer.length > 0) {
	                    vm.tableTitle = buffer;
	                }
	            }

	            if (config.hasOwnProperty('disableImportExport')) {
	                vm.disableImportExport = config.disableImportExport;
	            }
	            if (config.hasOwnProperty('autoClose')) {
	                vm.autoClose = config.autoClose;
	            }
	            if (config.hasOwnProperty('disableAdd')) {
	                vm.disableAdd = config.disableAdd;
	            }
	            if (config.hasOwnProperty('disableBatchDelete')) {
	                vm.disableBatchDelete = config.disableBatchDelete;
	            }
	        },
	        prepareAdd () {
	            this.operationMode = 'add';
	            this.editingModel = JSON.parse(JSON.stringify(this.defaultModel));
	            this.showModalForm = true;
	            this.$nextTick(() => {
	                Vue.markAsInitialized(this.editingModel);
	            });
	        },
	        prepareEdit (payload) {
	            this.operationMode = 'edit';
	            this.editingModel = JSON.parse(JSON.stringify(payload.data));
	            this.$nextTick(() => {
	                Vue.markAsInitialized(this.editingModel);
	            });
	            this.showModalForm = true;
	        },
	        onMainFormVisibleChanged (newValue) {
	            this.showModalForm = newValue;
	        },
	        onMainFormSaved (newModel) {
	            this.bus.$emit('on-data-changed');
	        },
	        handleInlinePageRequest (payload) {
	            this.$emit('on-request-inline-page', payload);
	        }
	    },
	    computed: {
	        metaFileNameForBind: function () {
	            if (this.metaFileName == undefined || this.metaFileName == null || this.metaFileName == '') { return this.$route.name; }						
	            return this.metaFileName;
	        }
	    }
	};
</script>

<style lang='less'>
 .small-table .ivu-table-cell {
    padding: 0px;
  }
  .small-table td {
    height: 0px;
  }

</style>