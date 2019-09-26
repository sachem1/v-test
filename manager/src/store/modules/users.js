import {
    getUserList,
    create,
    update
} from '@/api/user';

const users = {
    namespaced: true,
    actions: {
        getUserList ({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                // var data = {
                //     Name: payload.name,
                //     Address: payload.address,
                //     Age: payload.age
                // };
                getUserList(payload.data).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        createUser ({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                debugger;
                var data = payload.data;
                create(data).then(res => resolve(res)).catch(error => reject(error))
            });
        },
        updateUser ({
            commit
        },payload) {
            debugger;
            return new Promise((resolve, reject) => {
                var data = payload.data;
                update(data).then(res => resolve(res)).catch(error => reject(error))
            });
        }
    }
};

export default users;