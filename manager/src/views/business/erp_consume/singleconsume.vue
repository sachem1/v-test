<template>
    <div class>
        <div>2019-企业单耗管理</div>
        <div class="searchModel-wapper">
            <Collapse accordion v-model="displayAccordion">
                <Panel name="1">
                    查询
                    <div slot="content">
                        <card>
                            <Form ref="searchModel" :label-width="100" :model="searchModel" :rules="searchRules" inline>
                                <row>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <formItem prop="Name" label="账册编号">
                                            <input type="text" v-model="searchModel.Name" placeholder="">
                                        </formItem>
                                    </i-col>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Age" label="生产订单号">
                                          <input type="number" v-model="searchModel.Age" placeholder="生产订单号">
                                        </FormItem>
                                    </i-col>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Address" label="创建时间">
                                            <input type="date" v-model="searchModel.Address" placeholder=""></input>~
                                                 <input type="date" v-model="searchModel.Address" placeholder=""></input>
                                        </FormItem>
                                    </i-col>
                                </row>
                                 <Row>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Name" label="企业版本号">
                                            <input type="text" v-model="searchModel.Name" placeholder="企业版本号"></input>
                                        </FormItem>
                                    </i-col>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Age" label="单耗版本号">
                                            <input type="text" v-model="searchModel.Age" placeholder="单耗版本号"></input>
                                        </FormItem>
                                    </i-col>
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Address" label="成品货号">
                                            <input type="text" v-model="searchModel.Address" placeholder="成品货号"></input>
                                        </FormItem>
                                    </i-col>
                                </Row>
                                  <Row>
                                         <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Address" label="成品序号">
                                            <input type="text" v-model="searchModel.Address" placeholder="成品序号"></input>
                                        </FormItem>
                                    </i-col> 
                                    <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Address" label="料件货号">
                                            <input type="text" v-model="searchModel.Address" placeholder="料件货号"></input>
                                        </FormItem>
                                    </i-col> 
                                     <i-col :xs="2" :sm="4" :md="6" :lg="8">
                                        <FormItem prop="Address" label="料件序号">
                                            <input type="text" v-model="searchModel.Address" placeholder="料件序号"></input>
                                        </FormItem>
                                    </i-col> 
                                   
                                </Row>             
                               <Row class="search">
                                    <i-col>
                                        <Button icon="android-search" type="primary" @click="handleSearch()">查询</Button>
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
        Name: "31",
        Address: "a",
        Age: "88"
      },
      displayEdit: true,
      displayAdd: true,
	            columns: [
	                { type: 'selection', width: 60, align: 'center' },
	                { title: '序号', width: 80, key: 'name', align: 'left' },
	                { title: '账册号', width: 110, key: 'age', align: 'center' },
	                { title: '企业代码', width: 110, key: 'address', align: 'center' },
	                { title: '部门代码', width: 110, key: 'loginName', align: 'center' },
                    { title: '生产订单号', width: 110,key: 'password', align: 'center' },
                    { title: '生产批次号', width: 110,key: 'passw2ord', align: 'center' },
                    { title: '成品货号', width: 110,key: '', align: 'center' },
                    { title: '成品序号', width: 110,key: '', align: 'center' },
                    { title: '料件货号', width: 110,key: '', align: 'center' },
                    { title: '保税标志', width: 110,key: '', align: 'center' },
                    { title: '料件序号', width: 110,key: '', align: 'center' },
                    { title: '单耗版本号', width: 120,key: '', align: 'center' },
                    { title: '净耗', width: 110,key: '', align: 'center' },
                    { title: '企业版本号', width: 110,key: '', align: 'center' },
                    { title: '修改标志', width: 110,key: '', align: 'center' },
                    { title: '保税料件比例', width: 140,key: '', align: 'center' },
                    { title: '单耗申报状态', width: 140,key: '', align: 'center' },
                    { title: '有形损耗率', width: 110,key: '', align: 'center' },
                    { title: '无形损耗率', width: 110,key: '', align: 'center' },
                    { title: '单耗有效期', width: 110,key: '', align: 'center' },
                    { title: '备注', width: 190,key: '', align: 'center' },
                    { title: '创建时间', width: 120,key: '', align: 'center' },
                    { title: '创建人', width: 110,key: '', align: 'center' }
	            ],
                TableData: [{"name":"ab-namec","age":"101","address":"addre-d成山路1829号","loginName":"abc-12893","password":"123"}]
               // TableHeight: 300,
               // TableWidth: 500
    };
  },
  created() {
   // this.bus.$on("prepareAdd", this.add);
   // this.bus.$on("prepareEdit", this.edit);
  },
  beforeDestroy() {
  //  this.bus.$off("prepareAdd", this.add);
   // this.bus.$off("prepareEdit", this.edit);
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
        .ivu-input {
            height: 25px;
        }

        .ivu-row {
            padding: 1px 0;
        }
    }
</style>
