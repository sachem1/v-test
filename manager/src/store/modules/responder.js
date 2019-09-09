import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import {API_URL_PATTERN} from '@/libs/util';

const responder = {};
util.applyMixins(responder, service);
responder.actions.getResponderList = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'ResponderService/GetList');
    return util.wrapResult(response).map(item=> {
        return {
            text: item.name,
            value: item.id            
        }
    });
};
responder.actions.getPortList = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'ResponderPortService/GetList', {
        params: payload.data
      });
    return util.wrapResult(response).map(item=> {
        return {
            text: item.interfaceName,
            value: item.id            
        }
    });
};

responder.actions.getResponderTypes = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'ResponderPortService/GetResponderTypes');
    return util.wrapResult(response).map(item=> {
        return {
            text: item.text,
            value: parseInt(item.value)
        }
    });
};
responder.actions.getResponserModes = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'ResponderPortService/GetResponserModes');
    return util.wrapResult(response).map(item=> {
        return {
            text: item.text,
            value: parseInt(item.value)         
        }
    });
};
responder.actions.getConvertDirects = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'ResponderFieldMapService/GetConvertDirects');
    return util.wrapResult(response).map(item=> {
        return {
            text: item.text,
            value: parseInt(item.value)         
        }
    });
};

responder.actions.getProductFieldList = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'ResponderFieldMapService/GetProductFieldList', 
        {
            params: payload.data
        }
    );
    return util.wrapResult(response).map(item=> {
        return {
            text: item.text,
            value: item.value
        }
    });
};
responder.actions.getConvertTypes = async function(context, payload){    
    return [{
            text: '直接转换',
            value: '直接转换' 
        },
        {
        text: 'AreaCode转省市区县',
        value: 'AreaCode转省市区县' 
    }];
};
responder.actions.getValidateTypes = async function(context, payload){    
    return [{
        text: '无验证',
        value: '无验证'
    },
    {
        text: '区域编码验证',
        value: '区域编码验证' 
    }
    ];
};

export default responder;