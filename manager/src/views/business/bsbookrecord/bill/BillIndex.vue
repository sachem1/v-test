<template>
	<div class>
		<div class="searchModel-wapper">
			<Collapse accordion v-model="displayAccordion">
				<Panel name="1">
					查询
					<div slot="content">
						<Card>
							<Form ref="searchModel" :label-width="100" :model="searchModel" inline>
								<!-- <Input type="hidden" v-model="searchModel.IEFlag" placeholder="进出口标记"></Input> -->
								<Row>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="EmsNo" label="帐册号">
											<Select v-model="searchModel.EmsNo" placeholder="请选择" filterable remote size="large">
												<Option v-for="item in childrenSystemList" :value="item.value" :key="item.label">{{ item.label }}
												</Option>
											</Select>
										</FormItem>
									</i-col>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="BillNo" label="清单编号">
											<Input type="text" v-model="searchModel.BillNo" placeholder="清单编号"></Input>
										</FormItem>
									</i-col>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="EntrySeqNo" label="报关单统一编号">
											<Input type="text" v-model="searchModel.EntrySeqNo" placeholder="报关单统一编号"></Input>
										</FormItem>
									</i-col>
								</Row>
								<Row>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="CopErpCode" label="业务跟踪号">
											<Input type="text" v-model="searchModel.CopErpCode" placeholder="业务跟踪号"></Input>
										</FormItem>
									</i-col>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="RelativeCustomsNo" label="对应报关单编号">
											<Input type="text" v-model="searchModel.RelativeCustomsNo" placeholder="对应报关单编号"></Input>
										</FormItem>
									</i-col>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="TradeMode" label="监管方式">
											<Input type="text" v-model="searchModel.TradeMode" placeholder="监管方式"></Input>
										</FormItem>
									</i-col>
								</Row>
								<Row>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="TransMode" label="运输方式">
											<Input type="text" v-model="searchModel.TransMode" placeholder="运输方式"></Input>
										</FormItem>
									</i-col>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="GoodsFlag" label="成品、料件标志">
											<Input type="text" v-model="searchModel.GoodsFlag" placeholder="成品、料件标志"></Input>
										</FormItem>
									</i-col>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="Status" label="数据状态">
											<Input type="text" v-model="searchModel.Status" placeholder="数据状态"></Input>
										</FormItem>
									</i-col>
								</Row>
								<Row>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="PreEmsId" label="预录入统一编号">
											<Input type="text" v-model="searchModel.PreEmsId" placeholder="预录入统一编号"></Input>
										</FormItem>
									</i-col>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="QueryBeginDate" label="创建日期">
											<!--                                            <Input type="text" style='width: 100px!important;' v-model="searchModel.QueryBeginDate" placeholder="创建开始日期"></Input>
                                            <Input type="text" style='width: 100px!important;' v-model="searchModel.QueryEndDate" placeholder="创建结束日期"></Input>
 -->
											<DatePicker type="date" v-model="searchModel.QueryBeginDate" placeholder="开始日期" style="width: 115px!important"></DatePicker>
											<DatePicker type="date" v-model="searchModel.QueryEndDate" placeholder="结束日期" style="width: 115px!important"></DatePicker>
										</FormItem>
									</i-col>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="CreateUser" label="">
											<!-- <Input type="checkbox" v-model="searchModel.CreateUser" placeholder="当前用户"></Input> -->
											<Checkbox v-model="searchModel.CreateUser">当前用户</Checkbox>
										</FormItem>
									</i-col>
								</Row>
								<Row>
									<i-col :xs="2" :sm="4" :md="6" :lg="8">
										<FormItem prop="Remark" label="备注">
											<Input type="text" v-model="searchModel.Remark" placeholder="备注"></Input>
										</FormItem>
									</i-col>
								</Row>
								<Row class="search">
									<i-col>
										<Button icon="android-search" type="primary" @click="handleSearch()">查询</Button>
										<Button icon="android-search" type="primary" @click="resetFields()">重置</Button>
										<Button icon="android-search" type="primary" @click="handleSearch()">导出</Button>
										<Button icon="android-search" type="primary" @click="handleSearch()">打印</Button>
									</i-col>
								</Row>
							</Form>
						</Card>
					</div>
				</Panel>

			</Collapse>
		</div>
		<!--pagetable-->
		<div>
			<paged-table ref="currentTable" :enums="commonEnums" :serviceName="serviceName" :listUrl="listUrl" :searchModel="searchModel"
			 :searchItems="searchItems" :columns="columns" :TableData="TableData" :TableHeight="TableHeight" :TableWidth="TableHeight"
			 :bus="bus" :addBehaviorSetting="addBehaviorSetting" :title="tableTitle" :disableImportExport="disableImportExport"
			 :disableAdd="disableAdd" :disableBatchDelete="disableBatchDelete" :disableEdit="disableEdit" :disablePaged="disablePaged"
			 @on-request-inline-page="handleInlinePageRequest"></paged-table>
		</div>
		<user-create :editForm="formData" :autoClose="autoClose" :visible="showModalForm" :validateRules="validateRules"
		 :operationMode="operationMode" :title="formTitle" @on-visible-change="onMainFormVisibleChanged" @on-model-change="onMainFormSaved"></user-create>
	</div>
</template>
<script>
<<<<<<< HEAD
    import Vue from 'vue';
    import pagedTable from '@/views/components/paged-table';
    import userCreate from '@/views/business/userCreate.vue';
=======
	import Vue from 'vue';
	import pagedTable from '@/views/components/paged-table';
