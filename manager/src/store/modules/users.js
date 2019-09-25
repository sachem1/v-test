import {
    getUserList,
    create,
    update
} from '@/api/user';

const users = {
    actions: {
        getUserList ({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                var data = {
                    Name: payload.name,
                    Address: payload.address,
                    Age: payload.age
                };
                getUserList(data).then(res => {
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
                var data = payload;
                create(data).then(res => resolve(res)).catch(error => reject(error))
            });
        },
        updateUser (payload) {
            return new Promise((resolve, reject) => {
                var data = payload;
                update(data).then(res => resolve(res)).catch(error => reject(error))
            });
        }
    }
};

export default users;