<template>
    <div class="list-wrapper">
        <div class="list-search">
            <div>
                <div class="search-header">
                    <Row>
                        <Col span="12">
                            <span style="margin-left: 16px;display:block;font-weight:600">查询</span>
                        </Col>
                        <Col span="12">
                            <span @click="handleSeachTitleClick()" class="search-title-ico">
                                <Icon
                                    style="font-size:24px;font-weight:600;"
                                    type="md-arrow-dropdown"
                                ></Icon>
                            </span>
                        </Col>
                    </Row>
                </div>
                <div class="search-content">
                    <Card>
                        <Form ref="searchModel" :label-width="100" :model="searchModel" inline>
                            <Row type="flex" style="margin-left: -12px; margin-right: -12px;">
                                <i-col :sm="24" :md="12" :lg="8">
                                    <FormItem label="商品编码">
                                        <Input
                                            type="text"
                                            v-model="searchModel.GNo"
                                            placeholder="商品编码"
                                        />
                                    </FormItem>
                                </i-col>
                                <i-col :sm="24" :md="12" :lg="8">
                                    <FormItem label="商品名称">
                                        <Input
                                            type="text"
                                            v-model="searchModel.GName"
                                            placeholder="商品名称"
                                        />
                                    </FormItem>
                                </i-col>
                                <i-col
                                    class="ivu-text-right"
                                    style="padding-left: 12px; padding-right: 12px;"
                                    :sm="{ span: 24, offset: 1 }"
                                    :md="{ span: 12, offset: 2 }"
                                    :lg="{ span: 8, offset: 0 }"
                                >
                                    <FormItem class="searchButton">
                                        <Button
                                            icon="md-search"
                                            type="primary"
                                            @click="handleSearch()"
                                        >查询</Button>
                                        <Button
                                            icon="md-redo"
                                            class="btn-default btnCancel"
                                            @click="handleReset()"
                                        >重置</Button>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
        <div class="button-wrapper">
            <div class="generalButton">
                <Row style="padding: 8px 0px">
                    <div style="float: left;">
                        <span style="margin: 0 2px;">
                            <Button type="primary" icon="md-add" @click="prepareAdd">添加</Button>
                        </span>
                        <span style="margin: 0 2px;">
                            <Button
                                type="primary"
                                :disabled="updateButtonDisabled"
                                icon="md-create"
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
                            <span>
                                <Button
                                    ref="batchDeleteButton"
                                    :disabled="deleteButtonDisabled"
                                    type="primary"
                                    icon="md-trash"
                                >删除</Button>
                            </span>
                        </Poptip>
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
            <it-record-img-edit
                :autoClose="autoClose"
                :visible="showModalForm"
                :operationMode="operationMode"
                :mainForm="formData"
                :title="formTitle"
                @on-visible-change="onMainFormVisibleChanged"
                @on-model-change="onMainFormSaved"
                :editFormBus="editFormBus"
                :headId="this.headId"
            ></it-record-img-edit>
        </div>
        <import-custom-template
            :modalImportShowStatus.sync="modalImportShow"
            :templateSetting="templateSetting"
            :importAfterMethod="handleImportAfterMethod"
            ref="importCustomTemplate"
        ></import-custom-template>
    </div>
</template>

<script>
import Vue from "vue";
import pagedTable from "_com/paged-table";
import importCustomTemplate from "_com/import-template";
import itRecordImgEdit from "_vbue/bsbookrecord/itrecord/itRecordImgEdit.vue";

