import axios from '@/libs';
import axiosEx from 'axios';
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
            await axios.request({
                url: payload.serviceName + '/Delete?id=' + payload.data,
                method: 'get'
            });
        },

        async deleteRange(context, payload) {
            let response = await axios.request({
                url: payload.serviceName + '/DeleteRang',
                data: payload.data,
                method: 'post'
            });
            return util.wrapResult(response);

        },

        async deleteCondition(context, payload) {

            let response = await axios.request({
                url: payload.serviceName + '/DeleteCondition',
                data: payload.data,
                method: 'post'
            });

            return util.wrapResult(response);

        },

        async get(context, payload) {

            let response = await axios.request({
                url: API_URL_PATTERN + payload.serviceName + '/GetById?id=' + payload.data,
                method: "get"
            });
            return util.wrapResult(response);
        },
        async exportFile1(context, payload) {
            let response = await axiosEx({
                url: API_URL_PATTERN + payload.serviceName + '/Export',
                data: payload.data,
                method: 'get',
                responseType: 'blob'
            });
            return response;
        },
        async exportFile2(context, payload) {
            let data = payload.data;
            let response = await axios.request({
                url: payload.serviceName + '/Export',
                'params': data,
                method: 'get',
                'paramsSerializer': function (params) {
                    return qs.stringify(params, {
                        arrayFormat: 'repeat'
                    });
                },
                //responseType: 'arraybuffer'
                responseType: 'blob'
            });
            return response;
        },
        async exportFile(context, payload) {
            let data = payload.data;
            let response = await axios.request({
                url: payload.serviceName + '/Export',
                data: data,
                method: 'post',
                responseType: 'arraybuffer',
                headers: {
                    'contentType': "application/x-www-form-urlencoded",
                    'charset': 'utf-8'
                }
            });
            return response;
        },
        async importFile(context, payload) {
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

        getFileTemplate(commit, payload) {
            let data = payload.data;
            let response = axios.request({
                url: payload.serviceName + '/getTemplate?templateType=' + data,
                method: 'get'

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
        },
        async downloadFile(constext, payload) {
            let baseUrl = API_BASE_URL;
            let url = baseUrl + API_URL_PATTERN + payload.serviceName + '/Export';
            if (payload.data.url) {
                url = baseUrl + API_URL_PATTERN + payload.data.url;
            }
            let params = payload.data.params;
            const form = document.createElement('form');
            form.setAttribute('action', url);
            form.setAttribute('method', 'post');
            form.setAttribute('headers', {
                'Authorization': util.getToken()
            });
            params.Authorization = util.getToken();
            for (const key in params) {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', params[key]);
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            form.remove();
        }
    }
};

export default service;