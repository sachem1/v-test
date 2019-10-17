<template>
  <div style="margin-top:16px;">
    <Row :offset="32">
      <Col span="12">
        <Input width="200" v-model="condition" search enter-button placeholder="请选择" @on-search="selelctParam" />
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
  </div>
</template>
<script>
import parameterLib from "_com/modal/parameter-library";

export default {
  components: {
    parameterLib
  },
  data() {
    return {
      serviceType: "",
      serviceName: "",
      url: "",
      condition: "",
      showModal: false,
      title: "查询基础库"
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
    getResult(result){
        debugger;
        this.condition=result;
    }
  }
};
</script>
