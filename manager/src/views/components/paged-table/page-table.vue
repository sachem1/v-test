<template>
  <div>
    <Row style="padding: 10px 0">
      <div style="float: left;">
        <span v-if="!disableAdd" style="margin: 0 10px;">
          <Button type="primary" icon="android-add" @click="prepareAdd">添加</Button>
        </span>
        <Poptip
          v-if="!disableBatchDelete"
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
        <span style="margin: 0 10px;" v-if="!disableImportExport">
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
        <span style="margin: 0 10px;" v-if="!disableImportExport">
          <Button
            type="info"
            :disabled="batchDeleteButtonDisabled"
            icon="ios-download-outline"
            @click="exportFile"
          >导出</Button>
        </span>
      </div>
    </Row>
    <Table ref="currentRowTable" border stripe show-header highlight-row :columns="columns" :data="thisTableData"></Table>
  </div>
</template>

<script>

	import Vue from "vue";
export default {
  name: "page_table",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    thisTableData: {
      type: Array,
      default: () => []
    },
    disableAdd: {
      type: Boolean,
      default: false
    },
    disableBatchDelete: {
      type: Boolean,
      default: false
    },
    batchDeleteButtonDisabled: {
      type: Boolean,
      default: false
    },
    disableImportExport: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileName: "",
      height: 35,
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
  methods:{
    pageChanged (newPageIndex) {
				this.pageIndex = newPageIndex;
				this.requestData();
			},
			pageSizeChanged (newPageSize) {
				this.pageSize = newPageSize;
				this.requestData();
			},
			selectionChanged (selection) {
				this.selectedRows = selection;
			},
			dataChanged () {
				this.requestData();
      },
      	prepareAdd () {
				debugger;
				if (this.addBehaviorSetting && this.addBehaviorSetting.routeName) {
					this.$router.push({
						name: this.addBehaviorSetting.routeName,
						query: this.buildRouteParameters(this.addBehaviorSetting.routeParams)
					});
				} else {
					this.bus.$emit("prepareAdd");
				}
			},prepareImportFile (e) {
				const files = e.target.files;

				if (!files) {
					return;
				}

				this.saveLocalFile(files[0]);
			},
			saveLocalFile (file) {
				this.fileData = file;
				this.importErrors.splice(0, this.importErrors.length);
			},
			async handleImportFile () {
				let formData = new FormData();
				formData.append("file", this.fileData);
				var response = await this.$store.dispatch({
					serviceName: this.serviceName,
					type: "service/importFile",
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
			handleUploadClick () {
				this.$refs.importingFile.click();
      },
      async batchDelete () {
				debugger;
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
      importSubmitButtonDisabled: function () {
				if (this.fileData) return false;

				return true;
      },
      async exportFile () {
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
			}
  }
};
</script>

<style>
</style>