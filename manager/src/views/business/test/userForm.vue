<template>
  <div style="position: relative; height: 100%;">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="900"
      :mask-closable="false"
      @on-ok="handleSubmit"
      :scrollable="true"
      :draggable="true"
      class-name="vertical-center-modal"
      @on-visible-change="visibleChange"
      :styles="styles"
    >
      <Form :model="userForm" label-position="left" :label-width="100">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Name" label-position="top">
              <Input v-model="userForm.Name" placeholder />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Age" label-position="top">
              <Input v-model="userForm.Age"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Address" label-position="top">
              <Input type="textarea" v-model="userForm.Address"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="LoginName" label-position="top">
              <Input v-model="userForm.LoginName"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Password" label-position="top">
              <Input v-model="userForm.Password"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Address" label-position="top">
              <Input type="textarea" v-model="userForm.Address"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="LoginName" label-position="top">
              <Input v-model="userForm.LoginName"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Password" label-position="top">
              <Input v-model="userForm.Password"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <Button @click="alertDetail">查看</Button>
          </Col>
        </Row>

        <Row :gutter="32">
          <Col span="8">
            <FormItem label="Address" label-position="top">
              <Input type="textarea" v-model="userForm.Address"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="LoginName" label-position="top">
              <Input v-model="userForm.LoginName"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="Password" label-position="top">
              <Input v-model="userForm.Password"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div style="text-align: center;" slot="footer">
        <Button type="primary" @click="handleSubmit">保存</Button>
        <Button style="margin-right: 8px" @click="closePanel()">取消</Button>
      </div>
    </Modal>

    <Modal v-model="showSecondLayer">
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
    Name: {
      type: String,
      default: ""
    },
    Age: {
      type: Number,
      default: 0
    },
    Address: {
      type: String,
      default: ""
    },
    LoginName: {
      type: String,
      default: ""
    },
    Password: {
      type: String,
      default: ""
    },
    visible: Boolean,
    operationMode: String,
    title: String,
    autoClose: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    }
  },
  data() {
    return {
      userForm: {
        Name: "",
        Address: "",
        Age: 0,
        LoginName: "",
        Password: ""
      },
      rules: {
        LoginName: {
          required: true,
          message: "登录名称不能为空",
          trigger: "blur"
        },
        Password: {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      },
      styles: {
        overflow: "auto",
        paddingBottom: "53px",
        position: "static"
      },
      showModalFormBind: false,
      showSecondLayer: false,
      detailColumn: [
        { type: "selection", width: 60, align: "center" },
        { title: "姓名", width: 200, key: "Name", align: "center" },
        { title: "年龄", width: 100, key: "Age", align: "center" },
        { title: "地址", key: "Address", align: "center" }
      ],
      detailData: [
        {
          Name: "33",
          Age: "44",
          Address: "55"
        },
        {
          Name: "33",
          Age: "44",
          Address: "55"
        }
      ],
      selectedRows: []
    };
  },
  methods: {
    closePanel() {
      console.log("modal close");
      this.showModalFormBind = false;
      this.$emit("on-visible-change", false);
      this.$emit("on-model-change", this.userForm);
    },
    visibleChange(value) {
      if (!value) {
        this.$emit("on-visible-change", value);
      }
    },
    handleSubmit() {
      let vm = this;
      let type =
        vm.operationMode === "create" ? "user/createUser" : "user/updateUser";
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
    },
    alertDetail() {
      this.showSecondLayer = true;
    },
    selectionChanged(selection) {
      
      this.selectedRows = selection;
    },
    getsata111() {
      
      console.log("dfdsf");
      var rowData = this.selectedRows[0];
      this.userForm.Password = rowData.Name;
    }
  }
};
</script>

<style>
</style>