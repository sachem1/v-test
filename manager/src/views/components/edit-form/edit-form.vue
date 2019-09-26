<template>
<div style="position: relative; height: 100%;">
      <Modal
        title="创建"
        v-model="showModalForm"
        width="720"
        :mask-closable="false"
        scrollable
        :prepareAdd="prepareAdd"
        draggable
        class-name="vertical-center-modal"
        :styles="styles"
      >
        <Form :model="formData">
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Name" label-position="top">
                <Input v-model="formData.Name" placeholder />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="Age" label-position="top">
                <Input v-model="formData.Age"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Address" label-position="top">
                <Input type="textarea" v-model="formData.Address"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="LoginName" label-position="top">
                <Input v-model="formData.LoginName"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="Password" label-position="top">
                <Input v-model="formData.Password"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="showModalForm = false">取消</Button>
          <Button type="primary" @click="handleSubmit">保存</Button>
        </div>
      </Modal>
    </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "UserForm",
  props: {
    Name: {
      type: String,
      default: ""
    },
    Age: {
      type: Number,
      default: 0
    },
    Address: {
      type: String,
      default: ""
    },
    LoginName: {
      type: String,
      default: ""
    },
    Password: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      userForm: {
        Name: "",
        Address: "",
        Age: 0,
        LoginName: "",
        Password: ""
      },
      rules: {
        LoginName: {
          required: true,
          message: "登录名称不能为空",
          trigger: "blur"
        },
        Password: {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    ...mapActions({
      SaveUser: "createUser",
      UpdateUser: "updateUser"
    }),
    handleSubmit() {
      var data = this.userForm;
      this.SaveUser(data)
        .then(res => {
          this.$Message.success("添加成功!");
        })
        .catch(eror => {});
    }
  }
};
</script>