import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import {
    API_URL_PATTERN
} from '@/libs/util';

const statisticssetting = {};
util.applyMixins(statisticssetting, service);

statisticssetting.actions.getStatisticsType = async function (context, payload) {
    let response = util.wrapResult(await axios.get(API_URL_PATTERN + 'StatisticsService/GetSettingList?type=StatisticsType'));
    var result = [];
    for (var key in response) {
        result.push({
            text: response[key],
            value: parseInt(key)
        });
    }
    return result;
};

statisticssetting.actions.getCustomerId = async function (context, payload) {
    let response = util.wrapResult(await axios.get(API_URL_PATTERN + 'StatisticsService/GetSettingList?type=Customer'));
    var result = [];
    for (var key in response) {
        result.push({
            text: response[key],
            value: key + ''
        });
    }
    return result;
};

statisticssetting.actions.getProductId = async function (context, payload) {
    var customerId = payload.data.customerId || 0;
    console.log("payload", payload);
    let response = util.wrapResult(await axios.get(API_URL_PATTERN + 'StatisticsService/GetSettingList?type=Product'));
    var result = [];
    for (var key in response) {
        result.push({
            text: response[key],
            value: key + ''
        });
    }
    return result;
};


statisticssetting.actions.getCustomerProductId = async function (context, payload) {
    var customerId = payload.data.customerId || 0;

    let response = util.wrapResult(await axios.get(API_URL_PATTERN + 'StatisticsService/GetSettingList?type=Product&customerId=' + customerId));
    var result = [];
    for (var key in response) {
        result.push({
            text: response[key],
            value: key + ''
        });
    }
    return result;
};


statisticssetting.actions.getProductInfo = async function (context, payload) {
    var productId = payload.data.productId;
    if (productId <= 0) return;
    let response = util.wrapResult(await axios.get(API_URL_PATTERN + 'ProductService/GetById?Id=' + productId));
    console.log('product:',response);
    return response.TableName;

}

statisticssetting.actions.getDisplayType = async function (context, payload) {
    let response = util.wrapResult(await axios.get(API_URL_PATTERN + 'StatisticsService/GetSettingList?type=DisplayType'));
    var result = [];
    for (var key in response) {
        result.push({
            text: response[key],
            value: parseInt(key)
        });
    }
    return result;
};

statisticssetting.actions.getConditionType = async function (context, payload) {
    let response = util.wrapResult(await axios.get(API_URL_PATTERN + 'StatisticsService/GetSettingList?type=ConditionType'));
    var result = [];
    for (var key in response) {
        result.push({
            text: response[key],
            value: parseInt(key)
        });
    }
    return result;
};

export default statisticssetting;