export default {
    name: "it-record-list",
    components: {
        pagedTable,
        importCustomTemplate,
        itRecordImgEdit
    },
    data() {
        return {
            //查询开始
            displayAccordion: "",
            display: false,
            displayName: "展开",
            IconClass: "md-arrow-dropdown",
            searchModel: {
                GNo: "",
                GName: "",
                EmsID: this.headId
            },
            //查询结束
            //导入开始
            modalImportShow: false,
            templateSetting: {
                importType: "", //表示多个模板类型
                uploadFileServer: "itRecord",
                uploadFileAction: "itRecord/ImportTradeListExcel",
                templateType: "single", //multiple 表示多个模板 single 表示单个模板,如果单个模板需要给模板名称
                templateName: "TradeGoodsTemplete.xls", //下载单个模板的名字,
                headId: this.headId,
                importType: "IMG"
            },
            //导入结束
            // 按钮
            buttonBus: new Vue(),
            updateButtonDisabled: true, //更新按钮显示状态
            deleteButtonDisabled: true, //删除按钮显示状态
            displayBatchDelete: true, //批量删除提示显示状态
            addBehaviorSetting: {
                // 配置跳转新页面
                routeName: "",
                routeParams: [
                    {
                        keyName: "id",
                        valueField: "Id"
                    }
                ]
            },
            template: {},
            // table
            selectRows: [], // 表格选中行
            tableBus: new Vue(),
            serviceName: "itRecord",
            listUrl: "itRecord/getTradeImgList",
            searchItems: [],
            // 是否有统计
            hasShowSummary: false,
            statisticsItem: {},
            columns: [
                { type: "selection", width: 60, align: "center" },
                { title: "序号", width: 70, key: "g_NO" },
                { title: "商品编码", width: 150, key: "codE_T" },
                { title: "商品名称", width: 170, key: "g_NAME" },
                { title: "修改标志", width: 160, key: "modifY_MARK" },
                { title: "变更次数", width: 150, key: "modifY_TIMES" },
                { title: "备注", width: 150, key: "note" }
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
            formData: {},
            editFormBus: new Vue()
        };
    },
    props: {
        headId: {
            default: 0
        }
    },
    watch: {
        headId: function(newVal, oldVal) {
            this.handleSearch();
        }
    },
    created() {
        this.tableBus.$on("selectedRowsChange", this.selectRowChange);
        this.tableBus.$on("prepareEdit", this.prepareEdit);
        this.editFormBus.$on("preNextData", this.prepareNext);
        this.editFormBus.$on("prePrevData", this.preparePrev);
    },
    beforeDestroy() {
        this.tableBus.$off("selectedRowsChange", this.selectRowChange);
        this.tableBus.$off("prepareEdit", this.prepareEdit);
        this.editFormBus.$off("preNextData", this.prepareNext);
        this.editFormBus.$off("prePrevData", this.preparePrev);
    },
    methods: {
        handleSeachTitleClick() {
            if (this.display) {
                this.displayName = "展开";
                this.display = false;
                this.IconClass = "md-arrow-dropup";
            } else {
                this.display = true;
                this.displayName = "收起";
                this.IconClass = "md-arrow-dropdown";
            }
        },
        handleSearch(data, oname) {
            if (this.headId == 0) {
                return;
            }
            this.searchModel.EmsID = this.headId;
            this.$refs.currentTable.handleSearch(this.searchModel);
        },

        onMainFormVisibleChanged(newValue) {
            this.showModalForm = newValue;
        },
        onMainFormSaved(newModel) {
            this.tableBus.$emit("on-data-changed");
        },
        prepareAdd() {
            if (this.headId == 0) {
                this.$Modal.error({
                    title: "错误提示",
                    content: "请先添加表头数据！"
                });
                return;
            }
            this.showModalForm = true;
            this.operationMode = "create";
            this.formData = {};
            this.$route.query;
            this.formTitle = "创建料件";
        },
        prepareEdit(payload) {
            if (this.selectRows.length > 0) {
                this.formData = this.selectRows[0];
            } else {
                this.formData = JSON.parse(payload);
            }

            if (this.addBehaviorSetting && this.addBehaviorSetting.routeName) {
                this.$router.push({
                    name: this.addBehaviorSetting.routeName,
                    query: { userForm: this.formData }
                });
            } else {
                this.operationMode = "edit";
                this.showModalForm = true;
                this.formTitle = "编辑料件信息";
            }
        },
        prepareNext() {
            let data = this.$refs.currentTable.getNextData();
            this.formData = data;
        },
        preparePrev() {
            let data = this.$refs.currentTable.getPrevData();
            this.formData = data;
        },
        selectRowChange(selectedRow) {
            this.selectRows = selectedRow;
        },
        batchDelete() {
            var selectedIds = this.selectRows.map(item => {
                return item.id;
            });

            if (selectedIds.length == 0) {
                this.$Message.error("请选择需要删除的行!");
                return;
            } else {
                this.$store
                    .dispatch({
                        type: "itRecord/deleteImgListHead",
                        data: { ids: selectedIds.join(",") }
                    })
                    .then(res => {
                        if (res > 0) {
                            this.$Message.success("删除成功");
                            this.handleSearch();
                        } else {
                            this.$Message.error("删除失败");
                        }
                    })
                    .catch(error => {
                        this.$Message.error("操作异常");
                    });
            }
        },
        handleImport() {
            this.templateSetting.headId = this.headId;

            if (this.templateSetting.headId == 0) {
                this.$Modal.error({
                    title: "错误提示",
                    content: "请先添加表头数据！"
                });
            } else {
                this.modalImportShow = true;
            }
        },
        handleImportAfterMethod(importResult){
            if (importResult.success) {
                this.$Message.success("导入成功");
                this.modalImportShow = false;
                this.handleSearch();
            }  
        },
        selectRowChange(selectedRow) {
            this.selectRows = selectedRow;
            this.updateButtonDisabled = this.selectRows.length !== 1;
            this.deleteButtonDisabled = !(this.selectRows.length > 0);
        }
    },
    mounted() {
        this.handleSearch();
    }
};
</script>