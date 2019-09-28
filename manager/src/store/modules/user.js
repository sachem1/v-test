import service from "./service";
import axios from '@/libs';
import util from '@/libs/util';
import Cookies from 'js-cookie';
import {
    create,
    update,
    getUserList
} from '@/api/user';

const user = {};
util.applyMixins(user, service);

user.actions.logout = async function (context, payload) {
    var data = {
        token: payload.data.token,
        userId: payload.data.userId
    }
    let response = await axios.request({
        url: 'auth/logout',
        data: data,
        method: 'post'
    });
    Cookies.remove('user');
    Cookies.remove('access');
    util.clearToken();

    return util.wrapResult(response);
};

user.actions.getUserList = function (context, payload) {
    return new Promise((resolve, reject) => {
        getUserList(payload.data)
            .then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error);
            });
    });
}

user.actions.createUser = function ({
    commit
}, payload) {
    return new Promise((resolve, reject) => {
        debugger;
        var data = payload.data;
        create(data).then(res => resolve(res)).catch(error => reject(error))
    });
}

user.actions.updateUser = function ({
    commit
}, payload) {
    debugger;
    return new Promise((resolve, reject) => {
        var data = payload.data;
        update(data).then(res => resolve(res)).catch(error => reject(error))
    });
}



export default user;