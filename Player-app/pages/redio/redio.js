// pages/newpage/newpage.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    itemList:[],
    itemIndex:0,
    progressWidth:0,
    play:true,
    playImage:"/images/images/pause.png",
    radioStateClass:"",
    translateNavClass:"translateY",
    musicPercent:0,
    musicTime:0,
    musicString:"0:00",
    musicNowString:"0:00",
    loop:false,
    loopImage:"/images/images/loop.png",
    back_bj: "<"
  },
  clickShare(){
    this.setData({
      translateNavClass:this.data.translateNavClass?"":"translateY"
    })
  },
  clickNav(e){
    this.setData({item:this.data.itemList.find((item,index)=>{
      this.setData({
        itemIndex:index
      })
      return item.id == e.currentTarget.dataset.id
    })})
    this.closeNav();
    this.createAudio();
  },

  isloop:function(){
    const loopFlag = !this.data.loop
    this.setData({
      loop:loopFlag,
      loopImage:loopFlag?"/images/images/single.png":"/images/images/loop.png"
    })
    
  },

  playClick:function(e){
    if(this.data.play){
      this.setData({
        radioStateClass:"paused",
        playImage:"/images/images/play.png"
      })
      this.audioCtx.pause()
    }
    else{
      this.setData({
        radioStateClass:"",
        playImage:"/images/images/pause.png"
      })
      this.audioCtx.play()
    }
    this.setData({
      play:!this.data.play
    })
  }
  ,
  progressClick(e){
    const touchX = e.touches[0].pageX - e.target.offsetLeft
    const progressX = 240
    
    const percent = touchX / progressX;
    this.setData({
      musicPercent:percent,
    })
    const musicNow = Math.floor(this.data.musicTime * percent) 
    this.audioCtx.seek(musicNow)
  },
  computedString:function(time){
    const nowtimeSecond =Math.floor(time%60) 
    this.setData({
      musicNowString:Math.floor(time/60)+":"+(nowtimeSecond%60 < 10? "0"+nowtimeSecond:nowtimeSecond)
    })
  },
  musicTimeUpdate:function(e){
    this.musicPercentRun(e.detail)
    this.computedString(e.detail.currentTime)
  }
  ,
  musicPercentRun:function({duration,currentTime}){
    const time = Math.floor(duration)
    this.setData({
      musicString: Math.floor(time/60)+":"+ (time%60 < 10? "0"+time%60:time%60),
      musicPercent: Math.floor(currentTime/time* 100),
      musicTime:time
    })
  },

  musicEnd:function(){
    if(this.data.loop){
      return;
    }
    this.goNext();
  },
  goNext:function(){
    if(this.data.itemList[this.data.itemIndex + 1]){
      this.setData({
        itemIndex: this.data.itemIndex + 1,
        item:this.data.itemList[this.data.itemIndex + 1]
      })
    }
    else{
      this.setData({
        itemIndex : 0,
        item:this.data.itemList[0]
      })
    }
    this.createAudio();
  },
  goPrev:function(){
    if(this.data.itemList[this.data.itemIndex - 1]){
      this.setData({
        itemIndex: this.data.itemIndex - 1,
        item:this.data.itemList[this.data.itemIndex - 1]
      })
    }
    else{
      this.setData({
        itemIndex:this.data.itemList.length - 1,
        item:this.data.itemList[this.data.itemList.length - 1]
      })
    }
    this.createAudio();
  },
  closeNav(){
    this.setData({
      translateNavClass:"translateY"
    })
  },
  goBack: function () {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const page = this
    wx.request({
      url: 'http://127.0.0.1:8083/api/getMusic',
      method:"GET",
      success:(res)=>{
        page.setData({item:res.data.find((item,index)=>{
          page.setData({
            itemIndex:index
          })
          return item.id == options.id
        }),itemList:res.data})
        console.log(this.data.item,this.data.itemIndex,this.data.itemList);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

    this.createAudio();
  },

  createAudio(){
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const page = this
    const query = wx.createSelectorQuery()
    query.select('.progress').boundingClientRect(data=>{
      console.log(data);
      page.setData({
        progressWidth:data.width
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})