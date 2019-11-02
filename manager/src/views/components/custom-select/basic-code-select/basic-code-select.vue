<template>
  <div>
    <Select
      v-model="selectVal"
      filterable
      @on-change="getValue"
      :class="isRequired?'ivu-required':''"
    >
      <Option v-for="item in dataList" :value="item.code" :label="item.nameCn" :key="item.code">
        {{ item.code }}
        <span style="float:right">{{ item.nameCn }}</span>
      </Option>
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
      default: "Cache/GetHgCacheList"
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
      console.log(val);
      this.selectVal = val;
    }
  },
  methods: {
    initSelectData() {
      let list = [];
      axios
        .request({
          url: this.url,
          params: { ct: this.parentValue },
          method: "get"
        })
        .then(res => {
          var data = util.wrapResult(res);
          if (this.hasAll) {
            list.push({ nameCn: "请选择", code: "---" });
          }
          forEach(data, el => {
            if (el.isSelected) {
              this.selectVal = el.value;
            }
            if (el.code) list.push(el);
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