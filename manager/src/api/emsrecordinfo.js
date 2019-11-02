import axios from '@/libs';

export const getRecordedHead = (data) => {
   
    return axios.request({
        url: 'emsrecordinfo/getrecordedhead?emsNo='+data,
        method: 'post',
        data:data
    });
};

export const queryImgRecordData = (data) => {
   
    return axios.request({
        url: 'emsrecordinfo/queryimgrecorddata',
        method: 'post',
        data:data
    });
};

export const queryExgRecordData = (data) => {
   
    return axios.request({
        url: 'emsrecordinfo/queryexgrecorddata',
        method: 'post',
        data:data
    });
};


export const queryBomRecordData = (data) => {
   
    return axios.request({
        url: 'emsrecordinfo/querybomrecorddata',
        method: 'post',
        data:data
    });
};
