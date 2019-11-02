import service from "@/store/modules/service";
import axios from "@/libs";
import util from "@/libs/util";
import {
    getRecordedHead,
    queryImgRecordData,
    queryExgRecordData,
    queryBomRecordData
} from '@/api/emsrecordinfo';

const emsRecordInfo = {
    state: {
        searchModel: {},
        editForm: {}
    }
};

util.applyMixins(emsRecordInfo, service);


emsRecordInfo.actions.getRecordedHead = function (context, payload) {
    
    return new Promise((resolve, reject) => {
        getRecordedHead(payload.data)
            .then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            });
    });
};


emsRecordInfo.actions.queryImgRecordData = function (context, payload) {
    return new Promise((resolve, reject) => {
        queryImgRecordData(payload.data)
            .then(res => {
                resolve(util.wrapResult(res));
            }).catch(error => {
                reject(error);
            });
    });
};

emsRecordInfo.actions.queryExgRecordData = function (context, payload) {
    return new Promise((resolve, reject) => {
        queryExgRecordData(payload.data)
            .then(res => {
                
                resolve(util.wrapResult(res));
            }).catch(error => {
                reject(error);
            });
    });
};

emsRecordInfo.actions.queryBomRecordData = function (context, payload) {
    return new Promise((resolve, reject) => {
        queryBomRecordData(payload.data)
            .then(res => {
                
                resolve(util.wrapResult(res));
            }).catch(error => {
                reject(error);
            });
    });
};


export default emsRecordInfo;
