Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    imageList:[
      {imageSrc:"/images/images歌曲图片/Christine Welch.jpg"},      {imageSrc:"/images/images歌曲图片/Zedd.jpg"}
      ,      {imageSrc:"/images/images歌曲图片/Olly-Murs_thay-girl_guitar.jpg"}
    ],
    itemList:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 1000,
    duration: 500
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  clickPlay(e){
    wx.navigateTo({
      url: '/pages/redio/redio?id='+e.currentTarget.dataset.id,
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  }
  ,
  onLoad(){
    const page = this
    wx.request({
      url: 'http://127.0.0.1:8083/api/getMusic',
      method:"GET",
      success:(res)=>{
        page.setData({
          itemList:res.data
        })
      }
    })
  },
})