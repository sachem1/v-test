<template>
  <div>
    <div class="search">
      <search-page @searchList="handleSearch"></search-page>
    </div>
    <div class="button">
      <general-button
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
      ></paged-table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import searchPage from "_vbue/test/searchPage.vue";
import generalButton from "_com/general-button";
import pagedTable from "_com/paged-table";

export default {
  name: "test-list",
  components: {
    searchPage,
    generalButton,
    pagedTable
  },
  data() {
    return {
      //按钮
      buttonBus: new Vue(),
      displayAdd: true,
      displayEdit: true,
      displayBatchDelete: true,
      displayImportExport: true,
      addBehaviorSetting: {
        routeName: "userTab",
        routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }
        ]
      },
      buttonHandleSetting: {
        serviceName: "user",
        delelteUrl: "user/deleteRange",
        importUrl:"user/import",
        exportUrl:"user/exportFile",        
      },
      selectRows: [],
      //table
      tableBus: new Vue(),
      serviceName: "user",
      listUrl: "user/getUserList",
      searchModel: {},
      searchItems: [],
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "姓名", width: 200, key: "Name", align: "center" },
        { title: "年龄", width: 100, key: "Age", align: "center" },
        { title: "地址", width: 300, key: "Address", align: "center" },
        { title: "账号", width: 500, key: "LoginName", align: "center" },
        { title: "密码", width: 200, key: "Password", align: "center" }
      ],
      TableData: []
    };
  },
  created() {
    this.buttonBus.$on("prepareAdd", this.add);
    this.buttonBus.$on("prepareEdit", this.edit);
    this.tableBus.$on("selectedRowsChange", this.selectRowChange);
  },
  beforeDestroy() {
    this.buttonBus.$off("prepareAdd", this.add);
    this.buttonBus.$off("prepareEdit", this.edit);
    this.tableBus.$off("selectedRowsChange", this.selectRowChange);
  },
  methods: {
    handleSearch(data) {
      console.log("search---" + JSON.stringify(data));
      this.searchModel = data;
      this.$refs.currentTable.handleSearch();
    },
    add() {
      console.log("添加");
    },
    edit() {
      console.log("编辑");
    },
    selectRowChange(selectedRow) {
      this.selectRows = selectedRow;
    }
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style>
</style>