import axios  from "axios";
import store from "@/store";
const request = axios.create({
  baseURL:'http://toutiao.itheima.net',//接口基准路径
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  const {user} = store.state
  // 请求发起会经过这里
  // config本次请求的配置对象
  if(user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  // 对请求错误(还没有发出去)做些什么
  return Promise.reject(error);
});
export default request