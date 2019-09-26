import axios from '@/libs';

export const logout = (token) => {
    return axios.request({
        url: 'logout',
        method: 'post'
    });
};

export const login = ({
    loginName,
    password,
    subId
}) => {
    let data = {
        loginName,
        password,
        subId
    };
    return axios.request({
        url: 'auth/login',
        data,
        method: 'post'
    });
}


export const getSystemList = ({
    loginName
}) => {
    return axios.request({
        url: 'auth/systems' + '?u=' + loginName,
        method: 'get'
    });
}


export const getUserList = (data) => {
    return axios.request({
        url: 'user/getPaged',
        data: data,
        method: 'post'
    });
};

export const create = data => {
    return axios.request({
        url: 'user/create',
        data,
        method: 'post'
    });
};

export const update = data => {
    return axios.request({
        url: 'user/update',
        data,
        method: 'post'
    });
};
