<template>
  <div
    class="imgMask"
    v-show="imgMask"
    ref="box"
    @mousemove="handelmousemove"
    @mousewheel="navTopSwitch"
     @mouseup="handelmouseup"
  >
    <div class="upImg" @click="upImg"><i class="el-icon-arrow-left"></i></div>
    <div class="contnnet">
      <img
        v-lazy="img"
        id="img"
        ref="img"
        @mousedown.self="handelmousedown"
        @mouseup="handelmouseup"
        ondragstart="return false"
        :class="{ active: styleproportion }"
        :style="{
          marginLeft: x + 'px',
          marginTop: y + 'px',
          transform: `scale(${sole}) rotate(${deg}deg)`,
           transition: `${isMove?'':'nome'}`
        }"
        class="img"
        alt
      />
    </div>
    <div class="nextImg" @click="nextImg">
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="icons">
      <i class="el-icon-zoom-out" @click="zoomout"></i>
      <i class="el-icon-zoom-in" @click="zoomin"></i>
      <i class="el-icon-c-scale-to-original" @click="proportion"></i>
      <i class="el-icon-refresh-left" @click="refresh_left"></i>
      <i class="el-icon-refresh-right" @click="refresh_right"></i>
    </div>
    <div class="close" @click="close"><i class="el-icon-close"></i></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      sole: 1,
      deg: 0,
      isMove:true,
      isclick: false,
      handel: {
        x: 0,
        y: 0,
      },
      move: {
        x: 0,
        y: 0,
      },
      julu: {
        x: 0,
        y: 0,
      },
      x: 0,
      y: 0,
      timer: null,
      doc: document,
      styleproportion: true,
    };
  },
  // mounted () {
  //   window.addEventListener('mousewheel', this.navTopSwitch, false)
  // },
  // destroyed: function () {
  //   window.removeEventListener('mousewheel', this.navTopSwitch, false)
  // },
  props: {
    //限制缩放最小
    letter_Scale: {
      type: Number,
      default: 0.2,
    },
    //限制缩放最大
    max_Scale: {
      type: Number,
      default: 4,
    },
    //当前显示的图片
    img_Index: {
      type: Number,
      default: 0,
    },
    //是否显示
    imgMask: {
      type: Boolean,
      default: false,
    },
    //图片的数组
    img_list: {
      type: Array,
    },
  },
  computed: {
    img() {
      if (this.index === this.img_list.length - 1) {
        this.$Notification({
          title: "提示",
          message: "已是最后一张，点击返回第一张",
        });
      }
      return this.img_list[this.index];
    },
  },
  watch: {
    img_Index(x, y) {
      this.index = this.img_Index;
    },
  },
  methods: {
    //滚轮事件
    navTopSwitch(e) {
      // if (this.imgMask !== true) return
      // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (e.wheelDelta > -120) {
        this.zoomin();
      } else {
        this.zoomout();
      }
    },
    //鼠标按下
    handelmousedown(e) {
      this.isclick = true;
      this.handel.x = e.clientX;
      this.handel.y = e.clientY;
    },
    //鼠标移动
    handelmousemove(e) {
      if (!this.isclick) return;
      this.isMove = false
      this.move.x = e.pageX;
      this.move.y = e.pageY;
      this.x = this.move.x - this.handel.x + this.julu.x;
      this.y = this.move.y - this.handel.y + this.julu.y;
    },
    //鼠标抬起
    handelmouseup() {
      this.julu.x = this.x;
      this.julu.y = this.y;
      this.isclick = false;
      this.isMove = true
    },
    handelmouseup2(){
       this.julu.x = this.x;
      this.julu.y = this.y;
      this.isclick = false;
      this.isMove = true
    },
    initStyle() {
      this.x = 0;
      this.y = 0;
      this.sole = 1;
      this.deg = 0;
    },
    //比例
    proportion() {
      this.styleproportion = !this.styleproportion;
    },
    //向左转动
    refresh_left() {
      this.deg -= 90;
    },
    //向右转动
    refresh_right() {
      this.deg += 90;
    },
    //缩小
    zoomout() {
      this.sole -= 0.2;
      this.sole = this.sole < this.letter_Scale ? 1 : this.sole;
    },
    //f放大
    zoomin() {
      this.sole += 0.2;
      this.sole = this.sole > this.max_Scale ? 1 : this.sole;
    },
    //上一张
    upImg() {
      this.index -= 1;
      this.index = this.index == -1 ? this.img_list.length - 1 : this.index;
      this.initStyle();
    },
    //下一张
    nextImg() {
      this.index += 1;
      this.index = this.index > this.img_list.length - 1 ? 0 : this.index;
      this.initStyle();
    },
    //关闭显示大图
    close() {
      this.initStyle();
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.imgMask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .active {
    max-height: 100vh;
  }
  .img {
    display: inline-block;
    transition: all 0.3s ease-in-out;
  }
  .close {
    position: absolute;
    top: 30px;
    right: 30px;

    width: 50px;
    height: 50px;
    font-size: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    
  }
  .icons {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    width: 300px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0 30px;
    border-radius: 30px;
    z-index: 999;
    i{
      cursor: pointer;
    }
  }
  .upImg {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    font-size: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    margin-left: 30px;
    z-index: 999;
    cursor: pointer;
  }
  .nextImg {
    position: absolute;
    cursor: pointer;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    font-size: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    margin-right: 30px;
    z-index: 999;
  }
}
</style>