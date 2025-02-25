// pages/newpage/newpage.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    item:{image:"/images/images歌曲图片/Christine Welch.jpg",name:"一百万个可能",author:"Christine Welch"},
    play:true,
    playImage:"/images/images/play.png",
    radioStateClass:"",
    musicPercent:0,
    musicTime:168,
    musicNowTime:0,
    musicString:"0:00",
    musicNowString:"0:00"
  },

  playClick:function(e){
    if(this.data.play){
      this.setData({
        radioStateClass:"paused",
        playImage:"/images/images/pause.png"
      })
    }
    else{
      this.setData({
        radioStateClass:"",
        playImage:"/images/images/play.png"
      })
      this.musicPercentRun();
    }
    this.setData({
      play:!this.data.play
    })
  }
  ,
  computedString:function(){
    const nowtimeSecond = this.data.musicNowTime%60
    this.setData({
      musicNowString:Math.floor(this.data.musicNowTime/60)+":"+(nowtimeSecond%60 < 10? "0"+nowtimeSecond:nowtimeSecond)
    })
  },

  musicPercentRun:function(){
    this.setData({
      musicString: Math.floor(this.data.musicTime/60)+":"+ (this.data.musicTime%60 < 10? "0"+this.data.musicTime%60:this.data.musicTime%60)
    })
      const interval = setInterval(()=>{
        if(this.data.musicNowTime >= this.data.musicTime){
          clearInterval(interval);
          this.goNext();
          return;
        }

        if(this.data.play){
          this.setData({
            musicNowTime:this.data.musicNowTime + 1
          })
        }
        else{
          clearInterval(interval);
        }
        this.computedString()
      },1000)
  },
  goNext:function(){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.musicPercentRun();
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