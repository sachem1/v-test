import axios from 'axios';
import util from '@/libs/util'

export default {
    state: {
        childrenSystemList: []
    },
    mutations: {
        setChildrenSystemList(state, list) {
            state.childrenSystemList = list;
            console.log(JSON.stringify(state.childrenSystemList))
        },
        setUserToken(state, data) {
            var expireDate = new Date();
            var validSeconds = 3600;
            expireDate.setSeconds(expireDate.getSeconds() + validSeconds);
            util.setToken(data, expireDate)
        }
    },
    actions: {
        // 登录
        handleLogin({
            commit
        }, {
            userName,
            password,
            childrenSystem
        }) {
            userName = userName.trim();
            return new Promise((resolve, reject) => {
                axios.post({
                    userName,
                    password,
                    childrenSystem
                }).then(res => {
                    const data = res.data;
                    commit('setUserToken', data.token);
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
        },
        getChildrenSystemData({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios.get(payload.url).then(res => {
                    commit('setChildrenSystemList', res.data);
                }).catch(error => {
                    console.log(error);
                });
            });
        }
    }
}