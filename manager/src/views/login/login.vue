<template>
  <div class="login">
    <div class="login-con">
      <div class="login-logo">
        <img src="../../assets/images/login-head.png" style="width:100%" />
      </div>
      <Card icon="log-in" style="border-radius: 10px;">
        <div class="form-con">
          <i-form :model="defaultModel" :rules="rules" :label-width="80" @keydown.enter.native="handleLogin">
            <Form-item prop="loginName" size="large" label="登录名" class="lable">
              <i-input
                type="text"
                v-model="defaultModel.loginName"
                placeholder="请输入登录名"
                @on-blur="loadChildrenSystem()"
                @on-focus="hiddenLoginErrorInfo()"
                size="large"
              ></i-input>
            </Form-item>
            <Form-item
              prop="password"
              size="large"
              :label="defaultModel.passwordLable"
              class="lable"
            >
              <i-input
                type="password"
                size="large"
                v-model="defaultModel.password"
                placeholder="请输入密码"
                @on-focus="hiddenLoginErrorInfo()"
              ></i-input>
            </Form-item>
            <FormItem prop="subId" size="large" :label="defaultModel.subLable" class="lable">
              <Select
                v-model="defaultModel.subId"
                placeholder="请选择系统"
                filterable
                size="large"
                remote
                :loading="rendering"
              >
                <Option
                  v-for="item in childrenSystemList"
                  :value="item.value"
                  :key="item.label"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            <Row style="text">
              <div style="text-align: center;padding-left: 20px;">
                <Alert
                  type="error"
                  style="color:red;"
                  v-show="defaultModel.loginStatus"
                >{{defaultModel.loginErrorInfo}}</Alert>
                <Button
                  type="primary"
                  @click="handleLogin()"
                  class="login-btn"
                >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
              </div>
            </Row>
          </i-form>
          <!-- <Form ref="defaultModel" :model="defaultModel" :rules="rules" inline>
            <Row>
              <FormItem prop="loginName" label="登录名">
                <i-input
                  type="text"
                  @on-blur="loadChildrenSystem"
                  v-model="defaultModel.loginName"
                  placeholder="请输入登录名"
                ></i-input>
              </FormItem>
            </Row>
            <Row>
              <i-col>
                <FormItem prop="password" label="密码">
                  <Input type="password" v-model="defaultModel.password" placeholder="请输入密码"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col>
                <FormItem prop="subId" label="系统">
                  <Select v-model="defaultModel.subId" filterable remote :loading="rendering">
                    <Option
                      v-for="item in childrenSystemList"
                      :value="item.value"
                      :key="item.label"
                    >{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
            <Row class="submit">
              <i-col>
                <Button type="primary" @click="handleLogin()">登录</Button>
              </i-col>
            </Row>
          </Form>-->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: "login_page",
  data() {
    const validateLoginName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("登录名称不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      defaultModel: {
        loginStatus: false,
        loginErrorInfo: "ceshi",
        loginName: "",
        password: "",
        passwordLable: "密\xa0\xa0\xa0\xa0码",
        subLable: "系\xa0\xa0\xa0\xa0统",
        subId: ""
      },
      rules: {
        loginName: {
          validator: validateLoginName,
          trigger: "blur"
        },
        password: {
          validator: validatePassword,
          trigger: "blur"
        }
      },
      rendering: false,
      childrenSystemList: []
    };
  },
  methods: {
    handleLogin() {
      let data = this.defaultModel;
      this.$store
        .dispatch({
          type: "login/handleLogin",
          data
        })
        .then(res => {
          if (res.token) {
            this.$router.push({
              name: "home_index"
            });
          }
        });
    },
    hiddenLoginErrorInfo() {
      this.defaultModel.loginStatus = false;
    },
    loadChildrenSystem() {
      let loginName = this.defaultModel.loginName;
      if (loginName !== "") {
        this.loading1 = true;
        this.$store
          .dispatch({
            type: "login/getChildrenSystem",
            loginName: loginName
          })
          .then(res => {
            this.childrenSystemList = [];
            var data = res;
            for (let i = 0; i < data.length; i++) {
              this.childrenSystemList.push({
                label: data[i].label,
                value: data[i].value
              });
              this.defaultModel.subId = this.childrenSystemList[0].value;
            }
            this.loading1 = false;
          }, 800);
      } else {
        this.childrenSystemList = [];
      }
    }
  }
};
</script>

<style lang='less'>
@import "./login.less";
</style>
