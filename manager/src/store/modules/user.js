import service from "./service";
import axios from '@/libs';
import util from '@/libs/util';
import Cookies from 'js-cookie';

const user = {};
util.applyMixins(user, service);

user.actions.logout = async function (context, payload) {
    let response = await axios.post('/api/auth/logout', {
        token: payload.data.token,
        userId: payload.data.userId
    }, {
        withCredentials: true
    });
    Cookies.remove('user');
    Cookies.remove('access');
    util.clearToken();

    return util.wrapResult(response);
};

user.actions.login = async function (context, payload) {
    let response = await axios.post('/api/authService/login', payload.data).then(res => {
        SetToken(res)
    }).catch(error => {
        console.log(error)
    })
}

user.actions.getChildrenSystemData = async function (context, payload) {
    let response = await axios.get('/api/auth/systems?u=' + payload.data.userName).then(res => {
        console.log(res.data)
        return res.data;
    }).catch(error => {
        console.log(error)
    })
}

user.actions.getUserLists=function (context, payload) {
    debugger;
    return new Promise((resolve, reject) => {
        // var data = {
        //     Name: payload.name,
        //     Address: payload.address,
        //     Age: payload.age
        // };
        axios.post(payload.serviceName, payload.data)
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
    });
}



export default user;