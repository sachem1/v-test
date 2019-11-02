<template>
  <div class="form-multab-wrapper">
    <Card>
      <div class="form-multab-wrapper-header-button">
        <Button type="primary" icon="md-add" @click="handleAdd">审核</Button>
        <Button type="info" icon="md-print" @click="handlePrint">数据回填</Button>
        <Button type="info" icon="md-cloud-upload">Excel导出</Button>
        <Button type="info" icon="md-cloud-upload">发送清单</Button>
        <Button type="info" icon="md-cloud-upload">打印</Button>
        <Button type="info" icon="md-cloud-upload">生成报关单</Button>
        <Button type="info" icon="md-cloud-upload">归并</Button>
        <Button type="info" icon="md-cloud-upload">拆单</Button>
        <Button type="info" icon="md-cloud-upload">校验稿</Button>
      </div>
    </Card>
    <Card>
      <div class="form-multab-wrapper-content">
        <Tabs
          @on-click="handleDetailInit"
          type="card"
          ref="currentTab"
          :animated="false"
          :value="tabValue"
        >
          <TabPane label="表头" name="header" icon="md-document">
            <div class="form-multab-wrapper-content-head">
              <Row type="flex" justify="center">
                <Col span="24">
                  <div class="form-content">
                    <Form
                      :model="formMainData"
                      ref="mainForm"
                      label-position="left"
                      :label-width="275"
                      :rules="headRules"
                    >
                      <Row>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="业务跟踪号" label-position="top" prop="name">
                            <Input v-model="formMainData.copErpCode" :disabled="alwaysDisabled" />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="预录入统一编号" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.preEmsId"
                              :disabled="alwaysDisabled"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="清单类型" label-position="top" prop="billType">
                            <basic-info-select
                              v-model="formMainData.billType"
                              :parentValue="'BillType'"
                              :currentSelectVal="formMainData.billType"
                              :isRequired="true"
                            ></basic-info-select>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="帐册编号" label-position="top" prop="emsNo">
                            <custom-select
                              v-model="formMainData.emsNo"
                              :parentValue="''"
                              :currentSelectVal="formMainData.emsNo"
                              :isRequired="true"
                              :url="'emsrecordinfo/emsnoselect'"
                            ></custom-select>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="核注清单编号" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.seqNo"
                              :disabled="alwaysDisabled"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="清单申报日期" class="sbrq" label-position="top">
                            <DatePicker
                              size="small"
                              :value="formMainData.agentDate"
                              :disabled="alwaysDisabled"
                              transfer
                              format="yyyy-MM-dd"
                              type="date"
                              placeholder
                            ></DatePicker>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="经营单位代码" label-position="top">
                            <Input v-model="formMainData.tradeCode" placeholder />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="经营单位社会信用代码" label-position="top">
                            <Input type="text" v-model="formMainData.tradeCredit"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="经营单位名称" label-position="top">
                            <Input v-model="formMainData.tradeName"></Input>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="加工单位" label-position="top">
                            <Input v-model="formMainData.receiveCode"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="加工单位社会信用代码" label-position="top">
                            <Input type="text" v-model="formMainData.receiveCredit"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="加工单位名称" label-position="top">
                            <Input v-model="formMainData.receiveName" placeholder />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="申报单位" label-position="top">
                            <Input type="text" v-model="formMainData.agentCode"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="申报单位社会信用代码" label-position="top">
                            <Input v-model="formMainData.agentCredit"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="申报单位名称" label-position="top">
                            <Input v-model="formMainData.agentName"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="录入单位" label-position="top">
                            <Input type="text" v-model="formMainData.inputCode"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="录入单位社会信用代码" label-position="top">
                            <Input v-model="formMainData.inputCredit" placeholder />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="录入单位名称" label-position="top">
                            <Input type="text" v-model="formMainData.inputName"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="成品、料件标志" label-position="top" prop="goodsFlag">
                            <basic-info-select
                              v-model="formMainData.goodsFlag"
                              :parentValue="'G_MARK'"
                              :currentSelectVal="formMainData.goodsFlag"
                              :isRequired="true"
                            ></basic-info-select>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="监管方式" label-position="top" prop="tradeMode">
                            <basic-codeSelect
                              v-model="formMainData.tradeMode"
                              :parentValue="'TradeMode'"
                              :currentSelectVal="formMainData.tradeMode"
                              :isRequired="true"
                            ></basic-codeSelect>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="运输方式" label-position="top" prop="transMode">
                            <basic-codeSelect
                              v-model="formMainData.transMode"
                              :parentValue="'TransMode'"
                              :currentSelectVal="formMainData.transMode"
                              :isRequired="true"
                            ></basic-codeSelect>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="报关标志" label-position="top" prop="entryFlag">
                            <basic-info-select
                              v-model="formMainData.entryFlag"
                              :parentValue="'BillEntryMarks'"
                              :currentSelectVal="formMainData.entryFlag"
                              @onchange="entryFlagChange"
                              :isRequired="true"
                            ></basic-info-select>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="主管海关" label-position="top" prop="custom">
                            <basic-codeSelect
                              v-model="formMainData.custom"
                              :parentValue="'Customs'"
                              :currentSelectVal="formMainData.custom"
                              :isRequired="true"
                            ></basic-codeSelect>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="核扣标志" label-position="top">
                            <Input v-model="formMainData.dejouMark" :disabled="alwaysDisabled"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="录入日期" label-position="top" :show-message="false">
                            <DatePicker
                              v-model="formMainData.inputDate"
                              type="date"
                              show-week-numbers
                              placeholder="请选择日期"
                              :class="ivuRequired"
                            ></DatePicker>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="启运国(地区)" label-position="top" prop="shipCountry">
                            <basic-codeSelect
                              v-model="formMainData.shipCountry"
                              :parentValue="'Country'"
                              :currentSelectVal="formMainData.shipCountry"
                              :isRequired="true"
                            ></basic-codeSelect>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="清单进出卡口状态" label-position="top">
                            <Input
                              v-model="formMainData.billStatus"
                              :disabled="alwaysDisabled"
                              placeholder
                            />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="报关单类型" label-position="top">
                            <basic-info-select
                              v-model="formMainData.entryType"
                              :parentValue="'EntryType'"
                              :currentSelectVal="formMainData.entryType"
                            ></basic-info-select>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="进境关别" label-position="top" prop="iePort">
                            <basic-codeSelect
                              v-model="formMainData.iePort"
                              :parentValue="'Customs'"
                              :currentSelectVal="formMainData.iePort"
                              :isRequired="true"
                            ></basic-codeSelect>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="流转类型" label-position="top">
                            <basic-info-select
                              v-model="formMainData.changeType"
                              :parentValue="'ChangeType'"
                              :currentSelectVal="formMainData.changeType"
                            ></basic-info-select>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="是否生成报关单" label-position="top" prop="isGenerate">
                            <basic-info-select
                              v-model="formMainData.isGenerate"
                              :parentValue="'IsGenerateEntry'"
                              :currentSelectVal="formMainData.isGenerate"
                              :isRequired="true"
                            ></basic-info-select>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="报关类型" label-position="top">
                            <basic-info-select
                              v-model="formMainData.declareType"
                              :parentValue="'BILL_AGENT_TYPE'"
                              :currentSelectVal="formMainData.declareType"
                            ></basic-info-select>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="对应报关单编号" label-position="top">
                            <Input type="text" v-model="formMainData.relativeCustomsNo"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="对应报关单单申报单位" label-position="top">
                            <Input
                              v-model="formMainData.corAgentCode"
                              :disabled="fitDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="对应报关单单申报单位社会信用代码" label-position="top">
                            <Input
                              v-model="formMainData.corAgentCredit1"
                              :disabled="fitDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="对应报关单单申报单位名称" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.corAgentName"
                              :disabled="fitDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单编号" label-position="top">
                            <Input
                              v-model="formMainData.relEntryId"
                              placeholder
                              :disabled="blockDeclareTypeState"
                            />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联清单编号" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.relCopEmsId"
                              :disabled="blockDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联帐册备案号" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.relEmsNo"
                              :disabled="blockDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单位境内收发货人" label-position="top">
                            <Input
                              v-model="formMainData.relReceiveCode"
                              :disabled="relationDeclareTypeState"
                              placeholder
                            />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单位境内收发货人社会信用代码" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.relReceiveCredit"
                              :disabled="relationDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单位境内收发货人名称" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.relReceiveName"
                              :disabled="relationDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单生产销售(消费使用)单位" label-position="top">
                            <Input
                              v-model="formMainData.relTradeCode"
                              :disabled="relationDeclareTypeState"
                              placeholder
                            />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单生产销售(消费使用)单位社会信用代码" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.relTradeCredit"
                              :disabled="relationDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单生产销售(消费使用)单位名称" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.relTradeName"
                              :disabled="relationDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单申报单位" label-position="top">
                            <Input
                              v-model="formMainData.relAgentCode"
                              placeholder
                              :disabled="relationDeclareTypeState"
                            />
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单申报单位社会信用代码" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.relAgentCredit"
                              :disabled="relationDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单申报单位名称" label-position="top">
                            <Input
                              v-model="formMainData.relAgentName"
                              :disabled="relationDeclareTypeState"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="申请表编号" label-position="top">
                            <Input v-model="formMainData.applyNo"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="供应商" label-position="top">
                            <Input type="text" v-model="formMainData.serviceCompany"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="审核状态" label-position="top">
                            <Input
                              type="text"
                              v-model="formMainData.approveResult"
                              :disabled="alwaysDisabled"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="关联报关单申报日期" label-position="top">
                            <Input v-model="formMainData.relAgentDate"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="报关单草稿（备注）" label-position="top">
                            <Input type="text" v-model="formMainData.entryRemark"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="备注" label-position="top">
                            <Input type="text" v-model="formMainData.remark"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="修改次数" label-position="top">
                            <Input type="text" v-model="formMainData.modifyTimes"></Input>
                          </FormItem>
                        </Col>
                        <Col :sm="24" :md="12" :lg="8">
                          <FormItem label="申报类型" label-position="top">
                            <basic-info-select
                              v-model="formMainData.dclTypecd"
                              :parentValue="'BillDclTypecd'"
                              :currentSelectVal="formMainData.dclTypecd"
                              :disabled="alwaysDisabled"
                            ></basic-info-select>
                          </FormItem>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Col>
              </Row>
              <Row justify="center" style="margin-top: 20px;margin-bottom: 20px;">
                <Col span="24">
                  <div class="form-button">
                    <Button type="primary" icon="ios-add-circle-outline" @click="handleHeaderAdd">新增</Button>                    
                    <Button
                      type="primary"
                      icon="ios-cloud-done-outline"
                      @click="handleHeaderSubmit"
                    >保存</Button>
                    <Button
                      :disabled="disabledDelete"
                      type="error"
                      icon="ios-trash-outline"
                      @click="handleHeaderDel"
                    >删除</Button>
                    <Button
                      type="primary"
                      icon="ios-close-circle-outline"
                      @click="handleHeaderCancel"
                    >取消</Button>
                    <Button type="info" icon="ios-copy-outline" @click="handleHeaderCopy">复制表头</Button>
                    <Button type="info" icon="md-filing" @click="handleCopyAll">复制全部</Button>
                    <Button
                      type="error"
                      icon="md-done-all"
                      :disabled="disabledDelete"
                      @click="handleDelApply"
                    >申请删除</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane label="表体" name="body" icon="ios-card-outline" :disabled="disabledTabPanel">
            <div class="form-multab-wrapper-content-body">
              <Row>
                <div>
                  <billIn-body-edit :headId="headId"></billIn-body-edit>
                </div>
                <Row>
                  <Col>
                    <div class="list-search">
                      <billIn-body-query @searchList="handleSearch"></billIn-body-query>
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
                        :displayImportExport="displayImportExport"
                        :routerSetting="addBehaviorSetting"
                        :selectedRows="selectRows"
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
          <TabPane label="归并后表体" name="mergeBody" :disabled="disabledTabPanel"></TabPane>
          <TabPane label="随附单据" name="attachBill" :disabled="disabledTabPanel"></TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
