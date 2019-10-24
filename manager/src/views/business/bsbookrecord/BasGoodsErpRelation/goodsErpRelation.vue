<template>
  <div class="list-wrapper">
      <div class="list-search">
			<goods-Erp-Search @searchList="handleSearch"></goods-Erp-Search>
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
									 :hasShowSummary="hasShowSummary"
                   :statisticsItem="statisticsSetting"></paged-table>
      </div>
      <div  class="modalform">
          <goods-Erp-Edit :autoClose="autoClose"
								 :visible="showModalForm"
								 :operationMode="operationMode"
                 :mainForm="formData"
								 :title="formTitle"
								 @on-visible-change="onMainFormVisibleChanged"
								 @on-model-change="onMainFormSaved"
                :editFormBus="editFormBus"
                 ></goods-Erp-Edit>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import pagedTable from "_com/paged-table";
import goodsErpSearch from '_vbue/bsbookrecord/BasGoodsErpRelation/goodsErpSearch.vue';
import generalButton from '_com/general-button';
import goodsErpEdit from '_vbue/bsbookrecord/BasGoodsErpRelation/goodsErpEdit.vue';

export default {
    name:"goodsErpRelationMain",
    components: {
    pagedTable,
    goodsErpSearch,
    generalButton,
    goodsErpEdit
  },
  data() {
    return {
      searchModel: {},
      searchResult: {
        EmsNo: "",
        ErpSku: "",
        ImgNo: "",
        GOODSFLAG: "",
        OperateFlag: ""
      },
      columns: [
        { type: "selection", width: 60, align: "center" },
        {
          title: "企业料号",
          width: 200,
          key: "erpSku",
          align: "center",
        },
        { title: "备案料号", width: 200, key: "imgNo", align: "center" 
        },
        {
          title: "物料标志",
          width: 100,
          key: "goodsflag",
          align: "center",
           render:(h,params) => {
             if(params.row.goodsflag==="3"){
                return h("span","料件");
             }else if(params.row.goodsflag==="4"){
                return h("span","成品");
             }

           return h("span",params.row.GOODSFLAG);
        } 
          
        },
        { title: "账册号", width: 200, key: "emsNo", align: "center" },
        { title: "创建人", width: 100, key: "createUser", align: "center" },
        { title: "创建时间", width: 250, key: "createTime", align: "center" },
        { title: "更新人", width: 100, key: "udpateUser", align: "center" },
        { title: "更新时间", width: 250, key: "updateTime", align: "center" }
      ],
  
      tableBus: new Vue(),
      buttonBus: new Vue(),
      searchItems: [],
      commonEnums: {},
      TableData: [],
      tableTitle: null,
      formTitle: "",
      disableImportExport: false,
      autoClose: true,
      disableAdd: false,
      disableEdit: false,
      disableBatchDelete: false,
      disablePaged: false,
      serviceName: "goodsErp",
      listUrl: "goodsErp/getGoodsErpList",
      displayAccordion: "1",
      addBehaviorSetting: {
        routeName: "",
        routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }
        ]
      },
       statisticsSetting: {
        //统计配置
        columnIndex: [2, 3], //统计哪列
        unit: "元", //统计的单位
        title: "总价1", //默认标题显示
        firstIndex: 1, //显示哪一列
        blank: "" //空白显示什么
      },
      formData:{},
      editFormBus:new Vue(),
 
       displayAdd: true,
	            displayEdit: true,
	            displayBatchDelete: true,
                displayImportExport: true,
                buttonHandleSetting: {
	                // 按钮URL
	                serviceName: 'erp',
	                getUrl: 'goodsErp/getGoodsErpList',
	                deleteUrl: 'goodsErp/deleteGoodsErp',
	                importUrl: 'user/importFile',
	                exportUrl: 'user/exportFile',
	                templateUrl: 'user/getFileTemplate'
                },
                selectRows: [],
                showModalForm: false,
                operationMode: null,
                goodsErpEditData:{},
                hasShowSummary:false,
                emsNoList:[]
    };
  },
  methods: {
    handleSearch: function(data) {
      if (data) this.searchModel = data;
      this.$refs.currentTable.handleSearch(data);
    },
    handleInlinePageRequest(payload) {
      this.$emit("on-request-inline-page", payload);
    },
    prepareAdd () {
	              this.showModalForm = true;
                this.operationMode = "create";
                this.formData = {};
                this.$route.query;
                this.formTitle = "创建用户";
	        },
	        prepareEdit (payload) {
	            if (!payload) {
	                if (this.selectRows.length == 0) {
	                    this.$Message.error('请选择需要编辑的行!');
	                }
	                payload = JSON.stringify(this.selectRows[0]);
	            }

	            //this.formData = JSON.stringify(payload);
              this.formData = JSON.parse(JSON.stringify(payload));
	            if (this.addBehaviorSetting && this.addBehaviorSetting.routeName) {
	                this.$router.push({
	                    name: this.addBehaviorSetting.routeName,
	                    query: { userForm: this.formData }
	                });
	            } else {
	                this.operationMode = 'edit';
	                this.showModalForm = true;
	                this.formTitle = '编辑';
	            }
	        },
	        selectRowChange (selectedRow) {
	            this.selectRows = selectedRow;
            },
            onMainFormVisibleChanged (newValue) {
	            this.showModalForm = newValue;
	        },
	        onMainFormSaved (newModel) {
	            this.bus.$emit('on-data-changed');
            },
            prepareNext() {
      let data = this.$refs.currentTable.getNextData();
      this.formData = JSON.stringify(data);
    },
    preparePrev() {
      let data = this.$refs.currentTable.getPrevData();
      this.formData = JSON.stringify(data);
    }
  },
   created () {
	        this.buttonBus.$on('prepareAdd', this.prepareAdd);
	        this.buttonBus.$on('prepareEdit', this.prepareEdit);
	        this.buttonBus.$on('requestData', this.handleSearch);
	        this.tableBus.$on('selectedRowsChange', this.selectRowChange);
          this.tableBus.$on('prepareEdit', this.prepareEdit);
          
          this.editFormBus.$on("preNextData", this.prepareNext);
          this.editFormBus.$on("prePrevData", this.preparePrev);
	    },
	    beforeDestroy () {
	        this.buttonBus.$off('prepareAdd', this.prepareAdd);
	        this.buttonBus.$off('prepareEdit', this.prepareEdit);
	        this.buttonBus.$off('requestData', this.handleSearch);
	        this.tableBus.$off('selectedRowsChange', this.selectRowChange);
          this.tableBus.$off('prepareEdit', this.prepareEdit);
          
           this.editFormBus.$off("preNextData", this.prepareNext);
          this.editFormBus.$off("prePrevData", this.preparePrev);
        },
         mounted () {
          this.handleSearch();
	        this.$refs.currentButton.parpareTemplate();
	    }
};
</script>
<style lang='less'>
.search {
  text-align: center;
  .btn {
    margin-left: 0;
  }

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
}
</style>