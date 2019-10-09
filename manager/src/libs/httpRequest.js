import axios from 'axios';
import store from '@/store';
import util from '@/libs/util';
const API_URL_PATTERN = '/api/';


const addErrorLog = errorInfo => {
    const {
        statusText,
        status,
        request: {
            responseURL
        }
    } = errorInfo;
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    };
    if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info);
};

class HttpRequest {
    constructor (baseUrl) {
        this.baseUrl = baseUrl;
        this.queue = {};
    }
    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                'Authorization': util.getToken()
            }
        };
        return config;
    }

    destroy (url) {
        delete this.queue[url];
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors (instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            this.queue[url] = true;
            config.headers['Authorization'] = util.getToken();
            return config;
        }, error => {
            return Promise.reject(error);
        });
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url);
            const {
                data,
                status
            } = res;
            return {
                data,
                status
            };
        }, error => {
            this.destroy(url);
            let errorInfo = error.response;
            if (!errorInfo) {
                const {
                    request: {
                        statusText,
                        status
                    },
                    config
                } = JSON.parse(JSON.stringify(error));
                errorInfo = {
                    statusText,
                    status,
                    request: {
                        responseURL: config.url
                    }
                };
            }
            // addErrorLog(errorInfo);
            if (!!error.response && !!error.response.data.error && !!error.response.data.error.message && error.response.data.error.details) {
                this.$Message.error(error.response.data.error.message);
            } else {
                var faultSource = '系统';
                if (error.response === undefined || error.response.status === 502) {
                    faultSource = '网络';
                }
                //this.$Message.error(faultSource + '故障，请稍候再试。');
            }

            return Promise.reject(error);
        });
    }
    request (options) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        options.url = API_URL_PATTERN + options.url;
        this.interceptors(instance, options.url);        
        return instance(options);
    }
    
}
export default HttpRequest;