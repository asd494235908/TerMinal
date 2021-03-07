<template>
  <div
    class="box"
    ref="box"
    @scroll.passive="isScroll($event)"
    v-if="Img_arr.length !== 0"
  >
    <div
      class="box-contnet"
      v-for="(item, index) in Img_arr"
      :key="index"
      :style="{ width: img_width + 'px' }"
      ref="img"
    >
      <div class="box-img">
        <img
          v-lazy="item.url"
          class="box-img-list"
          ref="isimg"
          :style="{ width: img_width + 'px' }"
          alt
        />
      </div>
      <div class="img_mask">
        <div class="time">{{ item.time }}</div>
        <div class="img_mask-top">
          <i class="el-icon-full-screen" @click="handelclick(index)"></i>
        </div>
        <div class="img_mask-bouttom">
          <div class="massges">
            <div class="text">
              <p class="ellipsis">{{ item.info }}</p>
            </div>
            <div class="add" @click="addInfo(item)">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="icons">
            <div class="num">{{ item.id }}</div>
            <div class="copy" v-clipboard:copy="item.url" v-clipboard:success="onCopy">
              <i class="el-icon-share"></i>
            </div>
            <div class="dell" @click="dell(item)">
              <i class="el-icon-delete-solid"></i>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="desc" :style="{ marginTop: max + 'px' }" v-if="isAllData">
      已经加载全部了
    </div>
  </div>
</template>

