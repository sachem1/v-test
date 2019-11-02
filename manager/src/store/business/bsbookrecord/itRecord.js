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

itRecord.actions.getTradeImgList = async (context, payload) => {
    let data = payload.data;
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "GoldenTradeImg/GetPageList",
          data: data,
          method: "post"
        })
        .then(res => {
          resolve(util.wrapResult(res));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

itRecord.actions.saveHeadModel = async (context, payload) => {
  let data = payload.data;
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "GoldenTradeHead/SaveModel",
        data: data,
        method: "post"
      })
      .then(res => {
        resolve(util.wrapResult(res));
      })
      .catch(error => {
        reject(error);
      });
  });
};

itRecord.actions.getHeadModel = async (context, payload) => {
  let data = payload.data;
  if (data.id == undefined) {
    data.id = 0;
  }
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "GoldenTradeHead/GetModelById",
        params: data,
        method: "get"
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

itRecord.actions.getHeadByEmsId = async (context, payload) => {
  let data = payload.data;
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "GoldenTradeHead/GetModelByEmsId",
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

itRecord.actions.deleteHead = async (context, payload) => {
  let data = payload.data;
  return new Promise((resolve, reject) => {
    axios
      .request({
        url: "GoldenTradeHead/DeleteModelByIds",
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

itRecord.actions.getImgListModel = async (context, payload) => {
    let data = payload.data;
    if (data.id == undefined) {
      data.id = 0;
    }
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "GoldenTradeImg/GetModelById",
          params: data,
          method: "get"
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  

  itRecord.actions.saveImgListModel = async (context, payload) => {
    let data = payload.data;
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "GoldenTradeImg/SaveModel",
          data: data,
          method: "post"
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  

itRecord.actions.deleteImgListHead = async (context, payload) => {
    let data = payload.data;
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "GoldenTradeImg/DeleteModelByIds",
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
};

itRecord.actions.ImportTradeListExcel = async (context, payload) => {
    let data = payload.data;
    return new Promise((resolve, reject) => {
      axios
        .request({
          url: "GoldenTradeImg/ImportTradeListExcel",
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
  
export default itRecord;
