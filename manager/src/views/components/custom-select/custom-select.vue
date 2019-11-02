<template>
  <div>
    <Select
      v-model="selectVal"
      filterable
      @on-change="getValue"
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
    url: String,
    parentValue: String,
    hasAll: {
      type: Boolean,
      default: true
    },
    currentSelectVal: String,
    isRequired: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectVal: "",
      dataList: []
    };
  },
  mounted() {
    this.initSelectData();
    this.$emit("onmounted", this.currentSelectVal);
  },
  watch: {
    currentSelectVal: function(val) {
      this.selectVal = val;
    }
  },
  methods: {
    initSelectData() {
      let list = [];
      axios
        .request({
          url: this.url,
          data: { parentValue: this.parentValue },
          method: "post"
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