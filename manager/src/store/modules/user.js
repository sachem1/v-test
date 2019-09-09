import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import Cookies from 'js-cookie';

const user = {};
util.applyMixins(user, service);

user.actions.logout = async function(context, payload) {
    let response = await axios.get('/api/TokenAuth/DestoryToken?appKey=' + APPKEY + '&token=' + payload.data.token + '&account=' + payload.data.account, {
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

user.actions.getUserInfo = async function(context, payload) {    
    var url = SSOHOST + '/api/auth/passport/finduser?appKey=' + APPKEY + '&token=' + payload.data.token + '&account=' + payload.data.account;
    let response = await axios.get(url, {
        withCredentials: true
    });

    return util.wrapResult(response);
};

export default user;
