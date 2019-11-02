
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
            <FormItem label="客户代码" label-position="right" prop="customerCode">
              <Input  v-model="editForm.customerCode" :disabled="true" placeholder />
            </FormItem>
          </Col>
          <Col :sm="24" :md="24" :lg="12">
                <FormItem label="页面地址" label-position="right">
                    <Input v-model="editForm.appAdress" :disabled="true"></Input>
                </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :sm="24" :md="24" :lg="12">
            <FormItem label="字段名称" label-position="right">
              <Input v-model="editForm.ctrlShowText" :disabled="true"></Input>
            </FormItem>
          </Col>
            <Col :sm="24" :md="24" :lg="12">
                <FormItem label="默认值" label-position="right">
                    <Input v-model="editForm.controleVal" ></Input>
                </FormItem>
            </Col>
        </Row>

      </Form>

      <div style="text-align: center; " slot="footer">
        <modal-button ref="currentButton"
                      :displayAdd="false"
                      :displayDel="false"
                      :displayPrev="false"
                      :displayNext="false"></modal-button>
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
      ivuRequired: 'ivu-required',
      buttonBus: new Vue(),

      messagetitle: "多个消息",
      displayMessage: false,
      messageArr: [],
      editForm: {
          customerCode: "",
          appAdress: "",
          ctrlShowText: "",
          controleVal: "",
          id: ""
      },

      validateRules: {

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
          type: "",
          data: { ids: ids },
          serviceName: "heBaseConfig"
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
          let type = "heBaseConfig/SaveBaseConfig";
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

              if (res.data > 0) {
                if (vm.autoClose) vm.prepareCancel();
                this.operationMode = 'edit';
                vm.$Message.success(tips + "成功!");
              }
              else {
                this.showSingleMessage("warning", "提示", res.message);
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

            this.editForm = JSON.parse(newValue);

      }
    }
  }
};
</script>
