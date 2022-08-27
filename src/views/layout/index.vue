<template>
  <div class="Layout-container">
    <router-view></router-view>
    <van-tabbar v-model="active" class="layout-active" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="toutiao toutiao-shouye" ></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda" ></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin" ></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode" ></i>
        <span class="text">{{$store.state.user ? '我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.Layout-container {
  .layout-active {
    i.toutiao  {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
