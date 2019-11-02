import service from "@/store/modules/service";
import axios from "@/libs";
import util from "@/libs/util";


const erpconsume = {
    state: {
    }
};

util.applyMixins(erpconsume, service);


erpconsume.actions.queryTablePaged = function (context, payload) {
    debugger;
	return new Promise((resolve, reject) => {
		let response = axios.request({
			url: 'bom/getpaged',
			data: payload.data,
			method: 'post'
		}).then(res => {
			resolve(util.wrapResult(res));
		}).catch(error => {
			reject(error);
		});
	});
};


erpconsume.actions.deleteErpconsume = function (context, payload) {
	return new Promise((resolve, reject) => {
		let response = axios.request({
			url: 'bom/delete',
			data: payload.data.ids,
			method: 'post'
		}).then(res => {
			resolve(res);
		}).catch(error => {
			reject(error);
		});
	});
};

erpconsume.actions.saveErpconsume = function (context, payload) {
	return new Promise((resolve, reject) => {
		let response = axios.request({
			url: 'bom/save',
			data: payload.data,
			method: 'post'
		}).then(res => {
			resolve(res);
		}).catch(error => {
			reject(error);
		});
	});
};


erpconsume.actions.ImportExcel = async (context, payload) => {
    let data = payload.data;
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "erpconsume/import",
          data,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
};


erpconsume.actions.matchBeginDate = async (context, payload) => {
  
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "erpconsume/matchbegindate",
          method: "get"
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
};


export default erpconsume;