import {
  login,
  getSystemList
} from "@/api/user";
import util from "@/libs/util";

const ulogin = {
  namespaced: true,
  state: {
    childrenSystemList: [],
    userinfo: JSON.parse(util.getCookieValue("epass.userinfo")),
    loginName: util.getCookieValue("epass.loginName"),
    avatarImgPath: "",
    token: util.getToken()
  },
  mutations: {
    setChildrenSystemList(state, list) {
      state.childrenSystemList = list;
    },
    setUserToken(state, data) {
      util.setToken(data.token, data.logonTime);
      util.setLoginName(data.loginName, data.loginName);
    },
    setUserInfo(state, data) {
      state.userinfo = data;
      util.setCookieValue('epass.userinfo', JSON.stringify(data));
      state.loginName = data.loginName;
    }
  },
  actions: {
    // 登录
    handleLogin({
      commit
    }, payload) {
      payload.data.loginName = payload.data.loginName.trim();
      return new Promise((resolve, reject) => {
        login(payload.data)
          .then(res => {
            if (res.data.message !== null) {
              payload.data.loginStatus = true;
              payload.data.loginErrorInfo = res.data.message;
              return false;
            } else {
              var userinfo = res.data.data;
              commit("setUserToken", userinfo);
              commit("setUserInfo", userinfo);
              resolve(userinfo);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getChildrenSystem({
      commit
    }, paylaod) {
      let loginName = paylaod.loginName.trim();
      return new Promise((resolve, reject) => {
        getSystemList({
            loginName
          })
          .then(res => {
            // commit('setLoginName', loginName);
            resolve(util.wrapResult(res));
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};

export default ulogin;