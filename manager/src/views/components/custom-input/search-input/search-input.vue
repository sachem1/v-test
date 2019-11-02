<template>
  <div>
    <Input
      v-model="conditionStr"
      search
      enter-button
      placeholder="请选择"
      @on-search="selelctParam"
      @keydown.tab.native="handleGetParamLib"
      @on-focus="handleChanageCode"
    />

    <parameter-lib
      :visible="showModal"
      :title="title"
      @on-visible-change="onModalVisibleChanged"
      @on-return-result="getResult"
    ></parameter-lib>
  </div>
</template>

<script>
import parameterLib from "_com/modal/parameter-library";

export default {
  name: "custom_input",
  components: { parameterLib },
  data() {
    return {
      condition: {},
      conditionStr: "",
      showModal: false,
      title: "查询基础库"
    };
  },
  props: {
    codeType: { type: String, default: "ShipPort" }, //代码类型CodeType
    customInputValue: String
  },
  methods: {
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
    handleChanageCode() {
      if (this.condition !== undefined) this.conditionStr = this.condition.code;
    },
    selelctParam() {
      this.showModal = true;
    },
    getResult(result) {
      this.condition = JSON.parse(result);
      this.conditionStr = this.condition.nameCn;
    },
    handleChanageCode() {
      if (this.condition !== undefined) this.conditionStr = this.condition.code;
    },
    onModalVisibleChanged(newValue) {
      this.showModal = newValue;
    }
  },
  mounted() {
    this.conditionStr = this.customInputValue;
    this.handleGetParamLib();
  }
};
</script>

<style>
</style>