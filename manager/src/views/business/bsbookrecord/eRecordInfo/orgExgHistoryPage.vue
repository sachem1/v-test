<template>
  <div class="list-wrapper">
    <div class="list-search">
      <exg-Search @searchList="handleSearch"></exg-Search>
    </div>
    <div class="button-wrapper">
      <general-button
        ref="currentButton"
        :buttonBus="buttonBus"
        :displayAdd="displayAdd"
        :displayEdit="displayEdit"
        :displayBatchDelete="displayBatchDelete"
        :displayImport="displayImport"
        :displayPrint="displayPrint"
        :routerSetting="addBehaviorSetting"
        :selectedRows="selectRows"
        :selectCondition="searchModel"
        :templateSetting="templateSetting"
        :buttonHandleSetting="buttonHandleSetting"
      >
      </general-button>
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
        :statisticsItem="statisticsSetting"
      ></paged-table>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import pagedTable from "_com/paged-table";
import exgSearch from "_vbue/bsbookrecord/eRecordInfo/orgExgHistorySearch.vue";
import generalButton from "_com/general-button";

export default {
  name: "orgImgHistoryPage",
  components: {
    pagedTable,
    exgSearch,
    generalButton
  },
  data() {
    return {
      searchModel: {},
      columns: [
        // { type: "selection", width: 60, align: "center" },
        {
          title: "序号",
          width: 70,
          key: "rownumber",
          align: "center"
        },
        { title: "账册编号", width: 110, key: "emsno", align: "center" },
        { title: "成品货号", width: 120, key: "exgno", align: "center" },
        { title: "备案序号", width: 100, key: "gno", align: "center" },
        { title: "商品编码", width: 100, key: "hscode", align: "center" },
        { title: "商品名称", width: 120, key: "gname", align: "center" },
        { title: "规格型号", width: 400, key: "gmodel", align: "left" },
        { title: "申报单位", width: 100, key: "unitcn", align: "center" },
        { title: "法定第一单位", width: 130, key: "unit1cn", align: "center" },
        { title: "法定第二单位", width:130, key: "unit2cn", align: "center" },
         { title: "单价", width: 100, key: "decprice", align: "center" },
         { title: "申报数量", width: 100, key: "qty", align: "center" },
         { title: "币制", width: 100, key: "currcn", align: "center" },
         { title: "征免方式", width: 100, key: "lvyrlfmodecdcn", align: "center" },
         { title: "主料标志", width: 100, key: "materialflagcn", align: "center" },
         { title: "企业执行标志", width: 150, key: "etpsexemarkcdcn", align: "center" },
          { title: "修改标志", width: 100, key: "modifymarkcn", align: "center" },
          { title: "期初数量", width: 100, key: "firstqty", align: "center" },
          { title: "数量控制标志", width: 150, key: "qtycntrmarkcdcn", align: "center" },
         { title: "海关执行标志", width: 150, key: "cusmexemarkcdcn", align: "center" },
         { title: "批准最大余量", width: 150, key: "maxqty", align: "center" },
           { title: "单耗质疑标志", width: 150, key: "ucnstqsnflagcn", align: "center" },
             { title: "磋商标志", width: 150, key: "csttnflagcn", align: "center" },
           { title: "备注", width: 200, key: "note", align: "center" },
       
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
      serviceName: "orgExgHistoryPage",
      listUrl: "emsRecordInfo/queryExgRecordData",
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
      formData: {},
      editFormBus: new Vue(),

      displayAdd: false,
      displayEdit: false,
      displayBatchDelete: false,
      displayImportExport: false,
      displayImport:false,
      displayPrint:false,
      buttonHandleSetting: {
        // 按钮URL
        serviceName: "orgExgHistory",
        getUrl: "",
        deleteUrl: "",
        importUrl: "",
        exportUrl: "emsRecordInfo/downloadFile",
        templateUrl: ""
      },
      templateSetting: {
        importType: "",
        uploadFileServer: "",
        uploadFileAction: "",
        templateType: "multiple", //multiple 表示多个模板 single 表示单个模板,如果单个模板需要给模板名称
        templateName: "", //下载单个模板的名字,
        secondRequestUrl: ""
      },
      selectRows: [],
      showModalForm: false,
      operationMode: null,
      goodsErpEditData: {},
      hasShowSummary: false,
      emsNoList: []
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
    prepareAdd() {
      this.showModalForm = true;
      this.operationMode = "create";
      this.formData = {};
      this.$route.query;
      this.formTitle = "创建用户";
    },
    prepareEdit(payload) {
      if (!payload) {
        if (this.selectRows.length == 0) {
          this.$Message.error("请选择需要编辑的行!");
        }
        payload = JSON.stringify(this.selectRows[0]);
      }

      this.formData = JSON.parse(JSON.stringify(payload));
      if (this.addBehaviorSetting && this.addBehaviorSetting.routeName) {
        this.$router.push({
          name: this.addBehaviorSetting.routeName,
          query: { userForm: this.formData }
        });
      } else {
        this.operationMode = "edit";
        this.showModalForm = true;
        this.formTitle = "编辑";
      }
    },
    selectRowChange(selectedRow) {
      this.selectRows = selectedRow;
    },
    onMainFormVisibleChanged(newValue) {
      this.showModalForm = newValue;
    },
    onMainFormSaved(newModel) {
      this.tableBus.$emit("on-data-changed");
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
  created() {
    this.buttonBus.$on("prepareAdd", this.prepareAdd);
    this.buttonBus.$on("prepareEdit", this.prepareEdit);
    this.buttonBus.$on("requestData", this.handleSearch);
    this.tableBus.$on("selectedRowsChange", this.selectRowChange);
    this.tableBus.$on("prepareEdit", this.prepareEdit);
  },
  beforeDestroy() {
    this.buttonBus.$off("prepareAdd", this.prepareAdd);
    this.buttonBus.$off("prepareEdit", this.prepareEdit);
    this.buttonBus.$off("requestData", this.handleSearch);
    this.tableBus.$off("selectedRowsChange", this.selectRowChange);
    this.tableBus.$off("prepareEdit", this.prepareEdit);

  },
  mounted() {
    this.handleSearch();
  }
};
</script>