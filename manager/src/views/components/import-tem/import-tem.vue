<template>
  <div class="import-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="500"
      @on-ok="handleConfirm"
      @on-cancel="handleCancel"
      class-name="vertical-center-modal"
      scrollable
    >
      <div class="import-wrapper-header">模板下载</div>
      <div class="import-wrapper-content">
        <div class="import-wrapper-content-template">
          <ul>
            <li style="list-style:none" v-for="item in templateList" :key="item.name">
              <a :href="item.url">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="api" slot="content">
          <div
            class="ivu-upload ivu-upload-drag"
            @click="handleUploadClick"
            @drop.prevent="onUploadDrop"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
          >
            <input type="file" ref="importingFile" v-on:change="prepareImportFile" />
            <div style="padding: 2px 0px; ">
              <i
                class="ivu-icon ivu-icon-ios-cloud-upload"
                style="font-size: 52px; color: rgb(51, 153, 255);"
              ></i>
              <p>点击或将文件拖拽到这里上传</p>
            </div>
          </div>
          <div style="margin-top: 2px; overflow: hidden;">{{fileName}}</div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" icon="ios-cloud-upload-outline" @click="handleImportFile">上传</Button>
        <Button type="default" icon="ios-redo-outline" @click="handleCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "_lib";

export default {
  name: "parameter_lib",
  components: {},
  props: {
    title: String,
    visible: Boolean,
    templateParam: Object,
    uploadSetting: Object
  },
  data() {
    return {
      condition: "",
      selectedRow: {},
      currentIndex: 0,
      templateList: [
        {
          name: "核注清单模板.xlsx",
          url: "http://localhost:12329/dd"
        },
        {
          name: "核单x模板.xlsx",
          url: "http://localhost:12329/s"
        }
      ],
      fileData: null,
      importErrors: []
    };
  },
  methods: {
    handleCancel() {
      this.$emit("on-visible-change", false);
    },
    handleConfirm() {
      // this.$emit("on-return-result", d);
      this.handleCancel();
    },
    getTemplateList() {
      //此处进行后台的模板请求
      var param = this.templateParam;
    },
    handleUploadClick() {
      this.$refs.importingFile.click();
    },
    async handleImportFile() {
      let formData = new FormData();
      var importSetting = this.uploadSetting;
      formData.append("file", this.fileData);
      this.importErrors = await this.$store.dispatch({
        serviceName: importSetting.serviceName,
        type: importSetting.importUrl,
        data: formData
      });
      if (this.importErrors.data !== "") {
        this.$Message.error({ content: "导入失败！", duration: 5 });
      } else {
        this.buttonBus.$emit("requestData");
        this.$Message.success({
          content: "成功导入！",
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
    }
  },
  mounted() {
    this.getTemplateList();
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    },
    fileName: function() {
      if (this.fileData) return this.fileData.name;

      return null;
    }
  }
};
</script>

<style scoped lang='less'>
.import-wrapper {
  font-size: 13px;

  &-header {
    height: 25px;
  }
  &-content {
    margin: 8px;

    &-template {
      background: #fff;
      border: 1px dashed #a1a2a3;
      border-radius: 4px;
      margin-bottom: 8px;
    }
  }
}
</style>