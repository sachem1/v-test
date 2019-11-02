<template>
  <div class="form-multab-wrapper">
    <Card>
      <div class="form-multab-wrapper-content">

        <Tabs @on-click="HandleDetailInit" type="card" ref="currentTab" :animated="false" :value="tabValue">
          <TabPane label="加工贸易账册表头" name="header">
            <div class="form-multab-wrapper-content-head">
              <Row type="flex" justify="center">
                <Col span="24">
                <div class="form-content">
                  <Form :model="formMainData" label-position="left" :label-width="280" :rules="rules">
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem prop="address" label="账册编号">
                        <basicinfo-select v-model="formMainData.emsNo" :url="selectUrl" :parentValue="parentValue" @onchange="emsNoChange"></basicinfo-select>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="主管海关" label-position="top">
                        <Input v-model="formMainData.customCn" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="修改时间" label-position="top">
                        <Input v-model="formMainData.updateTime" disabled></Input>
                      </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="经营单位海关代码" label-position="top">
                        <Input v-model="formMainData.tradeCode" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="经营单位海关名称" label-position="top">
                        <Input v-model="formMainData.tradeName" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="经营单位社会信用代码" label-position="top">
                        <Input type="text" v-model="formMainData.tradeSocialCreditCode" disabled></Input>
                      </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="加工单位海关代码" label-position="top">
                        <Input v-model="formMainData.ownerCode" placeholder disabled />
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="加工单位海关名称" label-position="top">
                        <Input type="text" v-model="formMainData.ownerName" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="加工单位社会信用代码" label-position="top">
                        <Input v-model="formMainData.ownerSocialCreditCode" disabled></Input>
                      </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="申请单位海关代码" label-position="top">
                        <Input v-model="formMainData.declareCode" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="申请单位海关名称" label-position="top">
                        <Input type="text" v-model="formMainData.declareName" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="申请单位社会信用代码" label-position="top">
                        <Input v-model="formMainData.declareSocialCreditCode" placeholder disabled />
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="录入单位海关代码" label-position="top">
                        <Input type="text" v-model="formMainData.inputCode" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="录入单位海关名称" label-position="top">
                        <Input v-model="formMainData.inputName" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="录入单位社会信用代码" label-position="top">
                        <Input v-model="formMainData.inputCreditCode" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="最大周转金额(万美元)" label-position="top">
                        <Input type="text" v-model="formMainData.largeTurnAmount" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="最大进口金额(美元)" label-position="top">
                        <Input v-model="formMainData.maxImgAmount" placeholder disabled />
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="申报单位类型" label-position="top">
                        <Input type="text" v-model="formMainData.declareErTypecn" disabled></Input>
                      </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                      <FormItem label="单耗申报环节" label-position="top">
                        <Input v-model="formMainData.ucnsDclSegcdcn" disabled></Input>
                      </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane label="料件" name="img">
            <img-Page></img-Page>
          </TabPane>
          <TabPane label="成品" name="exg">
            <exg-Page></exg-Page>
          </TabPane>
          <TabPane label="单耗" name="bom">
            <bom-Page></bom-Page>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
  import Vue from "vue";
  import imgPage from "_vbue/bsbookrecord/eRecordInfo/orgImgHistoryPage.vue";
  import exgPage from "_vbue/bsbookrecord/eRecordInfo/orgExgHistoryPage.vue";
  import bomPage from "_vbue/bsbookrecord/eRecordInfo/orgBomHistoryPagey.vue";
  import pagedTable from "_com/paged-table";
  import generalButton from "_com/general-button";
  import basicinfoSelect from "_com/custom-select";
  export default {
    name: "emsRecordInfo",
    components: {
      generalButton,
      pagedTable,
      imgPage,
      exgPage,
      bomPage,
      basicinfoSelect
    },
    data() {
      return {
        formMainData: {
          emsId: "",
          emsNo: "",
          preEmsNo: "",
          copEmsNo: "",
          tradeCode: "",
          tradeName: "",
          tradeSocialCreditCode: "",
          houseNo: "",
          ownerCode: "",
          ownerSocialCreditCode: "",
          ownerName: "",
          declareCode: "",
          declareName: "",
          custom: "",
          customCn: "",
          aDDRESS: "",
          pHONE: "",
          emsType: "",
          emsStatus: "",
          declareStatus: "",
          declareType: "",
          investMode: "",
          ownerType: "",
          declareErType: "",
          emsApprNo: "",
          licenseNo: "",
          lastEmsNo: "",
          corrEmsNo: "",
          contrNo: "",
          idCard: "",
          idCardPwd: "",
          inputEr: "",
          note1: "",
          note2: "",
          nOTE: "",
          emsApprMark: "",
          emsCertify: "",
          modifyMark: "",
          createUser: "",
          fileName: "",
          updateUser: "",
          recordContent: "",
          inputCode: "",
          inputName: "",
          inputCreditCode: "",
          seqNo: "",
          ucnsVernoCntrFlag: "",
          vclrTypecd: "",
          ucnsDclSegcd: "",
          declareSocialCreditCode: "",
          exeMarkcd: "",
          declareTypecn: "",
          declareStatuscn: "",
          emsTypecn: "",
          modifyMarkcn: "",
          ucnsDclSegcdcn: "",
          exeMarkcdcn: "",
          declareErTypecn: "",
          checkFlag: "",
          organizationCode: "",
          usageTypeCd: "",
          checkUser: ""
        },
        rules: {
          name: {
            required: true,
            message: "",
            trigger: "blur"
          }
        },
        validateRule: {
          loginName: {
            required: true,
            message: "登录名称不能为空",
            trigger: "blur"
          }
        },
        parentValue: "",
        selectUrl: "emsrecordinfo/emsnoselect",
        statisticsItem: {},
        tabValue: "header",
        mainServiceName: "user/createUser",
        detailServiceName: "user/createUser",
        // 按钮
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
          }]
        },
        formData: {},
        template: {},
        buttonHandleSetting: {
          // 按钮URL
          serviceName: "user",
          getUrl: "user/getUserList",
          deleteUrl: "user/deleteRange",
          importUrl: "user/importFile",
          exportUrl: "user/exportFile",
          templateUrl: "user/getFileTemplate",
          printUrl: "user/printPdf"
        },
        templateSetting: {
          importType: "业务单明细", //表示多个模板类型
          uploadFileServer: "itRecord",
          uploadFileAction: "itRecord/ImportExcel",
          templateType: "multiple", //multiple 表示多个模板 single 表示单个模板,如果单个模板需要给模板名称
          templateName: "test.xls", //下载单个模板的名字,
          secondRequestUrl: "commons/secondRequest" //store模块路由地址
        },
        // table
        selectRows: [], // 表格选中行
        tableBus: new Vue(),
        serviceName: "user",
        listUrl: "user/getUserList",
        searchModel: {},
        searchItems: [],
        // 是否有统计
        hasShowSummary: false,

        disablePaged: false
      };
    },

    created() {
      // this.buttonBus.$on("prepareEdit", this.prepareEdit);
      // this.buttonBus.$on("requestData", this.handleSearch);
      // this.tableBus.$on("selectedRowsChange", this.selectRowChange);
      // this.tableBus.$on("prepareEdit", this.prepareEdit);
    },
    beforeDestroy() {
      // this.buttonBus.$off("prepareEdit", this.prepareEdit);
      // this.buttonBus.$off("requestData", this.handleSearch);
      // this.tableBus.$off("selectedRowsChange", this.selectRowChange);
      // this.tableBus.$off("prepareEdit", this.prepareEdit);
    },
    methods: {
      handleSearch(data) {
        this.$store.state.user.searchModel = data;
        if (data) this.searchModel = data;
        this.$refs.currentTable.handleSearch(data);
      },
      handleMainSubmit() {
        this.$store
          .dispatch({
            type: "user/createUser",
            data: this.formMainData,
            serviceName: this.mainServiceName
          })
          .then(res => {
            this.$Message.success("保存成功");
          })
          .catch(error => {
            this.$Message.success("保存失败");
          });
      },
      handleDetailSubmit() {
        this.$store
          .dispatch({
            type: "user/updateUser",
            data: this.formDetailData,
            serviceName: this.detailServiceName
          })
          .then(res => {
            this.handleDetailTable();
            this.$Message.success("保存明细成功");
          })
          .catch(error => {
            this.$Message.success("保存明细失败");
          });
      },
      clickTest() {
        this.$Message.success("点击成功");
      },
      prepareEdit(payload) {
        console.log(JSON.stringify(payload));
        this.formDetailData = JSON.parse(JSON.stringify(payload));
      },
      HandleDetailInit(name) {
        if (name === "body") {
          // this.handleDetailTable();
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
        debugger;
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
      },
      emsNoChange(v) {
        let vm = this;
        this.$store
          .dispatch({
            type: "emsRecordInfo/getRecordedHead",
            data: v
          })
          .then(res => {
            debugger;
            vm.formMainData = JSON.parse(JSON.stringify(res.data.data));
          });
      }
    },
    mounted() {
      if (this.$route.query.userForm)
        this.formMainData = JSON.parse(this.$route.query.userForm);

      console.log("formMainData:" + JSON.stringify(this.formMainData));
    },
    watch: {

    }
  };
</script>