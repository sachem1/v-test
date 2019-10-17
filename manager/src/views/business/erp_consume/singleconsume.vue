<template>
<!-- singleconsume 2019-企业单耗管理-->
    <div class>
        <div class="searchModel-wapper">
            <Collapse accordion v-model="displayAccordion">
                <Panel name="1">
                    查询
                    <div slot="content">
                        <card>
                            <Form ref="searchModel" :label-width="100" :model="searchModel" :rules="searchRules" inline>
                                <row>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <formItem prop="EmsNo" label="账册编号">
                                            <!-- <input type="text" v-model="searchModel.EmsNo" placeholder=""> -->
                                             <Select v-model="searchModel.EmsNo"
							filterable> 
                            <Option value="" key="">全部</Option>
				<Option v-for="item in emsNoList"
								:value="item"
								:key="item">{{ item }}</Option>
			</Select>
                                        </formItem>
                                    </i-col>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="ProductId" label="生产订单号">
                                          <input type="text" v-model="searchModel.ProductId" placeholder="生产订单号">
                                        </FormItem>
                                    </i-col>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Input_DateBegin" label="创建时间">
                                            <input type="date" v-model="searchModel.Input_DateBegin" placeholder="">~
                                                 <input type="date" v-model="searchModel.Input_DateEnd" placeholder="">
                                        </FormItem>
                                            
                                    </i-col>
                                </row>
                                 <Row>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="ErpNo" label="企业版本号">
                                            <input type="text" v-model="searchModel.ErpNo" placeholder="企业版本号">
                                        </FormItem>
                                    </i-col>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="BeginDate" label="单耗版本号">
                                            <input type="text" v-model="searchModel.BeginDate" placeholder="单耗版本号">
                                        </FormItem>
                                    </i-col>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="ExgNo" label="成品货号">
                                            <input type="text" v-model="searchModel.ExgNo" placeholder="成品货号">
                                        </FormItem>
                                    </i-col>
                                </Row>
                                  <Row>
                                         <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="ExgGNo" label="成品序号">
                                            <input type="number" v-model="searchModel.ExgGNo" placeholder="成品序号">
                                        </FormItem>
                                    </i-col> 
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="ImgNo" label="料件货号">
                                            <input type="text" v-model="searchModel.ImgNo" placeholder="料件货号">
                                        </FormItem>
                                    </i-col> 
                                     <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="ImgGNo" label="料件序号">
                                            <input type="number" v-model="searchModel.ImgGNo" placeholder="料件序号">
                                        </FormItem>
                                    </i-col> 
                                   
                                </Row>             
                               <Row class="search">
                                    <i-col>
                                   	<FormItem class="searchButton">
							<Button icon="md-search"
											type="primary"
											@click="handleSearch()">查询</Button>
							<Button class="ivu-ml-8"
											icon="md-redo"
											@click="handleReset()">重置</Button>
						</FormItem>
                                     </i-col>
                                </row>
                            </form>
                        </card>
                    </div>
                </Panel>

            </Collapse>
        </div>
         <div class="button-wrapper">
			 <general-button ref="currentButton"
											:buttonBus="buttonBus"
											:displayAdd="true"
											:displayEdit="displayEdit"
											:displayBatchDelete="true"
											:displayImportExport="true"
											:routerSetting="false"
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
     </div>
</template>

<script>
import Vue from "vue";
import generalButton from "_com/general-button";
	import pagedTable from '_com/paged-table';
    import userForm from '_vbue/test/userForm.vue';
    
