<template>
  <div
    class="warp"
    ref="setimg"
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
        <!-- //搜索内容 -->
        <el-input placeholder="请输入内容" v-model="input2" class="input-with-select">
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="请选择"
            class="select-warp"
            :class="{ select_warp_active: isselect }"
          >
            <el-option label="用户名" value="user"></el-option>
            <el-option label="IP地址" value="ip"></el-option>
            <el-option label="城市" value="city"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handelsearch"
          ></el-button>
        </el-input>
      </div>
      <div class="top-right">
        <!-- //选择日期 -->
        <el-date-picker
          v-model="value2"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="currntData"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="content" v-if="imgarr.length !== 0">
      <div class="content-warp">
        <div class="time">
          <div class="time-list-titel">
            <div class="time-list-titel-checkbox">选择</div>
            <div class="time-list-titel-nuber">
              <div>编号</div>
              <div class="icon">
                <div class="el-icon-caret-top" @click="handelsort(1)"></div>
                <div class="el-icon-caret-bottom" @click="handelsort(2)"></div>
              </div>
            </div>
            <div class="time-list-titel-name">用户名</div>
            <div class="time-list-titel-ip">IP地址</div>
            <div class="time-list-titel-address">请求地址</div>
            <div class="time-list-titel-ms">用时(ms)</div>
            <div class="time-list-titel-time">
              <div>时间</div>
              <div class="icon">
                <div class="el-icon-caret-top" @click="handelsort(3)"></div>
                <div class="el-icon-caret-bottom" @click="handelsort(4)"></div>
              </div>
            </div>
            <div class="time-list-titel-city">城市</div>
            <div class="time-list-titel-city">设备</div>
            <div class="time-list-titel-num">
              <div>访问次数</div>
              <div class="icon">
                <div class="el-icon-caret-top" @click="handelsort(5)"></div>
                <div class="el-icon-caret-bottom" @click="handelsort(6)"></div>
              </div>
            </div>
            <div class="time-list-titel-name">操作</div>
          </div>
          <div class="time-list">
            <el-checkbox-group v-model="checkedCities" @change="changeAllDataArr">
              <div class="time-list-item" v-for="(item, index) in imgarr" :key="index">
                <div class="time-list-titel-checkbox desc">
                  <el-checkbox :label="item.id">{{ item.id }}</el-checkbox>
                </div>
                <div class="time-list-titel-nuber desc">{{ item.id }}</div>
                <div class="time-list-titel-name desc"><span class="ellipsis laer">{{ item.user }}</span></div>
                <div class="time-list-titel-ip desc">{{ sensitive(item.ip) }}</div>
                <div class="time-list-titel-address desc">{{ item.name }}</div>
                <div class="time-list-titel-ms desc">{{ item.ms }}</div>
                <div class="time-list-titel-time desc">{{ item.time }}</div>
                <div class="time-list-titel-city desc">{{ item.city }}</div>
                <div class="time-list-titel-city desc">{{ item.mobile }}</div>
                <div class="time-list-titel-num desc">{{ item.num }}</div>
                <div class="time-list-titel-name desc">
                  <el-button
                    icon="el-icon-thumb"
                    @click="ShowItem(item)"
                    type="primary"
                    class="defall"
                    size="mini"
                    >查看详情</el-button
                  >
                </div>
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="none-warp" v-if="imgarr.length === 0">
      <div class="none"></div>
    </div>
    <div class="bottom">
      <div class="contenner-bouttom-left">
        <div class="all">
          <el-checkbox
            v-model="isAllCheckbox"
            @change="handleCheckAllChange"
          ></el-checkbox>
          全选
        </div>
        <div class="dell">
          <el-button
            icon="el-icon-delete"
            @click="dellData"
            size="mini"
            type="danger"
            class="defall"
            >删除</el-button
          >
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 80, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allData"
      >
      </el-pagination>
    </div>
    <div class="mask" v-if="isMask">
      <div class="maskbox">
        <div class="num">
          <p class="titel">编号：</p>
          <p class="text">{{ ShowData.id }}</p>
        </div>
        <div class="user">
          <p class="titel">用户名：</p>
          <p class="text">{{ ShowData.user }}</p>
        </div>
        <div class="ip">
          <p class="titel">ip地址：</p>
          <p class="text">{{ sensitive(ShowData.ip) }}</p>
        </div>
        <div class="name">
          <p class="titel">请求网站：</p>
          <p class="text">{{ ShowData.name }}</p>
        </div>
        <div class="ms">
          <p class="titel">用时：</p>
          <p class="text">{{ ShowData.ms }}</p>
        </div>
        <div class="time">
          <p class="titel">时间：</p>
          <p class="text">{{ ShowData.time }}</p>
        </div>
        <div class="city">
          <p class="titel">城市：</p>
          <p class="text">{{ ShowData.city }}</p>
        </div>
        <div class="mobile">
          <p class="titel">设备：</p>
          <p class="text">{{ ShowData.mobile }}</p>
        </div>
        <div class="num">
          <p class="titel">访问次数：</p>
          <p class="text">{{ ShowData.num }}</p>
        </div>
        <div class="device">
          <p class="titel">设备信息：</p>
          <p class="text">{{ ShowData.device }}</p>
        </div>
        <div class="btn_Warp">
          <el-button size="mini" type="danger" class="defall" @click="heideItem"
            >关闭</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStore } from "@/utils/storage.js";
