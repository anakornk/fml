//app.js

const AV = require('./utils/av-weapp-min.js');
AV.init({
  appId: 'hrajfoAICHW4XeYV4sERu6iv-gzGzoHsz',
  appKey: 'xAqG3XqAcdRNpLrGf5uFnbaU',
});


App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // new AV.Query('FML')
    //   .descending('createdAt')
    //   .find()
    //   .then(forms => console.log(forms[0]))
    //   .catch(console.error);
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
