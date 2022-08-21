module.exports = {
  plugins: {
    // 把px转为rem
    "postcss-pxtorem": {
      // rootValue设计稿的10/1，如果设计稿的尺寸不是 375，而是 750 或其他大小，设置为函数动态计算返回
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
