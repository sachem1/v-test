<template>
  <div class="form-multab-wrapper">
    <Card>
      <div class="form-multab-wrapper-header-button">
        <Button type="primary" icon="md-add">新增</Button>
        <Button type="info" icon="md-print">打印</Button>
        <Button type="info" icon="md-cloud-upload">导出</Button>
      </div>
    </Card>
    <Card>
      <div class="form-multab-wrapper-content">
        <Tabs @on-click="HandleDetailInit" type="card" ref="currentTab" :animated="false">
          <TabPane label="表头" name="header" icon="md-document">
            <Row type="flex" justify="center">
              <Col span="24">
                <div class="form-content">
                  <Form
                    :model="formMainData"
                    label-position="left"
                    :label-width="100"
                    :rules="rules"
                  >
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top" prop="name">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="登录名称" label-position="top">
                          <Input v-model="formMainData.loginName"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="密码" label-position="top">
                          <Input v-model="formMainData.password"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="创建时间" label-position="top">
                          <DatePicker
                            size="small"
                            :value="formMainData.createDate"
                            transfer
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder
                          ></DatePicker>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="登录名称" label-position="top">
                          <Input v-model="formMainData.loginName"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="密码" label-position="top">
                          <Input v-model="formMainData.password"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="登录名称" label-position="top">
                          <Input v-model="formMainData.loginName"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="密码" label-position="top">
                          <Input v-model="formMainData.password"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="登录名称" label-position="top">
                          <Input v-model="formMainData.loginName"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="密码" label-position="top">
                          <Input v-model="formMainData.password"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="登录名称" label-position="top">
                          <Input v-model="formMainData.loginName"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="密码" label-position="top">
                          <Input v-model="formMainData.password"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="登录名称" label-position="top">
                          <Input v-model="formMainData.loginName"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="密码" label-position="top">
                          <Input v-model="formMainData.password"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="登录名称" label-position="top">
                          <Input v-model="formMainData.loginName"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="密码" label-position="top">
                          <Input v-model="formMainData.password"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="姓名" label-position="top">
                          <Input v-model="formMainData.name" placeholder />
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="年龄" label-position="top">
                          <Input type="number" v-model="formMainData.age"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="登录名称" label-position="top">
                          <Input v-model="formMainData.loginName"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="密码" label-position="top">
                          <Input v-model="formMainData.password"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="地址" label-position="top">
                          <Input type="text" v-model="formMainData.address"></Input>
                        </FormItem>
                      </Col>
                      <Col :sm="24" :md="12" :lg="8">
                        <FormItem label="备注" label-position="top">
                          <Input type="text" v-model="formMainData.remark"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
            <Row justify="center">
              <Col span="24">
                <div class="form-button">
                  <Button type="primary" @click="handleMainSubmit">保存</Button>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="表体" name="body" icon="ios-card-outline">
            <Row>
              <Row type="flex">
                <Col span="24">
                  <div class="form-content">
                    <Card>
                      <Form
                        ref="formDetailData"
                        :model="formDetailData"
                        label-position="left"
                        :label-width="110"
                      >
                        <Row>
                          <Col :sm="24" :md="12" :lg="8">
                            <FormItem label="姓名" label-position="top" prop="name">
                              <Input v-model="formDetailData.name" placeholder />
                            </FormItem>
                          </Col>
                          <Col :sm="24" :md="12" :lg="8">
                            <FormItem label="年龄" label-position="top">
                              <Input type="number" v-model="formDetailData.age"></Input>
                            </FormItem>
                          </Col>
                          <Col :sm="24" :md="12" :lg="8">
                            <FormItem label="登录名称" label-position="top">
                              <Input v-model="formDetailData.loginName"></Input>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col :sm="24" :md="12" :lg="8">
                            <FormItem label="密码" label-position="top">
                              <Input v-model="formDetailData.password"></Input>
                            </FormItem>
                          </Col>
                          <Col :sm="24" :md="12" :lg="8">
                            <FormItem label="地址" label-position="top">
                              <Input type="text" v-model="formDetailData.address"></Input>
                            </FormItem>
                          </Col>
                          <Col :sm="24" :md="12" :lg="8">
                            <FormItem label="创建时间" label-position="top">
                              <DatePicker
                                size="small"
                                :value="formDetailData.createDate"
                                transfer
                                format="yyyy-MM-dd"
                                type="date"
                                placeholder
                              ></DatePicker>
                            </FormItem>
                          </Col>
                        </Row>
                        <Row justify="center">
                          <Col span="24">
                            <div class="form-button">
                              <Button
                                type="primary"
                                @click="handleDetailSubmit"
                                icon="md-thunderstorm"
                              >保存</Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </Card>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="list-search">
                    <user-search @searchList="handleSearch"></user-search>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="button-wrapper">
                    <general-button
                      ref="currentButton"
                      :buttonBus="buttonBus"
                      :displayAdd="displayAdd"
                      :displayEdit="displayEdit"
                      :displayBatchDelete="displayBatchDelete"
                      :displayImportExport="displayImportExport"
                      :routerSetting="addBehaviorSetting"
                      :selectedRows="selectRows"
                      :buttonHandleSetting="buttonHandleSetting"
                    ></general-button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <paged-table
                    ref="currentTable"
                    :bus="tableBus"
                    :serviceName="serviceName"
                    :listUrl="listUrl"
                    :searchModel="searchModel"
                    :searchItems="searchItems"
                    :columns="columns"
                    :TableData="TableData"
                    :hasShowSummary="hasShowSummary"
                    :disablePaged="disablePaged"
                  ></paged-table>
                </Col>
              </Row>
            </Row>
          </TabPane>
          <TabPane label="随附单据" name="other">空空如也</TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
