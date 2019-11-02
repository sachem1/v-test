<template>
  <div class="list-wrapper">
    <div class="list-search">
      <billInQuery @searchList="handleSearch"></billInQuery>
    </div>
    <div class="button-wrapper">
      <generalButton
        ref="currentButton"
        :buttonBus="buttonBus"
        :displayAdd="displayAdd"
        :displayEdit="displayEdit"
        :displayBatchDelete="displayBatchDelete"
        :displayImportExport="displayImportExport"
        :routerSetting="addBehaviorSetting"
        :selectedRows="selectRows"
        :buttonHandleSetting="buttonHandleSetting"
      ></generalButton>
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
      ></paged-table>
    </div>
    <div class="modalform">
      <!--			<FileLabNoForm :autoClose="autoClose"-->
      <!--							  :visible="showModalForm"-->
      <!--							  :operationMode="operationMode"-->
      <!--							  :editForm="formData"-->
      <!--							  :title="formTitle"-->
      <!--							  @on-visible-change="onMainFormVisibleChanged"-->
      <!--							  @on-model-change="onMainFormSaved"></FileLabNoForm>-->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import billInQuery from "_vbue/bsbookrecord/bill/billIn/billInQuery";
import generalButton from "_com/general-button";
import pagedTable from "_com/paged-table";

export default {
  name: "billInIndex",
  components: {
    billInQuery,
    generalButton,
    pagedTable
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
        routeName: "billInEdit",
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
        serviceName: "billIn",
        getUrl: "billIn/QueryTablePaged",
        deleteUrl: "billIn/deleteRange",
        importUrl: "billIn/importFile",
        exportUrl: "billIn/exportFile"
        //templateUrl: 'billInfo/getFileTemplate'
      }, // table
      selectRows: [], // 表格选中行
      tableBus: new Vue(),
      serviceName: "billIn",
      listUrl: "billIn/queryTablePaged",
      searchModel: {},
      statisticsSetting: {
        //统计配置
        columnIndex: [2, 3], //统计哪列
        unit: "元", //统计的单位
        title: "总价1", //默认标题显示
        firstIndex: 1, //显示哪一列
        blank: "" //空白显示什么
      },
      searchItems: [],
      hasShowSummary: false, // 是否有统计
      columns: [
        { type: "selection", width: 60, key: "id", align: "center" },
        {
          title: "序号",
          width: 80,
          key: "rowNumber",
          align: "left"
        },
        { title: "业务跟踪号", width: 170, key: "cop_erp_code", align: "left" },
        {
          title: "清单编号",
          width: 170,
          key: "bill_no",
          align: "left"
        },
        {
          title: "预录入统一编号",
          width: 180,
          key: "pre_ems_id",
          align: "left"
        },
        {
          title: "报关单统一编号",
          width: 180,
          key: "EntrySeqNo",
          align: "left"
        },
        {
          title: "对应报关单编号",
          width: 180,
          key: "RelativeCustomsNo",
          align: "left"
        },
        {
          title: "关联报关单号",
          width: 180,
          key: "rel_entry_id",
          align: "left"
        },
        {
          title: "申请表编号",
          width: 130,
          key: "ApplyNo",
          align: "left"
        },
        {
          title: "帐册号",
          width: 150,
          key: "ems_no",
          align: "left"
        },
        {
          title: "审核状态",
          width: 100,
          key: "Approve_Result",
          align: "left"
        },
        {
          title: "数据状态",
          width: 150,
          key: "StatusCn",
          align: "left"
        },
        {
          title: "经营单位编号",
          width: 160,
          key: "trade_code",
          align: "left"
        },
        {
          title: "监管方式",
          width: 150,
          key: "TradeModeCn",
          align: "left"
        },
        {
          title: "进境关别",
          width: 160,
          key: "IePortCn",
          align: "left"
        },
        {
          title: "加工单位",
          width: 230,
          key: "receive_name",
          align: "left"
        },
        {
          title: "成品料件标志",
          width: 200,
          key: "GoodsFlag",
          align: "left"
        },
        {
          title: "主管海关",
          width: 160,
          key: "CustomCn",
          align: "left"
        },
        {
          title: "报关标志",
          width: 200,
          key: "entry_flagcn",
          align: "left"
        },
        {
          title: "报关类型",
          width: 130,
          key: "entry_typecn",
          align: "left"
        },
        {
          title: "清单类型",
          width: 100,
          key: "bill_typecn",
          align: "left"
        },
        {
          title: "申报日期",
          width: 200,
          key: "d_date",
          align: "center"
        },
        {
          title: "核扣标志",
          width: 100,
          key: "dejou_markcn",
          align: "left"
        },
        {
          title: "审核原因",
          width: 200,
          key: "Approve_Reject_Reason_CN",
          align: "center"
        },
        {
          title: "审核描述",
          width: 200,
          key: "Approve_Reject_Description",
          align: "center"
        },
        {
          title: "创建人",
          width: 200,
          key: "create_user",
          align: "left"
        },
        {
          title: "创建时间",
          width: 200,
          key: "create_time",
          align: "left"
        }
      ],
      TableData: [],
      autoClose: true,
      showModalForm: false,
      showChildModalForm: false,
      modal_loading: false,
      operationMode: null,
      entityName: "",
      formTitle: ""
    };
  },
  created() {
    this.buttonBus.$on("prepareAdd", this.prepareAdd);
    this.buttonBus.$on("prepareEdit", this.prepareEdit);
    this.buttonBus.$on("requestData", this.handleSearch);
    this.tableBus.$on("selectedRowsChange", this.selectRowChange);
    this.tableBus.$on("prepareEdit", this.prepareEdit);

    this.$root.eventBus.$on("billHeaderListReload",this.handleSearch)
  },
  beforeDestroy() {
    this.buttonBus.$off("prepareAdd", this.prepareAdd);
    this.buttonBus.$off("prepareEdit", this.prepareEdit);
    this.buttonBus.$off("requestData", this.handleSearch);
    this.tableBus.$off("selectedRowsChange", this.selectRowChange);
    this.tableBus.$off("prepareEdit", this.prepareEdit);
    this.$root.eventBus.$off("billHeaderListReload",this.handleSearch)
  },
  methods: {
    handleSearch(data) {
      this.$store.state.user.searchModel = data;
      if (data) {
        this.searchModel = data;
      }
      this.$refs.currentTable.handleSearch(data);
    },
    onMainFormVisibleChanged(newValue) {
      this.showModalForm = newValue;
    },
    onMainFormSaved(newModel) {
      this.bus.$emit("on-data-changed");
    },
    prepareAdd() {
      this.$router.push({
        name: this.addBehaviorSetting.routeName,
        query: { userForm: this.formData }
      });
    },
    prepareEdit(payload) {
      if (!payload) {
        if (this.selectRows.length == 0) {
          this.$Message.error("请选择需要编辑的行!");
        }
        payload = JSON.stringify(this.selectRows[0]);
      }
      this.formData = JSON.parse(payload);
      if (this.addBehaviorSetting && this.addBehaviorSetting.routeName) {
        this.$router.push({
          name: this.addBehaviorSetting.routeName,
          query: { formData: this.formData }
        });
      } else {
        this.operationMode = "edit";
        this.showModalForm = true;
        this.formTitle = "编辑";
      }
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
