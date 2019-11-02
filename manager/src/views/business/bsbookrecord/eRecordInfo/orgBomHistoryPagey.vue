<template>
  <div class="list-wrapper">
    <div class="list-search">
      <bom-Search @searchList="handleSearch"></bom-Search>
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
import bomSearch from "_vbue/bsbookrecord/eRecordInfo/orgBomHistorySearch.vue";
import generalButton from "_com/general-button";

export default {
  name: "orgImgHistoryPage",
  components: {
    pagedTable,
    bomSearch,
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
        { title: "成品序号", width: 100, key: "gnoexg", align: "center" },
        { title: "料件货号", width: 120, key: "imgno", align: "center" },
        { title: "料件序号", width: 100, key: "gnoimg", align: "center" },
        { title: "单耗版本号", width: 130, key: "begindate", align: "center" },
        { title: "净耗数量", width: 100, key: "netuseupqty", align: "center" },
        { title: "有形损耗率(%)", width: 130, key: "tgbllossrate", align: "center" },
        { title: "无形损耗率(%)", width:130, key: "intgblossrate", align: "center" },
         { title: "单申报状态", width: 130, key: "ucnsdclstucdcn", align: "center" },
         { title: "保税科件比例", width: 130, key: "bondmtpckprpr", align: "center" },
         { title: "修改标志", width: 100, key: "modifymarkcn", align: "center" },
         { title: "结束日期", width: 100, key: "enddate", align: "center" },
         { title: "备注", width: 200, key: "note", align: "center" },
         { title: "创建时间", width: 150, key: "createtime", align: "center" },
        
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
      serviceName: "orgBomHistoryPage",
      listUrl: "emsRecordInfo/queryBomRecordData",
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
        serviceName: "orgBomHistory",
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
      this.formTitle = "新增";
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