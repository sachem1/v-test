<template>
  <div>
    <div class="search-header">
      <Row>
        <Col span="12">
          <span class="title">查询</span>
        </Col>
        <Col span="12">
          <span @click="handleClick()" class="search-title-ico">
            <Icon class="icon" :type="iconClass"></Icon>
          </span>
        </Col>
      </Row>
    </div>
    <div class="search-content">
      <Card>
        <Form
          ref="searchModel"
          :label-width="110"
          :model="searchModel"
          inline
          @keydown.enter.native="handleSearch"
        >
          <!--                <Input type="hidden" v-model="searchModel.IEFlag" placeholder="进出口标记"></Input>-->
          <Row type="flex" :gutter="16">
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem label="帐册号">
                <custom-select
                              v-model="searchModel.emsNo"
                              :parentValue="''"
                              :currentSelectVal="searchModel.emsNo"
                              :url="'emsrecordinfo/emsnoselect'"
                            ></custom-select>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="BillNo" label="清单编号">
                <Input type="text" v-model="searchModel.BillNo" placeholder="清单编号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="EntrySeqNo" label="报关单统一编号">
                <Input type="text" v-model="searchModel.EntrySeqNo" placeholder="报关单统一编号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="CopErpCode" label="业务跟踪号">
                <Input type="text" v-model="searchModel.CopErpCode" placeholder="业务跟踪号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="RelativeCustomsNo" label="对应报关单编号">
                <Input type="text" v-model="searchModel.RelativeCustomsNo" placeholder="对应报关单编号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="TradeMode" label="监管方式">
                <Input type="text" v-model="searchModel.TradeMode" placeholder="监管方式"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="TransMode" label="运输方式">
                <Input type="text" v-model="searchModel.TransMode" placeholder="运输方式"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="GoodsFlag" label="成品、料件标志">
                <Input type="text" v-model="searchModel.GoodsFlag" placeholder="成品、料件标志"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="Status" label="数据状态">
                <Input type="text" v-model="searchModel.Status" placeholder="数据状态"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="PreEmsId" label="预录入统一编号">
                <Input type="text" v-model="searchModel.PreEmsId" placeholder="预录入统一编号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="QueryBeginDate" label="创建日期">
                <DatePicker type="date" v-model="searchModel.QueryBeginDate" placeholder="开始日期"></DatePicker>
                <DatePicker type="date" v-model="searchModel.QueryEndDate" placeholder="结束日期"></DatePicker>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="CreateUser" label>
                <Checkbox v-model="searchModel.CreateUser">当前用户</Checkbox>
              </FormItem>
            </i-col>            
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="Remark" label="备注">
                <Input type="text" v-model="searchModel.Remark" placeholder="备注"></Input>
              </FormItem>
            </i-col>
            <i-col
              v-show="display"
              class="ivu-text-right"
              style="padding-left: 12px; padding-right: 12px;"
              :sm="{ span: 23, offset: 1 }"
              :md="{ span: 12, offset: 12 }"
              :lg="{ span: 8, offset: display?8:0 }"
            >
              <FormItem class="searchButton">
                <Button icon="md-search" type="primary" @click="handleSearch">查询</Button>
                <Button icon="md-redo" class="btn-default btnCancel" @click="handleReset">重置</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
import customSelect from "_com/custom-select";
export default {
  name: "billIn_body_query",
  components:{customSelect},
  data() {
    return {
      CodeList: [],
      displayAccordion: "",
      searchModel: {
        IEFlag: "I",
        OrganizationCode: "",
        EmsNo: "",
        BillNo: "",
        CopErpCode: "",
        TradeMode: "",
        TransMode: "",
        GoodsFlag: "",
        PreEmsId: "",
        QueryBeginDate: "",
        QueryEndDate: "",
        Status: "",
        RelativeCustomsNo: "",
        EntrySeqNo: "",
        Ids: "",
        Remark: "",
        CreateUser: ""
      },
      display: false,
      displayName: "展开",
      iconClass: "md-arrow-dropdown"
    };
  },
  created() {
  },
  mounted() {
    this.handleSearch();
  },
  methods: {
    handleSearch() {        
      this.$emit("searchList", this.searchModel);
    },
    handleClick() {
      if (this.display) {
        this.displayName = "展开";
        this.display = false;
        this.iconClass = "md-arrow-dropdown";
      } else {
        this.display = true;
        this.displayName = "收起";
        this.iconClass = "md-arrow-dropup";
      }
    },   
    handleReset() {
      this.searchModel = {};
    }   
  }
};
</script>

<style lang='less' scoped>
.search {
  text-align: center;

  .btn {
    margin-left: 0;
  }
}

.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.searchModel-wapper {
  .ivu-row {
    padding: 1px 0;
  }
}

.ivu-select-large.ivu-select-single .ivu-select-selection {
  height: 25px !important;
  width: 80% !important;
}

.ivu-select-large .ivu-select-input,
.ivu-select-large.ivu-select-multiple .ivu-select-input {
  font-size: 16px;
  height: 20px !important;
  line-height: 20px !important;
  top: 3px;
}

.list-search .ivu-date-picker {
  display: inline-block;
  min-width: 80px;
  width: 49.3%;
}
</style>
