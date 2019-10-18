import axios from '@/libs';

export const getGoodsErpList = (data) => {

    return axios.request({
        url: 'goodserp/getpaged',
        data: data,
        method: 'post'
    });
};


export const deleteGoodsErp = (data) => {

    return axios.request({
        url: 'goodserp/delete',
        data: data.ids,
        method: 'post'
    });
};

export const getEmsNoList = (data) => {

    return axios.request({
        url: 'goodserp/getemsno',
        data: data,
        method: 'post'
    });
};

export const addGoodsErp = (data) => {

    return axios.request({
        url: 'goodserp/insert',
        data: data,
        method: 'post'
    });
};
