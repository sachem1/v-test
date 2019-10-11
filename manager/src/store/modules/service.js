import axios from '@/libs';
import qs from 'qs';
import util from '@/libs/util';
// import httpRequest from '@/libs'
import {
    API_URL_PATTERN
} from '@/libs/util';


const service = {
    namespaced: true,
    actions: {

        async getPagedList(context, payload) {
            debugger;

            let response = await axios.request({
                url: payload.serviceName + '/GetPaged',
                params: payload.data,
                method: "get"
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

        // async deleteRange(context, payload) {
        //     
        //     console.log('deleteRange:' + JSON.stringify(payload.data))
        //     await axios.delete(API_URL_PATTERN + payload.serviceName + '/DeleteRang', {
        //         'params': payload.data,
        //         'paramsSerializer': function (params) {
        //             return qs.stringify(params, {
        //                 arrayFormat: 'repeat'
        //             })
        //         }
        //     });
        // },

        async deleteRange(context, payload) {
            debugger;
            await axios.request({
                url: payload.serviceName + '/DeleteRang',
                data: payload.data.ids,
                method: 'post'
            });
        },

        async deleteCondition(context, payload) {
            await axios.delete(API_URL_PATTERN + payload.serviceName + '/DeleteCondition', {
                'data': payload.data,
                'paramsSerializer': function (params) {
                    return qs.stringify(params, {
                        arrayFormat: 'repeat'
                    })
                }
            });
        },

        async get(context, payload) {

            let response = await axios.request({
                url: API_URL_PATTERN + payload.serviceName + '/GetById?id=' + payload.data,
                method: "get"
            });
            return util.wrapResult(response);
        },

        async exportFile(context, payload) {

            let data = payload.data;
            let response = await axios.request({
                url: payload.serviceName + '/Export',
                'params': data,
                method: 'post',
                'paramsSerializer': function (params) {
                    return qs.stringify(params, {
                        arrayFormat: 'repeat'
                    })
                },
                'responseType': 'arraybuffer'
            });
            debugger;
            return response;
        },

        async importFile(context, payload) {
            debugger;
            let data = payload.data;
            let response = await axios.request({
                url: payload.serviceName + '/Import',
                data,
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return util.wrapResult(response);
        },

        async getMetaData(context, payload) {
            let response = {};
            this.$http.get('static/json/' + payload.serviceName + '.json').then(res => {
                return util.wrapResult(res);
            })
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