<template>
  <div class="list-wrapper">
    <div class="list-search">
      <singleconsume-Search @searchList="handleSearch"></singleconsume-Search>
    </div>
    <div class="button-wrapper">
      <general-button ref="currentButton" :buttonBus="buttonBus" :displayAdd="displayAdd" :displayEdit="displayEdit" :displayBatchDelete="displayBatchDelete" :displayImportExport="displayImportExport" :displayImport="displayImport" :routerSetting="addBehaviorSetting" :selectedRows="selectRows" :selectCondition="searchModel" :templateSetting="templateSetting" :buttonHandleSetting="buttonHandleSetting">

      </general-button>
      <Button type="primary" @click="matchBeginDate()">单耗版本匹配</Button>
    </div>
    <div class="pageTable">
      <paged-table ref="currentTable" :bus="tableBus" :serviceName="serviceName" :listUrl="listUrl" :searchModel="searchModel" :searchItems="searchItems" :columns="columns" :TableData="TableData" :hasShowSummary="hasShowSummary" :statisticsItem="statisticsSetting"></paged-table>
    </div>
    <div class="modalform">
      <singleconsume-Edit :autoClose="autoClose" :visible="showModalForm" :operationMode="operationMode" :mainForm="formData" :title="formTitle" @on-visible-change="onMainFormVisibleChanged" @on-model-change="onMainFormSaved" :editFormBus="editFormBus"></singleconsume-Edit>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import pagedTable from "_com/paged-table";
  import generalButton from "_com/general-button";
  import singleconsumeSearch from "_vbue/bsbookrecord/erpconsume/singleconsumeSearch.vue";
  import singleconsumeEdit from "_vbue/bsbookrecord/erpconsume/singleconsumeedit.vue";


  export default {
    name: "singleconsume",
    components: {
      pagedTable,
      singleconsumeSearch,
      generalButton,
      singleconsumeEdit
    },
    data() {
      return {
        searchModel: {},

        columns: [
          { type: "selection", width: 40, align: "center" },
          { title: "序号", width: 70, key: "rowNumber", align: "center" },
          { title: "账册号", width: 110, key: "emsNo", align: "center" },
          {
            title: "企业代码",
            width: 100,
            key: "customerCode",
            align: "center"
          },
          { title: "生产订单号", width: 110, key: "productId", align: "center" },
          { title: "生产批次号", width: 110, key: "batchNo", align: "center" },
          { title: "成品货号", width: 180, key: "exgNo", align: "left" },
          { title: "成品序号", width: 100, key: "exgGNo", align: "center" },
          { title: "料件货号", width: 180, key: "imgNo", align: "left" },
          { title: "保税标志", width: 100, key: "bondFlag", align: "center" },
          { title: "料件序号", width: 100, key: "imgGNo", align: "center" },
          { title: "单耗版本号", width: 110, key: "beginDate", align: "center" },
          { title: "净耗", width: 100, key: "netUseupQty", align: "center" },
          { title: "企业版本号", width: 110, key: "erpNo", align: "center" },
          { title: "修改标志", width: 100, key: "modfyMarkCn", align: "center" },
          {
            title: "保税料件比例",
            width: 140,
            key: "bondMtpckPrpr",
            align: "center"
          },
          {
            title: "单耗申报状态",
            width: 140,
            key: "agentStatusCn",
            align: "center"
          },
          {
            title: "有形损耗率",
            width: 110,
            key: "tgblLossRate",
            align: "center"
          },
          {
            title: "无形损耗率",
            width: 110,
            key: "intgbLossRate",
            align: "center"
          },
          { title: "单耗有效期", width: 150, key: "endDate", align: "center" },
           { title: "部门代码", width: 100, key: "deptCode", align: "center" },
          { title: "备注", width: 190, key: "remark", align: "center" },
          { title: "创建时间", width: 150, key: "createTime", align: "center" },
          { title: "创建人", width: 110, key: "createUser", align: "center" }
        ],

        tableBus: new Vue(),
        buttonBus: new Vue(),
        searchItems: [],
        commonEnums: {},
        TableData: [],
        tableTitle: null,
        formTitle: "",
        displayImportExport: false,
        autoClose: true,
        disableAdd: false,
        disableEdit: false,
        disableBatchDelete: false,
        disablePaged: false,
        serviceName: "singleconsume",
        listUrl: "erpconsume/queryTablePaged", //查询连接
        displayAccordion: "1",
        addBehaviorSetting: {
          routeName: "",
          routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }]
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

        displayAdd: true,
        displayEdit: true,
        displayBatchDelete: true,
        displayImport: true,
        displayExport: true,
        buttonHandleSetting: {
          // 按钮URL
          serviceName: "erpconsume",
          getUrl: "erpconsume/queryTablePaged",
          deleteUrl: "erpconsume/deleteErpconsume",
          importUrl: "",
          exportUrl: "erpconsume/downloadFile",
          templateUrl: ""
        },
        templateSetting: {
          importType: "bom",
          uploadFileServer: "erpconsume",
          uploadFileAction: "erpconsume/ImportExcel",
          templateType: "multiple", //multiple 表示多个模板 single 表示单个模板,如果单个模板需要给模板名称
          templateName: "", //下载单个模板的名字,
          expendField: false

        },
        selectRows: [],
        showModalForm: false,
        operationMode: null,
        hasShowSummary: false,
        emsNoList: []
      };
    },
    methods: {
      handleSearch: function (data) {
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

        //this.formData = JSON.stringify(payload);
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
      },
      matchBeginDate() {

        this.$store
          .dispatch({
            type: "erpconsume/matchBeginDate",
            serviceName: "erpconsume"
          })
          .then(res => {
            this.$Message.error("匹配成功!");
            this.handleSearch();
          })
          .catch(err => {
            this.$Message.error("匹配失败!");
          });
      }
    },
    created() {
      this.buttonBus.$on("prepareAdd", this.prepareAdd);
      this.buttonBus.$on("prepareEdit", this.prepareEdit);
      this.buttonBus.$on("requestData", this.handleSearch);
      this.tableBus.$on("selectedRowsChange", this.selectRowChange);
      this.tableBus.$on("prepareEdit", this.prepareEdit);

      this.editFormBus.$on("preNextData", this.prepareNext);
      this.editFormBus.$on("prePrevData", this.preparePrev);
    },
    beforeDestroy() {
      this.buttonBus.$off("prepareAdd", this.prepareAdd);
      this.buttonBus.$off("prepareEdit", this.prepareEdit);
      this.buttonBus.$off("requestData", this.handleSearch);
      this.tableBus.$off("selectedRowsChange", this.selectRowChange);
      this.tableBus.$off("prepareEdit", this.prepareEdit);

      this.editFormBus.$off("preNextData", this.prepareNext);
      this.editFormBus.$off("prePrevData", this.preparePrev);
    },
    mounted() {
      this.handleSearch();
    }
  };
</script>