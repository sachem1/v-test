<template>
    <div class="modalform">
        <Modal
            v-model="modalShow"
            title="导入"
            @on-cancel="handleUploadCancel"
            :loading="true"
            class-name="vertical-center-modal"
        >
            <Form :label-width="80" :model="formData">
                <div v-if="expendField">
                    <FormItem label="账册号" label-position="right" :label-colon="true">
                        <Col span="18">
                            <div >
                                <custom-select
                                    v-model="formData.emsNo"
                                    :url="selectUrl"
                                    :parentValue="parentValue"
                                ></custom-select>
                            </div>
                        </Col>
                    </FormItem>
                </div>
                <FormItem :label="templateType">
                    <Col span="18">
                        <div v-if="displayMul">
                            <Select
                                v-model="formData.importCode"
                                @on-change="templateChange"
                                :label-in-value="true"
                            >
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
                        <Input type="text" v-model="file.name" placeholder :disabled="true" />
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
                <Button
                    icon="ios-close-circle-outline"
                    class="btnCancel"
                    @click="handleUploadCancel"
                >取消</Button>
                <Button type="primary" icon="md-cloud-upload" @click="handleUpload">上传</Button>
            </div>
        </Modal>

        <Modal
            title="数据确认"
            @on-ok="handleSecondRequestOk"
            @on-cancel="handleSecondRequestCancel"
            :loading="true"
            v-model="secondRequestModalShow"
            class-name="vertical-center-modal"
            width="400"
        >
            {{secondRequestMessage}}
            <div slot="footer">
                <Button class="btnCancel" @click="handleSecondRequestCancel">取消</Button>
                <Button type="primary" @click="handleSecondRequestOk">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import util from "_lib/util";
