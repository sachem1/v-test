import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import {
	API_URL_PATTERN
} from '@/libs/util';

const trade = {};
util.applyMixins(trade, service);

trade.actions.gettradeList = async (context, payload) => {
	let response = await axios.get(API_URL_PATTERN + '"/tradeService/GetList');
	return util.wrapResult(response).map(item => {
		return {
			text: item.name,
			value: item.id
		}
	});
};

trade.actions.createData = async function (data) {
	console.log('data:' + JSON.stringify(data))
	let res = axios.post(API_URL_PATTERN + '/tradeService/Create', data)
	util.wrapResult(res)
}


export default trade;