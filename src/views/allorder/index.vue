<template>
  <div
    class="order-warp"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="top">
      <el-button
        icon="el-icon-refresh-right"
        @click="defallGetData"
        type="primary"
        class="defall"
        >恢复默认</el-button
      >
      <div class="top-left">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="请选择"
            class="select-warp"
            :class="{ select_warp_active: isselect }"
          >
            <el-option label="姓名" value="name"></el-option>
            <el-option label="订单编号" value="oder_id"></el-option>
            <el-option label="电话" value="phone"></el-option>
            <el-option label="地址" value="address"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handesearch"></el-button>
        </el-input>
      </div>

      <div class="top-right">
        <el-date-picker
          v-model="value"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="currntData"
        ></el-date-picker>
      </div>
    </div>
    <div class="contenner" >
      <div class="contenner-top">
        <div class="checkbox">选择</div>
        <div class="order_id">订单编号</div>
        <div class="time">提交时间</div>
        <div class="type">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              订单状态<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">待支付</el-dropdown-item>
              <el-dropdown-item  command="1">待确认收货</el-dropdown-item>
              <el-dropdown-item  command="2">已收货</el-dropdown-item>
              <el-dropdown-item  command="3">已失败</el-dropdown-item>
              <el-dropdown-item  command="500">已驳回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="name">收货人姓名</div>
        <div class="phone">收货人电话</div>
        <div class="address">收货人地址</div>
        <div class="address_info">收货人地址详情</div>
        <div class="address_defall">操作</div>
      </div>
      <div class="contenner-min">
        <el-checkbox-group v-model="checkedCities" @change="changeAllDataArr">
          <div class="checkbox-warp">
            <div class="checkbox-item" v-for="item in allDataArr" :key="item.id">
              <div class="checkbox">
                <el-checkbox :label="item.oder_id">{{ item.id }}</el-checkbox>
              </div>
              <div class="order_id">{{ item.oder_id }}</div>
              <div class="time">{{ item.time }}</div>
              <div class="type">
                <span
                  class="desc"
                  :class="{
                    eorr: item.type === 3 || item.type === 2,
                    succ: item.type === 1 || item.type === 2,
                    waring: item.type === 500,
                  }"
                  >{{ istype(item.type) }}</span
                >
              </div>
              <div class="name">{{ item.name }}</div>
              <div class="phone">{{ item.phone }}</div>
              <div class="address">{{ item.address }}</div>
              <div class="address_info">{{ item.address_info }}</div>
              <div class="address_defall">
                <el-button
                  icon="el-icon-s-order"
                  type="primary"
                  size="mini"
                  @click="showGood(item)"
                  >查看详情</el-button
                >
                <el-button
                  v-if="item.type === 1"
                  icon="el-icon-upload"
                  type="danger"
                  size="mini"
                  @click="changeGood(item.oder_id)"
                  >处理</el-button
                >
              </div>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <div class="none-warp" v-if="allDataArr.length === 0">
      <div class="none"></div>
    </div>
      <div class="contenner-bouttom">
        <div class="contenner-bouttom-left">
          <el-checkbox
            v-model="isAllCheckbox"
            @change="handleCheckAllChange"
          ></el-checkbox>
          全选
        </div>
        <div class="contenner-bouttom-right">
          <el-button type="danger" @click="dellOrderDefall">删除</el-button>
        </div>
      </div>
    </div>
    
    <div class="boutton">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 80, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allData"
      ></el-pagination>
    </div>
    <div class="goodMask" v-if="goodMask && isgoogShow">
      <div class="contenner">
        <div class="order_id">
          <i class="el-icon-document"></i>订单编号：
          <p>{{ lookGood.oder_id }}</p>
        </div>
        <div class="time">
          <i class="el-icon-upload2"></i>提交时间：
          <p>{{ lookGood.time }}</p>
        </div>
        <div class="name">
          <i class="el-icon-postcard"></i>用户ID：
          <p>{{ lookGood.uid }}</p>
        </div>
        <div class="name">
          <i class="el-icon-user"></i>收货人姓名：
          <p>{{ lookGood.name }}</p>
        </div>
        <div class="phone">
          <i class="el-icon-phone"></i>收货人电话：
          <p>{{ lookGood.phone }}</p>
        </div>
        <div class="address">
          <i class="el-icon-location-outline"></i>收货人地址：
          <p>{{ lookGood.address }}</p>
        </div>
        <div class="phone">
          <i class="el-icon-link"></i>收货人电话：
          <p>{{ lookGood.address_info }}</p>
        </div>
        <div class="goodlist">
          <div class="top">商品详情</div>
          <div class="mid">
            <div class="mid-warp">
              <div class="mid-item" v-for="item in lookGood.data_list" :key="item.id">
                <div class="item-left">
                  <img v-lazy="item.img" class="img" alt />
                </div>
                <div class="item-right">
                  <div class="titel">{{ item.name }}</div>
                  <div class="desc">
                    <span>款式：{{ item.style }}</span>
                    <span v-show="item.size !== ''">大小：{{ item.size }}</span>
                  </div>
                  <div class="desc">
                    <span
                      >价格：<span class="price">￥{{ item.price }}</span></span
                    >
                    <span>数量：{{ item.suplist_num }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="icon" @click="heideood"><i class="el-icon-close"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStore } from "@/utils/storage.js";
