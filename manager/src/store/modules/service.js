import axios from 'axios';
import qs from 'qs';
import util from '@/libs/util';

let API_URL_PATTERN=util.API_URL_PATTERN;

const service = {
    namespaced: true,
    state: {},
    actions: {
        async getPagedList(context, payload) {
            let response = await axios.get(API_URL_PATTERN + payload.serviceName + '/GetPaged', {
                params: payload.data
            });
            return util.wrapResult(response);
        },
        async create(context, payload) {
            await axios.post(API_URL_PATTERN + payload.serviceName + '/Create', payload.data);
        },
        async update(context, payload) {
            await axios.put(API_URL_PATTERN + payload.serviceName + '/Update', payload.data);
        },
        async delete(context, payload) {
            await axios.delete(API_URL_PATTERN + payload.serviceName + '/Delete?id=' + payload.data);
        },
        async deleteRange(context, payload) {
            await axios.delete(API_URL_PATTERN + payload.serviceName + '/DeleteRang', {
                'params': payload.data,
                'paramsSerializer': function (params) {
                    return qs.stringify(params, {
                        arrayFormat: 'repeat'
                    })
                }
            });
        },
        async get(context, payload) {
            let response = await axios.get(API_URL_PATTERN + payload.serviceName + '/GetById?id=' + payload.data);

            return util.wrapResult(response);
        },
        async getList(context, payload) {
            let response = await axios.get(API_URL_PATTERN + payload.serviceName + '/' + payload.methodName + payload.data);

            return util.wrapResult(response);
        },
        async exportFile(context, payload) {
            let response = await axios.get(API_URL_PATTERN + payload.serviceName + '/Export', {
                'params': payload.data,
                'paramsSerializer': function (params) {
                    return qs.stringify(params, {
                        arrayFormat: 'repeat'
                    })
                },
                'responseType': 'arraybuffer'
            });

            return response;
        },
        async importFile(context, payload) {
            let response = await axios.post(API_URL_PATTERN + payload.serviceName + '/Import',
                payload.data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            return response;
        },
        async getMetaData(context, payload) {
            let response = {};
            if (payload.data.query) {
                response = await axios.get('/metadata/' + payload.data.metaFileName + '.json?t=' + new Date().getTime(), {
                    params: payload.data.query
                });
            } else {
                response = await axios.get('/metadata/' + payload.data.metaFileName + '.json?t=' + new Date().getTime());
            }
            return util.wrapResult(response);
        },
        async post(constext, payload) {
            let response = {};
            response = await axios.post(API_URL_PATTERN + payload.url, payload.data);
            return response;
        }

    }
};

export default service;