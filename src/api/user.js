import request from "@/utils/request";
// 用户认证（登录注册）
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};
// 发送验证码
export const sendSms = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: `/v1_0/user`
    // 发送请求头数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
};
