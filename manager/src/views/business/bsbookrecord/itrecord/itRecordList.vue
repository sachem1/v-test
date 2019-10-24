<template>
    <div class="list-wrapper">
        <div class="list-search">
            <search-items @searchList="handleSearch"></search-items>
        </div>
        <div class="button-wrapper">
            <div class="generalButton">
                <Row style="padding: 5px 0">
                    <div style="float: left;">
                        <span style="margin: 0 2px;">
                            <Button type="primary" icon="md-add" @click="prepareAdd">添加</Button>
                        </span>
                        <span style="margin: 0 2px;">
                            <Button
                                type="info"
                                icon="md-cloud-download"
                                @click="handleImport"
                                ref="modalShow"
                            >导入</Button>
                        </span>
                    </div>
                </Row>
            </div>
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
                :statisticsItem="statisticsItem"
            ></paged-table>
        </div>
        <div class="modalform">
            <eidt-form
                :autoClose="autoClose"
                :visible="showModalForm"
                :operationMode="operationMode"
                :editForm="formData"
                :title="formTitle"
                @on-visible-change="onMainFormVisibleChanged"
                @on-model-change="onMainFormSaved"
            ></eidt-form>
        </div>
        <div class="modalform">
            <Modal
                v-model="modalImportShow"
                title="导入"
                @on-cancel="handleUploadCancel"
                :loading="true"
            >
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
                            <Upload
                                :before-upload="handleUploadBefore"
                                :format="['xlsx','xls']"
                                action
                            >
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
    </div>
</template>

<script>
import Vue from "vue";
import searchItems from "_vbue/bsbookrecord/itrecord/itRecordSearch.vue";
// import generalButton from "_com/general-button";
import pagedTable from "_com/paged-table";
import eidtForm from "_vbue/test/userForm.vue";
import itRecordImport from "_vbue/bsbookrecord/itrecord/itRecordImport.vue";

export default {
    name: "it-record-list",
    components: {
        searchItems,
        // generalButton,
        pagedTable,
        eidtForm,
        itRecordImport
    },
    data() {
        return {
            modalImportShow: false,
            file: {},
            importTypeList: {},
            importType: "业务单明细",
            importCode: "",
            importTepmlateType: {},
            // 按钮
            buttonBus: new Vue(),
            displayAdd: true,
            displayEdit: true,
            displayBatchDelete: true,
            displayImportExport: true,
            addBehaviorSetting: {
                // 配置跳转新页面
                routeName: "userFormTag",
                routeParams: [
                    {
                        keyName: "id",
                        valueField: "Id"
                    }
                ]
            },
            formData: {},
            template: {},
            // table
            selectRows: [], // 表格选中行
            tableBus: new Vue(),
            serviceName: "itRecord",
            listUrl: "itRecord/getItRecordList",
            searchModel: {},
            searchItems: [],
            statisticsItem: {},
            // 是否有统计
            hasShowSummary: false,
            columns: [
                { type: "selection", width: 60, align: "center" },
                { title: "序号", width: 70, key: "rowNumber" },
                { title: "申请流水号", width: 150, key: "cop_ems_no" },
                { title: "预录入统一编号", width: 170, key: "pre_ems_no" },
                { title: "企业内部编号", width: 160, key: "ems_id" },
                { title: "档案库编号", width: 150, key: "ems_no" },
                { title: "申报单位类型", width: 150, key: "declare_er_typecn" },
                { title: "申报类型", width: 110, key: "declare_typecn" },
                { title: "数据状态", width: 110, key: "declare_statuscn" },
                { title: "加工单位名称", width: 170, key: "owner_name" },
                { title: "经营单位名称", width: 170, key: "trade_name" },
                { title: "申报日期", width: 180, key: "declare_date" },
                { title: "结束有效期", width: 180, key: "end_date" },
                { title: "批准证编号", width: 180, key: "ems_appr_no" },
                { title: "创建日期", width: 180, key: "create_time" },
                { title: "创建人", width: 110, key: "create_user" }
            ],
            TableData: [],
            // add ,edit
            autoClose: true,
            showModalForm: false,
            showChildModalForm: false,
            modal_loading: false,
            operationMode: null,
            entityName: "",
            formTitle: ""
        };
    },
    created() {},
    beforeDestroy() {},
    methods: {
        handleImport() {
            this.handleImportType();
            this.modalImportShow = true;
        },
        // handleUploadBefore(file) {
        //     this.file = file;
        //     return false;
        // },
        // handleImportType() {
        //     this.$store
        //         .dispatch({
        //             type: "itRecord/getImportTypeList",
        //             data: { importType: this.importType }
        //         })
        //         .then(res => {
        //             if (res.length == 0) {
        //                 this.$Message.error({
        //                     content: "请先添加" + this.importType + "导入模版",
        //                     duration: 5
        //                 });

        //                 this.modalImportShow = false;
        //             } else {
        //                 // this.importCode = "";
        //                 this.file = {};
        //                 this.importTypeList = res;
        //             }
        //         });
        // },
        // templateChange(e) {
        //     this.importTepmlateType = e;
        // },
        // downloadTemplate() {
        //     this.$store
        //         .dispatch({
        //             type: "itRecord/GetCustomerTemplateFileUrl",
        //             data: {
        //                 impType: this.importType,
        //                 impCode: this.importTepmlateType.label
        //             }
        //         })
        //         .then(res => {
        //             if (res.data.success) {
        //                 let url = API_BASE_URL + res.data.data;
        //                 let aTag = document.createElement("a");
        //                 aTag.href = url;
        //                 aTag.click();
        //                 URL.revokeObjectURL(aTag.href);
        //             } else {
        //                 this.$Message.info(res.data.message);
        //             }
        //         });
        // },
        // handleUpload() {
        //     let formData = new FormData();
        //     formData.append("file", this.file);
        //     formData.append("impCode", this.importCode);

        //     if (this.importCode == "" || this.importCode == undefined) {
        //         this.$Message.error({
        //             content: "请选择导入的模版类型！",
        //             duration: 5
        //         });
        //     }
        //     if (this.file == null) {
        //         this.$Message.error({
        //             content: "请选择需要导入的文件",
        //             duration: 5
        //         });
        //     }

        //     this.importErrors = this.$store
        //         .dispatch({
        //             serviceName: "itRecord",
        //             type: "itRecord/ImportExcel",
        //             data: formData
        //         })
        //         .then(res => {
        //             if (res.data.success && res.data.data.length == 0) {
        //                 this.$Modal.success({
        //                     title: "消息提示",
        //                     content: "导入成功"
        //                 });
        //                 this.modalImportShow = false;
        //             } else {
        //                 var errormesg = "";
        //                 for (
        //                     let index = 0;
        //                     index < res.data.data.length;
        //                     index++
        //                 ) {
        //                     errormesg += res.data.data[index] + "<br/>";
        //                 }
        //                 // this.$Message.error(errormesg);
        //                 this.$Modal.error({
        //                     title: "消息提示",
        //                     content: errormesg
        //                 });
        //             }
        //         });
        // },
        // handleUploadCancel() {
        //     this.file = {};
        // },
        handleSearch(data, oname) {
            this.$store.state.itRecord.searchModel = data;
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
            this.showModalForm = true;
            this.operationMode = "create";
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
                this.formTitle = "编辑";
            }
        },
        selectRowChange(selectedRow) {
            this.selectRows = selectedRow;
        }
    },
    mounted() {
        this.handleSearch();
        // this.$refs.currentButton.parpareTemplate();
    }
};
</script>

<style lang='less'>
.demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    //background: #fff;
}
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}
</style>