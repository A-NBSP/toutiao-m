// 封装本地存储模块
// 设置本地存储
export const setItem = (key,value) => {
  if(typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key,value)
}
// 获取本地存储
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try{
    return JSON.parse(data)
  }catch (err){
    return data
  }
}



// 删除
export const removeItem = key => {
  window.localStorage.removeItem(key)
}