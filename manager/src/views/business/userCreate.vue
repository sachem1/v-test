<template>
  <Form ref="userForm" :model="userForm" :rules="rules">
    <Row>
      <i-col span="8">
        <FormItem prop="LoginName" label="登录名">
          <Input type="text" v-model="userForm.LoginName" placeholder="请输入登录名"></Input>
        </FormItem>
      </i-col>
      <i-col span="8">
        <FormItem prop="Password" label="密码">
          <Input type="text" v-model="userForm.Password" placeholder="密码"></Input>
        </FormItem>
      </i-col>
      <i-col span="8">
        <FormItem prop="Name" label="用户名">
          <Input type="text" v-model="userForm.Name" placeholder="请输入用户名"></Input>
        </FormItem>
      </i-col>
    </Row>
    <Row>
      <i-col span="8">
        <FormItem prop="Age" label="年龄">
          <Input type="number" v-model="userForm.Age"></Input>
        </FormItem>
      </i-col>
      <i-col span="8">
        <FormItem prop="Address" label="地址">
          <Input type="textarea" v-model="userForm.Address"></Input>
        </FormItem>
      </i-col>
    </Row>
  </Form>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "UserForm",
  props:{
    Name:{
      type:String,
      default:''
    },
    Age:{
      type:Number,
      default:0
    },
    Address:{
      type:String,
      default:''
    },
    LoginName:{
      type:String,
      default:''
    },
    Password:{
      type:String,
      default:''
    },
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