<template>
	<div class="list-wrapper">
		<div class="list-search">
			<user-search @searchList="handleSearch"></user-search>
		</div>
		<div class="button-wrapper">
			<general-button ref="currentButton"
											:buttonBus="buttonBus"
											:displayAdd="displayAdd"
											:displayEdit="displayEdit"
											:displayBatchDelete="displayBatchDelete"
											:displayImportExport="displayImportExport"
											:routerSetting="addBehaviorSetting"
											:selectedRows="selectRows"
											:buttonHandleSetting="buttonHandleSetting">

			</general-button>
		</div>
		<div class="pageTable">
			<paged-table ref="currentTable"
									 :bus="tableBus"
									 :serviceName="serviceName"
									 :listUrl="listUrl"
									 :searchModel="searchModel"
									 :searchItems="searchItems"
									 :columns="columns"
									 :TableData="TableData"
									 :hasShowSummary="hasShowSummary"></paged-table>
		</div>
		<div class="modalform">
			<FileLab-No-Notab :autoClose="autoClose"
								 :visible="showModalForm"
								 :operationMode="operationMode"
								 :editForm="formData"
								 :title="formTitle"
								 @on-visible-change="onMainFormVisibleChanged"
								 @on-model-change="onMainFormSaved"></FileLab-No-Notab>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import userSearch from '_vbue/bsbookrecord/FileLabNo/FileLabNoSearch.vue';
	import generalButton from '_com/general-button';
	import pagedTable from '_com/paged-table';
	import FileLabNoForm from '_vbue/bsbookrecord/FileLabNo/FileLibraryNotab.vue';

	export default {
	    name: 'FileLabNo-list',
	    components: {
	        userSearch,
	        generalButton,
	        pagedTable,
	        FileLabNoForm
	    },
	    data () {
	        return {
	            // 按钮
	            buttonBus: new Vue(),
	            displayAdd: true,
	            displayEdit: true,
	            displayBatchDelete: true,
	            displayImportExport: true,
	            addBehaviorSetting: {
	                // 配置跳转新页面
	                routeName: 'FileLibraryNotab',
	                routeParams: [
	                    {
	                        keyName: 'id',
	                        valueField: 'Id'
	                    }
	                ]
	            },
	            formData: {},
	            template: {},
	            buttonHandleSetting: {
	                // 按钮URL
	                serviceName: 'FileLibraryNo',
	                getUrl: 'FileLibraryNo/QueryTablePaged',
	                deleteUrl: 'FileLibraryNo/deleteRange',
	                importUrl: 'FileLibraryNo/importFile',
	                exportUrl: 'FileLibraryNo/exportFile',
	                //templateUrl: 'FileLibraryNo/getFileTemplate'
	            },
	            // table
	            selectRows: [], // 表格选中行
	            tableBus: new Vue(),
	            serviceName: 'FileLibraryNo',
	            listUrl: 'FileLibraryNo/QueryTablePaged',
	            searchModel: {},
	            searchItems: [],
	            // 是否有统计
	            hasShowSummary: false,
	            columns: [
                    { type: 'selection', width: 60, align: 'center' },
                    { title: '序号', width: 80, key: 'rowNumber', align: 'left' },
	                // { title: 'ID', width: 100, key: 'Id',align: 'left' },
	                { title: '海关编号', width: 130, key: 'cop_Ems_No', align: 'center' },
	                { title: '企业内部编号', width: 150, key: 'cop_Erp_No', align: 'center' },
	                { title: '经营单位代码', width: 130, key: 'customer_Code', align: 'center' },
	                { title: '经营单位名称', width: 200,key: 'customer_Name', align: 'center' },
	                { title: '对应档案库内部编号', width: 180, key: 'ems_No', align: 'center' },
	                { title: '编号类型', width: 120, key: 'cop_type_text', align: 'center' },
                    // { title: '编号类型Value', width: 150,key: 'cop_type', align: 'center' },
	                { title: '申报日期', width: 160, key: 'declare_Date', align: 'center' },
	                { title: '结束有效期', width: 160, key: 'end_Date', align: 'center' },
                    { title: '是否失效', width: 100,key: 'is_effective_text', align: 'center' },
                    // { title: '是否失效Value', width: 150,key: 'is_effective', align: 'center' },
	                { title: '创建时间', width: 160, key: 'create_Time', align: 'center' },
	                { title: '创建用户', width: 100,key: 'create_By', align: 'center' }
	            ],
	            TableData: [],
	            // add ,edit
	            autoClose: true,
	            showModalForm: false,
	            showChildModalForm: false,
	            modal_loading: false,
	            operationMode: null,
	            entityName: '',
	            formTitle: ''
	        };
	    },
	    created () {
	        this.buttonBus.$on('prepareAdd', this.prepareAdd);
	        this.buttonBus.$on('prepareEdit', this.prepareEdit);
	        this.buttonBus.$on('requestData', this.handleSearch);
	        this.tableBus.$on('selectedRowsChange', this.selectRowChange);
	        this.tableBus.$on('prepareEdit', this.prepareEdit);
	    },
	    beforeDestroy () {
	        this.buttonBus.$off('prepareAdd', this.prepareAdd);
	        this.buttonBus.$off('prepareEdit', this.prepareEdit);
	        this.buttonBus.$off('requestData', this.handleSearch);
	        this.tableBus.$off('selectedRowsChange', this.selectRowChange);
	        this.tableBus.$off('prepareEdit', this.prepareEdit);
	    },
	    methods: {
	        handleSearch (data) {
	            console.log('search---' + JSON.stringify(data));
	            this.$store.state.user.searchModel = data;
	            if (data) this.searchModel = data;
	            this.$refs.currentTable.handleSearch(data);
	        },
	        onMainFormVisibleChanged (newValue) {
	            this.showModalForm = newValue;
	        },
	        onMainFormSaved (newModel) {
	            this.bus.$emit('on-data-changed');
	        },
	        prepareAdd () {
	            this.showModalForm = true;
	            this.operationMode = 'create';
	            this.$route.query;
	            this.formTitle = '创建';
	        },
	        prepareEdit (payload) {
	            if (!payload) {
	                if (this.selectRows.length == 0) {
	                    this.$Message.error('请选择需要编辑的行!');
	                }
	                payload = JSON.stringify(this.selectRows[0]);
	            }

	            this.formData = JSON.parse(JSON.stringify(payload));
	            if (this.addBehaviorSetting && this.addBehaviorSetting.routeName) {
	                this.$router.push({
	                    name: this.addBehaviorSetting.routeName,
	                    query: { FileLibraryNo: this.formData }
	                });
	            } else {
	                this.operationMode = 'edit';
	                this.showModalForm = true;
	                this.formTitle = '编辑';
	            }
	        },
	        selectRowChange (selectedRow) {
	            this.selectRows = selectedRow;
	        }
	    },
	    mounted () {
	        this.handleSearch();
	        this.$refs.currentButton.parpareTemplate();
	    }
	};
</script>

<style lang='less'>
.demo-drawer-footer {
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	border-top: 1px solid #e8e8e8;
	padding: 10px 16px;
	text-align: right;
	//background: #fff;
}
.vertical-center-modal {
	display: flex;
	align-items: center;
	justify-content: center;

	.ivu-modal {
		top: 0;
	}
}
</style>