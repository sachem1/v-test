<template>
  <div>
    <Row>
      <Table
        ref="mainTable"
        :columns="columns"
        :data="TableDataBind"
        @on-selection-change="selectionChanged"
        @on-row-dblclick="doubleClickEditCurrentRow"
        border
        stripe
      ></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="recordCount"
            show-sizer
            :page-size="pageSize"
            :page-size-opts="[15,25,50,100]"
            :current="pageIndex"
            @on-change="pageChanged"
            @on-page-size-change="pageSizeChanged"
            show-total
          ></Page>
        </div>
      </div>
    </Row>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "CommonPagedTable",
  props: {
    bus: Object,
    pageSize: {
      default: function() {
        return 15;
      }
    },
    TotalCount: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    TableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    serviceName: {
      type: String
    },
    listUrl: {
      type: String
    },
    searchItems: {
      type: Array
    },
    searchModel: Object,
  },
  data: function() {
    return {
      TableDataBind: [],
      selectedRows: [],
      pageIndex: 1,
      recordCount: 0,
      columnsForBind: [],
      searchEventBus: new Vue(),
      importErrors: [],
      fileData: null,
      dragOver: false,
      searchModelForBind: {}
    };
  },
  created() {
    this.searchModelForBind = this.searchModel;
    //this.requestData();
    this.searchEventBus.$on("on-search", this.handleSearch);    
    //this.bus.$on("on-data-changed", this.dataChanged);
    //this.bus.$on("on-custom-button-click", this.handleCustomButtonClick);
  },
  destroyed() {
    this.searchEventBus.$off("on-search", this.handleSearch);
    //this.bus.$off("on-data-changed", this.dataChanged);
    //this.bus.$off("on-custom-button-click", this.handleCustomButtonClick);
  },
  methods: {
    async requestData() {
      var vm = this;
      if (
        vm.serviceName == undefined ||
        vm.serviceName == null ||
        vm.serviceName == ""
      )
        return;
      if (this.searchItems) {
        this.searchItems.forEach(item => {
          if (item.hide) {
            vm.searchModelForBind[item.prop] =
              vm.$route.query[item.syncFromRoute];
          }
        });
      }

      vm.searchModelForBind.SkipCount =
        this.pageSize * (this.pageIndex - 1);
      vm.searchModelForBind.MaxResultCount = this.pageSize;
      var response = null;

      if (vm.listUrl)
        response = await vm.$store.dispatch({
          type: vm.listUrl,
          data: vm.searchModelForBind
        });
      else
        response = await vm.$store.dispatch({
          serviceName: vm.serviceName,
          type: "service/getPagedList",
          data: vm.searchModelForBind
        });
      vm.selectedRows = [];

      vm.TableDataBind = response.items;
      vm.recordCount = response.totalCount;
    },
    pageChanged(newPageIndex) {
      this.pageIndex = newPageIndex;
      this.requestData();
    },
    pageSizeChanged(newPageSize) {
      this.pageSize = newPageSize;
      this.requestData();
    },
    selectionChanged(selection) {
      this.selectedRows = selection;
      this.bus.$emit("selectedRowsChange",this.selectedRows);

    },
    dataChanged() {
      this.requestData();
    },
    async batchDelete() {
      if (this.selectedRows.length == 0) return;

      var selectedIds = this.selectedRows.map(item => {
        return item.id;
      });

      var vm = this;
      await vm.$store.dispatch({
        serviceName: vm.serviceName,
        type: "service/deleteRange",
        data: { ids: selectedIds }
      });
      vm.requestData();
      vm.$Message.success({ content: "已成功删除！", duration: 5 });
    },
    async exportFile() {
      if (this.selectedRows.length == 0) return;

      var selectedIds = this.selectedRows.map(item => {
        return item.id;
      });

      var vm = this;
      var response = await vm.$store.dispatch({
        serviceName: vm.serviceName,
        type: "service/exportFile",
        data: { ids: selectedIds }
      });
      var headers = response.headers;
      var blob = new Blob([response.data], { type: headers["content-type"] });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = headers["content-disposition"]
        .split(";")[1]
        .trim()
        .replace("filename=", "");
      link.click();
      // vm.requestData();
      // vm.$Message.success({content: '已成功删除！', duration: 5});
    },
    handleSearch() {
      console.log('pagedtable-search');
      this.pageIndex = 1;
      this.requestData();
    },
    doubleClickEditCurrentRow(rowdata) {
      this.bus.$emit("prepareEdit", rowData);
    },

    saveLocalFile(file) {
      this.fileData = file;
      this.importErrors.splice(0, this.importErrors.length);
    },

    onUploadDrop(e) {
      const files = e.dataTransfer.files;

      if (!files) {
        return;
      }

      this.saveLocalFile(files[0]);
    }
  },
  computed: {
    searchItemsForBind: function() {
      var result = [];
      if (this.searchItems == undefined) return result;

      this.searchItems.forEach(item => {
        if (item.hide == undefined || item.hide === false) {
          result.push(item);
        }
      });

      return result;
    },

    fileName: function() {
      if (this.fileData) return this.fileData.name;

      return null;
    }
  },
  watch: {
    columns: function(newValue) {
      debugger;
      if (newValue == undefined) return;

      this.columnsForBind.splice(0, this.columnsForBind.length);
      var vm = this;
      newValue.forEach(item => {
        if (item.hasOwnProperty("type") && item.type == "bool") {
          item.render = function(h, param) {
            var boolValue = this.row[this.column.key];
            if (boolValue == undefined) return h("span", "");
            else return h("span", boolValue ? "是" : "否");
          };
        }

        if (item.handle) {
          item.render = (h, param) => {
            let currentRowData = vm.TableDataBind[param.index];
            let children = [];
            item.handle.forEach(item => {
              if (typeof item == "object") {
                var __item = item;

                var props = {};
                if (__item.hasOwnProperty("style"))
                  props["type"] = __item["style"];

                var customButton = (vm, h, currentRow, index) => {
                  var __bus = vm.bus;

                  return h(
                    "Button",
                    {
                      props: props,
                      style: {
                        margin: "0 5px"
                      },
                      on: {
                        click: () => {
                          var routeParams = __item.routeParams;
                          var parameters = {};
                          if (routeParams) {
                            var rowItem = vm.TableDataBind[index];
                            routeParams.forEach(routeParam => {
                              if (rowItem.hasOwnProperty(routeParam.valueField))
                                parameters[routeParam.keyName] =
                                  rowItem[routeParam.valueField];
                              else
                                parameters[
                                  routeParam.keyName
                                ] = this.$route.query[routeParam.valueField];
                            });
                          }

                          this.$router.push({
                            name: __item.routeName,
                            query: parameters
                          });
                        }
                      }
                    },
                    __item.label
                  );
                };
                children.push(customButton(vm, h, currentRowData, param.index));
              } else if (item === "edit") {
                children.push(editButton(vm, h, currentRowData, param.index));
              } else if (item === "delete") {
                children.push(deleteButton(vm, h, currentRowData, param.index));
              }
            });
            return h("div", children);
          };
        }

        this.columnsForBind.push(item);
      });
    },
    searchModel: function(newValue) {
      this.searchModelForBind = newValue;
    },
    TableData: function(newValue) {
      this.TableDataBind = newValue;
      this.recordCount = newValue.length;
    }
  }
};

