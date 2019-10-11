<template>
  <div>
    <Collapse accordion v-model="displayAccordion">
      <Panel name="1">
        查询
        <div slot="content">
          <Card>
            <Form
              ref="searchModel"
              :label-width="100"
              :model="searchModel"
              :rules="searchRules"
              inline
            >
              <Row>
                <i-col :xs="2" :sm="4" :md="6" :lg="8">
                  <FormItem prop="Name" label="名称">
                    <Input type="text" v-model="searchModel.Name" placeholder="名称"></Input>
                  </FormItem>
                </i-col>
                <i-col :xs="2" :sm="4" :md="6" :lg="8">
                  <FormItem prop="Age" label="年龄">
                    <Input type="text" v-model="searchModel.Age" placeholder="年龄"></Input>
                  </FormItem>
                </i-col>
                <i-col :xs="2" :sm="4" :md="6" :lg="8">
                  <FormItem prop="Address" label="地址">
                    <Input type="text" v-model="searchModel.Address" placeholder="地址"></Input>
                  </FormItem>
                </i-col>
              </Row>
              <Row class="searchButton">
                <i-col>
                  <Button icon="android-search" type="primary" @click="handleSearch()">查询</Button>
                </i-col>
              </Row>
            </Form>
          </Card>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
export default {
  name: "search-page",  
  data() {
    return {
      displayAccordion:'',
      searchModel: {
        Name: "",
        Age: "",
        Address: ""
      },
      searchRules: {
        Name: {
          required: true,
          message: "姓名为搜索必填项",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    handleSearch() {
      this.$emit("searchList", this.searchModel);
    }
  }
};
</script>

<style lang='less'>
.searchButton {
  text-align: center;

  .btn {
    margin-left: 0;
  }
}
</style>