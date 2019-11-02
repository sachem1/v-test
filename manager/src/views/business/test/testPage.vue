<template>
  <div style="margin-top:16px;">
    <Divider orientation="left">基础库查询</Divider>
    <Row :offset="32">
      <Col span="12">
        <Input
          width="200"
          v-model="conditionStr"
          search
          enter-button
          placeholder="请选择"
          @on-search="selelctParam"
          @keydown.tab.native="handleGetParamLib"
          @on-focus="handleChanageCode"
        />
      </Col>
    </Row>
    <parameter-lib
      :visible="showModal"
      :title="title"
      :serviceName="serviceName"
      @on-visible-change="onModalVisibleChanged"
      @on-return-result="getResult"
    ></parameter-lib>

    <Divider size="small" orientation="left">基础库下拉框</Divider>
    <span style="width:200px;display:block ">
      <basic-code-select
        v-model="tradeMode"
        :parentValue="'TradeMode'"
        :currentSelectVal="tradeMode"
      ></basic-code-select>
    </span>
    <Divider size="small" orientation="left">多个消息弹窗</Divider>

    <message-modal
      :title="messagetitle"
      :visible="displayMessage"
      :messages="messageArr"
      @on-visible-change="onMessageModalChanged"
    ></message-modal>
    <Button type="default" @click="showMessage">显示消息</Button>

    <Divider size="small" orientation="left">单个消息弹窗</Divider>

    <Button type="info" @click="showSingleMessage('info')">显示单个消息</Button>
    <Button type="success" @click="showSingleMessage('success')">显示成功消息</Button>
    <Button type="warning" @click="showSingleMessage('warning')">显示警告消息</Button>
    <Button type="error" @click="showSingleMessage('error')">显示错误消息</Button>
    <Button type="confirm" @click="confirmMessage">显示确认消息</Button>

    <Divider size="small" orientation="left">--导入模板--</Divider>

    <Button type="default" icon="md-add" @click="showTemplate">获取模板</Button>
    <import-template
      :title="importTitle"
      :visible="displayImport"
      :uploadSetting="uploadSetting"
      @on-visible-change="onImportModalChanged"
    ></import-template>

    <Divider orientation="left">下拉框</Divider>
    <div style="width:300px;">
      <custom-select
        :url="provinceUrl"
        v-model="provinceval"
        :parentValue="parentVal"
        @onchange="changeselect"
      ></custom-select>
    </div>

    <Divider orientation="left">打印</Divider>

    <!-- <print-pdf :fileUrl="pdfUrl"></print-pdf> -->

    <Divider orientation="left"></Divider>
    <Button @click="handleChangeState">change</Button>
    <Divider orientation="left">键盘事件</Divider>
    <div style="width:300px;">
      <Input
        placeholder="键盘事件"
        @keyup.up.native="handlekeyup"
        @keyup.down.native="handlekeydown"
        @keyup.enter.native="handlekeyenter"
        @keydown.tab.native="handlekeytab"
        @keyup.alt.67.native="handleAltC"
      ></Input>
      <input type="text" @keyup.enter="handlekeyenter" />

      <Input type="number" @on-change="calculation" @keydown.tab.native="handlekeytab"></Input>
      <InputNumber @on-change="calculation"></InputNumber>
    </div>
    <br/>
    <br/>
    <br/>
    <!-- 
      如果是在原生控件上加事件 直接  @keyup.enter 
      如果是封装的组件上用 需要加native @keyup.enter.native
    -->
  </div>
</template>
<script>
import util from "_lib/util";
import parameterLib from "_com/modal/parameter-library";
import messageModal from "_com/modal/message-modal";
import importTemplate from "_com/import-tem";
import customSelect from "_com/custom-select";
import printPdf from "_com/print-pdf";
import basicCodeSelect from "_com/custom-select/basic-code-select";

export default {
  components: {
    parameterLib,
    messageModal,
    importTemplate,
    customSelect,
    printPdf,
    basicCodeSelect
  },
  data() {
    return {
      serviceType: "",
      serviceName: "",
      url: "",
      condition: {},
      conditionStr: "",
      showModal: false,
      title: "查询基础库",
      tradeMode: "0",
      messageArr: [],
      messagetitle: "多个消息",
      displayMessage: false,
      importTitle: "核注清单",
      displayImport: false,
      uploadSetting: {
        serviceName: "user",
        importUrl: "user/importFile"
      },
      provinceUrl: "tradeService/getProvinceList",
      provinceval: "",
      parentVal: "",
      pdfUrl: "http://localhost:8080/public/document/testPrint.pdf",
      codeType: "ShipPort",
      key: ""
    };
  },
  methods: {
    selelctParam() {
      this.showModal = true;
    },
    onModalVisibleChanged(newValue) {
      this.showModal = newValue;
    },
    onMessageModalChanged(newValue) {
      this.displayMessage = newValue;
    },
    onImportModalChanged(newValue) {
      this.displayImport = newValue;
    },
    getResult(result) {
      this.condition = JSON.parse(result);
      this.conditionStr = this.condition.nameCn;
    },
    handleChanageCode() {
      if (this.condition !== undefined) this.conditionStr = this.condition.code;
    },
    showMessage() {
      this.displayMessage = true;
      this.messageArr = [
        { code: 1, message: "错误内容" },
        { code: 0, message: "返回成功" }
      ];
    },
    showSingleMessage(type, title1, content1) {
      const title = title1 ? title1 : "保存进口核注清单";
      const content = content1
        ? content1
        : "单个测试显示的消息是否够多单个测试显示的消息是否够多,够不够多够多够多够多够多够多够不够多够多够多够多够多够多消息提示";
      util.singleMessage(
        this,
        title,
        "监管方式不能为空 <br/> 运输方式不能为空 <br/>  主管海关不能为空 <br/>  启运国不能为空  <br/>进/出境关别不能为空",
        type
      );
    },
    confirmMessage() {
      const title = "确认要删除进口核注清单?";
      const content = "是的,需要删除,立刻!";

      this.$Modal.confirm({
        title: title,
        content: content
      });
    },
    showTemplate() {
      this.displayImport = true;
    },
    handleChangeState() {},
    handlekeyup() {
      console.log("向上键");
    },
    handlekeydown() {
      console.log("向下键");
    },
    handlekeyenter() {
      console.log("enter");
    },
    handlekeytab() {
      console.log("tab");
    },
    handleAltC() {
      console.log("alt+c");
    },
    handleGetParamLib() {
      let data = { codeType: this.codeType, key: this.conditionStr };
      let vm = this;
      vm.$store
        .dispatch({
          type: "commons/getParameterLibByCode",
          data: data
        })
        .then(res => {
          vm.condition = res;
          if (vm.condition !== undefined) vm.conditionStr = vm.condition.NameCn;
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeselect() {
      console.log(111);
    },
    calculation() {
      console.log(222);
    }
  }
};
</script>
