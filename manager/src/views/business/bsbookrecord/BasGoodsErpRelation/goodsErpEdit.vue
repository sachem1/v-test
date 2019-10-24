<template>
  <div class="modal-form-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="750"
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
        :label-width="135"
        :rules="validateRules"
      >
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="账册号" label-position="right" prop="emsNo" :show-message="false">
              <ems-No-List
                ref="currentEmsNoSelect"
                :emsNo="editForm.emsNo"
                @on-select-change="changeEmsNo"
              ></ems-No-List>
            </FormItem>
          </Col>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="物料标志" label-position="right" :label-colon="true">
              <Select v-model="editForm.goodsflag" filterable>
                <Option value="3" key="3">料件</Option>
                <Option value="4" key="4">成品</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem
              label="企业料号"
              label-position="right"
              prop="erpSku"
              :label-colon="true"
              :show-message="false"
            >
              <Input v-model="editForm.erpSku" :disabled="operationMode === 'edit'"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="备案料号" label-position="right" prop="imgNo" :show-message="false">
              <Input v-model="editForm.imgNo"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="商品名称" label-position="right" prop="gName" :show-message="false">
              <Input v-model="editForm.gName"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="规格型号" label-position="right" prop="gModel" :show-message="false">
              <Input v-model="editForm.gModel"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="自定义1" label-position="right" prop="usd01" :show-message="false">
              <Input v-model="editForm.usd01"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="自定义2" label-position="right">
              <Input type="text" v-model="editForm.usd02"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="自定义3" label-position="right">
              <Input type="text" v-model="editForm.usd03"></Input>
            </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="备注" label-position="right">
              <Input type="text" v-model="editForm.remarks"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row></Row>
      </Form>

      <div style="text-align: center; " slot="footer">
        <modal-button ref="currentButton"></modal-button>
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

    <message-modal
      :title="messageparams.messagetitle"
      :visible="messageparams.displayMessage"
      :messages="messageparams.messageArr"
      @on-visible-change="messageCancel"
      @on-return-result="messageConfirm"
    ></message-modal>
  </div>
</template>


<script>
import Vue from "vue";
import modalButton from "_com/modal-button";
import emsNoList from "_vbue/bsbookrecord/BasGoodsErpRelation/emsNoSelect.vue";
import messageModal from "_com/modal/message-modal";

export default {
  name: "GoodsErpEdit",
  components: {
    modalButton,
    emsNoList,
    messageModal
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
  data() {
    // const validateiphone = (rule, value, callback) => {
    //   if (value === "" || !value) {
    //     this.$Message.error("请输入手机号!");
    //     callback(new Error(""));
    //   } else if (value.length !== 11) {
    //     this.$Message.error("请输入正确手机号!");
    //     callback(new Error(""));
    //   }
    //   callback();
    // };

    return {
      buttonBus: new Vue(),
      editForm: {
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
      validateRules: {
        emsNo: {
          required: true,
          message: "账册号必填",
          trigger: "blur"
        },
        erpSku: {
          required: true,
          message: "企业料号必填",
          trigger: "blur"
        },
        imgNo: [
          {
            required: true,
            message: "备案料号必填",
            trigger: "blur"
          }
        ]
      },
      displayDel: false,
      caninsertorupdate: false,
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
      selectedRows: [],
      messageparams: {
        title: "",
        displayMessage: false,
        messageArr: []
      },
      existGoodsErp: true
    };
  },
  methods: {
    prepareAdd() {
      this.operationMode = "create";
      this.editForm = {};
    },
    prepareDel() {
      debugger;
      var id = this.editForm.id;
      if (!id || id == 0) {
        this.$Message.info("请选择需要删除的数据!");
        return;
      }
      let ids = { ids: [id] };
      this.$store
        .dispatch({
          type: "goodsErp/deleteGoodsErp",
          data: ids,
          serviceName: "goodsErp"
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
              ? "goodsErp/addGoodsErp"
              : "goodsErp/modifyGoodsErp";
          console.log(vm.operationMode);
          var tips = "添加";

          debugger;
          if (vm.operationMode === "edit") {
            tips = "更新";
            vm.editForm.udpateUser = this.$store.state.login.userinfo.loginName;
          } else {
            vm.existDataOnline(vm.editForm);
            debugger;
            if (existGoodsErp && vm.caninsertorupdate == false) {
              return;
            }
            vm.editForm.udpateUser = this.$store.state.login.userinfo.loginName;
            vm.editForm.createUser = this.$store.state.login.userinfo.loginName;
          }

          vm.$store
            .dispatch({
              type: type,
              data: [vm.editForm],
              serviceName: ""
            })
            .then(res => {
              if (vm.autoClose) vm.prepareCancel();
              this.operationMode = "edit";
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
    },
    changeEmsNo(v) {
      debugger;
      this.editForm.emsNo = v;
    },
    messageCancel() {
      this.caninsertorupdate = false;
      this.messageparams.displayMessage = false;
    },
    messageConfirm() {
      this.caninsertorupdate = true;
      this.messageparams.displayMessage = false;
    },
    async existDataOnline(data) {
      debugger;

      let vm = this;
      var cdata = await vm.$store.dispatch({
        type: "goodsErp/existGoodsErp",
        data: [data],
        serviceName: ""
      });

      vm.existGoodsErp = true;
      vm.messageparams.displayMessage = true;
      vm.messageparams.messageArr = [
        { code: 1, message: "asdfasdfsadf" },
        { code: 0, message: "asdfffffffffffffffffffffff" }
      ];
    }
  },
  computed: {
    visibleForBind: function() {
      return this.visible;
    }
  },
  watch: {
    mainForm: function(newValue) {
      if (this.operationMode === "create") {
        this.editForm = {};
      } else {
        this.$refs.mainForm.resetFields();
        this.editForm = JSON.parse(newValue);
        this.$refs.currentEmsNoSelect.setCurrentEmsNo(this.editForm.emsNo);
      }
    }
  }
};
</script>