import Vue from "vue";
import userSearch from "_vbue/test/userSearch2.vue";
import pagedTable from "_com/paged-table";
import generalButton from "_com/general-button";
export default {
  name: "nameTab",
  components: {
    generalButton,
    pagedTable,
    userSearch
  },
  data() {
    return {
      formMainData: {
        loginName: "",
        password: "",
        name: "",
        age: "",
        address: "",
        remark: "",
        createDate: "",
        id: ""
      },
      rules: {
        name: {
          required: true,
          message: "",
          trigger: "blur"
        }
      },
      formDetailData: {
        loginName: "",
        password: "",
        name: "",
        age: "",
        address: "",
        remark: "",
        createDate: "",
        id: ""
      },
      validateRule: {
        loginName: {
          required: true,
          message: "登录名称不能为空",
          trigger: "blur"
        }
      },

      mainServiceName: "user/createUser",
      detailServiceName: "user/createUser",
      // 按钮
      buttonBus: new Vue(),
      displayAdd: true,
      displayEdit: false,
      displayBatchDelete: true,
      displayImportExport: false,
      addBehaviorSetting: {
        // 配置跳转新页面
        routeName: "userTab",
        routeParams: [
          {
            keyName: "id",
            valueField: "Id"
          }
        ]
      },
      formData: {},
      template: {},
      buttonHandleSetting: {
        // 按钮URL
        serviceName: "user",
        getUrl: "user/getUserList",
        deleteUrl: "user/deleteRange",
        importUrl: "user/importFile",
        exportUrl: "user/exportFile",
        templateUrl: "user/getFileTemplate"
      },
      // table
      selectRows: [], // 表格选中行
      tableBus: new Vue(),
      serviceName: "user",
      listUrl: "user/getUserList",
      searchModel: {},
      searchItems: [],
      // 是否有统计
      hasShowSummary: false,
      columns: [
        { type: "selection", width: 60, key: "id", align: "center" },
        { title: "姓名", width: 200, key: "name", align: "left" },
        { title: "年龄", width: 100, key: "age", align: "center" },
        { title: "地址", width: 300, key: "address", align: "center" },
        { title: "账号", width: 500, key: "loginName", align: "center" },
        { title: "密码", width: 500, key: "password", align: "center" }
      ],
      TableData: [],
      disablePaged: false
    };
  },
  created() {
    this.buttonBus.$on("prepareEdit", this.prepareEdit);
    this.buttonBus.$on("requestData", this.handleSearch);
    this.tableBus.$on("selectedRowsChange", this.selectRowChange);
    this.tableBus.$on("prepareEdit", this.prepareEdit);
  },
  beforeDestroy() {
    this.buttonBus.$off("prepareEdit", this.prepareEdit);
    this.buttonBus.$off("requestData", this.handleSearch);
    this.tableBus.$off("selectedRowsChange", this.selectRowChange);
    this.tableBus.$off("prepareEdit", this.prepareEdit);
  },
  methods: {
    handleSearch(data) {
      this.$store.state.user.searchModel = data;
      if (data) this.searchModel = data;
      this.$refs.currentTable.handleSearch(data);
    },
    handleMainSubmit() {
      this.$store
        .dispatch({
          type: "user/createUser",
          data: this.formMainData,
          serviceName: this.mainServiceName
        })
        .then(res => {
          this.$Message.success("保存成功");
        })
        .catch(error => {
          this.$Message.success("保存失败");
        });
    },
    handleDetailSubmit() {
      this.$store
        .dispatch({
          type: "user/updateUser",
          data: this.formDetailData,
          serviceName: this.detailServiceName
        })
        .then(res => {
          this.handleDetailTable();
          this.$Message.success("保存明细成功");
        })
        .catch(error => {
          this.$Message.success("保存明细失败");
        });
    },
    clickTest() {
      this.$Message.success("点击成功fsdfdsfsdfdsfdswerewrewef");
    },
    prepareEdit(payload) {
      console.log(JSON.stringify(payload));
      this.formDetailData = JSON.parse(JSON.stringify(payload));
    },
    HandleDetailInit(name) {
      if (name === "body") {
        this.handleDetailTable();
      }
    },
    handleDetailTable() {
      this.$refs.currentTable.handleSearch();
    }
  },
  mounted() {
    if (this.$route.query.userForm)
      this.formMainData = JSON.parse(this.$route.query.userForm);

    console.log("formMainData:" + JSON.stringify(this.formMainData));
  }
};
</script>
<style scope lang="less">
.test {
  background: #333333;
}
</style>