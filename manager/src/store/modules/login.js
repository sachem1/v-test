import {
    login,
    getSystemList
} from '@/api/user';
import util from '@/libs/util';

const ulogin = {
    namespaced: true,
    state: {
        childrenSystemList: [],
        userName: '',
        userId: '',
        loginName: util.getCookieValue('loginName'),
        avatarImgPath: '',
        token: util.getToken()
    },
    mutations: {
        setChildrenSystemList(state, list) {
            state.childrenSystemList = list;
        },
        setUserToken(state, data) {
            var expireDate = new Date(data.LogonTime);
            var validSeconds = 3600;
            expireDate.setSeconds(expireDate.getSeconds() + validSeconds);
            util.setToken(data.Token, expireDate);
        },
        setUserInfo(state, data) {
            state.userId = data.UserId;
            state.userName = data.UserName;
            state.loginName = data.LoginName;
            util.setCookieValue('loginName', data.LoginName);
        },
        setLoginName(state, loginName) {
            state.loginName = loginName;
        }

    },
    actions: {
        // 登录
        handleLogin({
            commit
        }, payload) {
            payload.data.loginName = payload.data.loginName.trim();
            return new Promise((resolve, reject) => {
                login(payload.data).then(res => {
                    var userinfo = res.data.Result;
                    commit('setUserToken', userinfo);
                    commit('setUserInfo', userinfo);
                    resolve(userinfo);
                }).catch(err => {
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
                }).then(res => {
                    commit('setLoginName', loginName);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

export default ulogin;