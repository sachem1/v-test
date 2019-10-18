<template>
  <div style="margin-top:16px;">
    <Divider orientation="left">基础库查询</Divider>
    <Row :offset="32">
      <Col span="12">
        <Input
          width="200"
          v-model="condition"
          search
          enter-button
          placeholder="请选择"
          @on-search="selelctParam"
        />
      </Col>
    </Row>
    <parameter-lib
      :visible="showModal"
      :title="title"
      :serviceName="serviceName"
      :url="url"
      :serviceType="serviceType"
      @on-visible-change="onModalVisibleChanged"
      @on-return-result="getResult"
    ></parameter-lib>

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

    <Divider size="small" orientation="left">--导入模板--</Divider>
    
  </div>
</template>
<script>
import util from '_lib/util';
import parameterLib from "_com/modal/parameter-library";
import messageModal from "_com/modal/message-modal";

export default {
  components: {
    parameterLib,
    messageModal
  },
  data() {
    return {
      serviceType: "",
      serviceName: "",
      url: "",
      condition: "",
      showModal: false,
      title: "查询基础库",
      messageArr: [],
      messagetitle: "多个消息",
      displayMessage: false
    };
  },
  methods: {
    selelctParam() {
      this.showModal = true;
      console.log(this.showModal);
    },
    onModalVisibleChanged(newValue) {
      this.showModal = newValue;
    },
    onMessageModalChanged(newValue) {
      this.displayMessage = newValue;
    },
    getResult(result) {
      debugger;
      this.condition = result;
    },
    showMessage() {
      this.displayMessage = true;
      this.messageArr = [
        { code: 1, message: "错误内容" },
        { code: 0, message: "返回成功" }
      ];
    },
    showSingleMessage(type, title1, content1) {
      const title = title1 ? title1 : "消息标题";
      const content = content1 ? content1 : "单个消息提示";
     util.singleMessage(this,title,content,type);
    }
  }
};
</script>
