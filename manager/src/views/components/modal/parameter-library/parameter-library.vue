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
            <Button type="default" icon="ios-arrow-dropleft" @click="handleSearch">上一个</Button>
            <Button type="default" icon="ios-arrow-dropright" @click="handleCancel">下一个</Button>
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
            @on-row-click="clickCurrentRow"
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
    url: String,
    serviceType: String,
    title: String,
    visible: Boolean
  },
  data() {
    return {
      condition: "",
      selectedRow: {},
      currentIndex: 0,
      columns: [
        {
          title: "标准代码",
          key: "code",
          width: 100,
          align: "center"
        },
        {
          title: "cn标准名称",
          key: "name",
          width: 200,
          align: "center"
        },
        {
          title: "en标准名称",
          key: "enName",
          align: "center",
           width: 300,
        }
      ],
      tabledata: [
        {
          code: 110,
          name: "John Brown",
          enName: "New York"
        },
        {
          code: 1114,
          name: "df Brown",
          enName: "New York"
        },
        {
          code: 1123,
          name: "fd Brown",
          enName: "New York"
        },
        {
          code: 1102,
          name: "John Brown",
          enName: "New York"
        },
        {
          code: 1151,
          name: "df Brown",
          enName: "New York"
        },
        {
          code: 1412,
          name: "fd Brown",
          enName: "New York"
        },
        {
          code: 1180,
          name: "John Brown",
          enName: "New York"
        },
        {
          code: 1161,
          name: "df Brown",
          enName: "New York"
        },
        {
          code: 1152,
          name: "fd Brown",
          enName: "New York"
        },
        {
          code: 1130,
          name: "John Brown",
          enName: "New York"
        },
        {
          code: 1141,
          name: "df Brown",
          enName: "New York"
        },
        {
          code: 1132,
          name: "fd Brown",
          enName: "New York"
        }
      ]
    };
  },
  methods: {
    handleCancel() {
      this.$emit("on-visible-change", false);
      this.$emit("on-model-change", this.$refs.libTable.selection);
    },
    handleSearch() {
      //加载数据
      this.$store.dispatch({
           type: "api/getChildrenSystem",
            paramName: ''
      }).then(res=>{
          this.tabledata=JSON.parse(res.data);
      }).catch(err=>{
        this.$Message.error(err);
      })
    },
    handleConfirm(){
      var d = JSON.stringify(this.selectedRow);
      this.$emit("on-return-result", d);
      this.handleCancel();
    },
    handleSearchEmpty() {
      var d = JSON.stringify({});
      this.$emit("on-return-result", d);
      this.handleCancel();
    },
    autoSearchResult() {
      console.log(this.condition);
      var condi = this.condition;
      var table_Data = this.$refs.libTable.objData;
      for (let i in table_Data) {
        var item = table_Data[i];
        if (item.code + "" === condi || item.name === condi) {
          debugger;
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
      console.log(JSON.stringify(this.selectedRow));
    },
    clickCurrentRow(rowData, index) {
      this.currentIndex = index;
      let re = this.$refs.selection;
      this.selectedRow=rowData;
      console.log(JSON.stringify(rowData));
    }
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    }
  },
};
</script>

<style>
</style>