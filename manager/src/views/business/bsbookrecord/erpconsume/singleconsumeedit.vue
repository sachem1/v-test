<template>
  <div class="modal-form-wrapper">
    <Modal :title="title" :value="visibleForBind" width="750" :mask-closable="false" @on-ok="prepareSubmit" @on-cancel="prepareCancel" class-name="vertical-center-modal" scrollable>
      <Form ref="mainForm" :model="editForm" label-position="left" :label-width="135" :rules="validateRules">
        <Row>
          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="账册号" label-position="right" prop="emsNo" :show-message="false">
            <!-- <ems-No-List ref="currentEmsNoSelect" :emsNo="editForm.emsNo" @on-select-change="changeEmsNo"></ems-No-List> -->
            <basicinfo-select v-model="editForm.emsNo" :class="ivuRequired" :url="selectUrl" :parentValue="parentValue" :currentSelectVal="editForm.emsNo"></basicinfo-select>
          </FormItem>
          </Col>
          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="客户代码" label-position="right" :label-colon="true">
            <Input v-model="editForm.customerCode"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="成品货号" label-position="right" prop="exgNo" :label-colon="true" :show-message="false">
            <Input v-model="editForm.exgNo" :class="ivuRequired"></Input>
          </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="成品序号" label-position="right" prop="exgGNo" :show-message="false">
            <Input v-model="editForm.exgGNo" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="料件货号" label-position="right" prop="imgNo" :show-message="false">
            <Input v-model="editForm.imgNo" :class="ivuRequired"></Input>
          </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="料件序号" label-position="right" prop="imgGNo" :show-message="false">
            <Input v-model="editForm.imgGNo" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="企业版本号" label-position="right" prop="erpNo" :show-message="false">
            <Input v-model="editForm.erpNo" :class="ivuRequired"></Input>
          </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="净耗" label-position="right" prop="decCm" :show-message="false">
            <Input number v-model="editForm.decCm" :class="ivuRequired"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="无形损耗率(%)" label-position="right" prop="intgbLossRate" :show-message="false">
            <Input number v-model="editForm.intgbLossRate" :class="ivuRequired"></Input>
          </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="保税料件比例(%)" label-position="right" prop="bondMtpckPrpr" :show-message="false">
            <Input number v-model="editForm.bondMtpckPrpr" :class="ivuRequired"></Input>
          </FormItem>
          </Col>

        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="修改标志" label-position="right" prop="modfyMark" :show-message="false">
            <basicinfo2-select v-model="editForm.modfyMark" :url="selectUrlModifyMark" :parentValue="parentValueModifyMark" :currentSelectVal="editForm.modfyMark"></basicinfo2-select>
          </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="有形损耗率(%)" label-position="right" prop="tgblLossRate" :show-message="false">
            <Input number v-model="editForm.tgblLossRate" :class="ivuRequired"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="单耗申报状态" label-position="right" prop="agentStatus" :show-message="false">
            <Input v-model="editForm.agentStatusCn" disabled></Input>
          </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="生产订单号" label-position="right">
            <Input type="text" v-model="editForm.productId"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="生产批次号" label-position="right">
            <Input type="text" v-model="editForm.batchNo"></Input>
          </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="单耗版本号" label-position="right">
            <Input type="text" v-model="editForm.beginDate" disabled></Input>
          </FormItem>
          </Col>

          <Col :sm="24" :md="24" :lg="12">
          <FormItem label="单耗有效期" label-position="right" prop="endDate" :show-message="false">
            <!-- <Input type="text" v-model="editForm.endDate"></Input> -->
            <DatePicker type="date" :class="ivuRequired" placement="bottom-end" placeholder="请选择日期" format="yyyy-MM-dd" v-model="editForm.endDate" style></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="24">
          <FormItem label="*备注" label-position="right">
            <Input type="text" v-model="editForm.remark"></Input>
          </FormItem>
          </Col>
        </Row>

      </Form>

      <div style="text-align: center; " slot="footer">
        <modal-button ref="currentButton"></modal-button>
      </div>
    </Modal>

    <!-- <Modal title="查看信息" v-model="showSecondLayer" scrollable class-name="vertical-center-modal" @on-ok="getDetail" :z-index="1001">
      <Card>
        <Row>
          <Table ref="detailTable" :columns="detailColumn" @on-selection-change="selectionChanged" :data="detailData"></Table>
        </Row>
        <Row>
          <div style="text-align: center;" slot="footer">
            <Button type="primary" @click="getDetail">确认</Button>
            <Button style="margin-right: 8px" @click="showSecondLayer = true">取消</Button>
          </div>
        </Row>
      </Card>
    </Modal> -->

    <message-modal :title="messageparams.messagetitle" :visible="messageparams.displayMessage" :messages="messageparams.messageArr" @on-visible-change="messageCancel" @on-return-result="messageConfirm"></message-modal>
  </div>
