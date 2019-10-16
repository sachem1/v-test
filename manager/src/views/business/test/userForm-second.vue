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
      <Form
        ref="mainForm"
        :model="userForm"
        label-position="left"
        :label-width="110"
        :rules="validateRules"
      >
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="用户昵称" label-position="right" :label-colon="true">
              <Input size="small" v-model="userForm.name" placeholder />
            </FormItem>
          </Col>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="年龄" label-position="right" :label-colon="true">
              <Input size="small" v-model="userForm.age"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem
              label="登录账号"
              label-position="right"
              prop="loginName"
              :label-colon="true"
              :show-message="false"
            >
              <Input v-model="userForm.loginName"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="密码" label-position="right" prop="password" :show-message="false">
              <Input v-model="userForm.password"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="手机号" label-position="right" prop="iphone">
              <Input v-model="userForm.iphone"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="地址" label-position="right">
              <Input type="text" v-model="userForm.address"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label label-position="right">
              <Button @click="alertDetail">查看</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="地址" label-position="right">
              <Input type="text" v-model="userForm.address"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label label-position="right">
              <Button @click="alertDetail">查看</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="地址" label-position="right">
              <Input type="text" v-model="userForm.address"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label label-position="right">
              <Button @click="alertDetail">查看</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="地址" label-position="right">
              <Input type="text" v-model="userForm.address"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label label-position="right">
              <Button @click="alertDetail">查看</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="地址" label-position="right">
              <Input type="text" v-model="userForm.address"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label label-position="right">
              <Button @click="alertDetail">查看</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div style="text-align: center; " slot="footer">
        <div>
          <Button type="primary" @click="handleAdd">新增</Button>
          <Button type="error" @click="handleDelete">删除</Button>
          <Button type="info" @click="handleSubmit">保存</Button>
          <Button style="margin-right: 8px" @click="closePanel">取消</Button>
          <Button type="primary" @click="handlePrev">上一条</Button>
          <Button type="primary" @click="handleNext">下一条</Button>
        </div>
      </div>
    </Modal>

    <Modal
      title="查看信息"
      v-model="showSecondLayer"
      scrollable
      :transfer="false"
      class-name="vertical-center-modal"
      @on-ok="getDetail"
      :z-index="1001"
    >
      <Card>
        <Row>
          <Table
            ref="detailTable"
            :columns="detailColumn"
            @on-selection-change="selectionChanged"
            :data="detailData"
          ></Table>
        </Row>
        <Row>
          <div style="text-align: center;" slot="footer">
            <Button type="primary" @click="getDetail">确认</Button>
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
    const validateiphone = (rule, value, callback) => {
      debugger;
      console.log("iphone:" + value);
      if (value === "" || !value) {
        this.$Message.error("请输入手机号!");
        callback(new Error(""));
      } else if (value.length !== 11) {
        this.$Message.error("请输入正确手机号!");
        callback(new Error(""));
      }
      callback();
    };

    return {
      userForm: {
        name: "",
        address: "",
        age: 0,
        iphone: "",
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
        },
        iphone: [
          {
            required: true,
            validator: validateiphone,
            trigger: "blur"
          }
        ]
      },
      loginErrorMsg: "",
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
    handleAdd(){
      this.userForm={};
    },
    handleDelete(){
      this.$store.dispatch({
        type:"user/delete",
        data:this.userForm.id,
        serviceName:'user'
      })
    },
    handlePrev(){},
    handleNext(){},
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
    getDetail(val) {
      var rowData = this.selectedRows[0];
      this.userForm.address = JSON.stringify(rowData);
    }
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    }
  },
  watch: {
    editForm: function(newValue) {
      if (this.operationMode === "create") this.userForm = {};
      else {
        this.userForm = JSON.parse(newValue);
      }
    }
  }
};
</script>
