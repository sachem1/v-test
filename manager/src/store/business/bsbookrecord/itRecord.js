import service from "@/store/modules/service";
import axios from "@/libs";
import util from "@/libs/util";

const itRecord = {
  state: {
    searchModel: {},
    editForm: {},
    importTypeList: {}
  }
};

util.applyMixins(itRecord, service);

itRecord.actions.getItRecordList = async (context, payload) => {
  let data = payload.data;
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "GoldenTradeHead/GetPageList",
        data: data,
        method: "post"
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

itRecord.actions.getImportTypeList = async (context, payload) => {
  let data = payload.data;
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "SysImport/GetImportTypeList",
        params: data,
        method: "get"
      })
      .then(res => {
        resolve(util.wrapResult(res));
      })
      .catch(error => {
        reject(error);
      });
  });
};

itRecord.actions.GetCustomerTemplateFileUrl = async (context, payload) => {
  let data = payload.data;
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "SysImport/GetCustomerTemplateFileUrl",
        params: data,
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

itRecord.actions.ImportExcel = async (context, payload) => {
    let data = payload.data;
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "GoldenTradeHead/ImportExcel",
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
//   let data = payload.data;
//   let response = await axios.request({
//     url: "GoldenTradeHead/ImportExcel",
//     data,
//     method: "post",
//     headers: {
//       "Content-Type": "multipart/form-data"
//     }
//   });
//   return util.wrapResult(response);
};

export default itRecord;
