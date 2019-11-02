<template>
    <div class="form-multab-wrapper">
        <Card>
            <div class="form-multab-wrapper-header-button">
                <Button type="primary" icon="md-add">新增</Button>
                <Button type="info" icon="md-print">删除</Button>
                <Button type="info" icon="md-print">自动提取</Button>
                <Button type="info" icon="md-print">数据回填</Button>
                <Button type="info" icon="md-print">EXCEL导出</Button>
                <Button type="info" icon="md-print">报文发送</Button>
                <Button type="info" icon="md-print">打印</Button>
                <Button type="info" icon="md-cloud-upload">导出</Button>
            </div>
        </Card>
        <Card>
            <div class="form-multab-wrapper-content">
                <Tabs type="card" ref="currentTab" :animated="false">
                    <TabPane label="表头" name="header" icon="md-document">
                        <div class="form-multab-wrapper-content-head">
                            <Row type="flex" justify="center">
                                <Col span="24">
                                    <div class="form-content">
                                        <Form
                                            :model="formHeadData"
                                            ref="formHeadData"
                                            label-position="left"
                                            :label-width="130"
                                            :rules="rules"
                                            :show-message="false"
                                        >
                                            <Row>
                                                <br />
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="企业内部编号"
                                                        label-position="top"
                                                        prop="emsId"
                                                    >
                                                        <Select
                                                            v-model="formHeadData.emsId"
                                                            @on-change="handleEmsIdChange"
                                                        >
                                                            <Option
                                                                v-for="item in copErpNoSelectList"
                                                                :value="item.cop_Erp_No"
                                                                :key="item.cop_Erp_No"
                                                            >{{ item.cop_Erp_No }}</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="档案库编号" label-position="top">
                                                        <Input
                                                            v-model="formHeadData.emsNo"
                                                            readonly
                                                        />
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="申报单位类型"
                                                        label-position="top"
                                                        prop="declareErType"
                                                    >
                                                        <bascode-select
                                                            v-model="formHeadData.declareErType"
                                                            parentValue="DECLARE_ER_TYPE"
                                                            :currentSelectVal="formHeadData.declareErType"
                                                            :hasAll="false"
                                                        ></bascode-select>
                                                    </FormItem>
                                                </Col>
                                               <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="预录入统一编号" label-position="top">
                                                        <Input
                                                            v-model="formHeadData.preEmsNo"
                                                            readonly
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="联系地址" label-position="top">
                                                        <Input
                                                            type="text"
                                                            v-model="formHeadData.address"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="联系电话" label-position="top">
                                                        <Input
                                                            type="text"
                                                            v-model="formHeadData.phone"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="账册类型"
                                                        label-position="top"
                                                        prop="emsType"
                                                    >
                                                        <!-- <Input v-model="formHeadData.emsType" placeholder /> -->
                                                        <Select v-model="formHeadData.emsType">
                                                            <Option
                                                                v-for="item in emsTypeSelectList"
                                                                :value="item.value"
                                                                :key="item.value"
                                                            >{{ item.label }}</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="主管海关"
                                                        label-position="top"
                                                        prop="custom"
                                                    >
                                                        <hgparameter-select
                                                            :selectVal.sync="formHeadData.custom"
                                                            parentValue="0"
                                                        ></hgparameter-select>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="申报类型"
                                                        label-position="top"
                                                        prop="declareType"
                                                    >
                                                        <bascode-select
                                                            v-model="formHeadData.declareType"
                                                            parentValue="DCL_TYPECD"
                                                            :currentSelectVal="formHeadData.declareType"
                                                            :hasAll="false"
                                                        ></bascode-select>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="经营单位"
                                                        label-position="top"
                                                        prop="tradeCode"
                                                    >
                                                        <Input v-model="formHeadData.tradeCode"></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="经营单位名称"
                                                        label-position="top"
                                                        prop="tradeName"
                                                    >
                                                        <Input
                                                            type="text"
                                                            v-model="formHeadData.tradeName"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="经营单位信用代码"
                                                        label-position="top"
                                                        prop="tradeSocialCreditCode"
                                                    >
                                                        <Input
                                                            v-model="formHeadData.tradeSocialCreditCode"
                                                            placeholder
                                                        />
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="加工单位"
                                                        label-position="top"
                                                        prop="ownerCode"
                                                    >
                                                        <Input v-model="formHeadData.ownerCode"></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="加工单位名称"
                                                        label-position="top"
                                                        prop="ownerName"
                                                    >
                                                        <Input
                                                            type="text"
                                                            v-model="formHeadData.ownerName"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="加工单位信用代码"
                                                        label-position="top"
                                                        prop="ownerSocialCreditCode"
                                                    >
                                                        <Input
                                                            v-model="formHeadData.ownerSocialCreditCode"
                                                            placeholder
                                                        />
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="申报单位"
                                                        label-position="top"
                                                        prop="declareCode"
                                                    >
                                                        <Input v-model="formHeadData.declareCode"></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="申报单位名称"
                                                        label-position="top"
                                                        prop="declareName"
                                                    >
                                                        <Input
                                                            type="text"
                                                            v-model="formHeadData.declareName"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="申报单位信用代码"
                                                        label-position="top"
                                                        prop="declareSocialCreditCode"
                                                    >
                                                        <Input
                                                            v-model="formHeadData.declareSocialCreditCode"
                                                            placeholder
                                                        />
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="申报单位"
                                                        label-position="top"
                                                        prop="inputCode"
                                                    >
                                                        <Input v-model="formHeadData.inputCode"></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="申报单位名称"
                                                        label-position="top"
                                                        prop="inputName"
                                                    >
                                                        <Input
                                                            type="text"
                                                            v-model="formHeadData.inputName"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="申报单位信用代码"
                                                        label-position="top"
                                                        prop="inputSocialCreditCode"
                                                    >
                                                        <Input
                                                            v-model="formHeadData.inputSocialCreditCode"
                                                            placeholder
                                                        />
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="加工生产力(万美元)"
                                                        label-position="top"
                                                        prop="productRatio"
                                                    >
                                                        <Input
                                                            type="number"
                                                            v-model="formHeadData.productRatio"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="批准证编号" label-position="top">
                                                        <Input v-model="formHeadData.emsApprNo"></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="结束有效期"
                                                        label-position="top"
                                                        prop="endDate"
                                                    >
                                                        <DatePicker
                                                            type="date"
                                                            v-model="formHeadData.endDate"
                                                            placeholder="结束有效期"
                                                            transfer
                                                        ></DatePicker>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="申报日期" label-position="top">
                                                        <DatePicker
                                                            type="date"
                                                            v-model="formHeadData.declareDate"
                                                            placeholder="申报日期"
                                                            transfer
                                                        ></DatePicker>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="变成次数" label-position="top">
                                                        <Input
                                                            v-model="formHeadData.modifyTimes"
                                                            readonly
                                                        />
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="执行标志" label-position="top">
                                                        <!-- <Input type="text" v-model="formHeadData.exeMark"></Input> -->
                                                        <Select v-model="formHeadData.exeMark">
                                                            <Option
                                                                v-for="item in exeMarkSelectList"
                                                                :value="item.value"
                                                                :key="item.value"
                                                            >{{ item.label }}</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem
                                                        label="录入日期"
                                                        label-position="top"
                                                        prop="inputDate"
                                                    >
                                                        <DatePicker
                                                            type="date"
                                                            v-model="formHeadData.inputDate"
                                                            placeholder="录入日期"
                                                            transfer
                                                        ></DatePicker>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="风险担保标志" label-position="top">
                                                        <!-- <Input
                                                        type="text"
                                                        v-model="formHeadData.riskInsuranceFlag"
                                                        ></Input>-->
                                                        <Select
                                                            v-model="formHeadData.riskInsuranceFlag"
                                                        >
                                                            <Option
                                                                v-for="item in riskInsuranceFlagSelectList"
                                                                :value="item.value"
                                                                :key="item.value"
                                                            >{{ item.label }}</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="关联单证号" label-position="top">
                                                        <Input
                                                            type="text"
                                                            v-model="formHeadData.relatedNo"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>
                                                                                            
                                            </Row>
                                            <Row>
                                                <Col :sm="24" :md="12" :lg="8">
                                                    <FormItem label="备案批准日期" label-position="top">
                                                        <DatePicker
                                                            type="date"
                                                            v-model="formHeadData.newApprDate"
                                                            placeholder="备案批准日期"    
                                                            transfer                                                       
                                                        ></DatePicker>
                                                    </FormItem>
                                                </Col>
                                                <Col :sm="24" :md="24" :lg="16">
                                                    <FormItem label="备注" label-position="top">
                                                        <Input
                                                            type="text"
                                                            v-model="formHeadData.note"
                                                        ></Input>
                                                    </FormItem>
                                                </Col>  
                                            </Row>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="center">
                                <Col span="24">
                                    <div class="form-button">
                                        <Button
                                            type="primary"
                                            @click="handleHeadSubmit('formHeadData')"
                                            icon="md-cloud-done"
                                        >保存</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </TabPane>
                    <TabPane label="料件" name="img">
                        <it-record-img-list :headId.sync="formHeadData.id"></it-record-img-list>
                    </TabPane>
                    <TabPane label="成品" name="exg">空空如也</TabPane>
                    <TabPane label="随附单据" name="file">空空如也</TabPane>
                </Tabs>
            </div>
        </Card>
    </div>