</template>


<script>
  import Vue from "vue";
  import modalButton from "_com/modal-button";

  import messageModal from "_com/modal/message-modal";
  import basicinfo2Select from "_com/custom-select/basic-info-select";
  import basicinfoSelect from "_com/custom-select";

  export default {
    name: "singleconsumeedit",
    components: {
      modalButton,
     
      messageModal,
      basicinfo2Select,
      basicinfoSelect
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
      return {
        buttonBus: new Vue(),
        editForm: {
          id: "",
          customerCode: "",
          exgNo: "",
          exgGNo: "",
          imgNo: "",
          imgGNo: "",
          beginDate: "",
          netUseupQty: "",
          modfyMark: "",
          bondMtpckPrpr: "",
          agentStatus: "",
          tgblLossRate: "",
          intgbLossRate: "",
          createTime: "",
          createUser: "",
          productId: "",
          batchNo: "",
          erpNo: "",
          deptCode: "",
          endDate: "",
          decCm: "",
          emsNo: "",
          bondFlag: "",
          remark: "",
          rowNumber: ""
        },
        validateRules: {
          emsNo: {
            required: true,
            message: "账册号必填",
            trigger: "blur"
          },
          exgNo: {
            required: true,
            message: "成品货号必填",
            trigger: "blur"
          },
          imgNo:
          {
            required: true,
            message: "备案料号必填",
            trigger: "blur"
          },
          erpNo:
          {
            required: true,
            message: "企业版本号必填",
            trigger: "blur"
          },
          intgbLossRate:
          {
            required: true,
            type: 'number',
            message: "无形损耗率必填",
            trigger: "blur"
          },
          decCm:
          {
            required: true,
            type: 'number',
            message: "净耗必填",
            trigger: "blur"
          },
          bondMtpckPrpr:
          {
            required: true,
            type: 'number',
            message: "保税料件比例必填",
            trigger: "blur"
          },
          tgblLossRate:
          {
            required: true,
            type: 'number',
            message: "有形损耗率必填",
            trigger: "blur"
          },
          endDate:
          {
            required: true,
            message: "单耗有效期必填",
            type: 'date',
            trigger: "blur"
          }
        },
        displayDel: false,
        caninsertorupdate: false,
        ivuRequired: "ivu-required",
        loginErrorMsg: "",
        styles: {
          overflow: "auto",
          paddingTop: "8%",
          paddingLeft: "8%",
          position: "static"
        },
        showModalFormBind: false,
        showSecondLayer: false,
        parentValue: "",
        selectUrl: "emsrecordinfo/emsnoselect",
        selectUrlModifyMark: "",
        parentValueModifyMark: "ModifyMark",
        selectedRows: [],
        messageparams: {
          title: "",
          displayMessage: false,
          messageArr: []
        }
      };
    },
    methods: {
      prepareAdd() {
        debugger;
        this.operationMode = "create";
        this.editForm = {};
      },
      prepareDel() {
        var id = this.editForm.id;
        if (!id || id == 0) {
          this.$Message.info("请选择需要删除的数据!");
          return;
        }
        let ids = { ids: [id] };
        this.$store
          .dispatch({
            type: "erpconsume/deleteErpconsume",
            data: ids,
            serviceName: "erpconsume"
          })
          .then(res => {
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
      opreateOnlineData(type) {
        let vm = this;
        var tips = "添加";
        if (vm.operationMode === "edit") {
          tips = "更新";
          
        }
        debugger;
        vm.$store
          .dispatch({
            type: type,
            data: vm.editForm,
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
      },
      prepareSubmit() {
        this.$refs.mainForm.validate(valid => {
          debugger;
          var tmodel = this.editForm ;
          if (valid) {
            let vm = this;
            let type =
              vm.operationMode === "create" ?
              "erpconsume/saveErpconsume" :
              "erpconsume/saveErpconsume";
            console.log(vm.operationMode);
            var tips = "添加";
            if (vm.operationMode === "edit") {
              tips = "更新";
            };

            vm.opreateOnlineData(type);
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
        this.editForm.emsNo = v;
      },
      messageCancel() {
        this.messageparams.displayMessage = false;
      },
      messageConfirm() {
        this.opreateOnlineData("erpconsume/saveErpconsume");
        this.messageparams.displayMessage = false;
      }
    },
    computed: {
      visibleForBind: function () {
        return this.visible;
      }
    },
    watch: {
      mainForm: function (newValue) {
        this.$refs.mainForm.resetFields();
        debugger;
        if (this.operationMode === "create") {
          this.editForm = {};
        } else {
          this.editForm = JSON.parse(newValue);
          this.editForm.modfyMark = this.editForm.modfyMark + '';
        }
      }
    }
  };
</script>