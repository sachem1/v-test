<template>
  <div>
    <Select v-model="selectVal" filterable @on-change="getValue">
      <Option v-for="item in dataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>

<script>
import axios from "_lib";
import util from "_lib/util";
import { forEach } from "_lib/tools";
export default {
  name: "custom_select",
  props: {
    url: {
      type: String,
      default: "baseCode/codeList"
    },
    parentValue: String,
    hasAll: Boolean
  },
  data() {
    return {
      selectVal: "",
      dataList: []
    };
  },
  mounted() {
    this.initSelectData();
  },
  methods: {
    initSelectData() {
      let data = { codeType: this.parentValue };
      let list = [];
      axios
        .request({
          url: "baseCode/codeList",          
          params: data,
          method: "get"
        })
        .then(res => {
          var data = util.wrapResult(res);
          forEach(data, el => {
            list.push(el);
          });
        })
        .catch(err => {
          this.$Message.error(err);
        });
      this.dataList = list;
    },
    getValue(val) {
      this.$emit("input", val);
    }
  }
};
</script>