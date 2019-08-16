// 简单的图片预览
export default {
  data() {
    return {
      imgurl: '',
      imgStatus: false,
    }
  },
  methods: {
    imgUrl(img) {
      this.imgurl = img;
      this.imgStatus = true;
    },

    bigImg(e) {
      e.stopPropagation();
      this.imgStatus = false;
    },
  }
}
