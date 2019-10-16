<template>
  <div class>
    <div class="searchModel-wapper">
        <Collapse accordion v-model="displayAccordion">
         <Panel name="1">
            查询
            <div slot="content">
      <Card>
        <Form ref="searchModel" :label-width="100" :model="searchModel" :rules="searchRules" inline>
          <Row>
            <i-col :xs="2" :sm="4" :md="6" :lg="8">
              <FormItem prop="Name" label="名称">
                <Input type="text" v-model="searchModel.Name" placeholder="名称"></Input>
              </FormItem>
            </i-col>
            <i-col :xs="2" :sm="4" :md="6" :lg="8" >
              <FormItem prop="Age" label="年龄">
                <Input type="text" v-model="searchModel.Age" placeholder="年龄"></Input>
              </FormItem>
            </i-col>
            <i-col :xs="2" :sm="4" :md="6" :lg="8">
              <FormItem prop="Address" label="地址">
                <Input type="text" v-model="searchModel.Address" placeholder="地址"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col :xs="2" :sm="4" :md="6" :lg="8">
              <FormItem prop="Name" label="名称">
                <Input type="text" v-model="searchModel.Name" placeholder="名称"></Input>
              </FormItem>
            </i-col>
            <i-col :xs="2" :sm="4" :md="6" :lg="8" >
              <FormItem prop="Age" label="年龄">
                <Input type="text" v-model="searchModel.Age" placeholder="年龄"></Input>
              </FormItem>
            </i-col>
            <i-col :xs="2" :sm="4" :md="6" :lg="8">
              <FormItem prop="Address" label="地址">
                <Input type="text" v-model="searchModel.Address" placeholder="地址"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row class="search">
            <i-col>
              <Button icon="android-search" type="primary" @click="handleSearch()">查询</Button>
            </i-col>
          </Row>
        </Form>
      </Card>
       </div>
        </Panel>
       
      </Collapse>
    </div>
    <!--pagetable-->
    <div>
      <paged-table
        ref="currentTable"
        :enums="commonEnums"
        :serviceName="serviceName"
        :listUrl="listUrl"
        :searchModel="searchModel"
        :searchItems="searchItems"
        :columns="columns"
        :TableData="TableData"
        :TableHeight="TableHeight"
        :TableWidth="TableHeight"
        :bus="bus"
        :addBehaviorSetting="addBehaviorSetting"
        :title="tableTitle"
        :disableImportExport="disableImportExport"
        :disableAdd="disableAdd"
        :disableBatchDelete="disableBatchDelete"
        :disableEdit="disableEdit"
        :disablePaged="disablePaged"
        @on-request-inline-page="handleInlinePageRequest"
      ></paged-table>
    </div>
    <user-create      
	  :editForm="formData"
      :autoClose="autoClose"
      :visible="showModalForm"
      :validateRules="validateRules"
      :operationMode="operationMode"
      :title="formTitle"
      @on-visible-change="onMainFormVisibleChanged"
      @on-model-change="onMainFormSaved"
    ></user-create>
  </div>
</template>
<script>
import Vue from "vue";
import pagedTable from "@/views/components/paged-table";

import userCreate from "@/views/business/test/userCreate.vue";

export default {
  name: "user_data",
  components: {
    pagedTable,
    userCreate
  },
  data() {
    return {
      searchModel: {
        Name: "",
        Address: "",
        Age: ""
      },
      formData: {
        Name: "",
        Address: "",
        Age: null,
        LoginName: "",
        Password: ""
      },
      searchRules: {
        name: {
          required: true,
          message: "姓名为搜索必填项",
          trigger: "blur"
        }
      },
      columns: [
        { type: "selection", width: 60, align: "center"},
        { title: "姓名", width: 200, key: "Name", align: "center"},
        { title: "年龄", width: 100, key: "Age", align: "center" },
        { title: "地址", width: 300, key: "Address", align: "center" },
        { title: "账号", width: 500, key: "LoginName", align: "center" },
        { title: "密码",width: 200, key: "Password", align: "center" }
      ],
      TableData: [],
      TableHeight:300,
      TableWidth:500,
      operationMode: null,
      entityName: "",
      serviceName: "user",
      listUrl: "user/getUserList",
      pageIndex: 1,
      TotalCount: 0,
      showModalForm: false,
      showChildModalForm: false,
      modal_loading: false,
      editingModel: {},
      validateRules: {},
      commonEnums: {},
      selectedRows: [],
      formItems: [],
      searchItems: [],
      bus: new Vue(),
      childFormTitle: " ",
       addBehaviorSetting: {
        routeName: "userTab",
        routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }
        ]
      },
      tableTitle: null,
      formTitle: "",
      disableImportExport: false,
      autoClose: true,
      disableAdd: false,
      disableEdit: false,
      disableBatchDelete: false,
      disablePaged:false,
      displayAccordion:'1'
    };
  },
  created() {
    this.init();
    this.bus.$on("prepareAdd", this.prepareAdd);
    this.bus.$on("prepareEdit", this.prepareEdit);
  },
  mounted() {
    this.handleSearch();
  },
  watch: {
    searchModel: function(newValue) {
      this.searchModel = [];
      newValue.map(item => {
        this.searchModel.push();
      });
      this.searchModel = newValue;
    }
  },
  beforeDestroy() {
    this.bus.$off("prepareAdd", this.prepareAdd);
    this.bus.$off("prepareEdit", this.prepareEdit);
  },
  methods: {
    handleSearch() {
      this.$refs.currentTable.handleSearch();
    },
    handleInlinePageRequest(payload) {
      this.$emit("on-request-inline-page", payload);
    },
    init() {},
    onMainFormVisibleChanged(newValue) {
      this.showModalForm = newValue;
    },
    prepareAdd() {
      this.showModalForm = true;
      this.operationMode = "create";
      this.formTitle = "创建";
    },
    prepareEdit(payload) {
      this.operationMode = "edit";
      this.formData = JSON.parse(JSON.stringify(payload));
      this.showModalForm = true;
      this.formTitle = "编辑";
    },
    onMainFormSaved(newModel) {
      this.bus.$emit("on-data-changed");
    }
  }
};
</script>

<style lang='less'>
.search {
  text-align: center;
  .btn {
    margin-left: 0;
  }
}
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.searchModel-wapper{
  .ivu-input{
    height:25px;
  }
  .ivu-row{
    padding: 1px 0;
  }
}
</style>