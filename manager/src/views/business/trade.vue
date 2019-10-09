<template>
  <div class>
    <div class="defaultModel">
      <Card>
        <Form ref="defaultModel" :label-width="120" :model="defaultModel" :rules="rules">
          <Row>
            <i-col span="8">
              <FormItem prop="name" label="名称">
                <Input type="text" v-model="defaultModel.name" placeholder="名称"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem prop="age" label="年龄">
                <Input type="text" v-model="defaultModel.age" placeholder="年龄"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem prop="address" label="地址">
                <Input type="text" v-model="defaultModel.address" placeholder="地址"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="8">
              <FormItem prop="remark" label="备注">
                <Input type="text" v-model="defaultModel.remark"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem prop="userName" label="用户名">
                <Input type="text" v-model="defaultModel.userName" placeholder="用户名"></Input>
              </FormItem>
            </i-col>
            <i-col span="8">
              <FormItem prop="password" label="密码">
                <Input type="text" v-model="defaultModel.password" placeholder="密码"></Input>
              </FormItem>
            </i-col>
          </Row>
          <Row class="submit">
            <i-col>
              <Button type="primary" @click="handleSubmit()">保存</Button>
            </i-col>
          </Row>
        </Form>
      </Card>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
// import trade from "@/store/business/trade.js";
export default {
  name: "trade",
  data() {
    return {
      defaultModel: {
        name: "",
        userName: "",
        password: "",
        age: 0,
        address: "",
        remark: ""
      },
      rules: {
        name: {
          required: true,
          message: "名称不能为空",
          trigger: "blur"
        }
      },
      operationMode: null,
      entityName: "",
      serviceName: "",
      listUrl: null,
      columns: [],
      thisTableData: [],
      pageIndex: 1,
      recordCount: 0,
      searchModel: {},
      showModalForm: false,
      showChildModalForm: false,
      modal_loading: false,
      editingModel: {},
      validateRules: {},
      commonEnums: {},
      selectedRows: [],
      formItems: [],
      searchItems: [],
      bus: new Vue(),
      childFormTitle: " ",
      addBehaviorSetting: {},
      tableTitle: null,
      disableImportExport: false,
      autoClose: true,
      disableAdd: false,
      disableBatchDelete: false
    };
  },
  methods: {
    handleSubmit() {
      console.log(JSON.stringify(this.defaultModel));
      this.$refs.defaultModel
        .validate(valid => {
          console.log(valid);
          if (valid) {
            // trade.actions.createData(this.defaultModel)
            //   .then(res => {
            //     console.log(res);
            //   })
            //   .catch(error => {
            //     console.log(error);
            //   });
            this.$Message.success("提交成功!");
          } else {
            this.$Message.error("Fail!");
          }
          console.log(111);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='less'>
.submit {
  text-align: center;
  .btn {
    margin-left: 0;
  }
}
</style>