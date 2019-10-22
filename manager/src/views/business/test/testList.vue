<template>
  <div class="list-wrapper">
    <div class="list-search">
      <user-search @searchList="handleSearch"></user-search>
    </div>
    <div class="button-wrapper">
      <general-button
        ref="currentButton"
        :buttonBus="buttonBus"
        :displayAdd="displayAdd"
        :displayEdit="displayEdit"
        :displayBatchDelete="displayBatchDelete"
        :displayImportExport="displayImportExport"
        :routerSetting="addBehaviorSetting"
        :selectedRows="selectRows"
        :buttonHandleSetting="buttonHandleSetting"
      ></general-button>
    </div>   
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
    <user-form
      :autoClose="autoClose"
      :visible="showModalForm"
      :operationMode="operationMode"
      :mainForm="formData"
      :title="formTitle"
      :className="model_className"
      @on-visible-change="onMainFormVisibleChanged"
      @on-model-change="onMainFormSaved"
      :editFormBus="editFormBus"
    ></user-form>
  </div>
</template>

<script>
import Vue from "vue";
import userSearch from "_vbue/test/userSearch.vue";
import generalButton from "_com/general-button";
import pagedTable from "_com/paged-table";
import userForm from "_vbue/test/userForm-second.vue";

export default {
  name: "test-list",
  components: {
    userSearch,
    generalButton,
    pagedTable,
    userForm
  },
  data() {
    return {
      // 按钮
      buttonBus: new Vue(),
      displayAdd: true,
      displayEdit: true,
      displayBatchDelete: true,
      displayImportExport: true,
      addBehaviorSetting: {
        // 配置跳转新页面
        routeName: "",
        routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }
        ]
      },
      formData: {},
      template: {},
      buttonHandleSetting: {
        // 按钮URL
        serviceName: "user",
        getUrl: "user/getUserList",
        deleteUrl: "user/deleteRange",
        importUrl: "user/importFile",
        exportUrl: "user/exportFile",
        templateUrl: "user/getFileTemplate",
        printUrl:"user/printPdf"
      },
      // table
      selectRows: [], // 表格选中行
      tableBus: new Vue(),
      serviceName: "user",
      listUrl: "user/getUserList",
      searchModel: {},
      searchItems: [],
      // 是否有统计
      hasShowSummary: true,
      statisticsSetting: {
        //统计配置
        columnIndex: [2, 3], //统计哪列
        unit: "元", //统计的单位
        title: "总价1", //默认标题显示
        firstIndex: 1, //显示哪一列
        blank: "" //空白显示什么
      },
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "姓名", width: 200, key: "name", align: "left" },
        { title: "年龄", width: 100, key: "age", align: "center" },
        { title: "手机号", width: 300, key: "iphone", align: "left" },
        { title: "账号", width: 500, key: "loginName", align: "left" },
        { title: "密码", width: 500, key: "password", align: "center" },
        { title: "地址", width: 300, key: "address", align: "left" }
      ],
      TableData: [],
      //modal-> add ,edit
      autoClose: true,
      showModalForm: false,
      showChildModalForm: false,
      modal_loading: false,
      model_className: "vertical-center-modal",
      operationMode: null,
      entityName: "",
      formTitle: "",
      editFormBus: new Vue()
    };
  },
  created() {
    this.buttonBus.$on("prepareAdd", this.prepareAdd);
    this.buttonBus.$on("prepareEdit", this.prepareEdit);
    //this.buttonBus.$on("requestData", this.handleSearch);
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
  methods: {
    handleSearch(data) {
      this.$store.state.user.searchModel = data;
      if (data) this.searchModel = data;
      this.$refs.currentTable.handleSearch(data);
    },
    onMainFormVisibleChanged(newValue) {
      this.showModalForm = newValue;
    },
    onMainFormSaved(newModel) {
      this.tableBus.$emit("on-data-changed");
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
        this.formTitle = "编辑用户信息";
      }
    },
    prepareNext() {
      let data = this.$refs.currentTable.getNextData();
      this.formData = JSON.stringify(data);
    },
    preparePrev() {
      let data = this.$refs.currentTable.getPrevData();
      this.formData = JSON.stringify(data);
    },
    selectRowChange(selectedRow) {
      this.selectRows = selectedRow;
    }
  },
  mounted() {
    this.handleSearch();
    this.$refs.currentButton.parpareTemplate();
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