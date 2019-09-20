import axios from 'axios';
import {baseURL} from '@/config';
import {
    getToken
} from '@/libs/util';

const HttpRequest = {
    construct(baseUrl = baseURL) {
        this.baseUrl = baseUrl;
    },
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {

            }
        }
    },
    interceptors(instance, url) {
        instance.interceptors.request.use((config) => {
            this.headers['Authorization'] = getToken()
        }, error => {
            return Promise.reject(error)
        })

        instance.interceptors.response.use(res=>{
            if(res.data)
        },error=>{
            return Promise.reject(error.response.data)
        })
    },
    request(options){
        const instance =axios.create()
        options=Object.assign(this.getInsideConfig(),options)
        this.interceptors(instance,options.url)
        return instance(options)
    }
}
export default HttpRequest