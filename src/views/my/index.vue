<template>
  <div class="my-container">
    <!-- 已登录状态 -->
    <div v-if="user" class="my-header uesr-info">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            class="via"
            fill="cover"
            :src="userInfo.photo"
          />
          <span class="nickname">{{userInfo.name}}</span>
        </div>
        <van-button size="mini" round>编辑资料</van-button>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录状态 -->
    <div v-else class="my-header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item icon="photo-o" text="文字" class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字" class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /导航 -->
    <van-cell is-link>消息通知</van-cell>
    <van-cell is-link class="mb-9">小智同学</van-cell>
    <van-button
      v-if="user"
      type="primary"
      size="large"
      square
      @click="onLogout"
      class="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import {getUserInfo} from '@/api/user'
export default {
  name: "MyIndex",
  data(){
    return {
      userInfo:{}//用户自己信息
    }
  },
  created(){
    // 如果用户登陆了，就请求加载用户信息
    if(this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 退出登录
    onLogout() {
      this.$dialog.confirm({
        title: "确认退出吗",
      })
        .then(() => {
          this.$store.commit('setUser',null)
        })
        .catch(() => {
         console.log('取消执行');
        });
    },
    // 获取用户信息
    async loadUserInfo() {
      try{
        const {data} = await getUserInfo()
        this.userInfo = data.data
      }catch (err){
        this.$toast('用户信息获取失败，请稍后重试');
      }
      
    }
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .my-header {
    height: 366px;
    background-image: url(@/assets/banner.png);
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-content: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        margin-top: 15px;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .uesr-info {
    .base-info {
      height: 268px;
      padding: 81px 32px 55px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        .via {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .nickname {
          margin-left: 22px;
          font-size: 30px;
          color: #fff;
        }
      }
      .edit {
        width: 116px;
        height: 33px;
        font-size: 20px;
      }
    }
    .data-stats {
      height: 97px;
      display: flex;
      align-items: center;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 9px;
    .grid-item {
      height: 141px;
      background-color: #fff;
      .toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
        color: #333;
      }
    }
  }
  .logout {
    color: #eb5253;
    font-size: 30px;
    background-color: #fff;
    border-color: #fff;
    margin-top: 9px;
  }
}
</style>
