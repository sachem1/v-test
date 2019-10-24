import service from '@/store/modules/service';
import ajax from '@/libs';
import util from '_lib/util';

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

export default billIn;
