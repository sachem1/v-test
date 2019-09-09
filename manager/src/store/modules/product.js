import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import {API_URL_PATTERN} from '@/libs/util';

const product = {};
util.applyMixins(product, service);
product.actions.getAccessOrResult = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'productMetadataService/GetParamterType');
    return util.wrapResult(response).map(item=> {
        return {
            text: item.name,
            value: item.id            
        }
    });
};
product.actions.getList = async function(context, payload){
    let response=await axios.get(API_URL_PATTERN + 'ProductService/GetList');
    return util.wrapResult(response).map(item=> {
        return {
            text: item.name,
            value: item.id            
        }
    });
};

product.actions.getMetadataList = async function(context, payload){
    if (payload.data == null || payload.data.productId == null)
        return [];

    let response=await axios.get(API_URL_PATTERN + 'ProductMetadataService/GetList', {
        params: payload.data
      });

    var result = util.wrapResult(response).map(item=> {
		return {
            text: item.description,
            value: item.name, 
            code: item.name, 
            type: util.getPropertyType(item.customizationType)
        };
	});

	return result;
};

export default product;