<script>
//start_img 开始加载触发的事件
//start_stop 加载结束触发的事件
//addImgArr  滚动到底部触发的事件
//dell  滚动到底部触发的事件 参数 被删除的item
//瀑布流
export default {
  data() {
    return {
      timer: null,
      max: 0,
      num: 0,
      isAllData: false,
      timer2: null,
      load: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.isresize, true);
    this.isresize();
  },
  destroyed: function () {
    window.removeEventListener("resize", this.isresize, true);
  },
  computed: {},
  props: {
    Img_arr: {
      type: Array,
      default: [],
    },
    maxImg: {
      type: Number,
    },
    img_width: {
      type: Number,
      default: 290,
    },
  },
  watch: {
    num(x, y) {
      if (x === 0) {
        this.num = y;
        return;
      }
    },
    Img_arr(x, y) {
      //开始加载
      this.$emit("start_img");
      //传入的数组发生变化时显示加载遮罩层
      this.load = false;
      //用 Promise判断当前图片是否加载完毕
      const picsAll = this.Img_arr.map((item) => {
        const items = item;
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = items.url;
          img.onload = () => {
            resolve(items.url);
          };
          img.onerror = () => {
            reject(new Error(items.urel + "失败"));
          };
        });
      });
      Promise.all(picsAll)
        .then(() => {
          //加载完毕时变比遮罩层
          this.load = true;
          //初始化样式
          this.init();
          //加载结束显示图片
          this.$emit("start_stop");
        })
        .catch((e) => {
          //失败时打印 错误信息
          // console.log(e);
        });
      this.$nextTick(() => {
        this.init();
      });
    },
  },
  methods: {
    //添加信息事件
    addInfo(item) {
      this.$emit("add_Info", item);
    },
    //拷贝到剪切板成功
    onCopy(e) {
      this.$Message({
        showClose: true,
        message: "拷贝成功",
        type: "success",
      });
    },
    //拷贝剪切板失败
    onError(e) {
      this.$Message.error("拷贝失败");
    },
    //点击删除触发的事件
    dell(item) {
      this.$emit("dell", item);
    },
    isScroll(event) {
      //距离底部的距离
      let scrollBottom =
        event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
      //当前滑动的高度
      this.num = event.target.scrollTop;
      //触发加载事件
      if (scrollBottom == 0) {
        //节流
        clearTimeout(this.timer2);
        // 滚动时会发生样式错乱Bug 滚动时候矫正样式
        // this.damo();
        this.timer2 = setTimeout(() => {
          if (this.maxImg === this.Img_arr.length) {
            //显示加载完毕  rerun出加载事件
            this.isAllData = true;
            return;
          }
          //触发加载
          this.$emit("addImgArr");
        }, 500);
      } else {
        clearTimeout(this.timer2);

        this.timer2 = setTimeout(() => {
          // 滚动时会发生样式错乱Bug 滚动时候矫正样式
          this.damo();
        }, 700);
      }
    },
    //点击图片的索引
    handelclick(index) {
      this.$emit("ImgClick", index);
    },
    //清除样式
     clearInit() {
      //  this.$nextTick(() => {
        let imgs = this.$refs.img;
        imgs.forEach((item) => {
          item.style.top = "";
          item.style.left = "";
          item.style.marginLeft = "";
        // });
      });
    },
    //窗口发生变动时 修改样式
    isresize() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.damo();
      }, 50);
    },
    //添加样式
    damo() {
      this.clearInit();
      //边距
      let margin = 20;
      //父盒子的宽度
      let parent = this.$refs.box.offsetWidth;
      //img Dom数组
      let imgs = this.$refs.img;
      //每张图片的宽度
      let imgWidth = this.img_width;
      //列数 = imgWidth/parent
      let colUmn = Number(parent / (imgWidth + margin)).toFixed();
      let arr = [];
      let isarr = [];
      for (let i = 0; i < imgs.length; i++) {
        if (i < colUmn) {
          //初始化前第一排的图片
          imgs[i].style.top = +"px";
          imgs[i].style.left = margin * i + imgWidth * i + "px";
          imgs[i].style.marginLeft = 6 + "px";
          let imgHeight = this.getImgInfo(i);
          //第一排图片的高度放入arr数组
          arr.push(imgHeight);
        } else {
          //求出arr最小值和最小值的索引
          let minheight = arr[0],
            index = 0;
          for (let j = 0; j < arr.length; j++) {
            if (minheight > arr[j]) {
              minheight = arr[j];
              index = j;
            }
          }
          //把图片第I个的top值 设置为最小高度图片的top+边距+最小高度的top值
          imgs[i].style.top = arr[index] + margin + imgs[index].offsetTop + "px";
          //获取最大高度
          this.max =
            arr[index] + margin + imgs[index].offsetTop + this.getImgInfo(index) - 100;
          //把图片第I个的left值 设置为最小高度图片的left值
          imgs[i].style.left = imgs[index].offsetLeft + 1 + "px";

          //把arr最小高度的图片替换成第I个的
          arr[index] = arr[index] + this.getImgInfo(i) + margin;
        }
      }
      //回到上次加载的高度
      this.$refs.box.scrollTop = this.num;
      //加载结束显示图片
      // this.$emit("start_stop");
    },
    init() {
      //开始加载
      // this.$emit("start_img");
      //清除样式
      this.clearInit();
      //加载样式
      this.damo();
      //父组件传递box高度
    },
    //获取图片的高
    getImgInfo(i) {
      let img = new Image();
      img.src = this.Img_arr[i].url;
      const li = Number(img.width / 300);
      let height = parseInt(img.height / li);
      return height;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.desc {
  // position: absolute;
  // bottom: 0;
  // left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
}
/* 滚动条 */
.box::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.box::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.box::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.box::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.box::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.box {
  //   z-index: 999;
  width: 100%;
  margin-top: 30px;
  padding-top: 6px;
  padding-bottom: 30px;
  height: 800px;
  position: relative;
  overflow: auto;

  .box-contnet {
    height: auto;
    position: absolute;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
    &:hover .img_mask {
      opacity: 1;
    }
    .img_mask {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba($color: #000000, $alpha: 0.5);
      transition: all 0.5s ease-in-out;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      .time {
        margin-top: 10px;
        display: flex;
        align-content: center;
        justify-content: center;
      }
      .img_mask-top {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }
      .img_mask-bouttom {
        padding: 0 10px;
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 16px;
        .massges {
          flex: 1;
          display: flex;
          .text {
            flex: 1;
            p {
              width: 240px;
            }
          }
          .add:hover {
            color: $head-bg;
          }
          .add {
            width: 50px;
            display: flex;
            align-content: center;
            justify-content: center;
          }
        }
        .icons {
          flex: 1;
          display: flex;
          align-content: center;
          div:hover {
            color: $head-bg;
          }
          div {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .box-img {
      width: 100%;

      .box-img-list {
        display: block;
        height: auto;

        background-color: #fff;
      }
    }
  }
}
</style>
