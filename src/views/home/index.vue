<template>
  <div class="home-warp">
    <div class="left">
      <div class="left-top">
        <div class="user-num">
          <div class="num-left">
            <i class="el-icon-user-solid"></i>
            <p>已注册的用户</p>
          </div>
          <div class="num-right">
            <increasing-number
              :num="userNmun"
              :delay="50"
              @Increasing_Number_End="handelEnd"
            ></increasing-number>
          </div>
        </div>
        <div class="order-num">
          <div class="num-left">
            <i class="el-icon-s-order"></i>
            <p>订单总数</p>
          </div>
          <div class="num-right">
            <increasing-number
              :num="orderNum"
              :delay="50"
              @Increasing_Number_End="handelEnd"
            ></increasing-number>
          </div>
        </div>
        <div class="Total-num">
          <div class="num-left">
            <i class="el-icon-s-shop"></i>
            <p>商品总数</p>
          </div>
          <div class="num-right">
            <increasing-number
              :num="supNum"
              :delay="50"
              @Increasing_Number_End="handelEnd"
            ></increasing-number>
          </div>
        </div>
        <div class="visit-num">
          <div class="num-left">
            <i class="el-icon-s-marketing"></i>
            <p>总访问数</p>
          </div>
          <div class="num-right">
            <increasing-number
              :num="visitNum"
              :delay="50"
              @Increasing_Number_End="handelEnd"
            ></increasing-number>
          </div>
        </div>
      </div>
      <div class="left-content">
        <div class="echaer">
          <e-charts :date="date" :pirce="pirce"></e-charts>
        </div>
      </div>
      <div class="left-bottom">
        <div class="Notice">
          <h2 class="text_titel">公告</h2>
          <div class="Notice_info">
            <p class="Notice_time">
              尊敬的{{ user_info }}，{{ tiem_info }}好！现在的时间是：{{ time }}
            </p>
            <p>
              DM是基于SOA架构的大型开源分布式电商B2C购物商城，前后端开发分离，前台 基于Vue
              3.0全家桶开发，前台商城演示地址：<a
                href="https://www.dcmaomi.com"
                target="_blank"
                >点我查看</a
              >
            </p>
            <p>
              后台几乎完成所有功能开发，你所看到的几乎皆为真实后台数据，为避免数据遭恶意修改，测试体验账号只具备查看权限。
              后台开发主要使用技术有vue/node.js/MySQL/express等。右侧是uni-app
              基础生成的H5端
            </p>

            <p>
              Github 后台源码：<a
                href="https://github.com/asd494235908/TerMinal"
                target="_blank"
                >前端</a
              >
              ~ <a href="" target="_blank">后端</a>
            </p>
            <p>
              Github DM商城源码：<a
                href="https://github.com/asd494235908/DcPay"
                target="_blank"
                >前端</a
              >
              ~ <a href="" target="_blank">后端</a>
            </p>
            <p>Fork或下载前请动动手指Star一下~</p>
            <p>技术疑问交流群：949139553.</p>
          </div>
        </div>
        <div class="brief_introduction">
          <h2 class="text_titel">简介</h2>
          <div class="myinfo">
            <div class="info_titel">
              <img src="https://dmh5.dcmaomi.com/static/imges/weidnglu.png" alt="" />
              <div class="name">
                <p class="name_txt">Mike</p>
                <p class="name_desc">Author</p>
              </div>
            </div>
            <div class="my_laer">
              <div class="laer_item">
                <div class="laer_icon"><i class="iconfont">&#xe676;</i></div>
                <div class="laer_link"><a>个人简介</a><a>个人博客</a></div>
                <div class="laer_num laer_num_1">2</div>
              </div>
              <div class="laer_item">
                <div class="laer_icon"><i class="iconfont icon">&#xe67a;</i></div>
                <div class="laer_link">
                  <a
                    href="https://music.163.com/#/my/m/music/playlist?id=567698637"
                    target="_blank"
                    >网易云音乐</a
                  >
                </div>
                <div class="laer_num laer_num_2">1</div>
              </div>
              <div class="laer_item">
                <div class="laer_icon"><i class="iconfont">&#xe679;</i></div>
                <div class="laer_link">
                  <a href="mailto:asd494235908@qq.com" target="_blank"
                    >asd494235908@qq.com</a
                  >
                </div>
                <div class="laer_num laer_num_3">2</div>
              </div>
              <div class="laer_item">
                <div class="laer_icon"><i class="iconfont">&#xe624;</i></div>
                <div class="laer_link">
                  <a href="https://github.com/asd494235908" target="_blank">Github</a
                  ><a href="https://space.bilibili.com/19168521" target="_blank"
                    >bilibili</a
                  >
                </div>
                <div class="laer_num laer_num_4">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <my-tianqi></my-tianqi>
      </div>
      <div class="right-bottom">
        <div class="warp">
          <iframe
            src="https://dmh5.dcmaomi.com/"
            frameborder="3"
            class="contennet"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IncreasingNumber from "@/components/IncreasingNumber";
