import service from "@/store/modules/service";
import axios from '@/libs';
import util from '@/libs/util';


const itRecordInfo = {
	state: {
		searchModel: {},
		editForm: {}
	}
};
util.applyMixins(itRecordInfo, service);

itRecordInfo.actions.getRecordedHead = async (context, payload) => {
	let data = payload.data;
	return new Promise((resolve, reject) => {
		axios
			.request({
				url: 'itRecordInfo/getItRecordedHead?emsNo='+data,				
				method: "get"
			})
			.then(res => {
				resolve(util.wrapResult(res));
				//resolve(payload.data);
			})
			.catch(error => {
				reject(error);
			});
	});
};

itRecordInfo.actions.getRecordInfoImgList = function (context, payload) {
	return new Promise((resolve, reject) => {
		
		let response = axios.request({
			url: 'itRecordInfo/getRecordInfoImgList',
			data: payload.data,
			method: 'post'
		}).then(res => {
			resolve(util.wrapResult(res));
		}).catch(error => {
			reject(error);
		});
	});
};
itRecordInfo.actions.getRecordInfoExgList = function (context, payload) {
	return new Promise((resolve, reject) => {
		
		let response = axios.request({
			url: 'itRecordInfo/getRecordInfoExgList',
			data: payload.data,
			method: 'post'
		}).then(res => {
			resolve(util.wrapResult(res));
		}).catch(error => {
			reject(error);
		});
	});
};



export default itRecordInfo;