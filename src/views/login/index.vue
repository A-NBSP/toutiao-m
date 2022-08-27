<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar slot="left" class="page-nav-bar" title="登录" > 
      <van-icon name="arrow-left"  slot="left" @click="$router.back()"/>
    </van-nav-bar>
    <!-- 导航栏 -->

    <!-- 登录表单 -->
    <!-- van-from中，如果验证通过，触发提交事件，如果失败，不触发提交事件 -->
    <van-form ref="loginFrom" @submit="onSubmit">
      <van-field v-model="use.mobile" name="mobile" :rules="userFromRule.mobile" placeholder="请输入手机号" type="number" maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="use.code" name="code" placeholder="请输入验证码" :rules="userFromRule.code" type="number" maxlength="6">
        <template #button>
          <!-- round圆角 在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。
          在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交 finish事件倒计时结束时触发 -->
          <van-count-down :time="5000" format="ss s" @finish="isCountDown = false" v-if="isCountDown" />
          <van-button @click="onSendSms" v-else class="send-sms-btn" round size="small" native-type="button"
            >获取验证码</van-button
          >
        </template>
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 登录表单 -->
  </div>
</template>

<script>
import { login,sendSms } from "@/api/user";
import axios from "axios";
axios.defaults.headers.post["Content-type"] = "application/json";
export default {
  name: "LoginIndex",
  data() {
    return {
      use: {
        mobile: "", //手机号
        code: "", //验证码
      },
      isCountDown:false,//倒计时默认不显示
      // 表单校验规则
      userFromRule:{
        mobile:[
          {
            required:true,//必填
            message:'请输入手机号'
          },
          {
            pattern:/^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message:'手机号格式错误'
          }
        ],
        code:[
          {
            required:true,//必填
            message:'请输入验证码'
          },
          {
            pattern:/^\d{6}$/,
            message:'验证码格式错误'
          }
        ]
      }
    };
  },
  methods: {
    async onSubmit() {
      // 获取表单数据
      const user = this.use;
      // 表单验证,在vue中必须通过this.$toast调用Toast
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示时间，默认2000
      });

      // 用户请求
      try {
        const {data} = await login(user);
        //todo vuex容器
        this.$store.commit('setUser',data.data)
        this.$toast.success("登陆成功");
        // 登录成功，返回原页面
        this.$router.back()
      } catch (err) {
        if (err.response.status == 400) {
          this.$toast.fail("手机或验证码错误");
        } else {
          this.$toast.fail("登录失败");
        }
      }
    },
    // 验证码
    async onSendSms() {
      // 验证手机号
      try{
        await this.$refs.loginFrom.validate('mobile')
      }catch (err){
        return console.log('验证失败',err);
      }
      // 倒计时
      this.isCountDown = true
      // 请求发送验证码
      try{
        await sendSms(this.use.mobile)
        this.$toast('发送成功');
        
      }catch (err){
        if(err.response.status === 429){
          this.$toast('发送太频繁了，请稍后再发')
        }else {
          this.$toast('发送失败')
        }
      }
    }
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 158px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
