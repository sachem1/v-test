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
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="企业内部编号" label-position="top" prop="CopErpNo">
              <Input v-model="editForm.cop_Erp_No" placeholder />
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="编号类型" label-position="top" prop="CopType">
              <Select v-model="editForm.cop_type" filterable>
                <Option value key></Option>
                <Option
                  v-for="item in CodeList"
                  :value="item.code"
                  :key="item.code"
                >{{ item.codeName_CN }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="海关编号" label-position="top" prop="CopEmsNo">
              <Input v-model="editForm.cop_Ems_No"></Input>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="对应档案库内部编号" label-position="top" prop="EmsNo">
              <Select v-model="editForm.ems_no" filterable>
                <Option value key></Option>
                <Option
                  v-for="item in CopErpNoList"
                  :value="item.cop_Erp_No"
                  :key="item.cop_Erp_No"
                >{{ item.cop_Erp_No }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="申报日期" label-position="top" prop="DeclareDate">
              <DatePicker
                size="small"
                :value="editForm.declare_Date"
                transfer
                format="yyyy-MM-dd"
                type="date"
                placeholder
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="结束有效期" label-position="top" prop="EndDate">
              <DatePicker
                size="small"
                :value="editForm.end_Date"
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
            <FormItem label="创建时间" label-position="top" prop="CreateTime">
              <DatePicker
                size="small"
                :value="editForm.CreateTime"
                transfer
                format="yyyy-MM-dd"
                type="date"
                placeholder
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="创建用户" label-position="top" prop="CreateBy">
              <Input v-model="editForm.create_Time"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="经营单位代码" label-position="top" prop="CustomerCode">
              <Input v-model="editForm.customer_Code"></Input>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="经营单位名称" label-position="top" prop="CustomerName">
              <Input v-model="editForm.customer_Name"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div style="text-align: center; " slot="footer">
        <modal-button ref="currentButton"></modal-button>
      </div>
    </Modal>
  </div>
</template>

<script>


import Vue from "vue";
import modalButton from "_com/modal-button";
export default {
  name: "nameTab",
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
  data() {
    return {
      buttonBus: new Vue(),
      editForm: {
        cop_Ems_No: "",
        cop_Erp_No: "",
        customer_Code: "",
        customer_Name: "",
        ems_no: "",
        cop_type: "",
        declare_Date: "",
        end_Date: "",
        is_effective: "",
        create_Time: "",
        create_By: "",
        id: ""
      },

      CopErpNoList: [],
      CodeList: [],
      validateRules: {
        CopErpNo: {
          required: true,
          message: "企业内部编号必填",
          trigger: "blur"
        },
        CopType: {
          required: true,
          message: "编号类型必填",
          trigger: "blur"
        }
      }
    }
  },
  created() {


  },
  methods: {
    getCopErpNoList() {

      var customer = this.$store.state.login.userinfo.organizationCode
      this.$store.dispatch({
        type: 'FileLibraryNo/GetFileLibDropdownList',
        data: { CustomerCodew: customer }
      }).then(res => {
        debugger;
        this.CopErpNoList = res;
      });
    },
    getCodeList() {
      this.$store.dispatch({
        type: 'FileLibraryNo/getCodeList'
      }).then(res => {
        debugger;
        this.CodeList = res;
      });
    },

    prepareAdd() {
      this.operationMode = 'create';
      this.editForm = {};
    },
    prepareDel() {
      var id = this.editForm.id;
      if (!id || id == 0) {
        this.$Message.info("请选择需要删除的数据!");
        return;
      }
      let ids = [id];
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
              this.operationMode = 'edit';
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
    }
  },
  mounted() {
    //this.getCodeList();
    //	 this.getCopErpNoList();
  },

  computed: {
    visibleForBind: function () {
      return this.visible;
    }  },
  watch: {
    mainForm: function (newValue) {
      debugger;
      if (this.operationMode === "create") this.editForm = {};
      else {
        debugger;
        this.editForm = JSON.parse(newValue);
      }
    }
  }
};
</script>
<style scope lang="less">
.test {
  background: #333333;
}
</style>