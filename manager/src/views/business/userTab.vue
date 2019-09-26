<template>
  <Tabs type="card">
    <TabPane label="表头">
      <Form ref="formMainData" :model="formMainData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="LoginName" label-position="top">
              <Input v-model="formMainData.LoginName"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Password" label-position="top">
              <Input v-model="formMainData.Password"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Button type="primary" @click="handleMainSubmit">保存</Button>
        </Row>
      </Form>
    </TabPane>
    <TabPane label="表体">
      <Form ref="formDetailData" :model="formDetailData">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Name" label-position="top">
              <Input v-model="formDetailData.Name" placeholder />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Age" label-position="top">
              <Input v-model="formDetailData.Age"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="Address" label-position="top">
              <Input type="textarea" v-model="formDetailData.Address"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Button type="primary" @click="handleDetailSubmit">保存</Button>
        </Row>
      </Form>
    </TabPane>
    <TabPane label="what">空空如也</TabPane>
  </Tabs>
</template>
<script>
export default {
  name: "nameTab",
  data() {
    return {
      formMainData: {
        LoginName: "",
        Password: ""
      },
      formDetailData: {
        Name: "",
        Age: "",
        Address: ""
      },
      mainServiceName: "user/createUser",
      detailServiceName: "user/createUser"
    };
  },
  methods: {
    handleMainSubmit() {
      console.log(JSON.stringify(this.formMainData));
      this.$store
        .dispatch({
          type: "user/createUser",
          data: this.formMainData,
          serviceName: this.mainServiceName
        })
        .then(res => {
          this.$Message.success("success");
        })
        .catch(error => {
          this.$Message.success("fail");
        });
    },
    handleDetailSubmit() {
      console.log(JSON.stringify(this.formDetailData));
      this.$store
        .dispatch({
          type: "user/createUser",
          data: this.formDetailData,
          serviceName: this.detailServiceName
        })
        .then(res => {
          this.$Message.success("success");
        })
        .catch(error => {
          this.$Message.success("fail");
        });
    }
  }
};
</script>