const editButton = (vm, h, currentRow, index) => {
  var __bus = vm.bus;

  return h(
    "Button",
    {
      props: {
        loading: currentRow.saving
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          __bus.$emit("prepareEdit", {
            channelId: "",
            data: vm.TableDataBind[index]
          });
        }
      }
    },
    "编辑"
  );
};
const deleteButton = (vm, h, currentRow, index) => {
  return h(
    "Poptip",
    {
      props: {
        confirm: true,
        title: "您确定要删除这条数据吗?",
        transfer: true,
        placement: "top-end"
      },
      on: {
        "on-ok": async () => {
          var pendingDelete = vm.TableDataBind[index];

          await vm.$store.dispatch({
            serviceName: vm.serviceName,
            type: "service/delete",
            data: pendingDelete.id
          });

          vm.requestData();
          vm.$Message.success({ content: "已成功删除！", duration: 5 });
        }
      }
    },
    [
      h(
        "Button",
        {
          style: {
            margin: "0 5px"
          },
          props: {
            type: "ghost",
            placement: "top"
          }
        },
        "删除"
      )
    ]
  );
};
</script>

<style lang='less'>
.ivu-table td {
  height: 35px;
}
.ivu-table th {
  height: 35px;
  background: #4876ff;
  color: cornsilk;
}
</style>