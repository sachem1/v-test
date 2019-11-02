<template>
  <Select v-model="parameterValue" filterable>
    <Option v-for="item in dataList" :value="item.code" :label="item.nameCn" :key="item.code">
      {{ item.code }}
      <span style="float:right;color:#333">{{item.nameCn}}</span>
    </Option>
  </Select>
</template>

<script>
import axios from "_lib";
import util from "_lib/util";
import { forEach } from "_lib/tools";
export default {
  name: "hgParameterSelect",
  props: {
    url: {
      type: String,
      default: "Cache/GetHgCacheList"
    },
    parentValue: String,
    hasAll: Boolean,
    selectVal: String
  },
  watch: {
    selectVal: function(newVal, oldVal) {
      this.parameterValue = newVal;
    },
    parameterValue: function(newVal, oldVal) {
      this.$emit("update:selectVal", newVal);
    }
  },
  data() {
    return {
      parameterValue: this.selectVal,
      dataList: []
    };
  },
  mounted() {
    this.initSelectData();
  },
  methods: {
    initSelectData() {
      let data = { ct: this.parentValue };
      let list = [];
      axios
        .request({
          url: this.url,
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