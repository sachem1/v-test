import service from '../modules/service';
import util from '@/libs/util';
import axios from '@/libs';

import {
    getGoodsErpList,
    getEmsNoList,
    deleteGoodsErp,
    addGoodsErp,
    existGoodsErp,
    addOrModifyGoodsErp,
    modifyGoodsErp
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
};

goodserp.actions.deleteGoodsErp = function (context, payload) {
    return new Promise((resolve, reject) => {
        deleteGoodsErp(payload.data)
            .then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error);
            });
    });
};


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
};


goodserp.actions.addGoodsErp = async function (context, payload) {
   
    return new Promise((resolve, reject) => {
        addGoodsErp(payload.data)
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
    });
};


goodserp.actions.existGoodsErp =  function (context, payload) {
   
    return new Promise((resolve, reject) => {
        existGoodsErp(payload.data)
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
    });

};


goodserp.actions.addOrModifyGoodsErp = function (context, payload) {
   
    return new Promise((resolve, reject) => {
        addOrModifyGoodsErp(payload.data)
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
    });
};


goodserp.actions.modifyGoodsErp = function (context, payload) {
   
    return new Promise((resolve, reject) => {
        modifyGoodsErp(payload.data)
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
    });
};



goodserp.actions.ImportExcel = async (context, payload) => {
    let data = payload.data;
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "goodserp/importexcel",
          data,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
};

goodserp.actions.secondRequest = async (context, payload) => {
    
    let data = payload.data;
    return new Promise((resolve, reject) => {
        axios
          .request({
            url: "goodserp/secondrequest",
            data,
            method: "post"
          })
          .then(res => {
            resolve(res.data);
          })
          .catch(error => {
            reject(error);
          });
      });
};


export default goodserp;