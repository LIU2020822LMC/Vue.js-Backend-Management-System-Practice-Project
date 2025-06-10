import axios from 'axios'
import { ElMessage } from 'element-plus';
import config from "@/config";

const service = axios.create({
  baseURL: config.mock ? config.mockApi : config.baseApi, // 优先 mockApi
  timeout: 5000,
  headers: {
    "Content-Type": "application/json", // 明确设置 POST 请求头
  },
});
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log("请求URL:", config.baseURL + config.url);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (res) => {
    const { code, data, message } = res.data;
    if (code === 200) {
      return data;
    } else {
      const NETWORK_ERROR = "网络错误";
      ElMessage.error(message || NETWORK_ERROR);
      return Promise.reject(message || NETWORK_ERROR);
    }
  },
  (error) => {
    ElMessage.error(error.message || "请求失败");
    return Promise.reject(error);
  }
);

function request(options){
  options.method = options.method || "get";
  //关于get请求参数的调整
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }

  // Mock 开关优先级：options.mock > config.mock
  const isMock = options.mock ?? config.mock;

  //针对环境做一个处理
  if (config.env === "prod") {
    //不能用mock
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  return service(options);
}
export default request;