import MyTianqi from "@/components/my_tianqi";
import ECharts from "@/views/home/ECharts";
import { getStore } from "@/utils/storage.js";
export default {
  data() {
    return {
      num: 5000,
      userNmun: 0,
      orderNum: 0,
      supNum: 0,
      visitNum: 0,
      pirce: [],
      date: [],
      timer: null,
      time: "",
      tiem_info: "",
      user_info: "",
    };
  },
  components: {
    IncreasingNumber,
    MyTianqi,
    ECharts,
  },
  mounted() {
    this.getData();
    this.initTime();
  },
  methods: {
    handelEnd() {},
    async getData() {
      const res = await this.$http.get("/api/home");
      if (res.data.success === true) {
        this.userNmun = res.data.userNmun;
        this.orderNum = res.data.orderNum;
        this.supNum = res.data.supNum;
        this.visitNum = res.data.visitNum;
        this.pirce = res.data.priec;
        this.date = res.data.date;
      }
    },
    initTime() {
      if (Number(getStore("dell")) === 1) {
        this.user_info = "管理员";
      } else {
        this.user_info = "游客";
      }
      this.timer = setInterval(() => {
        this.time = this.getTime();
        const arr = this.arrnNuber(this.time.match(/\d+/g)); // 数组字符串返回数组 数字类型
        if (0 <= arr[3] && arr[3] <= 5) {
          this.tiem_info = "深夜";
        } else if (6 <= arr[3] && arr[3] <= 10) {
          this.tiem_info = "早晨";
        } else if (11 <= arr[3] && arr[3] <= 13) {
          this.tiem_info = "中午";
        } else if (14 <= arr[3] && arr[3] <= 17) {
          this.tiem_info = "下午";
        } else if (18 <= arr[3] && arr[3] <= 19) {
          this.tiem_info = "傍晚";
        } else if (20 <= arr[3] && arr[3] <= 23) {
          this.tiem_info = "晚上";
        }
      }, 1000);
    },
    // 返回秒
    alls(arr) {
      const oid = new Date();
      oid.setFullYear(arr[0], arr[1], arr[2]);
      oid.setHours(arr[3]);
      oid.setMinutes(arr[4]);
      oid.setSeconds(arr[5]);
      return oid.getTime();
    },
    // 数组字符串返回数组 数字类型
    arrnNuber(x) {
      const arr = [];
      for (let i = 0; i < x.length; i++) {
        arr.push(this.letterNuber(x[i]));
      }
      return arr;
    },
    // 返回数字
    letterNuber(x) {
      const num1 = Number(parseInt(x));
      return num1;
    },
    getTime() {
      let time = new Date();
      const year = time.getFullYear();
      const Month = time.getMonth() + 1;
      const date = time.getDate();
      const Hours = time.getHours();
      const Minutes = time.getMinutes();
      const Seconds = time.getSeconds();
      return `${year}-${this.towNum(Month)}-${this.towNum(date)} ${this.towNum(
        Hours
      )}:${this.towNum(Minutes)}:${this.towNum(Seconds)}`;
    },

    towNum(num) {
      return num < 10 ? "0" + num : num;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.left-content {
  width: 100%;
  height: 640px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  .echaer {
    width: 100%;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;
    border-radius: 4px;
    background-color: $cf;
    box-shadow: 0px 0px 6px 2px rgba(18, 18, 3, 0.1);
  }
}
.left-top {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  margin-top: 14px;
  justify-content: space-between;
  .user-num {
    .num-left {
      background-color: #ff5e9c;
      box-shadow: 0px 0px 6px 2px rgba(255, 94, 156, 0.4);
    }
  }
  .order-num {
    .num-left {
      background-color: #ff9b3e;
      box-shadow: 0px 0px 6px 4px rgba(255, 155, 62, 0.2);
    }
  }
  .Total-num {
    .num-left {
      background-color: #ff5f6d;
      box-shadow: 0px 0px 6px 2px rgba(255, 95, 109, 0.4);
    }
  }
  .visit-num {
    .num-left {
      background-color: #5571fe;
      box-shadow: 0px 0px 6px 2px rgba(8, 113, 254, 0.2);
    }
  }
  .user-num,
  .order-num,
  .Total-num,
  .visit-num {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 14px 20px;
    border-radius: 5px;
    // box-shadow: 0px 0px 6px 2px rgba(18, 18, 3, 0.1);
    cursor: pointer;
    .num-left {
      height: 100%;
      width: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        font-size: 30px;
        margin: 20px;
        color: $cf;
      }
      p {
        color: $cf;
        opacity: 0.8;
        font-size: 14px;
      }
    }
    .num-right {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      box-shadow: 0px 0px 6px 2px rgba(18, 18, 3, 0.1);
      background-color: $cf;
    }
  }
}
.left-bottom {
  // flex: 1;
  width: 100%;
  // padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .Notice,
  .brief_introduction {
    flex: 1;
    height: 380px;
    margin: 0 20px;
    box-shadow: 0px 0px 6px 2px rgba(18, 18, 3, 0.1);
    background-color: $cf;
    border-radius: 4px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    .text_titel {
      width: 100%;
      text-align: center;
      height: 40px;
      margin-top: 10px;
      font-size: 18px;
    }
    .myinfo {
      width: 100%;
      height: 340px;
      .my_laer {
        height: 240px;
      }
      .laer_item:hover {
        .laer_icon {
          i {
            color: coral;
          }
        }
      }
      .laer_item {
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: solid 1px $xt;
        // border-bottom: solid 1px $xt;

        .laer_num,
        .laer_icon {
          margin: 0 10px;

          i {
            font-size: 22px;
            color: $c9;
            transition: all 0.3s ease-in-out;
          }
          .icon {
            font-size: 28px;
          }
        }
        .laer_link {
          flex: 1;
          a {
            margin: 0 8px;
          }
        }

        .laer_num {
          width: 26px;
          height: 26px;
          
          color: $cf;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }
        .laer_num_1 {
          background-color: cornflowerblue;
        }
        .laer_num_2 {
          background-color: coral;
        }
        .laer_num_3 {
          background-color: rgb(236, 73, 106);
        }
        .laer_num_4 {
          background-color: rgb(73, 236, 168);
        }
        
      }
      .info_titel {
        display: flex;
        align-items: center;
        margin: 10px 0;
        img {
          width: 100px;
          height: 100px;
          margin: 0 10px;
          // border:  1px solid $xt;
          border-radius: 4px;
          box-shadow: 0px 0px 6px 2px rgba(18, 18, 3, 0.1);
        }
        .name {
          flex: 1;
          .name_txt {
            font-size: 30px;
            color: $main-col;
          }
          .name_desc {
            color: $c9;
          }
        }
      }
    }
  }
  .Notice {
    padding: 0 10px;
    .Notice_time {
      color: #5079d9;
    }
    .Notice_info {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      p {
        margin: 10px 0;
      }
    }
  }
}
.num-box {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  p {
    flex: 1;
    height: 100px;
    line-height: 100px;
    background-color: #2a3242;
    margin: 0 26px 0 0;
    color: #fffffe;
    text-align: center;
    border-radius: 12px;
    padding: 0 19px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    &:last-child {
      margin-right: 0px;
    }
    span {
      color: #9185e0;
      font-size: 80px;
      font-weight: bolder;
      position: absolute;
      top: 10px;
      left: 50%;

      transform: translateX(-50%);
      transition: all 0.5s ease-in-out;
      letter-spacing: 10px;
    }
  }
}
/* 滚动条 */
.home-warp::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.home-warp::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.home-warp::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.home-warp::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.home-warp::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.home-warp {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  .left {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .right {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .right-top {
      flex: 1;
      display: flex;
      align-items: center;
      margin-top: 30px;
    }
    .right-bottom {
      width: 100%;
      height: 100%;
      position: relative;
      top: 20px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
    }
  }
}
.warp {
  // position: relative;
  // top: 60px;
  width: 375px;
  height: 755px;
  // background-color: red;
  background: url("https://www.dcmaomi.com:3000/serverImage/IPhoneX.png") no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .contennet {
    width: 326px;
    height: 706px;
    border-radius: 34px;
  }
}
</style>
