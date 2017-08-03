//index.js
//获取应用实例
var app = getApp()
const AV = require('../../utils/av-weapp-min.js');
const Form = require('../../model/form.js');

//{id:1, message: "Hello", likes: 10 }, {id:2, message: "Fuck my life", likes: 5 }, {id:3, message: "I wanna die", likes: 59 
Page({
  data: {
    forms: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    this.loadData();
  },
  onTap: function(event) {

    // var forms = this.data.forms;
    // forms
    // this.data.forms[0].attributes.upvote += 1;
    // this.setData({ forms: forms })
    var that = this;
    // console.log(this.data.forms[0].attributes)
    var id = event.target.id;
    console.log("ya")

    // new AV.Query('FML').get(id).then(function (result) {
    //   var quote = result.get("quote");
    //   quote.replace(/Tata/g,"Ben");
    //   result.set("quote",quote).save();
    // });

    console.log("yo")
    new AV.Query('FML').get(id).then(function(result){
      console.log(result.attributes.upvote);
      var forms = that.data.forms; 
      var index = forms.findIndex(function(item){
        return item.id == id;
      });
      forms[index].attributes.upvote = result.attributes.upvote + 1;
      that.setData({ forms })
      result.increment("upvote",1).save();
    }).catch(console.error);;

  },
  loadData(){
    wx.showNavigationBarLoading()
    //that.setData({cards: forms})
    var that = this;
    new AV.Query('FML')
      .descending('createdAt')
      .find()
      .then(function(forms){
        // console.log(forms);
        that.setData({forms})
        wx.hideNavigationBarLoading()
      })
      .catch(console.error);
  },
  onPullDownRefresh: function () {
    console.log("pull down")
    wx.stopPullDownRefresh()
    this.loadData();    
  },
  removeTata: function(event) {
    var id = event.target.id;
    new AV.Query('FML').get(id).then(function (result) {
      var quote = result.get("quote");
      quote = quote.replace(/Tata/g,"Ben");
      result.set("quote",quote).save();
    });
  }
})
