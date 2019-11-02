import service from "../../modules/service";
import axios from '@/libs';
import util from '@/libs/util';
import Cookies from 'js-cookie';
import FileLibraryNo from "./fileLibraryNo";

const heBaseConfig = {
    state: {
        searchModel: {},
        editForm: {}
    }
};

util.applyMixins(heBaseConfig, service);




heBaseConfig.actions.QueryTablePaged = function (context, payload) {
    return new Promise((resolve, reject) => {
        let response = axios.request({
            url: 'heBaseConfig/SeletQuery',
            data: payload.data,
            method: 'post'
        }).then(res => {
            resolve(util.wrapResult(res));
        }).catch(error => {
            reject(error);
        });
    });
};

heBaseConfig.actions.SaveBaseConfig = async function (context, payload) {

    let response = await axios.request({
        url: 'heBaseConfig/SaveBaseConfig',
        data: payload.data,
        method: 'post'
    });
    return response.data;

};

export default heBaseConfig;
