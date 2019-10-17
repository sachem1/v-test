import service from '../modules/service';
import util from '@/libs/util';

import {
    getGoodsErpList,
    getEmsNoList,
    deleteGoodsErp,
    addGoodsErp
} from '@/api/goodserp';

const goodserp = {
    state: {
        searchModel: {},
        editForm: {}
    }
};

util.applyMixins(goodserp, service);


goodserp.actions.getGoodsErpList = function (context, payload) {
    return new Promise((resolve, reject) => {
        getGoodsErpList(payload.data)
            .then(res => {
                resolve(util.wrapResult(res));
            }).catch(error => {
                reject(error);
            });
    });
}

goodserp.actions.deleteGoodsErp = function (context, payload) {
    return new Promise((resolve, reject) => {
        deleteGoodsErp(payload.data)
            .then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error);
            });
    });
}


goodserp.actions.getEmsNoList = function (context, payload) {
    let customercode = payload.data;
    return new Promise((resolve, reject) => {
        getEmsNoList(customercode)
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
    });
}


goodserp.actions.addGoodsErp = function (context, payload) {
   
    return new Promise((resolve, reject) => {
        addGoodsErp(payload.data)
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
    });
}


export default goodserp;