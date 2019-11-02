<template>
  <div class="form-multab-wrapper">

    <Card>
      <div class="form-multab-wrapper-content">
        <Tabs @on-click="HandleDetailInit" type="card" ref="currentTab" :animated="false" :value="tabValue">
          <TabPane label="表头" name="header" icon="md-document">
           <div class="form-multab-wrapper-content-head">
            <Row type="flex" justify="center">
              <Col span="24">
                <div class="form-content">
                  <Form
                    :model="formMainData"
                    label-position="left"
                    :label-width="150"

                  >
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="账册号" label-position="top" prop="EmsNo">
                         <basicinfo-select
                         v-model="formMainData.emsNo"
                         :url="selectUrl"
                         :parentValue="parentValue"
                         :currentSelectVal="formMainData.emsNo"
                         @onchange="emsNoChange"
                         @onmounted="customSelectMonuted"
                        ></basicinfo-select>

                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="修改时间" label-position="top">
                          <Input  v-model="formMainData.updateTime" :disabled="true"></Input>
                        </FormItem>
                      </Col>

                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="经营单位海关代码" label-position="top">
                          <Input v-model="formMainData.tradeCode" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="经营单位海关名称" label-position="top">
                          <Input type="text" v-model="formMainData.tradeName" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="经营单位海关信用代码" label-position="top">
                         <Input type="text" v-model="formMainData.tradeSocialCreditCode" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="加工单位海关代码" label-position="top">
                          <Input v-model="formMainData.ownerCode" :disabled="true" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="加工单位海关名称" label-position="top">
                          <Input  v-model="formMainData.ownerName" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="加工单位海关信用代码" label-position="top">
                          <Input v-model="formMainData.ownerSocialCreditCode" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="申请单位海关代码" label-position="top">
                          <Input v-model="formMainData.declareCode" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="申请单位海关名称" label-position="top">
                          <Input type="text" v-model="formMainData.declareName" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="申请单位海关信用代码" label-position="top">
                          <Input v-model="formMainData.declareSocialCreditCode" :disabled="true" placeholder />
                        </FormItem>
                      </Col>
                       </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="录入单位海关代码" label-position="top">
                          <Input  v-model="formMainData.inputCode" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="录入单位海关名称" label-position="top">
                          <Input v-model="formMainData.inputName" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="录入单位海关信用代码" label-position="top">
                          <Input v-model="formMainData.inputSocialCreditCode" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                       </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="主管海关" label-position="top">
                          <Input type="text" v-model="formMainData.customCn" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="进口最大金额（万美元）" label-position="top">
                          <Input v-model="formMainData.imgAmount" :disabled="true" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="申报类型单位" label-position="top">
                          <Input  v-model="formMainData.declareType" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                       </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="最大周转金额（万美元）" label-position="top">
                          <Input :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="加工生产能力（万美元）" label-position="top">
                          <Input v-model="formMainData.productRatio" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="单耗申报环节" label-position="top">
                          <Input type="text" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                       </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="联系电话" label-position="top">
                          <Input v-model="formMainData.phone" :disabled="true" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="联系地址" label-position="top">
                          <Input  v-model="formMainData.address" :disabled="true"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
          </TabPane>
          <TabPane label="料件" name="body" icon="ios-card-outline">
            <div class="form-multab-wrapper-content-body">
              <Row>
                <Col>
                  <div class="list-search">
                    <itRecord-serach @searchList="handleSearch"></itRecord-serach>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="button-wrapper">
                      <general-button
                    ref="currentButton"
                    :buttonBus="buttonBus"
                    :displayAdd="displayAdd"
                    :displayEdit="displayEdit"
                    :displayBatchDelete="displayBatchDelete"
                    :displayImport="displayImport"
                    :routerSetting="addBehaviorSetting"
                    :templateSetting="templateSetting"
                    :selectedRows="selectRows"
                    :selectCondition="searchModel"
                    :buttonHandleSetting="buttonHandleSetting"
      ></general-button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
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
                    :disablePaged="disablePaged"
                    :statisticsItem="statisticsItem"
                  ></paged-table>
                </Col>
              </Row>
            </Row>
          </div>
          </TabPane>
          <TabPane label="成品" name="other" icon="ios-card-outline">
            <div class="form-multab-wrapper-content-body">
              <record-exg></record-exg>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "_lib";