>>>>>>> 9514dfc25c726247b52fd383b86196411ffe67fb

	export default {
		name: 'bill_home',
		components: {
			pagedTable
		},
		data() {
			return {
				searchModel: {
					IEFlag: 'I',
					OrganizationCode: '',
					EmsNo: 'E20191016123',
					BillNo: '',
					CopErpCode: '',
					TradeMode: '',
					TransMode: '',
					GoodsFlag: '',
					PreEmsId: '',
					QueryBeginDate: '',
					QueryEndDate: '',
					Status: '',
					RelativeCustomsNo: '',
					EntrySeqNo: '',
					Ids: '',
					Remark: '',
					CreateUser: ''
				},
				childrenSystemList: [],
				formData: {
					IEFlag: 'I',
					OrganizationCode: '',
					EmsNo: 'E20191016123',
					BillNo: '',
					CopErpCode: '',
					TradeMode: '',
					TransMode: '',
					GoodsFlag: '',
					PreEmsId: '',
					QueryBeginDate: '',
					QueryEndDate: '',
					Status: '',
					RelativeCustomsNo: '',
					EntrySeqNo: '',
					Ids: '',
					Remark: '',
					CreateUser: ''
				},
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					}, {
						title: '序号',
						width: 70,
						key: 'Name',
						align: 'center'
					},
					{
						title: '业务跟踪号',
						width: 120,
						key: 'Age',
						align: 'center'
					},
					{
						title: '清单编号',
						width: 120,
						key: 'Address',
						align: 'center'
					},
					{
						title: '预录入统一编号',
						width: 150,
						key: 'LoginName',
						align: 'center'
					},
					{
						title: '报关单统一编号',
						width: 150,
						key: 'Password',
						align: 'center'
					},
					{
						title: '对应报关单编号',
						width: 150,
						key: 'Password',
						align: 'center'
					},
					{
						title: '关联报关单号',
						width: 150,
						key: 'Password',
						align: 'center'
					},
					{
						title: '申请表编号',
						width: 130,
						key: 'Password',
						align: 'center'
					},
					{
						title: '帐册号',
						width: 100,
						key: 'Password',
						align: 'center'
					},
					{
						title: '审核状态',
						width: 100,
						key: 'Password',
						align: 'center'
					},
					{
						title: '数据状态',
						width: 100,
						key: 'Password',
						align: 'center'
					},
					{
						title: '经营单位编号',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '监管方式',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '进境关别',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '加工单位',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '成品料件标志',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '主管海关',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '报关标志',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '报关类型',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '清单类型',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '申报日期',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '核扣标志',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '审核原因',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '审核描述',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '创建人',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: '创建时间',
						width: 200,
						key: 'Password',
						align: 'center'
					},
					{
						title: 'id',
						width: 200,
						key: 'Password',
						align: 'center'
					}
				],
				TableData: [],
				TableHeight: 300,
				TableWidth: 500,
				operationMode: null,
				entityName: '',
				serviceName: 'user',
				listUrl: 'user/getUserList',
				pageIndex: 1,
				TotalCount: 0,
				showModalForm: false,
				showChildModalForm: false,
				modal_loading: false,
				editingModel: {},
				validateRules: {},
				commonEnums: {},
				selectedRows: [],
				formItems: [],
				searchItems: [],
				bus: new Vue(),
				childFormTitle: ' ',
				addBehaviorSetting: {
					routeName: 'userTab',
					routeParams: [{
						keyName: 'id',
						valueField: 'Id'
					}]
				},
				tableTitle: null,
				formTitle: '',
				disableImportExport: false,
				autoClose: true,
				disableAdd: false,
				disableEdit: false,
				disableBatchDelete: false,
				disablePaged: false,
				displayAccordion: '1' //1展开,0 折叠
			};
		},
		created() {
			this.init();
			this.bus.$on('prepareAdd', this.prepareAdd);
			this.bus.$on('prepareEdit', this.prepareEdit);
		},
		mounted() {
			this.handleSearch();
		},
		// watch: {
		//     searchModel: function (newValue) {
		//         this.searchModel = [];
		//         newValue.map(item => {
		//             this.searchModel.push();
		//         });
		//         this.searchModel = newValue;
		//     }
		// },
		beforeDestroy() {
			this.bus.$off('prepareAdd', this.prepareAdd);
			this.bus.$off('prepareEdit', this.prepareEdit);
		},
		methods: {
			resetFields() {
				Object.assign(this.$data, this.$options.data());
			},
			handleSearch() {
				this.$refs.currentTable.handleSearch();
			},
			handleInlinePageRequest(payload) {
				this.$emit('on-request-inline-page', payload);
			},
			init() {},
			onMainFormVisibleChanged(newValue) {
				this.showModalForm = newValue;
			},
			prepareAdd() {
				this.showModalForm = true;
				this.operationMode = 'create';
				this.formTitle = '创建';
			},
			prepareEdit(payload) {
				this.operationMode = 'edit';
				this.formData = JSON.parse(JSON.stringify(payload));
				this.showModalForm = true;
				this.formTitle = '编辑';
			},
			onMainFormSaved(newModel) {
				this.bus.$emit('on-data-changed');
			}
		}
	};
</script>

<style lang='less'>
	.search {
		text-align: center;

		.btn {
			margin-left: 0;
		}
	}

	.demo-drawer-footer {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-top: 1px solid #e8e8e8;
		padding: 10px 16px;
		text-align: right;
		background: #fff;
	}

	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;

		.ivu-modal {
			top: 0;
		}
	}

	.searchModel-wapper {
		.ivu-row {
			padding: 1px 0;
		}
	}

	.ivu-select-large.ivu-select-single .ivu-select-selection {
		height: 25px !important;
		width: 80% !important;
	}

	.ivu-select-large .ivu-select-input,
	.ivu-select-large.ivu-select-multiple .ivu-select-input {
		font-size: 16px;
		height: 20px !important;
		line-height: 20px !important;
		top: 3px;
	}
</style>
