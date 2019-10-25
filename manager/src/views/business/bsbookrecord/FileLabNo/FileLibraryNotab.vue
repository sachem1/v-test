
<template>
  <div class="modal-form-wrapper">
    <Modal
      :title="title"
      :value="visibleForBind"
      width="800"
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
        :label-width="150"
        :rules="validateRules"
      >
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="企业内部编号" label-position="right" prop="CopErpNo">
              <Input v-model="editForm.CopErpNo" placeholder />
            </FormItem>
          </Col>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="编号类型" label-position="right" prop="CopType">
              <Select v-model="editForm.CopType" @on-change="OnchangeType"  >
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
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label="海关编号" label-position="right" >
              <Input v-model="editForm.CopEmsNo"  :disabled='IsDisabled'></Input>
            </FormItem>
          </Col>
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label="对应档案库内部编号" label-position="right">
              <Select v-model="editForm.EmsNo"  :disabled='isDisabled'>
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
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label="申报日期" label-position="right">
              <DatePicker
                v-model="editForm.DeclareDate"
                size="small"
                transfer
                format="yyyy-MM-dd"
                type="date"
                placement="bottom-end"
                :disabled='true'
              ></DatePicker>
            </FormItem>
          </Col>
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label="结束有效期" label-position="right">
              <DatePicker
                v-model="editForm.EndDate"
                size="small"
                transfer
                format="yyyy-MM-dd"
                type="date"
                placement="bottom-end"
                :disabled='true'
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label="创建时间" label-position="right">
              <DatePicker
                v-model="editForm.CreateTime"
                size="small"
                transfer
                format="yyyy-MM-dd"
                type="date"
                placement="bottom-end"     
                :disabled='true'           
              ></DatePicker>
            </FormItem>
          </Col>
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label="创建用户" label-position="right">
              <Input v-model="editForm.CreateBy":disabled='true' ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label="经营单位代码" label-position="right">
              <Input v-model="editForm.CustomerCode" :disabled='true'></Input>
            </FormItem>
          </Col>
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label="经营单位名称" label-position="right">
              <Input v-model="editForm.CustomerName":disabled='true' ></Input>
            </FormItem>
          </Col>
        </Row>

        <Row>
             <Col :sm="24" :md="24" :lg="12">
            <FormItem label label-position="right">
              <Checkbox v-model="editForm.IsEffect">是否失效</Checkbox>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div style="text-align: center; " slot="footer">
        <modal-button ref="currentButton"></modal-button>
      </div>
      
    <message-modal
      :title="messagetitle"
      :visible="displayMessage"
      :messages="messageArr"
      @on-visible-change="onMessageModalChanged"
    ></message-modal>
    </Modal>

  </div>

  
</template>


