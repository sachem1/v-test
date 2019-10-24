import service from '@/store/modules/service';
import ajax from '@/libs';
import util from '_lib/util';
import {exportFile} from '_lib/exportFile';

const billIn = {
	state: {
		searchModel: {},
		editForm: {}
	}
};
util.applyMixins(billIn, service);

billIn.actions.queryTablePaged = async function (context, payload) {
	return new Promise((resolve, reject) => {
		ajax.request({
			url: 'billInfo/QueryBillHeadData',
			data: payload.data,
			method: 'post'
		}).then(res => {
			resolve(util.wrapResult(res));
		}).catch(error => {
			reject(error);
		});
	});
};

billIn.actions.exportFile = async function (context, payload) {
	return new Promise((resolve, reject) => {
		let url = 'billinfo/downfile';
		window.console.log(payload.data)
		exportFile(url, payload.data)
		.then(res => {
			resolve(res.data);
		}).catch(error => {
			reject(error);
		});
	});
};

export default billIn;
