<template>
  <div class="list-wrapper">
    <div class="list-search">
      <search-items @searchList="handleSearch"></search-items>
    </div>
    <div class="button-wrapper">
      <div class="generalButton">
        <Row style="padding: 5px 0">
          <div style="float: left;">
            <span style="margin: 0 2px;">
              <Button type="primary" icon="md-add" @click="prepareAdd">添加</Button>
            </span>
            <span style="margin: 0 2px;">
              <Button type="info" icon="md-cloud-download" @click="handleImport" ref="modalShow">导入</Button>
            </span>
          </div>
        </Row>
      </div>
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
        :statisticsItem="statisticsItem"
      ></paged-table>
    </div>
    <!-- <div class="modalform">
            <eidt-form
                :autoClose="autoClose"
                :visible="showModalForm"
                :operationMode="operationMode"
                :editForm="formData"
                :title="formTitle"
                @on-visible-change="onMainFormVisibleChanged"
                @on-model-change="onMainFormSaved"
            ></eidt-form>
    </div>-->
    <!-- <it-record-import :modalImportShowStatus.sync="modalImportShow" ref="itRecordImport"></it-record-import> -->
    <import-custom-template
      :modalImportShowStatus.sync="modalImportShow"
      :templateSetting="templateSetting"
      ref="importCustomTemplate"
    ></import-custom-template>
  </div>
</template>

<script>
import Vue from "vue";
import searchItems from "_vbue/bsbookrecord/itrecord/itRecordSearch.vue";
// import generalButton from "_com/general-button";
import pagedTable from "_com/paged-table";
import eidtForm from "_vbue/test/userForm.vue";
import importCustomTemplate from "_com/import-custom-template";
// import itRecordImport from "_vbue/bsbookrecord/itrecord/itRecordImport.vue";

export default {
  name: "it-record-list",
  components: {
    searchItems,
    // generalButton,
    pagedTable,
    eidtForm,
    importCustomTemplate
  },
  data() {
    return {
      modalImportShow: false,
      templateSetting: {
        importType: "业务单明细",
        uploadFileServer: "itRecord",
        uploadFileAction: "itRecord/ImportExcel"
      },
      // 按钮
      buttonBus: new Vue(),
      displayAdd: true,
      displayEdit: true,
      displayBatchDelete: true,
      displayImportExport: true,
      addBehaviorSetting: {
        // 配置跳转新页面
        routeName: "userFormTag",
        routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }
        ]
      },
      formData: {},
      template: {},
      // table
      selectRows: [], // 表格选中行
      tableBus: new Vue(),
      serviceName: "itRecord",
      listUrl: "itRecord/getItRecordList",
      searchModel: {},
      searchItems: [],
      statisticsItem: {},
      // 是否有统计
      hasShowSummary: false,
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "序号", width: 70, key: "rowNumber" },
        { title: "申请流水号", width: 150, key: "cop_ems_no" },
        { title: "预录入统一编号", width: 170, key: "pre_ems_no" },
        { title: "企业内部编号", width: 160, key: "ems_id" },
        { title: "档案库编号", width: 150, key: "ems_no" },
        { title: "申报单位类型", width: 150, key: "declare_er_typecn" },
        { title: "申报类型", width: 110, key: "declare_typecn" },
        { title: "数据状态", width: 110, key: "declare_statuscn" },
        { title: "加工单位名称", width: 170, key: "owner_name" },
        { title: "经营单位名称", width: 170, key: "trade_name" },
        { title: "申报日期", width: 180, key: "declare_date" },
        { title: "结束有效期", width: 180, key: "end_date" },
        { title: "批准证编号", width: 180, key: "ems_appr_no" },
        { title: "创建日期", width: 180, key: "create_time" },
        { title: "创建人", width: 110, key: "create_user" }
      ],
      TableData: [],
      // add ,edit
      autoClose: true,
      showModalForm: false,
      showChildModalForm: false,
      modal_loading: false,
      operationMode: null,
      entityName: "",
      formTitle: ""
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    handleImport() {
      this.modalImportShow = true;
      this.$refs.importCustomTemplate.handleImportType();
    },
    handleSearch(data, oname) {
      this.$store.state.itRecord.searchModel = data;
      if (data) {
        this.searchModel = data;
      }
      this.$refs.currentTable.handleSearch(data);
    },
    onMainFormSaved(newModel) {
      this.bus.$emit("on-data-changed");
    },
    prepareAdd() {},
    prepareEdit(payload) {},
    selectRowChange(selectedRow) {
      this.selectRows = selectedRow;
    }
  },
  mounted() {
    this.handleSearch();
    // this.$refs.currentButton.parpareTemplate();
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