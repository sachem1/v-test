<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="defaultModel" :model="defaultModel" :rules="rules">
            <Row>
              <i-col>
                <FormItem prop="userName" label="登录名">
                  <Input
                    type="text"
                    @on-blur="GetChildrenSys"
                    v-model="defaultModel.userName"
                    placeholder="请输入登录名"
                  ></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col>
                <FormItem prop="password" label="密码">
                  <Input type="text" v-model="defaultModel.password" placeholder="请输入密码"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col>
                <FormItem prop="childrenSystem" label="系统">
                  <Select v-model="defaultModel.childrenSystem">
                    <Option
                      v-for="item in childrenSystemList"
                      :value="item.value"
                      :key="item.title"
                    >{{ item.title }}</Option>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
            <Row class="submit">
              <i-col>
                <Button type="primary" @click="handleLogin()">登录</Button>
              </i-col>
            </Row>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import user from "@/store/modules/user.js";
import { mapState, mapActions } from "vuex";

export default {
  name: "login_page",
  data() {
    return {
      defaultModel: {
        userName: "",
        password: "",
        childrenSystem: ""
      },
      rules: {
        userName: {
          required: true,
          message: "登录名称不能为空",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      },
      NameValue: {},
      ChildrenUrl: "/api/auth/systems",
      LoginUrl: "/api/auth/login"
    };
  },
  computed: {
    childrenSystemLists: function() {
      console.log(this.$store.state,childrenSystemList);
      return this.$store.state,childrenSystemList;
    }
  },
  methods: {
    ...mapActions({
      login: "handleLogin",
      getChildrenSystemData: "getChildrenSystemData"
    }),
    handleLogin() {
      console.log(this.defaultModel);
      let data = this.defaultModel;
      this.$store.dispatch("login", data).then(res => {
        //redirect
        console.log("登录结果:" + res);
      });

      // login(
      //   {},
      //   {
      //     data: this.defaultModel
      //   }
      // ).then(res => {
      //   //redirect
      //   console.log("登录结果:" + res);
      // });
    },
    GetChildrenSys(event) {
      this.NameValue["userName"] = this.defaultModel.userName;
      if (!this.defaultModel.userName) return;

      let childrenUrl = this.ChildrenUrl + "?u=" + this.defaultModel.userName;
      this.getChildrenSystemData({ url: childrenUrl })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='less'>
@import "./login.less";
</style>