import axios from '@/libs';

const test = {
    state: {
        userInfo: {

        }
    },
    mutations: {
        Set_userInfo(state, user) {
            state.userInfo = user;
        }
    },
    actions: {
        createNewUser({
            commit
        }, payload) {
            let data = payload.data;
            return new Promise((
                resolve, reject
            ) => {
                axios.request({
                    url: 'user/create',
                    data,
                    method: 'post'
                }).then(res => {
                    console.log('res');
                    //
                    // commit('Set_userInfo', data);
                    resolve(res);
                }).catch(error => {
                    console.log('')
                });
            });
        }
    }
};

export default test;