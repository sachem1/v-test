<template>
  <Row style="padding: 5px 0">
    <div style="float: left;">
      <span v-if="displayAdd" style="margin: 0 10px;">
        <Button type="primary" icon="android-add" @click="prepareAdd">添加</Button>
      </span>
      <span v-if="displayEdit" style="margin: 0 10px;">
        <Button
          type="primary"
          :disabled="updateButtonDisabled"
          icon="android-add"
          @click="prepareEdit"
        >编辑</Button>
      </span>
      <Poptip
        v-if="displayBatchDelete"
        confirm
        title="您确定要批量删除数据吗?"
        placement="bottom"
        @on-ok="batchDelete"
      >
        <span style="margin: 0 10px;">
          <Button
            ref="batchDeleteButton"
            :disabled="batchDeleteButtonDisabled"
            type="primary"
            icon="close"
          >删除</Button>
        </span>
      </Poptip>
      <span style="margin: 0 10px;" v-if="displayImportExport">
        <Poptip placement="bottom" width="400">
          <Button type="info" icon="ios-cloud-upload-outline">导入</Button>
          <div class="api" slot="content">
            <div
              class="ivu-upload ivu-upload-drag"
              @click="handleUploadClick"
              @drop.prevent="onUploadDrop"
              @dragover.prevent="dragOver = true"
              @dragleave.prevent="dragOver = false"
            >
              <input type="file" ref="importingFile" v-on:change="prepareImportFile" />
              <div style="padding: 10px 0px; height: 100px;">
                <i
                  class="ivu-icon ivu-icon-ios-cloud-upload"
                  style="font-size: 52px; color: rgb(51, 153, 255);"
                ></i>
                <p>点击或将文件拖拽到这里上传</p>
              </div>
            </div>
            <div style="margin-top: 10px; overflow: hidden;">
              {{fileName}}
              <Button
                type="primary"
                size="small"
                @click="handleImportFile"
                :disabled="importSubmitButtonDisabled"
                style="float: right"
              >确定</Button>
            </div>
            <Alert
              type="error"
              v-for="err in importErrors"
              :key="err.index"
              style="margin-top: 5px;"
            >第{{err.index+1}}行导入失败：{{err.errorMessage}}</Alert>
          </div>
        </Poptip>
      </span>
      <span style="margin: 0 10px;" v-if="displayImportExport">
        <Button
          type="info"
          :disabled="batchDeleteButtonDisabled"
          icon="ios-download-outline"
          @click="exportFile"
        >导出</Button>
      </span>
    </div>
  </Row>
</template>

<script>
export default {
  name: "GeneralButton",
  data() {
    return {
      fileData: null,
      importErrors: []
    };
  },
  props: {
    displayAdd: {
      type: Boolean
    },
    displayEdit: {
      type: Boolean
    },
    displayBatchDelete: {
      type: Boolean
    },
    displayImportExport: {
      type: Boolean
    },
    displayEdit: {
      type: Boolean
    },
    selectedRows: { type: Array },
    buttonHandleSetting: Object,
    buttonBus: Object,
    routerSetting: Object
  },
  methods: {
    prepareAdd() {
      debugger;
      if (this.routerSetting && this.routerSetting.routeName) {
        this.$router.push({
          name: this.routerSetting.routeName,
          query: this.buildRouteParameters(this.routerSetting.routeParams)
        });
      } else {
        this.buttonBus.$emit("prepareAdd");
      }
      this.$Message.success("新增");
    },
    prepareEdit() {
      this.buttonBus.$emit("prepareEdit");
      this.$Message.success("编辑");
    },
    buildRouteParameters(routeParams) {
      var parameters = {};
      if (routeParams) {
        var vm = this;
        routeParams.forEach(routeParam => {
          parameters[routeParam.keyName] =
            vm.$route.query[routeParam.valueField] || routeParam.defaultValue;
        });
      }
      return parameters;
    },
    async batchDelete() {
      if (this.selectedRows.length == 0) return;

      var selectedIds = this.selectedRows.map(item => {
        if (item.id) {
          return item.id;
        } else {
          return item.Id;
        }
      });
      debugger;
      var vm = this;
      var deleteSetting = vm.buttonHandleSetting;
      await vm.$store.dispatch({
        serviceName: deleteSetting.serviceName,
        type: deleteSetting.deleteUrl,
        data: { ids: selectedIds }
      });
      // vm.requestData();
      // 触发table 查询
      vm.$Message.success({ content: "已成功删除！", duration: 5 });
    },
    handleUploadClick() {
      this.$refs.importingFile.click();
    },
    async handleImportFile() {
      let formData = new FormData();
      var importSetting = this.buttonHandleSetting;
      formData.append("file", this.fileData);
      var response = await this.$store.dispatch({
        serviceName: importSetting.serviceName,
        type: importSetting.importUrl,
        data: formData
      });
      this.importErrors = response.data.result.errorDetails;

      if (response.data.result.failCount > 0) {
        this.$Message.error({ content: "导入失败！", duration: 5 });
      } else {
        this.requestData();
        this.$Message.success({
          content: "成功导入" + response.data.result.successCount + "行！",
          duration: 5
        });
        this.fileData = null;
        this.$refs.importingFile.value = null;
      }
    },
    prepareImportFile(e) {
      const files = e.target.files;

      if (!files) {
        return;
      }

      this.saveLocalFile(files[0]);
    },
    saveLocalFile(file) {
      this.fileData = file;
      this.importErrors.splice(0, this.importErrors.length);
    },
    async exportFile() {
      if (this.selectedRows.length == 0) return;

      var selectedIds = this.selectedRows.map(item => {
        if (item.id) {
          return item.id;
        } else {
          return item.Id;
        }
      });

      var vm = this;
      var exportSetting = vm.buttonHandleSetting;
       
      var response = await vm.$store.dispatch({        
        serviceName: exportSetting.serviceName,
        type: exportSetting.exportUrl,
        data: { ids: selectedIds }
      });
      debugger;
      var headers = response.headers;
      var blob = new Blob([response.data], { type: headers["content-type"] });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = headers["content-disposition"]
        .split(";")[1]
        .trim()
        .replace("filename=", "");
      link.click();     
    }
  },
  created() {
    //this.bus.$on('prepareAdd',prepareAdd);
  },
  computed: {
    rows: function() {
      var result = [];
      if (this.selectedRows == undefined) return result;

      this.selectedRows.forEach(item => {
        result.push(item);
      });
      return result;
    },
    updateButtonDisabled: function() {
      return this.rows.length !== 1;
    },
    batchDeleteButtonDisabled: function() {
      return this.rows == null || this.rows.length == 0;
    },
    importSubmitButtonDisabled: function() {
      if (this.fileData) return false;

      return true;
    },
    fileName: function() {
      if (this.fileData) return this.fileData.name;

      return null;
    }
  },
  watch: {
    selectedRows: function(newValue) {
      this.selectedRows = newValue;
      console.log("选中了:" + JSON.stringify(newValue));
    }
  }
};
</script>

<style>
</style>