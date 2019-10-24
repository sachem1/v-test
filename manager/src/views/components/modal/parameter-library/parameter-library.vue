<template>
  <div class="parameter-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="750"
      :mask-closable="false"
      @on-ok="handleSearch"
      @on-cancel="handleCancel"
      class-name="vertical-center-modal"
      scrollable
    >
      <div class="parameter-wrapper-header">
        <Row>
          <Col :sm="24" :md="24" :lg="6">
            <Input search placeholder="输入搜索条件" v-model="condition" @on-change="autoSearchResult" />
          </Col>
          <Col :sm="24" :md="24" :lg="18" style="text-align:center">
            <Button type="default" icon="ios-arrow-dropleft" @click="handlePrev">上一个</Button>
            <Button type="default" icon="ios-arrow-dropright" @click="handleNext">下一个</Button>
          </Col>
        </Row>
      </div>
      <div class="parameter-wrapper-content">
        <div class="pagetable">
          <Table
            :height="300"
            ref="libTable"
            border
            :columns="columns"
            :data="tabledata"
            :loading="loading"
            @on-row-click="clickCurrentRow"
            @keyup.up.native="handlePrev"
            @keyup.down.native="handleNext"
          ></Table>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" icon="md-checkmark-circle-outline" @click="handleConfirm">确认</Button>
        <Button type="default" icon="ios-redo-outline" @click="handleCancel">取消</Button>
        <Button type="info" icon="ios-log-out" @click="handleSearchEmpty">返回空值</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "_lib";

export default {
  name: "parameter_lib",
  components: {},
  props: {
    serviceName: String,
    url: {
      type: String,
      default: "Code/GetHgCacheList?ct="
    }, //请求的 api 地址
    codeType: { type: String, default: "ShipPort" }, //代码类型CodeType
    title: String, //弹窗标题
    visible: Boolean,
    columnList: Array
  },
  data() {
    return {
      condition: "",
      selectedRow: {},
      currentIndex: 0,
      loading: true,
      columns: [
        {
          title: "标准代码",
          key: "code",
          width: 100,
          align: "center"
        },
        {
          title: "标准名称",
          key: "nameCn",
          width: 200,
          align: "center"
        },
        {
          title: "海关代码",
          key: "hgCode",
          align: "center",
          width: 100
        },
        {
          title: "海关名称",
          key: "hgNameCn",
          align: "center",
          width: 200
        },
        {
          title: "检验检疫代码",
          key: "ciqCode",
          align: "center",
          width: 100
        },
        {
          title: "检验检疫名称",
          key: "ciqNameCn",
          align: "center",
          width: 200
        }
      ],
      tabledata: []
    };
  },
  methods: {
    handleCancel() {
      this.$emit("on-visible-change", false);
      this.$emit("on-model-change", this.$refs.libTable.selection);
    },
    handleSearch() {
      console.log(1);
      this.loading = true;
      var data = {
        url: this.url + this.codeType,
        codeType: this.codeType
      };
      this.$store.state.commons.codeType = this.codeType;
      //加载数据
      this.$store
        .dispatch({
          type: "commons/getParameterLib",
          data
        })
        .then(res => {
          this.tabledata = res;
          this.loading = false;
        })
        .catch(err => {
          this.$Message.error(err);
        });
    },
    handleNext() {
      let index = this.currentIndex;
      this.handleTableSelect(index + 1, index);
      this.currentIndex = index + 1;
    },
    handlePrev() {
      let index = this.currentIndex;
      this.handleTableSelect(index - 1, index);
      this.currentIndex = index - 1;
    },
    handleConfirm() {
      var res = JSON.stringify(this.selectedRow);
      this.$emit("on-return-result", res);
      this.handleCancel();
    },
    handleSearchEmpty() {
      var data = JSON.stringify({});
      this.$emit("on-return-result", data);
      this.handleCancel();
    },
    autoSearchResult() {
      console.log("autoSearchResult");
      var condi = this.condition;
      var table_Data = this.$refs.libTable.objData;
      for (let i in table_Data) {
        var item = table_Data[i];
        if (item.code + "" === condi || item.name === condi) {
          item._isChecked = true;
          item._isHighlight = true;
          this.selectedRow = this.tabledata[i];
          break;
        } else {
          item._isChecked = false;
          item._isHighlight = false;
          this.selectedRow = {};
        }
      }
    },
    handleTableSelect(index, orgIndex) {
      if (index < 0) index = 0;
      if (orgIndex < 0) orgIndex = 0;
      var table_Data = this.$refs.libTable.objData;
      table_Data[orgIndex]._isHighlight = false;
      table_Data[index]._isHighlight = true;
      this.selectedRow = table_Data[index];
    },
    clickCurrentRow(rowData, index) {
      this.selectedRow = rowData;
      this.$refs.libTable.objData[index]._isHighlight = true;
      this.$refs.libTable.objData[this.currentIndex]._isHighlight = false;
      this.currentIndex = index;
      console.log(JSON.stringify(rowData));
    }
  },
  computed: {
    visibleForBind: function() {
      console.log(2);
      return this.visible;
    }
  },
  watch: {
    columnList: function(newValue) {
      this.columns = newValue;
    },
    visible: function(params) {
      if (params) {
        this.handleSearch();
      }
    }
  }
};
</script>

<style scoped lang='less'>
.parameter-wrapper {
  &-header {
    font-size: 14px;
  }

  &-content {
    .ivu-table-row-highlight {
      background: red !important;
    }

    .current-row > td {
      background: red !important;
    }
  }
}
</style>