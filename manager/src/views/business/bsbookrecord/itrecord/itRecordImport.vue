<template>
    <div class="modalform">
        <Modal v-model="modalImportShow" title="导入" @on-cancel="handleUploadCancel" :loading="true">
            <Form :label-width="80">
                <FormItem label="模版类型">
                    <Col span="18">
                        <Select
                            v-model="importCode"
                            @on-change="templateChange"
                            :label-in-value="true"
                        >
                            <Option
                                v-for="(item,key) in importTypeList"
                                :value="item.impCode"
                                :key="key"
                            >{{ item.impCode }}</Option>
                        </Select>
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
                <Button type="primary" @click="handleUpload">上传</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: "it-record-import",
    data() {
        return {
            modalImportShow: false,
            file: {},
            importTypeList: {},
            importType: "业务单明细",
            importCode: "",
            importTepmlateType: {},
        };
    },
    props: {
        modalShow: {
            default: true
        }
    },
    mounted() {
        handleUpload();
        console.log(加载);
    },
    methods: {
        handleUploadBefore(file) {
            this.file = file;
            return false;
        },
        handleImportType() {
            this.$store
                .dispatch({
                    type: "itRecord/getImportTypeList",
                    data: { importType: this.importType }
                })
                .then(res => {
                    if (res.length == 0) {
                        this.$Message.error({
                            content: "请先添加" + this.importType + "导入模版",
                            duration: 5
                        });

                        this.modalImportShow = false;
                    } else {
                        // this.importCode = "";
                        this.file = {};
                        this.importTypeList = res;
                    }
                });
        },
        templateChange(e) {
            this.importTepmlateType = e;
        },
        downloadTemplate() {
            this.$store
                .dispatch({
                    type: "itRecord/GetCustomerTemplateFileUrl",
                    data: {
                        impType: this.importType,
                        impCode: this.importTepmlateType.label
                    }
                })
                .then(res => {
                    if (res.data.success) {
                        let url = API_BASE_URL + res.data.data;
                        let aTag = document.createElement("a");
                        aTag.href = url;
                        aTag.click();
                        URL.revokeObjectURL(aTag.href);
                    } else {
                        this.$Message.info(res.data.message);
                    }
                });
        },
        handleUpload() {
            let formData = new FormData();
            formData.append("file", this.file);
            formData.append("impCode", this.importCode);

            if (this.importCode == "" || this.importCode == undefined) {
                this.$Message.error({
                    content: "请选择导入的模版类型！",
                    duration: 5
                });
            }
            if (this.file == null) {
                this.$Message.error({
                    content: "请选择需要导入的文件",
                    duration: 5
                });
            }

            this.importErrors = this.$store
                .dispatch({
                    serviceName: "itRecord",
                    type: "itRecord/ImportExcel",
                    data: formData
                })
                .then(res => {
                    if (res.data.success && res.data.data.length == 0) {
                        this.$Modal.success({
                            title: "消息提示",
                            content: "导入成功"
                        });
                        this.modalImportShow = false;
                    } else {
                        var errormesg = "";
                        for (
                            let index = 0;
                            index < res.data.data.length;
                            index++
                        ) {
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
            this.file = {};
        },
    }
};
</script>
