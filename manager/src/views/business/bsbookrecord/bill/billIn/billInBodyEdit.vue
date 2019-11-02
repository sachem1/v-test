<template>
  <div class="form-content">
    <Form
      :model="formDetailData"
      ref="detailForm"
      label-position="left"
      :label-width="200"
      :rules="bodyRules"
    >
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="清单序号" label-position="top">
            <Input v-model="formDetailData.seqNo" :disabled="defaultDisabled" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="商品料号" label-position="top" prop="copGNo">
            <basic-info-select
              v-model="formDetailData.copGNo"
              :parentValue="'BillType'"
              :currentSelectVal="formDetailData.copGNo"
              :isRequired="true"
            ></basic-info-select>
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="清单编号" label-position="top">
            <Input v-model="formDetailData.copEmsId" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="SO号" label-position="top">
            <Input v-model="formDetailData.lotAtt03" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="PO号" label-position="top">
            <Input v-model="formDetailData.lotAtt01" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="发票号" label-position="top">
            <Input v-model="formDetailData.lotAtt02" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="商品序号" label-position="top">
            <Input v-model="formDetailData.gNo" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="报关单商品序号" label-position="top">
            <Input v-model="formDetailData.entGNo" :disabled="defaultDisabled" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="流转申报表序号" label-position="top">
            <Input v-model="formDetailData.changeSeqNo" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="HS编码" label-position="top" prop="hsCode">
            <Input v-model="formDetailData.hsCode" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="24" :lg="16">
          <FormItem label="商品名称" label-position="top" prop="gName">
            <Input v-model="formDetailData.gName" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="申报数量" label-position="top" prop="qty">
            <Input type="number" v-model="formDetailData.qty" @on-change="priceCalculation" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="24" :lg="16">
          <FormItem label="规格型号" label-position="top">
            <Input v-model="formDetailData.gModel" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="企业申报单价" label-position="top" prop="tradePrice">
            <Input type="number" v-model="formDetailData.tradePrice" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="申报计量单位" label-position="top" prop="unit">
            <basic-codeSelect
              v-model="formDetailData.unit"
              :parentValue="'Unit'"
              :currentSelectVal="formDetailData.unit"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="企业申报总价" label-position="top" prop="tradeTotal">
            <InputNumber v-model="formDetailData.tradeTotal" @on-change="priceCalculation"></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="法定数量" label-position="top" prop="qty1">
            <Input type="number" v-model="formDetailData.qty1" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="法定计量单位" label-position="top" prop="unit1">
            <basic-codeSelect
              v-model="formDetailData.unit1"
              :parentValue="'Unit'"
              :currentSelectVal="formDetailData.unit1"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="申报币制" label-position="top" prop="curr">
            <basic-codeSelect
              v-model="formDetailData.curr"
              :parentValue="'Curr'"
              :currentSelectVal="formDetailData.curr"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="第二法定数量" label-position="top">
            <Input type="number" v-model="formDetailData.qty2" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="法定第二计量单位" label-position="top" prop="unit2">
            <basic-codeSelect
              v-model="formDetailData.unit2"
              :parentValue="'Unit'"
              :currentSelectVal="formDetailData.unit2"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="原产国(地区)" label-position="top" prop="country">
            <basic-codeSelect
              v-model="formDetailData.country"
              :parentValue="'Country'"
              :currentSelectVal="formDetailData.country"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="毛重" label-position="top">
            <Input v-model="formDetailData.grossWt" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="净重" label-position="top">
            <Input v-model="formDetailData.netWt" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="最终目的国(地区)" label-position="top" prop="destinationCountry">
            <basic-codeSelect
              v-model="formDetailData.destinationCountry"
              :parentValue="'Country'"
              :currentSelectVal="formDetailData.destinationCountry"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="用途" label-position="top">
            <basic-codeSelect
              v-model="formDetailData.useType"
              :parentValue="'UseType'"
              :currentSelectVal="formDetailData.useType"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="征免方式" label-position="top" prop="dutyMode">
            <basic-codeSelect
              v-model="formDetailData.dutyMode"
              :parentValue="'DutyMode'"
              :currentSelectVal="formDetailData.dutyMode"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="单耗版本号" label-position="top">
            <basic-codeSelect
              v-model="formDetailData.beginDate"
              :parentValue="'DutyMode'"
              :currentSelectVal="formDetailData.beginDate"
              :isRequired="true"
            ></basic-codeSelect>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="重量比例因子" label-position="top">
            <Input v-model="formDetailData.factorWt" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="第一比例因子" label-position="top">
            <Input v-model="formDetailData.factor1" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="第二比例因子" label-position="top">
            <Input v-model="formDetailData.factor2" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="12" :lg="8">
          <FormItem label="ERP料号" label-position="top">
            <Input v-model="formDetailData.erpSku" />
          </FormItem>
        </Col>
        <Col :sm="24" :md="24" :lg="16">
          <FormItem label="备注" label-position="top">
            <Input v-model="formDetailData.remark" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :sm="24" :md="24" :lg="24">
          <div class="form-button">
            <!-- <Button type="primary" @click="handleDetailSubmit" icon="md-thunderstorm">保存</Button> -->
            <modal-button ref="currentButton" :modalButtonBus="modalButtonBus"></modal-button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import Vue from "vue";
