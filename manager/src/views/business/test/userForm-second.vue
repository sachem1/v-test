<template>
  <div class="modal-form-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="900"
      :mask-closable="false"
      @on-ok="prepareSubmit"
      @on-cancel="prepareCancel"
      class-name="vertical-center-modal"
      scrollable
    >
      <Form
        ref="mainForm"
        :model="editForm"
        label-position="left"
        :label-width="110"
        :rules="validateRules"
      >
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="用户昵称" label-position="right" :label-colon="true">
              <Input size="small" v-model="editForm.name" placeholder />
            </FormItem>
          </Col>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="年龄" label-position="right" :label-colon="true">
              <Input size="small" v-model="editForm.age"></Input>
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
              <Input v-model="editForm.loginName"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="密码" label-position="right" prop="password" :show-message="false">
              <Input v-model="editForm.password"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="手机号" label-position="right" prop="iphone" :show-message="false">
              <Input v-model="editForm.iphone"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="创建日期" label-position="right">
              <DatePicker
                type="date"
                size="small"
                :value="editForm.createDate"
                :start-date="new Date(1991, 4, 14)"
                placeholder="请选择日期"
                style
              ></DatePicker>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="有效期" label-position="right">
              <DatePicker
                type="daterange"
                :value="editForm.effectiveDate"
                :start-date="new Date(1991, 4, 14)"
                placement="bottom-end"
                placeholder="请选择日期"
                style
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="地址" label-position="right">
              <Input type="text" v-model="editForm.address"></Input>
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
              <Input type="text" v-model="editForm.address"></Input>
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
              <Input type="text" v-model="editForm.address"></Input>
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
              <Input type="text" v-model="editForm.address"></Input>
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
        <modal-button ref="currentButton" :buttonBus="buttonBus"></modal-button>
      </div>
    </Modal>

    <Modal
      title="查看信息"
      v-model="showSecondLayer"
      scrollable
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
import Vue from "vue";
import modalButton from "_com/modal-button";

export default {
  name: "UserForm",
  components: {
    modalButton
  },
  props: {
    className: String,
    visible: Boolean,
    operationMode: String,
    title: String,
    autoClose: {
      type: Boolean,
      default: false
    },
    editFormBus: Object,
    mainForm: {}
  },
  created() {
    this.buttonBus.$on("prepareAdd", this.prepareAdd);
    this.buttonBus.$on("prepareDel", this.prepareDel);
    this.buttonBus.$on("prepareSubmit", this.prepareSubmit);
    this.buttonBus.$on("prepareCancel", this.prepareCancel);
    this.buttonBus.$on("preparePrev", this.preparePrev);
    this.buttonBus.$on("prepareNext", this.prepareNext);
  },
  beforeDestroy() {
    this.buttonBus.$off("prepareAdd", this.prepareAdd);
    this.buttonBus.$off("prepareDel", this.prepareDel);
    this.buttonBus.$off("prepareSubmit", this.prepareSubmit);
    this.buttonBus.$off("prepareCancel", this.prepareCancel);
    this.buttonBus.$off("preparePrev", this.preparePrev);
    this.buttonBus.$off("prepareNext", this.prepareNext);
  },
  data() {
    const validateiphone = (rule, value, callback) => {
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
      buttonBus: new Vue(),
      editForm: {
        name: "",
        address: "",
        age: 0,
        iphone: "",
        loginName: "",
        password: "",
        createDate: "",
        effectiveDate: ""
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
        paddingTop: "8%",
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
    prepareAdd() {
      this.operationMode='create';
      this.editForm = {};
    },
    prepareDel() {
      var id = this.editForm.id;
      if (!id || id == 0) {
        this.$Message.info("请选择需要删除的数据!");
        return;
      }
      let ids=[id];
      this.$store
        .dispatch({
          type: "user/deleteRange",
          data: ids,
          serviceName: "user"
        })
        .then(res => {
          console.log("delete");
          this.$Message.error("删除成功!");
          this.editForm = {};
        })
        .catch(err => {
          this.$Message.error("删除失败!");
        });
    },
    preparePrev() {
      this.editFormBus.$emit("prePrevData");
    },
    prepareNext() {
      this.editFormBus.$emit("preNextData");
    },
    prepareCancel() {
      this.$emit("on-visible-change", false);
      this.$emit("on-model-change", this.editForm);
    },    
    prepareSubmit() {
      this.$refs.mainForm.validate(valid => {
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
              data: vm.editForm,
              serviceName: ""
            })
            .then(res => {
              if (vm.autoClose) vm.prepareCancel();
              this.operationMode='edit';
              vm.$Message.success(tips + "成功!");
            })
            .catch(error => {
              
              console.log(error);
              vm.$Message.error(tips + "失败!");
            });
        }
      });      
    },
    visibleChange(value) {
      if (!value) {
        this.$emit("on-visible-change", value);
      }
    },
    alertDetail() {
      this.showSecondLayer = true;
    },
    selectionChanged(selection) {
      this.selectedRows = selection;
    },
    getDetail(val) {
      var rowData = this.selectedRows[0];
      this.editForm.address = JSON.stringify(rowData);
    }
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    }
  },
  watch: {
    mainForm: function(newValue) {
      if (this.operationMode === "create") this.editForm = {};
      else {
        this.editForm = JSON.parse(newValue);
      }
    }
  }
};
</script>