export default {
    name: "singleconsume",
    components: {
    generalButton,
    pagedTable,
	userForm
  },
  data() {
    return    {
       searchModel: {
        EmsNo: "",
        Input_DateBegin: "",
        Input_DateEnd: "",
        ProductId:"",
      },
      displayEdit: true,
      displayAdd: true,
      displayAccordion: '1',
     serviceName: 'bom',
     listUrl: 'bom/getpagertlist',
     hasShowSummary: false,
	  columns: [
	                { type: 'selection', width: 60, align: 'center' },
	                { title: '序号', width: 80, key: 'rownumber', align: 'left' },
	                { title: '账册号', width: 110, key: 'ems_no', align: 'center' },
	                { title: '企业代码', width: 110, key: 'customer_code', align: 'center' },
	                { title: '部门代码', width: 110, key: 'deptcode', align: 'center' },
                    { title: '生产订单号', width: 110,key: 'Product_Id', align: 'center' },
                    { title: '生产批次号', width: 110,key: 'batchno', align: 'center' },
                    { title: '成品货号', width: 110,key: 'exg_no', align: 'center' },
                    { title: '成品序号', width: 110,key: 'exg_g_no', align: 'center' },
                    { title: '料件货号', width: 110,key: 'img_no', align: 'center' },
                    { title: '保税标志', width: 110,key: 'bond_flag', align: 'center' },
                    { title: '料件序号', width: 110,key: 'img_g_no', align: 'center' },
                    { title: '单耗版本号', width: 120,key: 'begin_date', align: 'center' },
                    { title: '净耗', width: 110,key: 'Nnet_useup_qty', align: 'center' },
                    { title: '企业版本号', width: 110,key: 'erpno', align: 'center' },
                    { title: '修改标志', width: 100,key: 'modfy_mark', align: 'center' },
                    { title: '保税料件比例', width: 140,key: 'bond_mtpck_prpr', align: 'center' },
                    { title: '单耗申报状态', width: 140,key: 'agent_Status', align: 'center' },
                    { title: '有形损耗率', width: 110,key: 'igbl_loss_rate', align: 'center' },
                    { title: '无形损耗率', width: 110,key: 'intgb_loss_rate', align: 'center' },
                    { title: '单耗', width: 90,key: 'deccm', align: 'center' },
                    { title: '单耗有效期', width: 110,key: 'enddate', align: 'center' },
                    { title: '备注', width: 190,key: 'Remark', align: 'center' },
                    { title: '创建时间', width: 120,key: 'create_time', align: 'center' },
                    { title: '创建人', width: 110,key: 'create_user', align: 'center' }
                ],
               // TableData: [{"name":"ab-namec","age":"101","address":"addre-d成山路1829号","loginName":"abc-12893","password":"123"}]
               // TableHeight: 300,
               // TableWidth: 500
                emsNoList:[]
    };
  },
  created() {
   this.bus.$on("prepareAdd", this.add);
   this.bus.$on("prepareEdit", this.edit);
  },
  beforeDestroy() {
    this.bus.$off("prepareAdd", this.add);
    this.bus.$off("prepareEdit", this.edit);
  },
  methods: {
    add() {
        console.log("添加");
    },
    edit() {
        console.log("编辑");
    },
    handleSearch() {
        console.log("2019-Qian");
        //this.$emit("searchList", this.searchModel);
        this.$refs.currentTable.handleSearch(this.searchModel);
        
        console.log("2019-QianhandleSearch-end");
    },
   handleReset() {
        console.log("2019-111Qian");
        this.searchModel.EmsNo="";
        this.searchModel.ProductId="";
    },
	getEmsNoList () {
	            this.$store.dispatch({
                    type: 'goodsErp/getEmsNoList',
                    data:{custromeCode:this.$store.state.login.userinfo.OrganizationCode}
	            }).then(res => {
	                this.emsNoList = res.data;
	            });
	        }
  },
  watch: {
            searchModel: function (newValue) {
                this.searchModel = [];
                newValue.map(item => {
                    this.searchModel.push();
                });
                this.searchModel = newValue;
            }
   },
  created () {
      this.getEmsNoList();

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
        .ivu-input {
            height: 25px;
        }

        .ivu-row {
            padding: 1px 0;
        }
    }
</style>
