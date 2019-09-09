import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import {API_URL_PATTERN} from '@/libs/util';
import product from "./product";

const customer = {};
util.applyMixins(customer, service);

customer.actions.getCustomerList = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'CustomerService/GetList');
    return util.wrapResult(response).map(item=> {
        return {
            text: item.name,
            value: item.id            
        }
    });
};
customer.actions.getSignTypes = async function(context, payload){
	let response=await axios.get(API_URL_PATTERN + 'CustomerService/GetSignTypes');
	
	return util.wrapResult(response);
};
customer.actions.getEncodeTypes = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'CustomerService/GetEncodeTypes');

    return util.wrapResult(response);
};
customer.actions.getLimitTypes = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'CustomerAccessLimitService/GetLimitTypes');

    return util.wrapResult(response);
};
customer.actions.getCustomizationTypes = async function(context, payload){
    return [{text: '区域编码', value: 'geolocation'}];
};
customer.actions.getPropertyList = async function(context, payload){
	if (payload.data.productId) {
		return await product.actions.getMetadataList(context, payload);
	}

    let response=await axios.get(API_URL_PATTERN + 'CustomerFieldMapService/GetAllAccessMapList', {
        params: payload.data
	  });
	  
	var result = util.wrapResult(response).map(item=> {
		return {text: item.text, code: item.value, type: util.getPropertyType(item.extendInfo)};
	});

	return result;
};

customer.actions.getProductFieldList = async function(context, payload){
	
    let response=await axios.get(API_URL_PATTERN + 'CustomerFieldMapService/GetProductFieldList', {
        params: payload.data
	  });
	  
	var result = util.wrapResult(response).map(item=> {
		return {text: item.text, value: item.value};
	});

	return result;
};

customer.actions.getFieldMapList = async function(context, payload){
	
	let response=await axios.get(API_URL_PATTERN + 'CustomerFieldMapService/GetFieldMapperList', {
        params: payload.data
	  });
	  
	  return util.wrapResult(response).map(item=> {
        return {
            text: item.text,
            value: item.value
        }
    });
};

customer.actions.getOperatorMap = async function(context, payload){
	var result = [{		
        "type": "geolocation",
        "operators": ["包含"]
	},
	{
		"type": "date",
        "operators": ["=", "!=", "<=", "<", ">=", ">"]
	},
	{
		"type": "text",
        "operators": ["包含", "不包含", "为空", "不为空"]
	},
	{
        "type": "number",
        "operators": ["=", "!=", "<=", "<", ">=", ">"]
	},
	{
        "type": "enum",
        "operators": ["之内", "之外"]
	}];

	let response=await axios.get(API_URL_PATTERN + 'CustomerFieldMapService/GetOperatorList', {
        params: payload.data
	  });
	var operators = util.wrapResult(response).map(item => {
		return item.value;
	});
	result.forEach(item => {
		item.operators = operators;
	});

    return result;
};

export default customer;