// pages/submit/submit.js
var app = getApp();
const AV = require('../../utils/av-weapp-min.js');
const Form = require('../../model/form.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindFormSubmit: function(e){
    // this.setData({ isLoading: true })
    console.log(e.detail.value.textarea);
    wx.showToast({
      title: 'Sending...',
      icon: 'loading',
      duration: 1500
    })

    var nickName = this.data.userInfo.nickName;
    var quote = e.detail.value.textarea;
    // Leancloud permissions
    var acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    // Leancloud storage
    setTimeout(function () {
      new Form({
        name: nickName,
        upvote: 0,
        quote: quote
      }).setACL(acl).save().catch(console.error);

      // Redirect user
      wx.reLaunch({
        url: '/pages/index/index'
      });
    }, 2000);
    console.log("done");

  }
})