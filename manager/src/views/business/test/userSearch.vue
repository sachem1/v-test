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
          <Row type="flex" :gutter="16">
            <i-col :sm="24" :md="12" :lg="8">
              <FormItem prop="name" label="预录入统一编号">
                <Input class="ivu-required" type="text" v-model="searchModel.name" placeholder="预录入统一编号"></Input>
                <!-- <input
                  autocomplete="off"
                  v-model="searchModel.name"
                  spellcheck="false"
                  type="text"
                  placeholder
                  class="ivu-required ivu-input ivu-input-small"
                /> -->
              </FormItem>
            </i-col>
            <i-col :sm="24" :md="12" :lg="8">
              <FormItem prop="age" label="清单编号">
                <Input type="text" v-model="searchModel.age" placeholder="清单编号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="帐册号">
                <Input type="text" v-model="searchModel.address" placeholder="帐册号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="hobby" label="数据状态">
                <Select v-model="searchModel.hobby">
                  <Option
                    v-for="item in hobbyList"
                    :value="item.value"
                    :key="item.value"
                  >{{item.label}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem label="申报日期" label-position="right">
                <DatePicker
                  type="daterange"
                  v-model="searchModel.effectiveDate"
                  :start-date="new Date(2016, 1, 1)"
                  placement="bottom-end"
                  placeholder="请选择日期"
                  :split-panels="true"
                  style
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="业务跟踪号">
                <Input type="text" v-model="searchModel.address" placeholder="业务跟踪号"></Input>
              </FormItem>
            </i-col>

            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="对应报关单编号">
                <Input type="text" v-model="searchModel.address" placeholder="对应报关单编号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="监管方式">
                <Input type="text" v-model="searchModel.address" placeholder="监管方式"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="运输方式">
                <Input type="text" v-model="searchModel.address" placeholder="运输方式"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="成品、料件标志">
                <Input type="text" v-model="searchModel.address" placeholder="成品、料件标志"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="数据状态">
                <Input type="text" v-model="searchModel.address" placeholder="数据状态"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :xs="2" :sm="4" :md="6" :lg="8">
              <FormItem prop="CreateUser" label>
                <Checkbox v-model="searchModel.createUser">当前用户</Checkbox>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="申请流水号">
                <Input type="text" v-model="searchModel.address" placeholder="申请流水号"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="address" label="档案状态">                
                <basicinfo-select
                  v-model="searchModel.address"
                  :url="selectUrl"
                  :parentValue="parentValue"
                ></basicinfo-select>
              </FormItem>
            </i-col>
            <i-col
              class="ivu-text-right"
              style="padding-left: 12px; padding-right: 12px;"
              :sm="{ span: 23, offset: 1 }"
              :md="{ span: 12, offset: 12 }"
              :lg="{ span: 8, offset: display?0:0 }"
            >
              <FormItem class="searchButton">
                <Button icon="md-search" type="primary" @click="handleSearch">查询</Button>
                <Button icon="md-redo" class="btn-default" @click="handleReset">重置</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
import basicinfoSelect from "_com/custom-select/basic-info-select";

export default {
  name: "search-page",
  components: {
    basicinfoSelect
  },
  data() {
    return {
      displayAccordion: "",
      parentValue: "BILL_DECLARE_STATUS",
      selectUrl: "tradeService/getProvinceList",
      searchModel: {
        name: "",
        age: "",
        address: "",
        effectiveDate: "",
        hobby: "",
        createUser: ""
      },
      display: false,
      displayName: "展开",
      iconClass: "md-arrow-dropdown",
      hobbyList: [
        {
          label: "爬山",
          value: "1"
        },
        {
          label: "游泳",
          value: "2"
        },
        {
          label: "跑步",
          value: "3"
        }
      ]
    };
  },
  methods: {
    handleSearch() {
      this.$emit("searchList", this.searchModel);
    },
    handleReset() {
      this.searchModel = {};
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
    }
  },
  mounted() {
    this.$emit("searchList", this.searchModel);
  }
};
</script>
