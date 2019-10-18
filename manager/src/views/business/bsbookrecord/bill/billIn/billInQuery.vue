<template>
	<div>
		<div class="title">
			<Row>
				<Col span="12">
				<span style="margin-left: 16px;display:block;font-weight:600">查询</span>
				</Col>
				<Col span="12">
				<span @click="handleClick()" class="search-title-ico">
					<Icon style="font-size:24px;font-weight:600;" type='md-arrow-dropdown'></Icon>
				</span>
				</Col>
			</Row>
		</div>
		<Card>
			<Form ref="searchModel" :label-width="100" :model="searchModel" inline>
				<!--                <Input type="hidden" v-model="searchModel.IEFlag" placeholder="进出口标记"></Input>-->
				<Row type="flex" style="margin-left: -12px; margin-right: -12px;">
					<i-col :xs="2" :sm="4" :md="6" :lg="8">
						<FormItem prop="EmsNo" label="帐册号">
							<Select v-model="searchModel.EmsNo" placeholder="请选择" filterable remote size="large">
								<Option v-for="item in CodeList" :value="item.value" :key="item.label">{{
                                    item.label }}
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
							<DatePicker type="date" v-model="searchModel.QueryBeginDate" placeholder="开始日期" style="width: 115px!important"></DatePicker>
							<DatePicker type="date" v-model="searchModel.QueryEndDate" placeholder="结束日期" style="width: 115px!important"></DatePicker>
						</FormItem>
					</i-col>
					<i-col :xs="2" :sm="4" :md="6" :lg="8">
						<FormItem prop="CreateUser" label="">
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
				<Row>
					<i-col>
						<Button icon="md-search" type="primary" @click="handleSearch()">查询</Button>
						<Button class="ivu-ml-8" icon="md-redo" @click="handleReset()">重置</Button>
						<Button icon="android-search" type="primary" @click="handleClick()">导出</Button>
						<Button icon="android-search" type="primary" @click="handleClick()">打印</Button>
					</i-col>
				</Row>
			</Form>
		</Card>
	</div>
</template>

<script>
	export default {
		name: 'billInQuery',
		data() {
			return {
				CodeList: [],
				displayAccordion: '',
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
				display: false,
				displayName: '展开',
				IconClass: 'md-arrow-dropdown'
			};
		},
		created() {
			this.getCodeList();
		},
		mounted() {
			this.handleClick();
		},
		methods: {
			handleSearch() {
				this.$emit('searchList', this.searchModel);
			},
			handleClick() {
				if (this.display) {
					this.displayName = '展开';
					this.display = false;
					this.IconClass = 'md-arrow-dropup';
				} else {
					this.display = true;
					this.displayName = '收起';
					this.IconClass = 'md-arrow-dropdown';
				}
			},
			getCodeList() {
				this.$store.dispatch({
					type: 'FileLibraryNo/getCodeList'
				}).then(res => {
					this.CodeList = res.data.result;
				});
			},
			handleReset() {
				this.searchModel = null;
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
