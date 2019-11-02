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
        
                <FormItem label="账册号" label-position="top" prop="EmsNo">
                         <basicinfo-select
                        v-model="searchModel.EmsNo"
                        :url="selectUrl"
                        :parentValue="parentValue"
                        :currentSelectVal="searchModel.EmsNo"
                        ></basicinfo-select>
            </FormItem>
          </i-col>
          <i-col :sm="24" :md="12" :lg="8">
            <FormItem prop="CodeT" label="商品编码">
              <Input type="text" v-model="searchModel.CodeT" placeholder="商品编码"></Input>
            </FormItem>
          </i-col>
          <i-col v-show="display" :sm="24" :md="12" :lg="8">
             <FormItem prop="GName" label="商品名称">
           <Input type="text" v-model="searchModel.GName" placeholder="商品名称"></Input>
            </FormItem>
          </i-col>
          <i-col v-show="display" :sm="24" :md="12" :lg="8">
            <FormItem prop="GNo" label="备案项号">
              <Input type="text" v-model="searchModel.GNo" placeholder="备案项号"></Input>
            </FormItem>
          </i-col>
        
          <i-col
            class="ivu-text-right"
            style="padding-left: 12px; padding-right: 12px;"
            :sm="{ span: 24, offset: 1 }"
            :md="{ span: 12, offset: 2 }"
            :lg="{ span: 8, offset: display?8:0 }"
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
import Vue from "vue";
import basicinfoSelect from "_com/custom-select";

export default {
  name: 'search-page',
   components: {
  
    basicinfoSelect
  },
  data() {
    return {
      displayAccordion: '',
      CodeList: [],
      searchModel: {
        EmsNo:"",
        CodeT:"" ,
        GName:"",
        GNo:"",
      },
      display: false,
      displayName: '展开',
       iconClass: "md-arrow-dropdown",
      parentValue: "1",
      selectUrl: "itRecordInfo/emsnoselect",
    };
  },
 
  rules: {


  },
  mounted() {
    
  },
  created() {
    
  },
  methods: {
    handleSearch() {
      this.$emit('searchList', this.searchModel);
    },
 
    handleClick() {
      if (this.display) {
        this.displayName = '展开';
        this.display = false;
        this.iconClass = 'md-arrow-dropup';
      } else {
        this.display = true;
        this.displayName = '收起';
        this.iconClass = 'md-arrow-dropdown';
      }
    },
    handleReset() {
      this.searchModel = {EmsNo:''};
    }

  }
};
</script>
