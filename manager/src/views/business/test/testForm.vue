<template>
  <div>
    <Form :model="userForm" label-position="left" :label-width="100">
      <Row :gutter="32">
        <Col span="8">
          <FormItem label="Name" label-position="top">
            <Input v-model="userForm.Name" placeholder />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="Age" label-position="top">
            <Input v-model="userForm.Age"></Input>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="Address" label-position="top">
            <Input type="textarea" v-model="userForm.Address"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div style="text-align: center;" slot="footer">
      <Button type="primary" @click="handleSubmit">保存</Button>
      <Button style="margin-right: 8px" @click="closePanel()">取消</Button>
    </div>
  </div>
</template>

<script>
import axios from "@/libs";
export default {
  name: "test_form",
  data() {
    return {
      userForm: {
        Name: "",
        Age: "",
        Address: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      var data = this.userForm;

      this.$store
        .dispatch({
          type: "createNewUser",
          data: data
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>