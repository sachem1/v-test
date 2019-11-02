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
        <Form ref="searchModel" :label-width="100" :model="searchModel" inline>
          <Row type="flex" style="margin-left: -12px; margin-right: -12px;">
            <i-col :sm="24" :md="12" :lg="8">
              <formItem prop="EmsNo" label="账册编号">
                <Select v-model="searchModel.EmsNo" filterable>
                  <Option value="" key="">全部</Option>
                  <Option v-for="item in emsNoList" :value="item" :key="item">{{
                                    item }}
                  </Option>
                </Select>
              </formItem>
            </i-col>
            <i-col :sm="24" :md="12" :lg="8">
              <FormItem prop="ProductId" label="生产订单号">
                <Input type="text" v-model="searchModel.ProductId" placeholder="生产订单号"></Input>
              </FormItem>
            </i-col>
            <i-col :sm="24" :md="12" :lg="8">
              <FormItem label="创建时间">
                <Row>
                  <Col :lg="11">
                  <DatePicker type="date" placement="bottom-end" placeholder="请选择日期" v-model="searchModel.Input_DateBegin" format="yyyy-MM-dd"></DatePicker>
                  </Col>
                  <Col :lg="2" style="text-align:center;">
                  ~
                  </Col>
                  <Col :lg="11">
                  <DatePicker type="date" placement="bottom-end" placeholder="请选择日期" v-model="searchModel.Input_DateEnd" format="yyyy-MM-dd"></DatePicker>
                  </Col>
                </Row>
              </FormItem>
            </i-col>

            <i-col :sm="24" :md="12" :lg="8">
              <FormItem prop="ErpNo" label="企业版本号">
                <Input type="text" v-model="searchModel.ErpNo" placeholder="企业版本号"></Input>
              </FormItem>
            </i-col>
            <i-col :sm="24" :md="12" :lg="8">
              <FormItem prop="BeginDate" label="单耗版本号">
                <Input type="text" v-model="searchModel.BeginDate" placeholder="单耗版本号"></Input>
              </FormItem>
            </i-col>
            <i-col :sm="24" :md="12" :lg="8">
              <FormItem prop="ExgNo" label="成品货号">
                <Input type="text" v-model="searchModel.ExgNo" placeholder="成品货号"></Input>
              </FormItem>
            </i-col>

            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="ExgGNo" label="成品序号">
                <Input type="number" v-model="searchModel.ExgGNo" placeholder="成品序号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="ImgNo" label="料件货号">
                <Input type="text" v-model="searchModel.ImgNo" placeholder="料件货号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="ImgGNo" label="料件序号">
                <Input type="number" v-model="searchModel.ImgGNo" placeholder="料件序号"></Input>
              </FormItem>
            </i-col>

            <i-col class="ivu-text-right" style="padding-left: 12px; padding-right: 12px;" :sm="{ span: 24, offset: 1 }" :md="{ span: 12, offset: 2 }" :lg="{ span: 8, offset: display?16:16 }">
              <FormItem class="searchButton">
                <Button icon="md-search" type="primary" @click="handleSearch()">查询</Button>
                <Button class="btn-default" icon="md-redo" @click="handleReset()">重置</Button>
              </FormItem>

            </i-col>
          </Row>
        </Form>
      </Card>
    </div>

  </div>
</template>

<script>
 
  export default {
    name: "search-page",
    data() {
      return {
        displayAccordion: "",
        searchModel: {
          EmsNo: "",
          ProductId: "",
          Input_DateBegin: "",
          Input_DateEnd: "",
          ErpNo: "",
          BeginDate: "",
          ExgNo: "",
          ExgGNo: "",
          ImgNo: "",
          ImgGNo: "",
          effectiveDate: []
        },
        display: false,
        displayName: "展开",
        emsNoList: [],
        iconClass: "md-arrow-dropdown"
      };
    },
    methods: {
      handleSearch() {
        debugger;
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
      getEmsNoList() {
        this.$store
          .dispatch({
            type: "goodsErp/getEmsNoList",
            data: { custromeCode: "PSXS" }
          })
          .then(res => {
            this.emsNoList = res.data;
          });
      },
      handleReset() {
        this.searchModel = {};
      }
    },
    created() {
      this.getEmsNoList();
    }
  };
</script>