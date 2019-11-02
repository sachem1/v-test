<template>
  <div>
    <Select
      v-model="selectVal"
      filterable
      @on-change="getValue "
      :disabled="disabled"
      :class="isRequired?'ivu-required':''"
    >
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
    hasAll: {
      type: Boolean,
      default: true
    },
    currentSelectVal: String,
    isRequired: {
      type: Boolean,
      default: false
    },
    disabled: Boolean
  },
  data() {
    return {
      selectVal: "",
      dataList: []
    };
  },
  mounted() {
    this.initSelectData();
    if (this.currentSelectVal) this.selectVal = this.currentSelectVal;
    this.$emit("onmounted", this.currentSelectVal);
  },
  watch: {
    currentSelectVal: function(val) {
      if(this.currentSelectVal)
        this.selectVal = val;
    }
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
          if (this.hasAll) {
            list.push({ label: "请选择", value: "---" });
          }
          forEach(data, el => {
            if (el.isSelected) {
              this.selectVal = el.value;
            }
            list.push(el);
          });
          this.dataList = list;
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    getValue(val) {
      if (val === "---") {
        val = "";
      }
      this.$emit("input", val);
      this.$emit("onchange", val);
    }
  }
};
</script>