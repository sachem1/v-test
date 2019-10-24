/**
 * 封装文件导出
 * @param url
 * @param data
 * @returns {Promise}
 */
import ajax from './index';

//api.js
export function exportFile(url, options = {}) {
	return new Promise((resolve, reject) => {
		ajax.request({
			method: 'post',
			url: url, // 请求地址
			data: options, // 参数
			responseType: 'blob' // 表明返回服务器返回的数据类型
		}).then(
			response => {
				resolve(response.data);
				let blob = new Blob([response.data], {
					type: 'application/octet-stream'
				});
				let fileName = options.fileName;
				if (window.navigator.msSaveOrOpenBlob) {
					navigator.msSaveBlob(blob, fileName);
				} else {
					let link = document.createElement('a');
					link.href = window.URL.createObjectURL(blob);
					link.download = fileName;
					link.click();
					window.URL.revokeObjectURL(link.href);
				}
			},
			err => {
				reject(err);
			}
		);
	});
}
