<template>
  <div class="form-multab-wrapper">
    <Card>
      <div class="form-multab-wrapper-header-button">
        <Button
          type="primary"
          icon="md-add"
        >新增</Button>
      </div>
    </Card>
    <Card>
      <div class="form-multab-wrapper-content">
        <Tabs
          @on-click="HandleDetailInit"
          type="card"
          ref="currentTab"
          :animated="false"
        >
          <TabPane
            label="表头"
            name="header"
            icon="md-document"
          >
            <Row
              type="flex"
              justify="center"
            >
              <Col span="20">
              <div class="form-content">
                <Form
                  :model="formMainData"
                  label-position="left"
                  :label-width="150"
                  :rules="rules"
                >
                  <Row>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="账册号"
                      label-position="top"
                      prop="emsNo"
                    >
                      <Select
                        v-model="formMainData.emsNo"
                        filterable
                      >
                        <Option
                          v-for="item in emsNoList"
                          :value="item"
                          :key="item"
                        >{{ item }}</Option>
                      </Select>
                    </FormItem>
                    </Col>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >

                    <FormItem
                      prop="goodsflag"
                      label="物料标志"
                      label-position="top"
                      :label-width="150"
                    >

                      <Select
                        v-model="formMainData.goodsflag"
                        filterable
                      >

                        <Option
                          value="3"
                          key="3"
                        >料件</Option>
                        <Option
                          value="4"
                          key="4"
                        >成品</Option>
                      </Select>

                    </FormItem>
                    </Col>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="企业料号"
                      label-position="top"
                      prop="erpSku"
                    >
                      <Input v-model="formMainData.erpSku"></Input>
                    </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="备案料号"
                      label-position="top"
                      prop="imgNo"
                    >
                      <Input
                        v-model="formMainData.imgNo"
                        placeholder
                      />
                    </FormItem>
                    </Col>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="商品名称"
                      label-position="top"
                    >
                      <Input v-model="formMainData.gName"></Input>
                    </FormItem>
                    </Col>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="规格型号"
                      label-position="top"
                    >
                      <Input v-model="formMainData.gModel"></Input>
                    </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="自定义1"
                      label-position="top"
                      prop="usd01"
                    >
                      <Input
                        v-model="formMainData.usd01"
                        placeholder
                      />
                    </FormItem>
                    </Col>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="自定义2"
                      label-position="top"
                    >
                      <Input v-model="formMainData.usd02"></Input>
                    </FormItem>
                    </Col>
                    <Col
                      :sm="24"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="自定义3"
                      label-position="top"
                    >
                      <Input v-model="formMainData.usd03"></Input>
                    </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      :sm="20"
                      :md="12"
                      :lg="8"
                    >
                    <FormItem
                      label="备注"
                      label-position="top"
                      prop="remarks"
                    >
                      <Input
                        v-model="formMainData.remarks"
                        placeholder
                      />
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
                <Button
                  type="primary"
                  @click="handleMainSubmit"
                >保存</Button>
              </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>
<script>
import Vue from "vue";
import generalButton from "_com/general-button";
export default {
  name: "nameTab",
  components: {
    generalButton
  },
  data() {
    return {
      formMainData: {
        emsNo: "",
        erpSku: "",
        customerCode: "",
        imgNo: "",
        gName: "",
        gModel: "",
        usd01: "",
        usd02: "",
        usd03: "",
        goodsflag: "",
        remarks: "",
        createUser: "",
        udpateUser: "",
        id: 0
      },
      rules: {
        erpSku: {
          required: true,
          message: "企业料号不能为空！",
          trigger: "blur"
        },
        emsNo: {
          required: true,
          message: "账册编号不能为空！",
          trigger: "blur"
        },

        imgNo: {
          required: true,
          message: "备案料号不能为空！",
          trigger: "blur"
        }
      },
      mainServiceName: "user/createUser",
      // 按钮
      buttonBus: new Vue(),
      formData: {},
      template: {},
      emsNoList: [],
      // table

      tableBus: new Vue(),
      serviceName: "user"
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
      debugger;
      console.log(JSON.stringify(this.$store.state.login.userinfo));
      var lname = this.$store.state.login.loginName;
      this.formMainData.udpateUser = lname;
      this.formMainData.createUser = lname;

      this.$store
        .dispatch({
          type: "goodsErp/addGoodsErp",
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
    },
    getEmsNoList() {
      this.$store
        .dispatch({
          type: "goodsErp/getEmsNoList",
          data: {
            custromeCode: this.$store.state.login.userinfo.organizationCode
          }
        })
        .then(res => {
          this.emsNoList = res.data;
        });
    }
  },
  mounted() {
    console.log("formMainData:" + JSON.stringify(this.$route.query.userForm));
    if (this.$route.query.userForm)
      this.formMainData = JSON.parse(this.$route.query.userForm);

    console.log("formMainData:" + JSON.stringify(this.$route.query.userForm));
  },
  created() {
    this.getEmsNoList();
  }
};
</script>
<style scope lang="less">
.test {
  background: #333333;
}
</style>