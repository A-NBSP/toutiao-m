import axios  from "axios";
const request = axios.create({
  baseURL:'http://ttapi.research.itcast.cn/'//接口基准路径
})

export default request