import util from "_lib/util";
import { forEach } from "_lib/tools";
import itRecordSerach from "_vbue/bsbookrecord/itRecordInfo/itRecordSerach.vue";
import pagedTable from "_com/paged-table";
import basicinfoSelect from "_com/custom-select";
import recordExg from '_vbue/bsbookrecord/itRecordInfo/recordExg.vue';
import generalButton from "_com/general-button";
export default {
  name: "nameTab",
  components: {
    generalButton,
    pagedTable,
    basicinfoSelect,
    itRecordSerach,
    recordExg
  },
  data() {
    return {
      formMainData: {
        emsId: "",
        organizationCode: "",
        emsNo: "",
        preEmsNo: "",
        copEmsNo: "",
        houseNo: "",
        tradeCode: "",
        tradeSocialCreditCode: "",
        tradeName: "",
        ownerCode: "",
        ownerSocialCreditCode: "",
        ownerName: "",
        ownerType: "",
        declareErType: "",
        declareCode: "",
        declareName: "",
        cUSTOM: "",
        customCn: "",
        districtCode: "",
        address: "",
        phone: "",
        emsType: "",
        emsStatus: "",
        declareStatus: "",
        declareType: "",
        investMode: "",
        tradeMode: "",
        imgAmount: "",
        exgAmount: "",
        imgWeight: "",
        exgWeight: "",
        imgItems: "",
        exgItems: "",
        emsApprNo: "",
        licenseNo: "",
        contractNo: "",
        idCard: "",
        idCardPwd: "",
        lastEmsNo: "",
        corrEmsNo: "",
        investAmount: "",
        noteAmount: "",
        noteQty: "",
        inputEr: "",
        inputDate: "",
        declareDate: "",
        declareTime: "",
        beginDate: "",
        endDate: "",
        modifyTimes: "",
        emsApprMark: "",
        emsCertify: "",
        productRatio: "",
        modifyMark: "",
        nOTE: "",
        note1: "",
        note2: "",
        createUser: "",
        createTime: "",
        fileName: "",
        currentEffective: "",
        updateUser: "",
        updateTime: "",
        recordContent: "",
        declareSocialCreditCode: "",
        inputSocialCreditCode: "",
        inputCode: "",
        inputName: "",
        exeMark: "",
        riskInsuranceFlag: "",
        relatedNo: "",
        qualifyType: "",

        newApprDate: ""
      },
      statisticsItem: {},

      tabValue:"header",


      // 按钮
      buttonBus: new Vue(),
        displayAdd: false,
        displayEdit: false,
        displayBatchDelete: false,
        displayImport: false,
        displayExport: true,
      addBehaviorSetting: { },
      formData: {},
      template: {},
      parentValue: "1",
      selectUrl: "itRecordInfo/emsnoselect",
      buttonHandleSetting: {
        // 按钮URL
        serviceName: "itRecordInfo",
        getUrl: "itRecordInfo/getRecordInfoImgList",
        exportUrl: "itRecordInfo/downloadFile"
      },
      templateSetting: {
        importType: "业务单明细",//表示多个模板类型
        uploadFileServer: "itRecord",
        uploadFileAction: "itRecord/ImportExcel",
        templateType:'multiple',//multiple 表示多个模板 single 表示单个模板,如果单个模板需要给模板名称
        templateName:'test.xls', //下载单个模板的名字,
        secondRequestUrl:'commons/secondRequest' //store模块路由地址
      },
      // table
      selectRows: [], // 表格选中行
      tableBus: new Vue(),
      serviceName: "itRecordInfo",
      listUrl: "itRecordInfo/getRecordInfoImgList",

      searchModel: {},
      searchItems: [],
      // 是否有统计
      hasShowSummary: false,
      columns: [
        { title: "序号", width: 80, key: "rowNumber", align: "left" },
        { title: "帐册编号", width: 150, key: "emS_NO", align: "center" },
        { title: "备案项号", width: 120, key: "g_NO", align: "center" },
        { title: "商品编码", width: 100, key: "codE_T", align: "center" },
        { title: "商品名称", width: 500, key: "g_NAME", align: "center" }
      ],
      TableData: [],
      disablePaged: false
    };
  },
  created() {

    this.buttonBus.$on("requestData", this.handleSearch);

  },
  beforeDestroy() {

    this.buttonBus.$off("requestData", this.handleSearch);

  },
  methods: {
    handleSearch(data) {
    //   this.$store.state.user.searchModel = data;
      if (data) this.searchModel = data;
      this.$refs.currentTable.handleSearch(data);
    },
    clickTest() {
      this.$Message.success("点击成功");
    },

    HandleDetailInit(name) {
      if (name === "body") {
        this.handleDetailTable();
      }
      if (name==="other") {

      }
    },
    handleDetailTable() {
      this.$refs.currentTable.handleSearch();
    },
    customSelectMonuted(v){
      let vm =this;
      console.log(v);
      debugger;
      this.$store
              .dispatch({
                type: "itRecordInfo/getRecordedHead",
                data: v,
              })
              .then(res => {

                vm.formMainData = JSON.parse(JSON.stringify(res));
              });

    },
      emsNoChange(v){
      let vm =this;
        this.$store
          .dispatch({
            type: "itRecordInfo/getRecordedHead",
            data: v,
          })
          .then(res => {

            vm.formMainData = JSON.parse(JSON.stringify(res));
          });
    }

  },
  mounted() {
  }
};
</script>