export default {
  data() {
    return {
      ShowData: {},
      isMask: false,
      index: 4,
      select: "",
      isselect: false,
      currentPage: 1,
      labelPosition: "right",
      allData: 0,
      input2: "",
      value2: "",
      day1: "",
      day2: "",
      size: 20,
      loading: false,
      imgarr: [],
      checkedCities: [],
      isAllCheckbox: false,
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
    };
  },
  created() {
    this.getData();
  },
  watch: {
    checkedCities(x, y) {
      if (x.length !== this.imgarr.length) {
        this.isAllCheckbox = false;
      } else if (x.length === this.imgarr.length) {
        this.isAllCheckbox = true;
      }
    },
  },
  methods: {
    heideItem() {
      this.isMask = false;
      this.ShowData = {};
    },
    ShowItem(item) {
      this.ShowData = item;
      this.isMask = true;
      // console.log(item);
    },
    sensitive(str) {
      let oldStr = str.split(".");
      let str1 = oldStr[1].replace(/[\s\S]/gi, "*");
      let str2 = oldStr[2].replace(/[\s\S]/gi, "*");
      const newStr = [oldStr[0], str1, str2, oldStr[3]].join("·");
      return newStr;
    },
    defallGetData() {
      this.day1 = "";
      this.day2 = "";
      this.input2 = "";
      this.select = "";
      this.getData();
    },
    handelsort(index) {
      this.index = index;
      this.getData();
    },
    //列表项复选框变化触发
    changeAllDataArr(e) {},
    //删除
    async dellData() {
      if (Number(getStore("dell")) === 1) {
        if (this.checkedCities.length === 0) {
          this.$Message.error("请选择你要删除的数据");
          return;
        }
        this.loading = true;
        const res = await this.$http.post("/api/dellvisitList", {
          arr: this.checkedCities,
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
    //全选
    handleCheckAllChange(val) {
      if (val === false) {
        this.checkedCities = [];
      } else {
        this.checkedCities = [];
        this.imgarr.forEach((element) => {
          this.checkedCities.push(element.id);
        });
      }
    },
    //执行搜索
    handelsearch() {
      if (this.select === "") {
        this.isselect = true;
        this.$Message.error("请选择查询的类型");
        return;
      }
      if (this.input2 === "") {
        this.$Message.error("请输入查询的内容");
        return;
      }
      this.day1 = "";
      this.day2 = "";
      this.value2 = [];
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
      this.input2 = "";
      this.select = "";
      this.getData();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    async getData() {
      this.loading = true;
      const res = await this.$http.post("/api/getvisitList", {
        value: this.input2,
        size: this.size,
        page: this.currentPage,
        day1: this.day1,
        day2: this.day2,
        select: this.select,
        index: this.index || 4,
      });
      if (res.data.success === true) {
        this.imgarr = res.data.data;
        this.allData = res.data.maxData;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .maskbox {
    width: 500px;
    background-color: #fff;
    padding: 20px 20px;
    border-radius: 4px;
    .btn_Warp{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
    }
    .user,
    .ip,
    .name,
    .ms,
    .time,
    .city,
    .mobile,
    .num,
    .device,
    .num {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
      font-size: 15px;
      .titel {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .text {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        white-space: normal;
        word-break: break-all;
      }
    }
  }
}
.select-warp {
  width: 120px;
}
.select_warp_active {
  background-color: rgba($color: #fc0000, $alpha: 0.5);
  border-radius: 2px;
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
  z-index: 10;
}
.content {
  width: 100%;
  // height: 760px;
  // margin-top: 20px;
  .content-warp {
  }
  .time {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .time-list-titel {
      display: flex;
      width: 100%;
      background-color: #409eff;
      color: #fff;
      .time-list-titel-checkbox {
        width: 100px;
      }
      .time-list-titel-nuber,
      .time-list-titel-ms,
      .time-list-titel-num {
        width: 100px;
      }
      .time-list-titel-name,
      .time-list-titel-ip,
      .time-list-titel-time {
        flex: 1;
      }
      .time-list-titel-time,
      .time-list-titel-nuber,
      .time-list-titel-num {
        display: flex;
        .icon {
          display: flex;
          flex-direction: column;
          padding: 2px 0;
          margin: 0 10px;
        }
      }
      .time-list-titel-address,
      .time-list-titel-city {
        width: 150px;
      }

      div + div {
        //   border-left: 1px solid $xt;
      }
      div {
        // flex: 1;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        //   border-bottom: 1px solid $xt;
      }
    }
    .time-desc {
      background-color: $head-bg;
      color: $cf;
      padding: 5px 5px;
    }
    .time-list {
      border: 1px solid $xt;
      border-top: none;
      border-bottom: none;
      .time-list-item {
        display: flex;
        .time-list-titel-checkbox {
          width: 100px;
        }
        .time-list-titel-nuber,
        .time-list-titel-ms,
        .time-list-titel-num {
          width: 100px;
        }
        .time-list-titel-name,
        .time-list-titel-ip,
        .time-list-titel-time {
          flex: 1;
          .laer{
            display: inline-block ;
            width: 100px;
            text-align: center;
          }
        }
        .time-list-titel-address,
        .time-list-titel-city {
          width: 150px;
        }
        .desc + .desc {
          border-left: 1px solid $xt;
          // border-bottom: 1px solid $xt;
        }
        .desc {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid $xt;
        }
      }
    }
  }
}
/* 滚动条 */
.warp::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.warp::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.warp::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.warp::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.warp::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.warp {
  padding: 2%;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .defall {
      margin-right: 30px;
    }
    .top-left {
      flex: 1;
      margin-right: 40px;
    }
    .top-right {
    }
  }
  .bottom {
    width: 95%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .contenner-bouttom-left {
      display: flex;
      align-items: center;
      margin-left: 40px;
      .dell {
        margin-left: 40px;
      }
    }
  }
}
</style>