export default {
  data() {
    return {
      input: "",
      select: "",
      value: "",
      currentPage: 1,
      allData: 0,
      allDataArr: [],
      isAllCheckbox: false,
      size: 20,
      loading: false,
      isselect: false,
      checkedCities: [],
      goodMask: false,
      lookGood: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      day1: "",
      day2: "",
      type:""
    };
  },
  created() {
    this.getData();
  },
  computed: {
    isgoogShow() {
      let arr = Object.keys(this.lookGood);
      return arr.length === 0 ? false : true;
    },
  },
  watch: {
    select(x, y) {
      if (x !== "") {
        this.isselect = false;
      }
    },
  },
  methods: {
    //选择查看订单的状态
    handleCommand(idx){
      // console.log(idx)
      this.type = idx
      this.getData()
    },
    //返回订单状态
    istype(type) {
      switch (type) {
        case 0:
          return "待支付";
          break;
        case 1:
          return "待确认收货";
          break;
        case 2:
          return "已收货";
          break;
        case 3:
          return "已失败";
          break;
        case 4:
          return "已完成";
          break;
        case 500:
          return "已驳回";
          break;
      }
    },
    //点击已处理的订单（已发货）
    async changeGood(id) {
      if (Number(getStore("dell")) === 1) {
        this.loading = true;
        const res = await this.$http.post("/api/changeOrderType", {
          id,
        });
        if (res.data.success === true) {
          this.loading = false;
          this.$Message({
            showClose: true,
            message: "提交车成功",
            type: "success",
          });
          this.getData();
        } else {
          this.$Message.error("提交失败");
        }
      } else {
        this.$Message.error("您没有修改删除权限");
      }
    },
    //默认获取数据
    defallGetData() {
      this.day1 = "";
      this.day2 = "";
      this.select = "";
      this.input = "";
      this.type = ""
      this.getData();
    },
    //删除订单
    async delleGood(id) {
      const res = await this.$http.post("/api/dellOrder", {
        id,
      });
      if (res.data.success === true) {
        return true;
      }
    },
    //改变订单状态
    dellOrderDefall() {
      if (this.checkedCities.length === 0) {
        this.$Message.error("请选中需要改变的订单");
        return;
      }
      this.$MessageBox("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (Number(getStore("dell")) === 1) {
            this.loading = true;
            let back = false;
            this.checkedCities.forEach((item, index) => {
              back = this.delleGood(item);
            });
            if (back) {
              this.$Message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
              this.getData();
              this.loading = false;
            } else {
              this.$Message.error("删除失败");
            }
            this.checkedCities = [];
            this.isAllCheckbox = false;
          } else {
            this.$Message.error("您没有修改删除权限");
          }
        })
        .catch(() => {
          this.$Message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //全选
    handleCheckAllChange(val) {
      if (val === false) {
        this.checkedCities = [];
      } else {
        this.list = [];
        this.allDataArr.forEach((element) => {
          this.checkedCities.push(element.oder_id);
        });
      }
    },
    //关闭订单详情
    heideood() {
      this.goodMask = true;
      this.lookGood = {};
    },
    //显示商品详情
    showGood(item) {
      this.goodMask = true;
      this.lookGood = item;
    },
    //列表项复选框变化触发
    changeAllDataArr(e) {},
    //搜索查询的内容
    handesearch() {
      //判断又没选择查询的类型 select是否为空值
      if (this.select === "") {
        this.isselect = true;
        this.$Message.error("请选择查询的类型");
        return;
      }
      if (this.input === "") {
        this.$Message.error("请输入查询的内容");
        return;
      }
      this.day1 = "";
      this.day2 = "";
      this.getData();
    },
    async getData() {
      this.loading = true;
      const res = await this.$http.post("/api/orderList", {
        page: this.currentPage,
        size: this.size,
        day1: this.day1,
        day2: this.day2,
        select: this.select,
        value: this.input,
        type:this.type
      });
      if (res.data.success === true) {
        this.loading = false;
        this.allData = res.data.allData;
        this.allDataArr = res.data.data;
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    //选择的日期
    currntData(e) {
      e.forEach((element, index) => {
        if (index === 0) {
          this.day1 = element;
        } else if (index === 1) {
          this.day2 = element;
        }
      });
      this.input = "";
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.el-dropdown-link {
  cursor: pointer;
  color: $cf;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.goodMask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba($color: #0000, $alpha: 0.5);
  display: flex;
  // justify-items: center;
  justify-content: center;
  align-items: center;
  .contenner {
    width: 600px;
    max-height: 70vh;
    // overflow: auto;
    padding: 10px;
    background-color: $cf;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    .icon {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 22px;
    }
    div {
      p {
        color: $c3;
      }
      i {
        margin: 0 5px;
      }
    }
    .order_id,
    .time,
    .name,
    .name,
    .phone,
    .address,
    .phone,
    .goodlist {
      margin: 20px 0;
      font-size: 16px;
      display: flex;
      align-items: center;
      color: $c9;
    }
    .goodlist {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .mid {
        width: 100%;
      }
    }
    .top {
      width: 100%;
      margin-bottom: 30px;
    }
    /* 滚动条 */
    .mid-warp::-webkit-scrollbar-thumb:horizontal {
      /*水平滚动条的样式*/
      width: 4px;
      background-color: #cccccc;
      -webkit-border-radius: 6px;
    }
    .mid-warp::-webkit-scrollbar-track-piece {
      background-color: #fff; /*滚动条的背景颜色*/
      -webkit-border-radius: 0; /*滚动条的圆角宽度*/
    }
    .mid-warp::-webkit-scrollbar {
      width: 10px; /*滚动条的宽度*/
      height: 8px; /*滚动条的高度*/
    }
    .mid-warp::-webkit-scrollbar-thumb:vertical {
      /*垂直滚动条的样式*/
      height: 50px;
      background-color: #999;
      -webkit-border-radius: 4px;
      outline: 2px solid #fff;
      outline-offset: -2px;
      border: 2px solid #fff;
    }
    .mid-warp::-webkit-scrollbar-thumb:hover {
      /*滚动条的hover样式*/
      height: 50px;
      -webkit-border-radius: 4px;
    }
    .mid-warp {
      display: flex;
      height: 400px;
      flex-direction: column;
      overflow: auto;
    }
    .mid-item {
      display: flex;
      align-items: center;
      margin: 0 30px;
      padding: 20px 0;
      border-bottom: 1px solid $xt;
      .item-left {
        img {
          width: 100px;
          height: 100px;
          border: 1px solid $xt;
        }
      }
      .item-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        color: $c3;
        .titel,
        .desc {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price {
            color: $jcg;
          }
        }
      }
    }
  }
}
.contenner-bouttom {
  width: 100%;
  padding: 0 1%;
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .contenner-bouttom-left {
  }
  .contenner-bouttom-right {
  }
}

.contenner {
  width: 100%;
  margin-top: 20px;
  .contenner-top {
    display: flex;
    background-color: $head-bg;
    color: $cf;
    padding: 5px;
    .checkbox {
      width: 5%;
    }
    .order_id {
      width: 10%;
    }
    .time {
      width: 10%;
    }
    .name {
      width: 10%;
    }
    .phone,
    .type {
      width: 10%;
    }
    .address {
      width: 15%;
    }
    .address_info {
      flex: 1;
    }
    .address_defall {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .contenner-min {
    width: 100%;
    .checkbox-warp {
      .checkbox-item {
        display: flex;
        // justify-content: center;
        align-items: center;
        border-left: 1px solid $xt;
        border-right: 1px solid $xt;
        .checkbox {
          width: 5%;
        }
        .order_id {
          width: 10%;
        }
        .time {
          width: 10%;
        }
        .name {
          width: 10%;
        }
        .phone,
        .type {
          width: 10%;
          .desc {
            display: inline-block;
            padding: 6px;
            border-radius: 4px;
            color: $cf;
          }
          .eorr {
            background-color: red;
          }
          .succ {
            background-color: green;
          }
          .waring {
            background-color: orangered;
          }
        }
        .address {
          width: 15%;
          padding: 0 15px;
        }
        .address_info {
          flex: 1;
        }
        .address_defall {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        div + div {
          border-left: 1px solid $xt;
        }
        div {
          // flex: 1;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          border-bottom: 1px solid $xt;
        }
      }
    }
  }
}

.none-warp {
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.none {
  width: 300px;
  height: 400px;
  background: url("https://www.dcmaomi.com:3000/serverImage/search.png") no-repeat;
}
.order-warp::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.order-warp::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.order-warp::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.order-warp::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.order-warp::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.order-warp {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 2%;
  .top {
    display: flex;
    width: 100%;
    .top-left {
      flex: 1;
      margin-right: 30px;
      .select-warp {
        width: 120px;
      }
      .select_warp_active {
        background-color: rgba($color: #fc0000, $alpha: 0.5);
        border-radius: 2px;
      }
    }
    .defall {
      margin-right: 30px;
    }
  }
  .boutton {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
