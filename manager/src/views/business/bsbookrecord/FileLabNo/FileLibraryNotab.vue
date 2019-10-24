
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
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="企业内部编号" label-position="right" >
              <Input v-model="editForm.CopErpNo" placeholder />
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="编号类型" label-position="right" >
              <Select v-model="editForm.CopType" filterable>
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
            <FormItem label="海关编号" label-position="right" >
              <Input v-model="editForm.CopEmsNo"></Input>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="对应档案库内部编号" label-position="right" >
              <Select v-model="editForm.EmsNo" filterable>
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
            <FormItem label="申报日期" label-position="right" >
              <DatePicker v-model="editForm.DeclareDate"
                size="small"
              
                transfer
                format="yyyy-MM-dd"
                type="date"
                placeholder
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="结束有效期" label-position="right" >
              <DatePicker  v-model="editForm.EndDate"
                size="small"
                
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
            <FormItem label="创建时间" label-position="right" >
              <DatePicker v-model="editForm.CreateTime"
                size="small"
              
                transfer
                format="yyyy-MM-dd"
                type="date"
                placeholder
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="创建用户" label-position="right" >
              <Input v-model="editForm.CreateBy"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="经营单位代码" label-position="right" >
              <Input v-model="editForm.CustomerCode"></Input>
            </FormItem>
          </Col>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="经营单位名称" label-position="right">
              <Input v-model="editForm.CustomerName"></Input>
            </FormItem>
          </Col>
        </Row>

           <Row>
          <Col :sm="24" :md="12" :lg="8">
            <FormItem label="" label-position="right" >
               <Checkbox v-model="editForm.IsEffect">是否有效</Checkbox>
            </FormItem>
          </Col>
         
        </Row>
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
  </div>
</template>


<script>
import Vue from "vue";
import modalButton from "_com/modal-button";

export default {
  name: "filelabNotab",
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
        editForm : {
            CopErpNo: "",
            CopType : "",
            CopEmsNo : "",
            EmsNo  : "",
            DeclareDate : "",
            EndDate : "",
            CreateBy : "",
            CreateTime:"",
            CustomerCode : "",
            CustomerName: "",
            id:"",
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
      displayDel:false,
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
      this.operationMode='create';
      this.editForm = {};
    },
    prepareDel() {
      var id = this.editForm.id;
      if (!id || id == 0) {
        debugger;
        this.$Message.info("请选择需要删除的数据!");
        return;
      }
      let ids=[id];
      this.$store
        .dispatch({
          type: "FileLibraryNo/deleteRange",
          data: ids,
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
      this.$emit("on-visible-change", false);
      this.$emit("on-model-change", this.editForm);
    },    
    prepareSubmit() {
      this.$refs.mainForm.validate(valid => {
        if (valid) {
          let vm = this;
          let type =
            vm.operationMode === "create"
              ? "FileLibraryNo/SaveFileLibrary"
              : "FileLibraryNo/SaveFileLibrary";
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
    mounted() {
     this.getCodeList();
   	 this.getCopErpNoList();
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
        debugger;
            this.editFormList = JSON.parse(newValue);
            this.editForm.CopErpNo=this.editFormList.cop_Erp_No;
            this.editForm.CopType =this.editFormList.cop_type+'';
            this.editForm.CopEmsNo =this.editFormList.cop_Ems_No;
            this.editForm.EmsNo  =this.editFormList.ems_no;
            this.editForm.DeclareDate=this.editFormList.declare_Date;
            this.editForm.EndDate =this.editFormList.end_Date;
            this.editForm.CreateBy =this.editFormList.create_By;
            this.editForm.CreateTime =this.editFormList.create_Time;
            this.editForm.CustomerCode =this.editFormList.customer_Code;
            this.editForm.CustomerName=this.editFormList.customer_Name;
            this.editForm.id=this.editFormList.id;
            if (this.editFormList.is_Effective = "0")
            {
              this.editform.IsEffect=true;
            }
            
             
      }
    }
  }
};
</script>
