import service from "./service";
import axios from 'axios';
import util from '@/libs/util';
import {
	API_URL_PATTERN
} from '@/libs/util';

const trade = {};
util.applyMixins(trade, service);

trade.actions.gettradeList = async function (context, payload) {
	let response = await axios.get(API_URL_PATTERN + '"/api/tradeService/getList/GetList');
	return util.wrapResult(response).map(item => {
		return {
			text: item.name,
			value: item.id
		}
	});
};



export default trade;