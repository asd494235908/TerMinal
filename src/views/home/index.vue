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
        <e-charts :date="date" :pirce="pirce"></e-charts>
      </div>
      <div class="left-bottom"></div>
    </div>
    <div class="right">
      <div class="right-top">
        <my-tianqi></my-tianqi>
      </div>
      <div class="right-bottom">
        <div class="warp">
          <iframe
            src="https://dmh5.dcmaomi.com/"
            frameborder="0"
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
    };
  },
  components: {
    IncreasingNumber,
    MyTianqi,
    ECharts,
  },
  mounted() {
    this.getData();
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.left-content {
  width: 100%;
  height: 480px;
  margin-top: 90px;
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
.left-content {
  flex: 1;
}
.left-bottom {
  flex: 1;
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
      // margin-top: 20px;
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
    width: 325px;
    height: 710px;
    border-radius: 34px;

    // border: 1px solid red;
  }
}
</style>
