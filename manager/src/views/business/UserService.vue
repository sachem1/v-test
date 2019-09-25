<template>
  <div class>
    <div class="searchForm-wapper">
      <Card>
        <!-- search -->
        <Form ref="searchForm" :label-width="150" :model="searchForm" :rules="ruleInline" inline>
          <Row>
            <i-col span="8">
              <FormItem prop="name" label="名称">
                <Input type="text" v-model="searchForm.name" placeholder="名称"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem prop="age" label="年龄">
                <Input type="text" v-model="searchForm.age" placeholder="年龄"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem prop="Address" label="地址">
                <Input type="text" v-model="searchForm.Address" placeholder="地址"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row class="search">
            <i-col>
              <Button type="primary" @click="handleSearch('searchForm')">查询</Button>
            </i-col>
          </Row>
        </Form>
      </Card>
    </div>
    <!--pagetable-->
    <div>
      <paged-table
        ref="testTable"
        :enums="commonEnums"
        :serviceName="serviceName"
        :listUrl="listUrl"
        :searchModel="searchModel"
        :searchItems="searchItems"
        :columns="columns"
        :TableData="TableData"
        :bus="bus"
        :addBehaviorSetting="addBehaviorSetting"
        :title="tableTitle"
        :disableImportExport="disableImportExport"
        :disableAdd="disableAdd"
        :disableBatchDelete="disableBatchDelete"
        @on-request-inline-page="handleInlinePageRequest"
      ></paged-table>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { mapActions } from "vuex";
import pagedTable from "@/views/components/paged-table";

export default {
  name: "user_data",
  components: {
    pagedTable
  },
  data() {
    return {
      searchForm: {
        name: "",
        Address: "",
        age: ""
      },
      ruleInline: {
        name: {
          required: true,
          message: "姓名为搜索必填项",
          trigger: "blur"
        }
      },
      columns: [
        { type: "selection", width: 60, align: "center" },
        { title: "姓名", width: 200, key: "Name", align: "center" },
        { title: "年龄", width: 100, key: "Age", align: "center" },
        { title: "地址", width: 300, key: "Address", align: "center" },
        { title: "账号", width: 200, key: "UserName", align: "center" },
        { title: "密码", key: "Password", align: "center" }
      ],
      TableData: [
        {
          Name: "31313",
          Address: "闵行101大道",
          Age: 30,
          UserName: "30",
          Password: "123"
        },
        {
          Name: "张三",
          Address: "闵行101大道",
          Age: 30,
          UserName: "abdc",
          Password: "123"
        },
        {
          Name: "李四",
          Address: "闵行101大道",
          Age: 30,
          UserName: "afdsbc",
          Password: "123"
        },
        {
          Name: "王五",
          Address: "闵行101大道",
          Age: 30,
          UserName: "aerebc",
          Password: "123"
        }
      ],
      operationMode: null,
      entityName: "",
      serviceName: "user",
      listUrl: "user/getPaged",
      pageIndex: 1,
      TotalCount: 0,
      searchModel: {},
      showModalForm: false,
      showChildModalForm: false,
      modal_loading: false,
      defaultModel: {},
      editingModel: {},
      validateRules: {},
      commonEnums: {},
      selectedRows: [],
      formItems: [],
      searchItems: [],
      bus: new Vue(),
      childFormTitle: " ",
      addBehaviorSetting: {},
      tableTitle: null,
      disableImportExport: false,
      autoClose: true,
      disableAdd: false,
      disableBatchDelete: false
    };
  },
  methods: {
    ...mapActions({
      UserList: "getUserList"
    }),
    handleGetPaged() {
      let data = this.searchForm;
      this.UserList(data)
        .then(res => {
          debugger;
          console.log(JSON.stringify(res));
          this.TableData = res.data.items;
          this.TotalCount = res.data.totalCount;          
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    },
    handleSearch() {
      this.handleGetPaged();
    },
    handleInlinePageRequest(payload) {
      this.$emit("on-request-inline-page", payload);
    },
    init() {
      debugger;
      this.handleGetPaged();
    },
    created() {
      this.init();
      this.bus.$on("prepareAdd", this.prepareAdd);
      this.bus.$on("prepareEdit", this.prepareEdit);
    },
    beforeDestroy() {
      this.bus.$off("prepareAdd", this.prepareAdd);
      this.bus.$off("prepareEdit", this.prepareEdit);
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
</style>