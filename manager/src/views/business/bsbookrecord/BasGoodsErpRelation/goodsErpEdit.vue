<template>
  <div class="form-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="900"
      :mask-closable="false"
      @on-ok="handleSubmit"
      :scrollable="true"
      :draggable="true"
      class-name="vertical-center-modal"
    
      :styles="styles"
    >
      <Form :model="userForm" label-position="right" :label-width="100">
        <Row :gutter="32">
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="账册编号" label-position="right">
              <Input v-model="userForm.Name" placeholder />
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="物料标志" label-position="right">
              <Input v-model="userForm.Age"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="企业料号" label-position="right">
              <Input type="textarea" v-model="userForm.Address"></Input>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="备案料号" label-position="top">
              <Input v-model="userForm.LoginName"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="商品名称" label-position="top">
              <Input v-model="userForm.Password"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="规格型号" label-position="top">
              <Input type="textarea" v-model="userForm.Address"></Input>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="自定义1" label-position="top">
              <Input v-model="userForm.LoginName"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="自定义2" label-position="top">
              <Input v-model="userForm.Password"></Input>
            </FormItem>
          </Col>
    
          <Col span="8">
            <FormItem label="自定义3" label-position="top">
              <Input type="textarea" v-model="userForm.Address"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="备注" label-position="top">
              <Input v-model="userForm.LoginName"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div style="text-align: center;" slot="footer">
        <Button type="primary" @click="handleSubmit">保存</Button>
        <Button style="margin-right: 8px" @click="closePanel()">取消</Button>
      </div>
    </Modal>

    <Modal
      title="查看信息"
      v-model="showSecondLayer"
      scrollable
	  :transfer="false"
      class-name="vertical-center-modal"
	  :z-index=1001
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
  name: "",
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
    editForm: {}
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
        paddingBottom: "500px",
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
	  console.log(1111)
    },
    selectionChanged(selection) {
      this.selectedRows = selection;
    },
    getsata111() {
      console.log("dfdsf");
      var rowData = this.selectedRows[0];
      this.userForm.Password = rowData.Name;
    }
  },
  watch: {
    editForm: function(newValue) {
      this.userForm = newValue;
    }
  }
};
</script>
