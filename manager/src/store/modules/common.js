import axios from '@/libs';
import util from '../../libs/util';

const commons = {
    namespaced: true,
    state: {
        paramLibraryList: Array,
        codeType: ''
    },
    mutations: {
        setParamLibrary(state, val) {
            state.paramLibraryList[state.codeType] = val;
        }
    },
    actions: {
        async getTemplateList(context, payload) {
            try {
                //传入不同模板类型参数
                let data = payload.data;
                let response = await axios.request({
                    url: 'user/getTemplate',
                    data: data,
                    method: 'post'
                });
                return util.wrapResult(response);
            } catch (error) {
                return null;
            }
        },
        async getParameterLib({
            commit,
            state
        }, payload) {
            try {
                let url = payload.data.url;
                let codeType = payload.data.codeType;
                if (codeType) {
                    if (state.paramLibraryList) {
                        let paramLibs = state.paramLibraryList[codeType];
                        if (paramLibs) return paramLibs;
                    }
                }

                let response = await axios.request({
                    url: url,
                    method: 'get'
                });
                let data = util.wrapResult(response);
                commit('setParamLibrary', data);
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        async getParameterLibByCode({
            commit,
            state
        }, payload) {
            try {
                let url = payload.data.url;
                let hashId = payload.data.codeType;
                let key = payload.data.key;
                if (!url || url === "") url = "Cache/HashGet?hashId=" + hashId + "&key=" + key;
                if (hashId) {
                    if (state.paramLibraryList) {
                        let paramLibs = state.paramLibraryList[hashId];
                        if (paramLibs) {
                            return paramLibs[key];
                        }
                    }
                }

                let response = await axios.request({
                    url: url,
                    method: 'get'
                });
                let data = util.wrapResult(response);                
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    }
};



export default commons;