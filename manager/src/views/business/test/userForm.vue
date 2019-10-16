<template>
  <div class="modal-form-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="900"
      :mask-closable="false"
      @on-ok="handleSubmit"
      @on-cancel="closePanel"
      class-name="vertical-center-modal"
      :transfer="false"
      :styles="styles"
    >
      <Form  ref="mainForm"  :model="userForm" label-position="left" :label-width="110" :rules="validateRules">
        <Row>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="用户昵称" label-position="right">
              <Input size="small" v-model="userForm.name" placeholder />
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="年龄" label-position="right">
              <Input size="small" v-model="userForm.age"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="地址" label-position="right">
              <Input type="textarea" v-model="userForm.address"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="登录账号" label-position="right" prop="loginName">
              <Input v-model="userForm.loginName"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="密码" label-position="right" prop="password">
              <Input v-model="userForm.password"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="address" label-position="right">
              <Input type="textarea" v-model="userForm.address"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="loginName" label-position="right">
              <Input v-model="userForm.loginName"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="password" label-position="right">
              <Input v-model="userForm.password"></Input>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <Button @click="alertDetail">查看</Button>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="address" label-position="right">
              <Input type="textarea" v-model="userForm.address"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="loginName" label-position="right">
              <Input v-model="userForm.loginName"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="password" label-position="right">
              <Input small v-model="userForm.password"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div style="text-align: center;" slot="footer">
        <Button type="primary" @click="handleSubmit">保存</Button>
        <Button style="margin-right: 8px" @click="closePanel">取消</Button>
      </div>
    </Modal>

    <Modal
      title="查看信息"
      v-model="showSecondLayer"
      scrollable
      :transfer="false"
      class-name="vertical-center-modal"
      :z-index="1001"
    >
      <Card>
        <Row>
          <Table :columns="detailColumn" @on-selection-change="selectionChanged" :data="detailData"></Table>
        </Row>
        <Row>
          <div style="text-align: center;" slot="footer">
            <Button type="primary" @click="getsata111">确认</Button>
            <Button style="margin-right: 8px" @click="showSecondLayer = true">取消</Button>
          </div>
        </Row>
      </Card>
    </Modal>
  </div>
</template>


<script>
export default {
  name: "UserForm",
  props: {
    className: String,
    visible: Boolean,
    operationMode: String,
    title: String,
    autoClose: {
      type: Boolean,
      default: false
    },
    editForm: {}
  },

  data() {
    return {
      userForm: {
        name: "",
        address: "",
        age: 0,
        loginName: "",
        password: ""
      },
      validateRules: {
        loginName: {
          required: true,
          message: "登录名称不能为空",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      },
      styles: {
        overflow: "auto",
        paddingTop: "10%",
        paddingLeft: "8%",
        position: "static"
      },
      showModalFormBind: false,
      showSecondLayer: false,
      detailColumn: [
        { type: "selection", width: 60, align: "center" },
        { title: "姓名", width: 200, key: "name", align: "center" },
        { title: "年龄", width: 100, key: "age", align: "center" },
        { title: "地址", key: "address", align: "center" }
      ],
      detailData: [
        {
          name: "33",
          age: "44",
          address: "55"
        },
        {
          name: "33",
          age: "44",
          address: "55"
        }
      ],
      selectedRows: []
    };
  },
  methods: {
    closePanel() {
      console.log("modal close");
      this.$emit("on-visible-change", false);
      this.$emit("on-model-change", this.userForm);
    },
    visibleChange(value) {
      if (!value) {
        this.$emit("on-visible-change", value);
      }
    },
    handleSubmit() {
      this.$refs["mainForm"].validate(valid => {
        if (valid) {
          let vm = this;
          let type =
            vm.operationMode === "create"
              ? "user/createUser"
              : "user/updateUser";
          console.log(vm.operationMode);
          var tips = "添加";
          if (vm.operationMode === "edit") tips = "更新";
          vm.$store
            .dispatch({
              type: type,
              data: vm.userForm,
              serviceName: ""
            })
            .then(res => {
              if (vm.autoClose) vm.closePanel();
              vm.$Message.success(tips + "成功!");
            })
            .catch(error => {
              console.log(error);
              vm.$Message.error(tips + "失败!");
            });
        }
      });
    },
    alertDetail() {
      this.showSecondLayer = true;
      console.log(1111);
    },
    selectionChanged(selection) {
      this.selectedRows = selection;
    },
    getsata111() {
      console.log("dfdsf");
      var rowData = this.selectedRows[0];
      this.userForm.password = rowData.name;
    }
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    }
  },
  watch: {
    editForm: function(newValue) {
      this.userForm = newValue;
    }
  }
};
</script>