import customSelect from "_com/custom-select";
export default {
    name: "it-record-import",
    components: {
        customSelect
    },
    data() {
        return {
            modalShow: this.modalImportShowStatus,
            file: {},
            importTypeList: {},
            importTepmlateType: {},
            currentTemplateSetting: {},
            secondRequestModalShow: false,
            secondRequestMessage: "",
            secondRequestData: {},
            formData: {
                importCode: "",
                emsNo: "",
                file: Object
            },
            parentValue: "",
            selectUrl: "emsrecordinfo/emsnoselect"
        };
    },
    props: {
        modalImportShowStatus: {
            default: false
        },
        templateSetting: Object,
        importAfterMethod: {
            type: Function,
            default: null
        },       
    },
    watch: {
        modalImportShowStatus: function(newVal, oldVal) {
            this.modalShow = newVal;

        },
        modalShow: function(newVal, oldVal) {
            this.$emit("update:modalImportShowStatus", newVal);
            if (newVal) {
                this.file = {};
                if(this.expendField){
                    this.formData.emsNo == ""
                    this.formData.importCode == ""
                }
            }
        }
    },
    computed: {
        displayMul: function() {
            if (!this.templateSetting) return false;
            return this.templateSetting.templateType === "multiple";
        },
        templateName: function() {
            return this.templateSetting.templateName;
        },
        templateType: function() {
            return this.displayMul ? "模版类型" : "模板名称";
        },
        displayEmsNo: function() {
            if (!this.currentTemplateSetting) return false;
            return this.currentTemplateSetting.secondRequestUrl !== undefined;
        },
          expendField: function() {
          if (!this.currentTemplateSetting) return false;
            return this.currentTemplateSetting.expendField;
        },
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
                            content:
                                "请先添加" +
                                templateSetting.importType +
                                "导入模版",
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
            let vm=this;
            debugger
            if(!vm.importTepmlateType.label){
                 vm.$Message.warning("请选择模板!");
                return ;
            }
            let templateSetting = vm.currentTemplateSetting;
            let serviceType = "service/getCustomerTemplateFileUrl";
            let data = {
                impType: templateSetting.importType,
                impCode: vm.importTepmlateType.label
            };
            if (!vm.displayMul) {
                serviceType = "service/downloadFile";
                data = {
                    url: "file/getSingleTemplate",
                    params: { fileName: vm.templateName }
                };
            }

            vm.$store
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
                            vm.$Message.info(res.data.message);
                        }
                    }
                });
        },
        handleUpload() {
            let templateSetting = this.currentTemplateSetting;
            let fileForm = new FormData();

            for (var x in templateSetting) {
                fileForm.append(x, templateSetting[x]);
            }

            fileForm.append("file", this.file);
            fileForm.append("impCode", this.formData.importCode);
            fileForm.append("emsNo", this.formData.emsNo);

            if (this.displayMul) {
                if (
                    this.formData.importCode == "" ||
                    this.formData.importCode == undefined
                ) {
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
            if (this.displayEmsNo) {
                if (
                    this.formData.emsNo === "" ||
                    this.formData.emsNo === undefined
                ) {
                    this.$Message.error("请选择账册号!");
                    return;
                }
            }

            this.importErrors = this.$store
                .dispatch({
                    // serviceName: "itRecord",
                    // type: "itRecord/ImportExcel",
                    serviceName: templateSetting.uploadFileServer,
                    type: templateSetting.uploadFileAction,
                    data: fileForm
                })
                .then(response => {
                    var res = response.data; //util.wrapResult(response);
                    this.secondRequestData = res.data;
                    if (res.success && res.data.length == 0) {
                        //如果有回调方法，自己写方法关闭
                        this.file = null;
                        if (this.importAfterMethod != null) {
                            this.importAfterMethod(res);
                        } else {
                            this.$Message.success({
                                title: "消息提示",
                                content: "导入成功"
                            });
                            this.modalShow = false;
                        }
                    } else {
                        if (!templateSetting.secondRequestUrl) {
                            var errormesg = "";
                            for (
                                let index = 0;
                                index < res.data.length;
                                index++
                            ) {
                                errormesg += res.data[index] + "\r\n";
                            }
                            // this.$Message.error(errormesg);
                            this.$Modal.error({
                                title: "消息提示",
                                content: errormesg
                            });
                        } else {

                            if (res.data.confirmType) {
                                var errList = res.data.errorList;
                                if (errList.length > 0) {
                                    var errormesg = "";
                                    for (
                                        let index = 0;
                                        index < errList.length;
                                        index++
                                    ) {
                                        errormesg += errList[index] + "\r\n";
                                    }
                                    this.secondRequestMessage = errormesg;
                                    this.secondRequestModalShow = true;
                                } else {
                                    this.$Message.success({
                                        title: "消息提示",
                                        content: "导入成功"
                                    });
                                    this.file = null;
                                }
                            }
                        }
                        if (this.importAfterMethod != null) {
                            this.importAfterMethod(false);
                        }
                    }
                });
        },
        handleUploadCancel() {
            this.modalShow = false;
            this.file = {};
            this.$emit('importCallback')
        },
        handleSecondRequest(confirmType) {
            var setting = this.currentTemplateSetting;
            let data = {
                confirmType: confirmType,
                fileName: this.secondRequestData.fileName,
                importCode: this.formData.importCode,
                emsNo: this.formData.emsNo
            };
            this.$store
                .dispatch({
                    type: setting.secondRequestUrl,
                    data: data
                })
                .then(response => {
                    // var response = res.data;
                    if (response.success) {
                        this.$Message.success({
                            title: "消息提示",
                            content: "导入成功"
                        });
                        this.secondRequestModalShow = false;
                        this.file = null;
                    } else {
                        var errormesg = "";
                        for (
                            let index = 0;
                            index < response.data.length;
                            index++
                        ) {
                            errormesg += response.data[index] + "<br/>";
                        }
                        this.$Message.error({
                            title: "消息提示",
                            content: errormesg
                        });
                    }
                });
        },
        handleSecondRequestOk() {
            this.handleSecondRequest(true);
        },
        handleSecondRequestCancel() {
            this.handleSecondRequest(false);
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

<style lang="less" scoped>
.ivu-modal {
    .ivu-modal-body {
        .ivu-form-item {
            margin-bottom: 8px;
        }
    }
}
</style>