<script>
import util from "_lib/util";
import Vue from "vue";
import modalButton from "_com/modal-button";
import messageModal from "_com/modal/message-modal";
export default {
  name: "filelabNotab",
  components: {
    modalButton,
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
    return {
      buttonBus: new Vue(),
      isDisabled: true,
      IsDisabled: true,
       messagetitle: "多个消息",
       displayMessage: false,
       messageArr: [],
      editForm: {
        CopErpNo: "",
        CopType: "",
        CopEmsNo: "",
        EmsNo: "",
        DeclareDate: "",
        EndDate: "",
        CreateBy: "",
        CreateTime: "",
        CustomerCode: "",
        CustomerName: "",
        id: "",
        IsEffect: true,
      },

      editFormList: {
        cop_Ems_No: "",
        cop_Erp_No: "",
        customer_Code: "",
        customer_Name: "",
        ems_no: "",
        cop_type: "",
        declare_Date: "",
        end_Date: "",
        is_Effective: "",
        create_Time: "",
        create_By: "",
        id: ""
      },
      CopErpNoList: [],
      CodeList: [],
      validateRules: {

        CopErpNo: {
          required: true,
          message: "企业内部编号不能为空",
          trigger: "blur"
        },
        CopType: {
          required: true,
          message: "编号类型不能为空",
          trigger: "blur"
        }

      },
      displayDel: false,
      loginErrorMsg: "",
      styles: {
        overflow: "auto",
        paddingTop: "8%",
        paddingLeft: "8%",
        position: "static"
      },
      showModalFormBind: false,
      showSecondLayer: false
    };
  },
  methods: {
     showSingleMessage(type, title1, content1) {
      const title = title1 ? title1 : "消息标题";
      const content = content1
        ? content1
        : "单个测试显示的消息是否够多单个测试显示的消息是否够多,够不够多够多够多够多够多够多够不够多够多够多够多够多够多消息提示";
      util.singleMessage(this, title, content, type);
    },
    onMessageModalChanged(newValue) {
      this.displayMessage = newValue;
    },
    getCopErpNoList() {

      var customer = this.$store.state.login.userinfo.organizationCode
      this.$store.dispatch({
        type: 'FileLibraryNo/GetFileLibDropdownList',
        data: { CustomerCodew: customer }
      }).then(res => {

        this.CopErpNoList = res;
      });
    },
    OnchangeType(value) {
      
      if (value === "1") {
        this.isDisabled = true;
        this.IsDisabled = true;
        this.editForm.EmsNo = "";
      }
      if (value === "2") {
        this.isDisabled = false;
        this.IsDisabled = true;

      }
      if (value === "3") {
        this.isDisabled = true;
        this.IsDisabled = false;
      }
    },
    getCodeList() {
      this.$store.dispatch({
        type: 'FileLibraryNo/getCodeList'
      }).then(res => {

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
          type: "FileLibraryNo/deleteRange",
          data: { ids: ids },
          serviceName: "FileLibraryNo"
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
      debugger;
      this.$emit("on-visible-change", false);
      this.$emit("on-model-change", this.editForm);
    },
    prepareSubmit() {
    
      this.$refs.mainForm.validate(valid => {
        if (valid) {
         
          let vm = this;
          let type = "FileLibraryNo/SaveFileLibrary";
          if (vm.operationMode === "create") {
            
            this.editForm.CreateBy = this.$store.state.login.userinfo.loginName;
            this.editForm.CustomerCode = this.$store.state.login.userinfo.organizationCode;
          }
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
              debugger;
              if (res.data>0) {
                   if (vm.autoClose) vm.prepareCancel();
                  this.operationMode = 'edit';
                  vm.$Message.success(tips + "成功!");
              }
              else
              {
                 this.showSingleMessage("warning","提示",res.message);
              }
           
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
    }
  },
  mounted() {
    this.getCodeList();
    this.getCopErpNoList();
  },
  computed: {
    visibleForBind: function () {
      return this.visible;
    }
  },
   
  watch: {
    mainForm: function (newValue) {
      if (this.operationMode === "create") this.editForm = {};
      else {
        
        this.editFormList = JSON.parse(newValue);
        this.editForm.CopErpNo = this.editFormList.cop_Erp_No;
        this.editForm.CopType = this.editFormList.cop_type + '';
        
        this.editForm.EmsNo = this.editFormList.ems_no;
        if (this.editForm.CopType === "1") {
          this.isDisabled = true;
          this.IsDisabled = true;
          this.editForm.EmsNo = "";
        }
        if (this.editForm.CopType === "2") {
          this.isDisabled = false;
          this.IsDisabled = true;

        }
        if (this.editForm.CopType === "3") {
          this.isDisabled = true;
          this.IsDisabled = false;
        }
        this.editForm.CopEmsNo = this.editFormList.cop_Ems_No;
        
        this.editForm.DeclareDate = this.editFormList.declare_Date;
        this.editForm.EndDate = this.editFormList.end_Date;
        this.editForm.CreateBy = this.editFormList.create_By;
        this.editForm.CreateTime = this.editFormList.create_Time;
        this.editForm.CustomerCode = this.editFormList.customer_Code;
        this.editForm.CustomerName = this.editFormList.customer_Name;
        this.editForm.id = this.editFormList.id;
        this.editForm.IsEffect = this.editFormList.is_Effective === "0" ? false : true;
      }
    }
  }
};
</script>
