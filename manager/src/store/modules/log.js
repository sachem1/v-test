import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import {API_URL_PATTERN} from '@/libs/util';

const log={};
util.applyMixins(log,service);

// log.actions.GetLogList=async function(context,payload){
//     let response=await axios.get(API_URL_PATTERN+'BusinessLogService/Get')
// }

log.actions.getLogTypes = async function (context, payload) {
    let response = await axios.get(API_URL_PATTERN + 'BusinessLogService/GetLogTypeList');

    return util.wrapResult(response);
};

log.actions.getLogLevels = async function (context, payload) {
    let response = await axios.get(API_URL_PATTERN + 'BusinessLogService/GetLogLevelList');

    return util.wrapResult(response);
};

export default log;