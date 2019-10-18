<template>
  <div>
    <div>
      <!-- 查詢 -->
      <Card>
        <Form ref="searchForm" :label-width="100" :model="searchForm" :rules="searchRules" inline>
          <Row>
            <i-col span="8">
              <FormItem prop="Name" label="名称1">
                <Input type="text" v-model="searchForm.Name" placeholder="名称"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem prop="Address" label="地址">
                <Input type="text" v-model="searchForm.Address" placeholder="地址"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem prop="Age" label="年齡">
                <Input type="text" v-model="searchForm.Age" placeholder="年齡"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col>
              <Button icon="android-search" type="primary" @click="handleSearch()">查询</Button>
            </i-col>
          </Row>
        </Form>
      </Card>
      <div>
        <!-- create -->
        <user-Create
          :editForm="formData"
          :autoClose="autoClose"
          :visible="showModalForm"
          :validateRules="validateRules"
          :operationMode="operationMode"
          :title="formTitle"
          @on-visible-change="onMainFormVisibleChanged"
          @on-model-change="onMainFormSaved"
        ></user-Create>
      </div>
      <div>
        <paged-table
          ref="currentTable"
        :enums="commonEnums"
        :serviceName="serviceName"
        :listUrl="listUrl"
        :searchModel="searchForm"
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
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import pagedTable from "@/views/components/paged-table";
import userCreate from "@/views/business/test/userCreate.vue";

export default {
  name: "Test1",
  components: {
    pagedTable,
    userCreate
  },
  data() {
    return {
      searchForm: {
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
        { type: "selection", width: 60, align: "center", fixed: "left" },
        {
          title: "姓名",
          width: 200,
          key: "Name",
          align: "center",
          fixed: "left"
        },
        { title: "年龄", width: 100, key: "Age", align: "center" },
        { title: "地址", width: 300, key: "Address", align: "center" },
        { title: "账号", width: 500, key: "LoginName", align: "center" },
        { title: "密码", width: 200, key: "Password", align: "center" }
      ],
      TableData: [],
      TableHeight: 300,
      TableWidth: 500,
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
      disablePaged: false,
      displayAccordion: "1"
    };
  },
  mounted() {
    this.handleSearch();
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
      console.log("showModalForm:" + newValue);
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