import service from "../modules/service";
import axios from '@/libs';
import util from '@/libs/util';
import Cookies from 'js-cookie';
import {
    create,
    update,
    getUserList
} from '@/api/user';

const user = {
    state: {
        searchModel: {},
        editForm: {}
    }
};
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
                resolve(util.wrapResult(res));
            }).catch(error => {
                reject(error);
            });
    });
}

user.actions.createUser = function ({
    commit
}, payload) {
    return new Promise((resolve, reject) => {
        var data = payload.data;
        create(data).then(res => resolve(res)).catch(error => reject(error))
    });
}

user.actions.updateUser = function ({
    commit
}, payload) {

    return new Promise((resolve, reject) => {
        var data = payload.data;
        update(data).then(res => resolve(res)).catch(error => reject(error))
    });
}

user.actions.export = function ({
    commit
}, payload) {
    console.log('user export')
    let data = payload.data;
    let response = axios.request({
        url: payload.serviceName + '/Export',
        'params': data,
        method: 'get',
        'paramsSerializer': function (params) {
            return qs.stringify(params, {
                arrayFormat: 'repeat'
            })
        },
        'responseType': 'blob'
    });
    return response;
};







export default user;