<template>
  <div class="pagetable">
    <Row>
      <Table
        ref="mainTable"
        :columns="columns"
        :data="TableDataBind"
        @on-selection-change="selectionChanged"
        @on-row-dblclick="doubleClickEditCurrentRow"
        border
        stripe
        :show-summary="hasShowSummary"
        :summary-method="handleSummary"
        :loading="loading"
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
    loading: {
      // 加载中动画
      type: Boolean,
      default: false
    },
    hasShowSummary: {
      // 是否显示表位合计行
      type: Boolean,
      default: true
    }
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
      searchModelForBind: {},
      StatisticsSetting: {
        //统计配置
        columnIndex: [2, 3,5], //统计哪列
        unit: "元", //统计的单位
        title: "总价", //默认标题显示
        firstIndex: 1, //显示哪一列
        blank: "" //空白显示什么
      }
    };
  },
  created() {
    this.searchEventBus.$on("on-search", this.handleSearch);
  },
  destroyed() {
    this.searchEventBus.$off("on-search", this.handleSearch);
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
      //解决首次查询不存在值问题
      if (vm.$store.state.user.searchModel) {
        Object.entries(vm.$store.state.user.searchModel).map(item => {
          if (!vm.searchItemsForBind.hasOwnProperty(item))
            vm.searchModelForBind[item[0]]=item[1];
        });
      }

      if (vm.searchItems) {
        vm.searchItems.forEach(item => {
          if (item.hide) {
            vm.searchModelForBind[item.prop] =
              vm.$route.query[item.syncFromRoute];
          }
        });
      }

      vm.searchModelForBind.SkipCount = vm.pageSize * (vm.pageIndex - 1);
      vm.searchModelForBind.MaxResultCount = vm.pageSize;
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
      this.bus.$emit("selectedRowsChange", this.selectedRows);
    },
    dataChanged() {
      this.requestData();
    },
    handleSearch() {
      console.log("pagedtable-search");
      this.pageIndex = 1;
      this.requestData();
    },
    doubleClickEditCurrentRow(rowdata) {
      this.bus.$emit("prepareEdit", rowData);
    },
    handleSummary({ columns, data }) {
      const sums = {};
      const columnArr = this.StatisticsSetting.columnIndex;
      columns.forEach((column, index) => {
        const key = column.key;

        if (index === this.StatisticsSetting.firstIndex) {
          sums[key] = {
            key,
            value: this.StatisticsSetting.title
          };
          return;
        }
        if (columnArr.some(i => i === index)) {
          const values = data.map(item => Number(item[key]));
          if (!values.every(value => isNaN(value))) {
            const v = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[key] = {
              key,
              value: v + " " + this.StatisticsSetting.unit
            };
          } else {
            sums[key] = {
              key,
              value: this.StatisticsSetting.blank
            };
          }
        } else {
          sums[key] = {
            key,
            value: this.StatisticsSetting.blank
          };
        }
      });
      return sums;
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
      console.log("searchmodel:-->" + JSON.stringify(newValue));
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


<style scope lang='less'>
.pagetable {
  font-size: 14px;
  .ivu-table td {
    height: 28px;
  }
  .ivu-table th {
    height: 30px;
  }
}
.ivu-row {
  padding: 5px 0px;
  .ivu-btn {
    padding: 3px 8px;
  }
  .ivu-page {
    .ivu-page-item {
      min-width: 28px;
      height: 28px;
      line-height: 28px;
    }
    .ivu-page-prev {
      min-width: 28px;
      height: 28px;
      line-height: 28px;
    }

    .ivu-page-next {
      min-width: 28px;
      height: 28px;
      line-height: 28px;
    }
    .ivu-select-selected-value {
      min-width: 28px;
      height: 28px;
      line-height: 28px;
    }
    .ivu-select-selection {
      height: 28px;
    }
  }
  .ivu-table-stripe-even td {
    //background-color: #434343!important;
  }
  .ivu-table-stripe-odd td {
    //background-color: #282828!important;
  }
}
</style>