import basicInfoSelect from "_com/custom-select/basic-info-select";
import basicCodeSelect from "_com/custom-select/basic-code-select";
import modalButton from "_com/modal-button";
export default {
  name: "billIn_body",
  components: { basicInfoSelect, basicCodeSelect, modalButton },
  props: { headId: String },
  data() {
    return {
      bodyId: 0,
      currentHeadId: 0,
      formDetailData: {},
      bodyRules: {},
      modalButtonBus: new Vue(),
      searchModel: {
        lotAtt01: "",
        lotAtt02: "",
        lotAtt03: "",
        copGNo: "",
        gName: "",
        seqNo: 0
      },
      defaultDisabled: true
    };
  },
  methods: {
    prepareAdd() {
      this.formDetailData = {};
      this.formDetailData.dutyMode = "3";
    },
    prepareDel() {
      if (this.bodyId <= 0) {
        return;
      }
      this.$Modal.confirm({
        title: "确认提示",
        content: "删除进口核注清单?",
        onOk: () => {
          this.$store
            .dispatch({
              type: "billIn/deleteBillHeads",
              data: { id: this.bodyId, type: this.headType }
            })
            .then(res => {
              //加载复制的表头数据
              this.formMainData = res;
            })
            .catch(err => {
              this.$Message.error("复制失败!");
            });
        }
      });
    },
    prepareSave() {
      this.formDetailData.headId=this.currentHeadId;
       let vm = this;
      let data = vm.formDetailData;
      vm.$refs.detailForm.validate(valid => {
        if (valid) {
          vm.$store
            .dispatch({
              type: "billIn/saveBillBody",
              data: data
            })
            .then(res => {
              if (res.data) {
                vm.$Message.success("保存表体成功!");
                vm.formDetailData = res.data;
              } else {
                util.singleMessage(
                  vm,
                  "保存进口核注清单",
                  res.message,
                  "error"
                );
              }
            })
            .catch(err => {
              vm.$Message.error("保存失败!");
            });
        } else {
          vm.$Message.warning("请完善必填信息!");
        }
      });
    },
    prepareCancel() {
      this.formDetailData = {};
      this.formDetailData.dutyMode = "3";
    },
    preparePrev() {     
    },
    prepareNext() {
    },
    priceCalculation() {
      let tradeTotal = this.formDetailData.tradeTotal;
      let qty = this.formDetailData.qty;
      if (tradeTotal <= 0) return;
      if (qty <= 0) return;
      this.formDetailData.tradePrice = (tradeTotal / qty).toFixed(4);
    }
  },
  watch: {
    headId: function(val) {
      this.currentHeadId = val;
    }
  },
  created() {
    this.modalButtonBus.$on("prepareAdd", this.prepareAdd);
    this.modalButtonBus.$on("prepareDel", this.prepareDel);
    this.modalButtonBus.$on("prepareSave", this.prepareSave);
    this.modalButtonBus.$on("prepareCancel", this.prepareCancel);
    this.modalButtonBus.$on("preparePrev", this.preparePrev);
    this.modalButtonBus.$on("prepareNext", this.prepareNext);
  },
  beforeDestroy() {
    this.modalButtonBus.$off("prepareAdd", this.prepareAdd);
    this.modalButtonBus.$off("prepareDel", this.prepareDel);
    this.modalButtonBus.$off("prepareSave", this.prepareSave);
    this.modalButtonBus.$off("prepareCancel", this.prepareCancel);
    this.modalButtonBus.$off("preparePrev", this.preparePrev);
    this.modalButtonBus.$off("prepareNext", this.prepareNext);
  }
};
</script>

<style>
</style>