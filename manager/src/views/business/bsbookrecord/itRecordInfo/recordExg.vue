<template>
  <div class="list-wrapper">
    <div class="list-search">
      <itRecord-serach @searchList="handleSearch"></itRecord-serach>
    </div>
    <div class="button-wrapper">
     <general-button
                    ref="currentButton"
                    :buttonBus="buttonBus"
                    :displayAdd="displayAdd"
                    :displayEdit="displayEdit"
                    :displayBatchDelete="displayBatchDelete"
                    :displayImport="displayImport"
                    :routerSetting="addBehaviorSetting"
                    :templateSetting="templateSetting"
                    :selectedRows="selectRows"
                    :selectCondition="searchModel"        
                    :buttonHandleSetting="buttonHandleSetting"
      ></general-button>
    </div>
    <div class="pageTable">
       <paged-table
                    ref="currentTable"
                    :bus="tableBus"
                    :serviceName="serviceName"
                    :listUrl="listUrl"
                    :searchModel="searchModel"
                    :searchItems="searchItems"
                    :columns="columns"
                    :TableData="TableData"
                    :hasShowSummary="hasShowSummary"
                    :disablePaged="disablePaged"
                    :statisticsItem="statisticsItem"
        ></paged-table>
    </div>
    
  </div>
</template>

<script>
import Vue from "vue";
import itRecordSerach from "_vbue/bsbookrecord/itRecordInfo/itRecordSerach.vue";
import pagedTable from "_com/paged-table";
import basicinfoSelect from "_com/custom-select";

import generalButton from "_com/general-button";
export default {
  name: "nameTab",
  components: {
    generalButton,
    pagedTable,
    basicinfoSelect,
    itRecordSerach
  },
  data() {
    return {
     
      statisticsItem: {},
      
     
     
     
      // 按钮
      buttonBus: new Vue(),
      displayAdd: false,
      displayEdit: false,
      displayBatchDelete: false,
      displayImport: false,
      displayExport: true,
      addBehaviorSetting: { },
      formData: {},
      template: {},
      parentValue: "1",
      selectUrl: "itRecordInfo/emsnoselect",
      buttonHandleSetting: {
        // 按钮URL
        serviceName: "itRecordInfoExg",
        getUrl: "itRecordInfo/getRecordInfoExgList",
        exportUrl: "itRecordInfo/downloadFile"
      },
      templateSetting: {
        importType: "业务单明细",//表示多个模板类型
        uploadFileServer: "itRecord",
        uploadFileAction: "itRecord/ImportExcel",
        templateType:'multiple',//multiple 表示多个模板 single 表示单个模板,如果单个模板需要给模板名称
        templateName:'test.xls', //下载单个模板的名字,
        secondRequestUrl:'commons/secondRequest' //store模块路由地址
      },
      // table
      selectRows: [], // 表格选中行
      tableBus: new Vue(),
      serviceName: "itRecordInfo",
      listUrl: "itRecordInfo/getRecordInfoExgList",
     
      searchModel: {},
      searchItems: [],
      // 是否有统计
      hasShowSummary: false,
      columns: [
        { title: "序号", width: 80, key: "rowNumber", align: "left" },
        { title: "帐册编号", width: 150, key: "emS_NO", align: "center" },
        { title: "备案项号", width: 120, key: "g_NO", align: "center" },
        { title: "商品编码", width: 100, key: "codE_T", align: "center" },
        { title: "商品名称", width: 500, key: "g_NAME", align: "center" }
      ],
      TableData: [],
      disablePaged: false
    };
  },
  created() {
    this.buttonBus.$on("requestData", this.handleSearch);
  },
  beforeDestroy() {
 
    this.buttonBus.$off("requestData", this.handleSearch);
    
  },
  methods: {
    handleSearch(data) {
    //   this.$store.state.user.searchModel = data;
      if (data) this.searchModel = data;
      this.$refs.currentTable.handleSearch(data);
    },
    clickTest() {
      this.$Message.success("点击成功");
    }
   
  },
  mounted() {
     this.handleSearch();
  }
};
</script>