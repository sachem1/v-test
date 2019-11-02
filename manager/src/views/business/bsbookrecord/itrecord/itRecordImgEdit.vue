
<template>
    <div class="modal-form-wrapper">
        <Modal
            :title="title"
            :value="visibleForBind"
            width="800"
            :mask-closable="false"
            @on-ok="prepareSubmit"
            @on-cancel="prepareCancel"
            class-name="vertical-center-modal"
            scrollable
        >
            <Form
                ref="mainForm"
                :model="editForm"
                label-position="left"
                :label-width="80"
                :rules="validateRules"
                :show-message="false"
            >
                <Row>
                    <Col :sm="24" :md="24" :lg="12">
                        <FormItem label="商品序号">
                            <Input v-model="editForm.gNo" disabled />
                        </FormItem>
                    </Col>
                    <Col :sm="24" :md="24" :lg="12">
                        <FormItem label="商品编码" prop="codeT">
                            <Input v-model="editForm.codeT" :class="ivuRequired" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :sm="24" :md="24" :lg="12">
                        <FormItem label="商品编码" prop="gName">
                            <Input v-model="editForm.gName" :class="ivuRequired" />
                        </FormItem>
                    </Col>
                    <Col :sm="24" :md="24" :lg="12">
                        <FormItem label="变成次数">
                            <Input v-model="editForm.modifyTimes" disabled />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :sm="24" :md="24" :lg="12">
                        <FormItem label="修改标志" prop="modifyMark">
                            <bascode-select
                                v-model="editForm.modifyMark"
                                parentValue="ModifyMark"
                                :currentSelectVal="editForm.modifyMark"
                                :hasAll="false"
                                :class="ivuRequired"
                            ></bascode-select>
                        </FormItem>
                    </Col>
                    <Col :sm="24" :md="24" :lg="12">
                        <FormItem label="备注">
                            <Input v-model="editForm.note" placeholder />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div style="text-align: center; " slot="footer">
                <modal-button ref="currentButton"></modal-button>
            </div>

            <message-modal
                :title="messagetitle"
                :visible="displayMessage"
                :messages="messageArr"
                @on-visible-change="onMessageModalChanged"
            ></message-modal>
        </Modal>
    </div>
</template>


<script>
import util from "_lib/util";
import Vue from "vue";
import modalButton from "_com/modal-button";
import messageModal from "_com/modal/message-modal";
import bascodeSelect from "_com/custom-select/basic-info-select";
export default {
    name: "filelabNotab",
    components: {
        modalButton,
        messageModal,
        bascodeSelect
    },
    props: {
        className: String,
        visible: Boolean,
        operationMode: String,
        title: String,
        autoClose: {
            type: Boolean,
            default: false
        },
        editFormBus: Object,
        mainForm: {},
        headId: 0
    },
    data() {
        return {
            ivuRequired: "ivu-required",
            buttonBus: new Vue(),
            isDisabled: true,
            IsDisabled: true,
            messagetitle: "多个消息",
            displayMessage: false,
            messageArr: [],
            editForm: this.mainForm,
            validateRules: {
                codeT: { required: true, trigger: "blur", message: "" },
                gName: { required: true, trigger: "blur", message: "" },
                modifyMark: { required: true, message: "", trigger: "change" }
            },
            displayDel: false,
            showModalFormBind: false,
            showSecondLayer: false
        };
    },
    methods: {
        getEditModel() {
            this.$store
                .dispatch({
                    type: "itRecord/getImgListModel",
                    data: { id: this.editForm.id },
                    serviceName: "itRecord"
                })
                .then(res => {
                    this.editForm = res.data;
                })
                .catch(err => {
                    this.$Message.error("获取数据异常");
                });
        },
        onMessageModalChanged(newValue) {
            this.displayMessage = newValue;
        },
        prepareAdd() {
            this.operationMode = "create";
            this.editForm.id = 0;
            this.getEditModel();
        },
        prepareDel() {
            var id = this.editForm.id;
            if (!id || id == 0) {
                this.$Message.info("请选择需要删除的数据!");
                return;
            }
            let ids = [id];
            this.$store
                .dispatch({
                    type: "itRecord/deleteImgListHead",
                    data: { ids: ids },
                    serviceName: "itRecord"
                })
                .then(res => {
                    this.$Message.error("删除成功!");
                    if (this.autoClose) {
                        this.prepareCancel();
                    }
                })
                .catch(err => {
                    this.$Message.error("删除失败!");
                });
        },
        preparePrev() {
            this.editFormBus.$emit("prePrevData");
        },
        prepareNext() {
            this.editFormBus.$emit("preNextData");
        },
        prepareCancel() {
            this.$emit("on-visible-change", false);
            this.$emit("on-model-change", this.editForm);
        },
        prepareSubmit() {
            this.$refs.mainForm.validate(valid => {
                if (valid) {
                    if (this.editForm.id == 0) {
                        this.editForm.emsId = this.headId;
                    }
                    this.$store
                        .dispatch({
                            type: "itRecord/saveImgListModel",
                            data: this.editForm
                        })
                        .then(res => {
                            if (res.data > 0) {
                                this.$Message.success(
                                    (this.editForm.id > 0 ? "修改" : "添加") +
                                        "成功!"
                                );
                                if (this.autoClose) {
                                    this.prepareCancel();
                                }
                            } else {
                                this.$Modal.error({
                                    title: "错误提示",
                                    content: res.message
                                });
                            }
                        })
                        .catch(error => {
                            this.$Message.error("出现异常！");
                        });
                }
            });
        }
    },
    computed: {
        visibleForBind: function() {
            return this.visible;
        }
    },
    watch: {
        "mainForm.id": {
            handler(val, oldval) {
                this.editForm.id = val;
                this.getEditModel();
            },
            immediate: true
        }
    }
};
</script>
