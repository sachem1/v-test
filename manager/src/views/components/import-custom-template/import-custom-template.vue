<template>
  <div class="modalform">
    <Modal
      v-model="modalShow"
      title="导入"
      @on-cancel="handleUploadCancel"
      :loading="true"
      class-name="vertical-center-modal"
    >
      <Form :label-width="80">
        <FormItem :label="templateType">
          <Col span="18">
            <div v-if="displayMul">
              <Select v-model="importCode" @on-change="templateChange" :label-in-value="true">
                <Option
                  v-for="(item,key) in importTypeList"
                  :value="item.impCode"
                  :key="key"
                >{{ item.impCode }}</Option>
              </Select>
            </div>
            <div v-else>{{templateName}}</div>
          </Col>
          <Col span="6" style="text-align: right;">
            <Button type="primary" @click="downloadTemplate()" ghost>
              <Icon type="ios-cloud-upload-outline" />下载模板
            </Button>
          </Col>
        </FormItem>
        <FormItem label="文件选择">
          <Col span="18">
            <Input type="text" v-model="file.name" placeholder />
          </Col>
          <Col span="6" style="text-align: right;">
            <Upload :before-upload="handleUploadBefore" :format="['xlsx','xls']" action>
              <Button type="primary" icon>
                <Icon type="md-cloud-upload" />选择文件
              </Button>
            </Upload>
          </Col>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleUploadCancel">取消</Button>
        <Button @click="handleUpload">上传</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "it-record-import",
  data() {
    return {
      modalShow: this.modalImportShowStatus,
      file: {},
      importTypeList: {},
      importCode: "",
      importTepmlateType: {},
      currentTemplateSetting: {}
    };
  },
  props: {
    modalImportShowStatus: {
      default: false
    },
    templateSetting: Object
  },
  watch: {
    modalImportShowStatus: function(newVal, oldVal) {
      this.modalShow = newVal;
    },
    modalShow: function(newVal, oldVal) {
      this.$emit("update:modalImportShowStatus", newVal);
      if (newVal) {
        this.file = {};
      }
    }
  },
  computed: {
    displayMul: function() {
      return this.templateSetting.templateType === "multiple";
    },
    templateName: function() {
      return this.templateSetting.templateName;
    },
    templateType: function() {
      return this.displayMul ? "模版类型" : "模板名称";
    }
  },
  methods: {
    handleUploadBefore(file) {
      this.file = file;
      return false;
    },
    handleImportType() {
      let templateSetting = this.currentTemplateSetting;
      this.$store
        .dispatch({
          type: "service/getImportTypeList",
          data: { importType: templateSetting.importType }
        })
        .then(res => {
          if (res.length == 0) {
            this.$Message.error({
              content: "请先添加" + templateSetting.importType + "导入模版",
              duration: 5
            });

            this.modalShow = false;
          } else {
            this.file = {};
            this.importTypeList = res;
          }
        });
    },
    templateChange(e) {
      this.importTepmlateType = e;
    },
    downloadTemplate() {
      let templateSetting = this.currentTemplateSetting;
      let serviceType = "service/getCustomerTemplateFileUrl";
      let data = {
        impType: templateSetting.importType,
        impCode: this.importTepmlateType.label
      };
      if (!this.displayMul) {
        serviceType = "service/downloadFile";
        data = {
          url: "file/getSingleTemplate",
          params: { fileName: this.templateName }
        };
      }

      this.$store
        .dispatch({
          type: serviceType,
          data: data
        })
        .then(res => {
          if (res) {
            if (res.data.success) {
              let url = API_BASE_URL + res.data.data;
              let aTag = document.createElement("a");
              aTag.href = url;
              aTag.click();
              URL.revokeObjectURL(aTag.href);
            } else {
              this.$Message.info(res.data.message);
            }
          }
        });
    },
    handleUpload() {
      let templateSetting = this.currentTemplateSetting;
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("impCode", this.importCode);
      if (this.displayMul) {
        if (this.importCode == "" || this.importCode == undefined) {
          this.$Message.error({
            content: "请选择导入的模版类型！",
            duration: 5
          });
          return;
        }
      }
      if (!this.file.name) {
        this.$Message.error({
          content: "请选择需要导入的文件",
          duration: 5
        });
        return;
      }

      this.importErrors = this.$store
        .dispatch({
          // serviceName: "itRecord",
          // type: "itRecord/ImportExcel",
          serviceName: templateSetting.uploadFileServer,
          type: templateSetting.uploadFileAction,
          data: formData
        })
        .then(res => {
          if (res.data.success && res.data.data.length == 0) {
            this.$Modal.success({
              title: "消息提示",
              content: "导入成功"
            });
            this.modalShow = false;
          } else {
            var errormesg = "";
            for (let index = 0; index < res.data.data.length; index++) {
              errormesg += res.data.data[index] + "<br/>";
            }
            // this.$Message.error(errormesg);
            this.$Modal.error({
              title: "消息提示",
              content: errormesg
            });
          }
        });
    },
    handleUploadCancel() {
      this.modalShow = false;
      this.file = {};
    }
  },
  mounted() {
    this.currentTemplateSetting = this.templateSetting;
    if (this.displayMul) {
      this.handleImportType();
    }
  }
};
</script>
