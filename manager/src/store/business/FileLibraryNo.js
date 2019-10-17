import service from "../modules/service";
import axios from '@/libs';
import util from '@/libs/util';
import Cookies from 'js-cookie';

const FileLibraryNo = {
    state: {
        searchModel: {},
        editForm: {}
    }
};

util.applyMixins(FileLibraryNo, service);

FileLibraryNo.actions.QueryTablePaged = async function (context, payload) {
    let data =payload.data
    let response = await axios.request({
        url: 'FileLibraryNo/QueryTablePaged',
        data: data,
        method: 'post'
    });
     return response.data;
};

FileLibraryNo.actions.deleteRange = async function (context, payload) {
  
    debugger;
    let response = await axios.request({
        url: 'FileLibraryNo/Delete',
        data: payload.data.ids,
        method: 'post'
    });
     return response.data;
};



FileLibraryNo.actions.getCodeList = async (context, payload) => {
	return new Promise((resolve, reject) => {
		axios.request({
			url: 'FileLibraryNo/getCodeList?codeType=ems_type',
			method: 'get'
		}).then(res => {
			resolve(res);
		}).catch(error => {
			reject(error);
		})
	});
}
FileLibraryNo.actions.GetFileLibDropdownList = async (context, payload) => {
	return new Promise((resolve, reject) => {
        debugger
		axios.request({
			url: 'FileLibraryNo/GetFileLibDropdownList?type=1&org='+payload.data.CustomerCodew,
			method: 'get'
		}).then(res => {
			resolve(res);
		}).catch(error => {
			reject(error);
		})
	});
}


export default FileLibraryNo;