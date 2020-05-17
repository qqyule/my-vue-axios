import axios from "axios";
import qs from "qs"
import { Message, Loading } from "element-ui"

// 响应时间
axios.defaults.timeout = 5 * 1000;
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// 配置接口地址
axios.defaults.baseURL = "http://localhost:5000/v1";
var loadingInstance;
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      text: "数据加载中，请稍后...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  err => {
    loadingInstance.close();
    Message.error("请求错误");
    return Promise.reject(err);
  }
);

function checkStatus (err) {
  switch (err.code) {
    case 10030:
      var string = ""
      Object.keys(err.message).forEach((key)=>{
        string += err.message[key] + " \r " 
      })
      Message.error(string);
      break;
    default:
      err.message?Message.error(err.message):Message.error("网络异常，请稍后尝试")
  }
  // 异常状态下，把错误信息返回去
  // return {
  //   status: -404,
  //   msg: '网络异常，请稍后尝试'
  // }
}

// function checkCode (res) {
//   // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
//   if (res.status === -404) {
//     // alert(res.msg)
//   }
//   // if (res.data && (!res.data.success)) {
//   //   alert(res.data.error_msg)
//   // }
//   return res
// }

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    // **注意 res.data.code 要根据后端回的格式自行修改**
    if (!res.data.code || res.data.code === 10 || res.data.code === 11) {
      loadingInstance.close();
      res.data.code&&Message.success(res.data.message);
      return res;
    } else {
      loadingInstance.close();
      Message.error(res.data.message);
    }
  },
  err => {
    loadingInstance.close();
    if (err.response) {
      checkStatus(err.response.data)
    } else {
      Message.error("网络异常，请稍后尝试");
    }
    
    return Promise.reject(err);
  }
);
// 发送请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err.data);
        }
      )
      .catch(err => {
        reject(err.data);
      });
  });
}
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err.data);
        }
      )
      .catch(err => {
        reject(err.data);
      });
  });
}
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
