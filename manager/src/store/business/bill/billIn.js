import service from '@/store/modules/service';
import axios from '@/libs';
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
		axios.request({
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

billIn.actions.getBillinHeadById = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/showHead',
			params:data,
			method:'get'
		});
		return util.wrapResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}
};


billIn.actions.saveBillHeader = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/saveBillHead',
			data:data,
			method:'post'
		});
		return util.wrapDataResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}
};


billIn.actions.copyHead = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/copyHead',
			params:data,
			method:'get'
		});
		return util.wrapDataResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}	
};


billIn.actions.copyBillAll = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/copyBillAll',
			params:data,
			method:'get'
		});
		return util.wrapDataResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}	
};

billIn.actions.initBillHead = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/initBillHead',
			params:data,
			method:'get'
		});
		return util.wrapResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}	
};

billIn.actions.deleteBillHeads = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/deleteBillHeads',
			data:data,
			method:'post'
		});
		return util.wrapResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}
};



billIn.actions.showDetailList = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/showDetailList',
			params:data,
			method:'get'
		});
		return util.wrapResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}	
};



billIn.actions.applyDelBill = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/applyDelBill',
			params:data,
			method:'get'
		});
		return util.wrapResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}	
};

// 点击表格绑定编辑页面数据
billIn.actions.showDetail = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/showDetail',
			params:data,
			method:'get'
		});
		return util.wrapResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}	
};

billIn.actions.reFillData = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/reFillData',
			params:data,
			method:'get'
		});
		return util.wrapResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}	
};

billIn.actions.showDetailList = async function (context, payload) {
	try {
		let data = payload.data;
		let res = await axios.request({
			url: 'billInfo/showDetailList',
			params:data,
			method:'get'
		});
		return util.wrapResult(res);
	} catch (error) {
		console.log(error);
		return null;
	}	
};


export default billIn;