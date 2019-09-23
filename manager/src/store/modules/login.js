import axios from 'axios';
import util from '@/libs/util';

export default {
    state: {
        childrenSystemList: [],
        rendering: false
    },
    getters: {
        cSystemList: state => state.childrenSystemList
    },
    mutations: {
        setChildrenSystemList (state, list) {
            state.childrenSystemList = list;
        },
        setUserToken (state, data) {
            var expireDate = new Date();
            var validSeconds = 3600;
            expireDate.setSeconds(expireDate.getSeconds() + validSeconds);
            util.setToken(data.Result, expireDate);
        },
        getChildrenSystemData1 (state, payload) {
            console.log(JSON.stringify(payload));
            axios.get(payload.url).then(res => {
                state.rendering = true;
                state.childrenSystemList = res.data;
                console.log(JSON.stringify(res.data));
                return res.data;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    actions: {
        // 登录
        handleLogin ({
            commit
        }, {
            userName,
            password,
            childrenSystem,
            url
        }) {
            userName = userName.trim();
            console.log('222');
            console.log(userName);
            return new Promise((resolve, reject) => {
                axios.post(url, {
                    userName,
                    password,
                    childrenSystem
                }).then(res => {
                    console.log(JSON.stringify(res.data));
                    const data = res.data;
                    commit('setUserToken', data);
                    
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};
