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
        <Form ref="searchModel" :label-width="110" :model="searchModel" inline>
          <Row type="flex">
            <i-col :sm="24" :md="12" :lg="8">
              <FormItem prop="Name" label="名称">
                <Input type="text" v-model="searchModel.Name" placeholder="名称"></Input>
              </FormItem>
            </i-col>
            <i-col :sm="24" :md="12" :lg="8">
              <FormItem prop="Age" label="年龄">
                <Input type="text" v-model="searchModel.Age" placeholder="年龄"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="Address" label="地址">
                <Input type="text" v-model="searchModel.Address" placeholder="地址"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="Name" label="名称">
                <Input type="text" v-model="searchModel.Name" placeholder="名称"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="Age" label="年龄">
                <Input type="text" v-model="searchModel.Age" placeholder="年龄"></Input>
              </FormItem>
            </i-col>
            <i-col v-show="display" :sm="24" :md="12" :lg="8">
              <FormItem prop="Address" label="地址">
                <Input type="text" v-model="searchModel.Address" placeholder="地址"></Input>
              </FormItem>
            </i-col>
            <i-col
              class="ivu-text-right"
              style="padding-left: 12px; padding-right: 12px;"
              :sm="{ span: 24, offset: 1 }"
              :md="{ span: 12, offset: 2 }"
              :lg="{ span: 8, offset: display?16:0 }"
            >
              <FormItem class="searchButton">
                <Button icon="md-search" type="primary" @click="handleSearch()">查询</Button>
                <Button class="ivu-ml-8" icon="md-redo" @click="handleSearch()">重置</Button>
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
        Name: "",
        Age: "",
        Address: ""
      },
      display: false,
      displayName: "展开",
      iconClass: "md-arrow-dropdown"
    };
  },
  methods: {
    handleSearch() {
      this.$emit("searchList", this.searchModel);
    },
    handleClick() {
      if (this.display) {
        this.displayName = "展开";
        this.display = false;
        this.IconClass = "md-arrow-dropdown";
      } else {
        this.display = true;
        this.displayName = "收起";
        this.IconClass = "md-arrow-dropup";
      }
    }
  }
};
</script>