</template>
<script>
import Vue from "vue";
import userSearch from "_vbue/test/userSearch2.vue";
import pagedTable from "_com/paged-table";
import generalButton from "_com/general-button";
import customSelect from "_com/custom-select";
import bascodeSelect from "_com/custom-select/basic-info-select";
import hgparameterSelect from "_com/custom-select/parameter-select";
import itRecordImgList from "_vbue/bsbookrecord/itrecord/itRecordImgList.vue";
export default {
    name: "nameTab",
    components: {
        bascodeSelect,
        hgparameterSelect,
        customSelect,
        itRecordImgList
    },
    data() {
        return {
            headId: 0,
            declareType: "3",
            formHeadData: {},
            imgSeachModel: {
                GNo: "",
                GName: ""
            },
            exgSeachModel: {},
            rules: {
                emsId: { required: true, trigger: "blur", message: "" },
                emsNo: { required: true, trigger: "blur", message: "" },
                declareErType: {
                    required: true,
                    trigger: "change",
                    message: ""
                },
                emsType: { required: true, trigger: "change", message: "" },
                custom: { required: true, trigger: "change", message: "" },
                declareType: { required: true, trigger: "change", message: "" },
                tradeCode: { required: true, trigger: "blur", message: "" },
                tradeName: { required: true, trigger: "blur", message: "" },
                tradeSocialCreditCode: {
                    required: true,
                    trigger: "blur",
                    message: ""
                },
                ownerCode: { required: true, trigger: "blur", message: "" },
                ownerName: { required: true, trigger: "blur", message: "" },
                ownerSocialCreditCode: {
                    required: true,
                    trigger: "blur",
                    message: ""
                },
                declareCode: { required: true, trigger: "blur", message: "" },
                declareName: { required: true, trigger: "blur", message: "" },
                declareSocialCreditCode: {
                    required: true,
                    trigger: "blur",
                    message: ""
                },
                inputCode: { required: true, trigger: "blur", message: "" },
                inputName: { required: true, trigger: "blur", message: "" },
                inputSocialCreditCode: {
                    required: true,
                    trigger: "blur",
                    message: ""
                },
                productRatio: { required: true, trigger: "blur", message: "" },
                endDate: {
                    required: true,
                    type: "date",
                    trigger: "change",
                    message: ""
                },
                inputDate: {
                    required: true,
                    type: "date",
                    trigger: "change",
                    message: ""
                }
            },
            emsTypeSelectList: [
                { value: "0", label: "企业资质" },
                { value: "8", label: "电子帐册" },
                { value: "x", label: "区外设备帐册" }
            ],
            riskInsuranceFlagSelectList: [
                { value: "0", label: "无需担保" },
                { value: "1", label: "未担保" },
                { value: "2", label: "已担保" }
            ],
            exeMarkSelectList: [
                { value: "1", label: "在执行" },
                { value: "2", label: "已注销" }
            ],
            copErpNoSelectList: []
        };
    },
    created() {},
    beforeDestroy() {},
    watch: {
        // "formHeadData.id": {
        //     handler(val, oldval) {
        //         if (val == 0) {
        //             // this.$Message.info("id:" + val);
        //             // this.formHeadData.custom = "2210";
        //         }
        //     },
        //     immediate: true
        // }
    },
    methods: {
        handleHeadSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$store
                        .dispatch({
                            type: "itRecord/saveHeadModel",
                            data: this.formHeadData
                        })
                        .then(res => {
                            console.log(res);
                            if (res > 0) {
                                this.$Message.success("保存成功");
                            } else {
                                this.$Message.success("保存失败");
                            }
                        })
                        .catch(error => {
                            this.$Message.success("保存失败");
                        });
                } else {
                    this.$Message.error("输入验证失败!");
                }
            });
        },
        getHeadModel() {
            this.$store
                .dispatch({
                    type: "itRecord/getHeadModel",
                    data: { id: this.headId }
                })
                .then(res => {
                    this.formHeadData = res.data;
                })
                .catch(error => {
                    this.$Message.error("获取数据异常");
                });
        },
        getCopErpNoList() {
            var customer = this.$store.state.login.userinfo.organizationCode;
            this.$store
                .dispatch({
                    type: "FileLibraryNo/GetFileLibDropdownList",
                    data: { CustomerCodew: customer }
                })
                .then(res => {
                    this.copErpNoSelectList = res;
                });
        },
        handleEmsIdChange() {
            this.$Message.error(this.formHeadData.emsId);
            this.$store
                .dispatch({
                    type: "itRecord/getHeadByEmsId",
                    data: { emsId: this.formHeadData.emsId }
                })
                .then(res => {
                    this.formHeadData.custom = res.custom;
                    this.formHeadData.emsNo = res.emsNo;
                    this.formHeadData.productRatio = res.productRatio;
                    this.formHeadData.endDate = res.endDate;
                    this.formHeadData.exeMark = res.exeMark;
                    this.formHeadData.note = res.note;
                    this.formHeadData.newApprDate = res.newApprDate;
                    this.formHeadData.emsApprNo = res.emsApprNo;
                    this.formHeadData.relatedNo = res.relatedNo;
                    this.formHeadData.declareErType = res.declareErType;

                    if (this.formHeadData.emsNo == "") {
                        this.formHeadData.declareType = 1;
                    } else {
                        this.formHeadData.declareType = 2;
                    }
                });
        },
        async handlePrint1() {
            var response = await this.$store.dispatch({
                serviceName: this.buttonHandleSetting.serviceName,
                type: this.buttonHandleSetting.printUrl,
                data: { id: 1 }
            });
            debugger;
            var headers = response.headers;
            var blob = new Blob([response.data], { type: "application/pdf" });
            var link = document.createElement("a");
            link.href = this.getObjectURL(blob);
            window.open(
                "/public/generic/web/viewer.html?file=" +
                    encodeURIComponent(link.href),
                "打印文件"
            );
        },
        async handlePrint() {
            //此url 是导出pdf api地址
            //   let url = "http://localhost:12329/api/user/exportpdf";
            //   window.open(
            //     "/public/generic/web/viewer.html?file=" + encodeURIComponent(url),
            //     "打印文件"
            //   );
        },
        getObjectURL(file) {
            let url = null;
            if (window.createObjectURL != undefined) {
                // basic
                url = window.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            } else if (window.URL != undefined) {
                // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            }
            return url;
        }
    },
    mounted() {
        this.headId = this.$route.params.id;
        this.getHeadModel();
        this.getCopErpNoList(); //绑定企业内部编号
    }
};
</script>