<template>
  <div class="list-wrapper">
    <div class="list-search">
      <user-search @searchList="handleSearch"></user-search>
    </div>
    <div class="button-wrapper">
      <general-button
              ref="currentButton"
              :buttonBus="buttonBus"
              :displayImport="displayImport"
              :displayPrint="displayPrint"
              :displayExport="displayExport"
              :routerSetting="addBehaviorSetting"
              :templateSetting="templateSetting"
              :displayAdd="displayAdd"
              :displayBatchDelete="displayBatchDelete"
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
        :statisticsItem="statisticsSetting"
      ></paged-table>
    </div>
    <div class="modalform">
      <FileLab-Notab
        :autoClose="autoClose"
        :visible="showModalForm"
        :operationMode="operationMode"
        :mainForm="formData"
        :title="formTitle"
        @on-visible-change="onMainFormVisibleChanged"
        @on-model-change="onMainFormSaved"
        :editFormBus="editFormBus"
      ></FileLab-Notab>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import userSearch from '_vbue/bsbookrecord/heBaseConfigInfo/heBaseConfigSerch.vue';
import generalButton from '_com/general-button';
import pagedTable from '_com/paged-table';
import FileLabNotab from '_vbue/bsbookrecord/heBaseConfigInfo/heBaseConfigNotab.vue';

export default {
  name: 'heBaseConfig',
  components: {
    userSearch,
    generalButton,
    pagedTable,
    FileLabNotab
  },
  data() {

    return {
      // 按钮
      buttonBus: new Vue(),
      displayAdd: false,
      displayEdit: true,
      displayBatchDelete: false,
      displayImport: false,
      displayExport: false,
      displayPrint: false,
      addBehaviorSetting: {
        // 配置跳转新页面
        routeName: '',
        routeParams: [
          {
            keyName: 'id',
            valueField: 'Id'
          }
        ]
      },
      formData: {},
      template: {},
      buttonHandleSetting: {
        // 按钮URL
        serviceName: 'heBaseConfig',
        getUrl: 'heBaseConfig/QueryTablePaged'
      },
      // table
      selectRows: [], // 表格选中行
      tableBus: new Vue(),
      serviceName: 'heBaseConfig',
      listUrl: 'heBaseConfig/QueryTablePaged',
      searchModel: {},
      searchItems: [],
      // 是否有统计
      hasShowSummary: false,
      templateSetting: {
        importType: "企业内部编号导入",
        uploadFileServer: "heBaseConfig",
        uploadFileAction: "heBaseConfig/ImportExcel",
        templateType:'single',//multiple 表示多个模板 single 表示单个模板,如果单个模板需要给模板名称
        templateName:'heBaseConfig.xls' //下载单个模板的名字
      },
      statisticsSetting: {
        //统计配置
        columnIndex: [2, 3], //统计哪列
        unit: "元", //统计的单位
        title: "总价1", //默认标题显示
        firstIndex: 1, //显示哪一列
        blank: "" //空白显示什么
      },
      columns: [
        { type: 'selection', width: 60, align: 'center' },

        // { title: 'ID', width: 100, key: 'Id',align: 'left' },
        { title: '客户代码', width: 130, key: 'customerCode', align: 'center' },
        { title: '页面地址', width: 240, key: 'appAdress', align: 'center' },
          { title: '字段名称', width: 130, key: 'ctrlShowText', align: 'center' },
        { title: '默认值', width: 200, key: 'controleVal', align: 'center' }

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
    this.buttonBus.$on('prepareAdd', this.prepareAdd);
    this.buttonBus.$on('prepareEdit', this.prepareEdit);
    this.buttonBus.$on('requestData', this.handleSearch);
    this.tableBus.$on('selectedRowsChange', this.selectRowChange);
    this.tableBus.$on('prepareEdit', this.prepareEdit);
    this.editFormBus.$on("preNextData", this.prepareNext);
    this.editFormBus.$on("prePrevData", this.preparePrev);
  },
  beforeDestroy() {
    this.buttonBus.$off('prepareAdd', this.prepareAdd);
    this.buttonBus.$off('prepareEdit', this.prepareEdit);
    this.buttonBus.$off('requestData', this.handleSearch);
    this.tableBus.$off('selectedRowsChange', this.selectRowChange);
    this.tableBus.$off('prepareEdit', this.prepareEdit);
    this.editFormBus.$on("preNextData", this.prepareNext);
    this.editFormBus.$on("prePrevData", this.preparePrev);
  },
  methods: {
    handleSearch(data) {
      console.log('search---' + JSON.stringify(data));
      //this.$store.state.user.searchModel = data;

      if (data) this.searchModel = data;
      this.$refs.currentTable.handleSearch(data);
    },
    onMainFormVisibleChanged(newValue) {
      this.showModalForm = newValue;
    },
    onMainFormSaved(newModel) {

      this.tableBus.$emit('on-data-changed');
    },
    prepareAdd() {
      this.showModalForm = true;
      this.operationMode = "create";
      this.formData = {};
      this.$route.query;
      this.formTitle = "创建";
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
        this.formTitle = "编辑信息";
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
  }
};
</script>