import Vue from "vue";
import util from "_lib/util";
import billInBodyQuery from "./billInBodyQuery.vue";
import billInBodyEdit from "./billInBodyEdit.vue";
import pagedTable from "_com/paged-table";
import generalButton from "_com/general-button";
import customSelect from "_com/custom-select";
import basicInfoSelect from "_com/custom-select/basic-info-select";
import basicCodeSelect from "_com/custom-select/basic-code-select";
//import basicCodeSelect from "_com/custom-select/parameter-select";
import searchInput from "_com/custom-input/search-input";

export default {
  name: "nameTab",
  components: {
    generalButton,
    pagedTable,
    billInBodyQuery,
    billInBodyEdit,
    customSelect,
    basicInfoSelect,
    searchInput,
    basicCodeSelect
  },
  data() {
    return {
      formMainData: {},
      headRules: {
        billType: {
          required: true,
          message: "请选择清单类型!",
          trigger: "blur"
        },
        emsNo: {
          required: true,
          message: "请选择账册号!",
          trigger: "blur"
        },
        tradeMode: {
          required: true,
          message: "请选择监管方式!",
          trigger: "blur"
        },
        transMode: {
          required: true,
          message: "请选择运输方式",
          
          trigger: "blur"
        },
        custom: {
          required: true,
          message: "请选择主管海关",
          trigger: "blur"
        },
        shipCountry: {
          required: true,
          message: "请选择启运国(地区)!",
          trigger: "blur"
        },
        goodsFlag: {
          required: true,
          message: "请选择成品料件标志!",
          trigger: "blur"
        },
        entryFlag: {
          required: true,
          message: "请选择报关标志!",
          trigger: "blur"
        },
        inputDate: {
          required: true,
          message: "请选择录入日期!",
          trigger: "blur"
        },
        iePort: {
          required: true,
          message: "请选择进境关别!",
          trigger: "blur"
        },
        isGenerate: {
          required: true,
          message: "请选择是否生成报关单!",
          trigger: "blur"
        }
      },
      formDetailData: {
        loginName: "",
        password: "",
        name: "",
        age: "",
        address: "",
        remark: "",
        createDate: "",
        id: ""
      },
      statisticsItem: {},
      validateRule: {
        loginName: {
          required: true,
          message: "登录名称不能为空",
          trigger: "blur"
        }
      },
      ivuRequired: "ivu-required",
      tabValue: "header",
      mainServiceName: "user/createUser",
      detailServiceName: "user/createUser", // 按钮
      buttonBus: new Vue(),
      displayAdd: true,
      displayEdit: false,
      displayBatchDelete: true,
      displayImportExport: false,
      addBehaviorSetting: {
        // 配置跳转新页面
        routeName: "userTab",
        routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }
        ]
      },
      initDisabled: true,
      alwaysDisabled: true,
      headType: "I",
      oldHeadId: 0,
      buttonHandleSetting: {
        // 按钮URL
        serviceName: "user",
        getUrl: "user/getUserList",
        deleteUrl: "user/deleteRange",
        importUrl: "user/importFile",
        exportUrl: "user/exportFile",
        templateUrl: "user/getFileTemplate",
        printUrl: "user/printPdf"
      }, // table
      selectRows: [], // 表格选中行
      tableBus: new Vue(),
      serviceName: "user",
      listUrl: "user/getUserList",
      searchModel: {},
      searchItems: [], // 是否有统计
      hasShowSummary: false,
      columns: [
        { type: "selection", width: 60, key: "id", align: "center" },
        {
          title: "姓名",
          width: 200,
          key: "name",
          align: "left"
        },
        { title: "年龄", width: 100, key: "age", align: "center" },
        {
          title: "地址",
          width: 300,
          key: "address",
          align: "center"
        },
        { title: "账号", width: 500, key: "loginName", align: "center" },
        {
          title: "密码",
          width: 500,
          key: "password",
          align: "center"
        }
      ],
      TableData: [],
      disablePaged: false
    };
  },
  created() {
    this.buttonBus.$on("prepareEdit", this.prepareEdit);
    this.buttonBus.$on("requestData", this.handleSearch);
    this.tableBus.$on("selectedRowsChange", this.selectRowChange);
    this.tableBus.$on("prepareEdit", this.prepareEdit);
  },
  beforeDestroy() {
    this.buttonBus.$off("prepareEdit", this.prepareEdit);
    this.buttonBus.$off("requestData", this.handleSearch);
    this.tableBus.$off("selectedRowsChange", this.selectRowChange);
    this.tableBus.$off("prepareEdit", this.prepareEdit);
  },
  computed: {
    headId: function() {
      if (!this.formMainData || !this.formMainData.id) return 0;
      return this.formMainData.id;
    },
    relationDeclareTypeState: function() {
      if (this.formMainData.entryFlag === "1") {
        //报关
        if (this.formMainData.declareType === "1") {
          //关联
          return false;
        }
        return true;
      } else {
        return true;
      }
    },
    fitDeclareTypeState: function() {
      if (this.formMainData.entryFlag === "1") {
        //非报关
        if (this.formMainData.declareType === "2") {
          //非关联
          return false;
        }
        return true;
      } else if (this.formMainData.entryFlag === "2") {
        return true;
      }
    },
    blockDeclareTypeState: function() {
      if (
        this.formMainData.declareType === undefined ||
        this.formMainData.declareType === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    disabledDelete: function() {
      if (this.headId > 0) return false;
      return true;
    },
    disabledTabPanel: function() {
      if (this.headId > 0) return false;
      return true;
    }
  },
  methods: {
    handleSearch(data) {
      this.$store.state.user.searchModel = data;
      if (data) this.searchModel = data;
      this.$refs.currentTable.handleSearch(data);
    },
    handleHeaderAdd() {
      this.$store
        .dispatch({
          type: "billIn/initBillHead",
          data: { type: this.headType }
        })
        .then(res => {
          //加载初始化后的数据
          this.formMainData = res;
        })
        .catch(err => {
          this.$Message.error("新增失败!");
        });
    },
    handleHeaderSubmit() {
      let vm = this;
      let data = vm.formMainData;
      vm.$refs.mainForm.validate(valid => {
        if (valid) {
          vm.$store
            .dispatch({
              type: "billIn/saveBillHeader",
              data: data
            })
            .then(res => {
              if (res.data) {
                vm.$Message.success("保存表头成功!");
                //加载保存后的数据
                vm.formMainData = res.data;
                //刷新列表,注意方法名billHeaderListReload别重复
                vm.$root.eventBus.$emit("billHeaderListReload");
              } else {
                util.singleMessage(
                  vm,
                  "保存进口核注清单",
                  res.message,
                  "error"
                );
              }
            })
            .catch(err => {
              vm.$Message.error("保存失败!");
            });
        } else {
          vm.$Message.warning("请完善必填信息!");
        }
      });
    },
    handleHeaderDel() {
      if (this.headId <= 0) {
        return;
      }
      this.$Modal.confirm({
        title: "确认提示",
        content: "删除进口核注清单?",
        onOk: () => {
          this.$store
            .dispatch({
              type: "billIn/deleteBillHeads",
              data: { id: this.headId, type: this.headType }
            })
            .then(res => {
              //加载复制的表头数据
              this.formMainData = res;
            })
            .catch(err => {
              this.$Message.error("复制失败!");
            });
        }
      });
    },
    handleHeaderCancel() {
      this.handleLoadHeadData(this.oldHeadId);
    },
    handleHeaderCopy() {
      this.$store
        .dispatch({
          type: "billIn/copyHead",
          data: { id: this.headId }
        })
        .then(res => {
          //加载复制的表头数据
          if (res !== null && res.data !== null) {
            this.formMainData = res.data;
          } else {
            this.$Message.warning(res.message || "复制失败!");
          }
        })
        .catch(err => {
          this.$Message.error("复制失败!");
        });
    },
    handleCopyAll() {
      this.$store
        .dispatch({
          type: "billIn/copyBillAll",
          data: { id: this.headId }
        })
        .then(res => {
          //加载复制的表头数据
          if (res !== null && res.data !== null) {
            this.formMainData = res.data;
          } else {
            this.$Message.warning(res.message || "复制失败!");
          }
        })
        .catch(err => {
          this.$Message.error("复制失败!");
        });
    },
    handleDelApply() {
      if (this.headId <= 0) return;
      this.formMainData.dclTypecd = "1";
      this.$Modal.confirm({
        title: "确认提示",
        content: "删除进口核注清单?",
        onOk: () => {
          this.$store
            .dispatch({
              type: "billIn/applyDelBill",
              data: { id: this.headId }
            })
            .then(res => {
              //加载复制的表头数据
              this.formMainData = res;
            })
            .catch(err => {
              this.$Message.error("复制失败!");
            });
        }
      });
    },

    entryFlagChange() {
      if (this.formMainData.entryFlag === "1") {
        this.formMainData.isGenerate = "1";
      } else {
        this.formMainData.isGenerate = "2";
      }
    },
    prepareEdit(payload) {
      console.log(JSON.stringify(payload));
      this.formDetailData = JSON.parse(JSON.stringify(payload));
    },
    handleLoadHeadData(headId) {
      let id = headId || this.headId;
      this.$store
        .dispatch({
          type: "billIn/getBillinHeadById",
          data: { id: id }
        })
        .then(res => {
          this.formMainData = res;
          console.log("formMainData:" + JSON.stringify(this.formMainData));
        });
    },
    handleDetailInit(name) {
      if (name === "body") {
        this.handleDetailTable();
      }
    },
    handleDetailTable() {
      this.$refs.currentTable.handleSearch();
    },
    handleAdd() {
      this.$refs.currentTab.value = "header";
      this.formMainData = {};
    },
    async handlePrint1() {
      var response = await this.$store.dispatch({
        serviceName: this.buttonHandleSetting.serviceName,
        type: this.buttonHandleSetting.printUrl,
        data: { id: 1 }
      });
      var headers = response.headers;
      var blob = new Blob([response.data], { type: "application/pdf" });
      var link = document.createElement("a");
      link.href = this.getObjectURL(blob);
      window.open(
        "/public/generic/web/viewer.html?file=" + encodeURIComponent(link.href),
        "打印文件"
      );
    },
    async handlePrint() {
      //此url 是导出pdf api地址
      let url = "http://localhost:12329/api/user/exportpdf";
      window.open(
        "/public/generic/web/viewer.html?file=" + encodeURIComponent(url),
        "打印文件"
      );
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
    if (this.$route.query.formData) {
      this.formMainData = this.$route.query.formData;
    }
    this.oldHeadId = this.formMainData.id;
    this.handleLoadHeadData();
  }
};
</script>
