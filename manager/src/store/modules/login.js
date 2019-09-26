import {
    login,
    getSystemList
} from '@/api/user';
import util from '@/libs/util';

const ulogin = {
    namespaced: true,
    state: {
        childrenSystemList: [],
        userName: util.getCookieValue('userName'),
        userId: '',
        loginName: util.getCookieValue('loginName'),
        avatarImgPath: '',
        token: util.getToken()
    },
    mutations: {
        setChildrenSystemList (state, list) {
            state.childrenSystemList = list;
        },
        setUserToken (state, data) {
            var expireDate = new Date(data.LogonTime);
            var validSeconds = 3600;
            expireDate.setSeconds(expireDate.getSeconds() + validSeconds);
            util.setToken(data.Token, expireDate);
        },
        setUserInfo (state, data) {
            state.userId = data.UserId;
            state.userName = data.UserName;
            util.setCookieValue('userId', data.UserId);
            util.setCookieValue('loginName', data.LoginName);
            util.setCookieValue('userName', data.UserName);
        }
    },
    actions: {
        // 登录
        handleLogin ({
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
        getChildrenSystem ({
            commit
        }, paylaod) {
            debugger;
            let loginName = paylaod.loginName.trim();
            return new Promise((resolve, reject) => {
                getSystemList({
                    loginName
                }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

export default ulogin;
