<template>
  <Form ref="loginForm" :model="LoginModel" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="LoginModel.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="LoginModel.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
     <FormItem prop="childrenSystem" label="子系统">
              <Select v-model="LoginModel.childrenSystem" style="width:200px">
                <Option
                  v-for="item in childrenSystemList"
                  :value="item.value"
                  :key="item.title"
                >{{ item.title }}</Option>
              </Select>
            </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      LoginModel: {
        userName: "",
        password: "",
        childrenSystem: ""
      },
      NameValue: {},
      ChildrenUrl: "/api/authService/getChildrenSystem",
      LoginUrl: "/api/authService/Login",
      childrenSystemList: [
        {
          title: "AEO认证",
          value: 1
        },
        {
          title: "测试",
          value: 2
        }
      ]
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.LoginModel.userName,
            password: this.LoginModel.password,
            childrenSystem:this.LoginModel.childrenSystem
          })
        }
      })
    }
  }
}
</script>
