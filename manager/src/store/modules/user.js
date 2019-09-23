import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import Cookies from 'js-cookie';

const user = {};
util.applyMixins(user, service);

user.actions.logout = async function (context, payload) {
    let response = await axios.get('/api/TokenAuth/DestoryToken?&token=' + payload.data.token + '&account=' + payload.data.account, {
        withCredentials: true
    });

    Cookies.remove('user');
    Cookies.remove('password');
    Cookies.remove('access');
    // 恢复默认样式
    let themeLink = document.querySelector('link[name="theme"]');
    themeLink.setAttribute('href', '');
    // 清空打开的页面等数据，但是保存主题数据
    let theme = '';
    if (localStorage.theme) {
        theme = localStorage.theme;
    }
    localStorage.clear();
    if (theme) {
        localStorage.theme = theme;
    }
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

function SetToken(response) {
    var expireDate = new Date();
    var validSeconds = 3600;
    expireDate.setSeconds(expireDate.getSeconds() + validSeconds);
    util.SetToken(response.data, expireDate)
}


export default user;