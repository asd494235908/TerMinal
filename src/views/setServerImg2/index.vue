<template>
  <div
    class="warp"
    ref="setimg"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 1)"
  >
    <div class="top">
      <div class="top-left">
        <!-- //搜索内容 -->
        <el-input placeholder="请输入内容" v-model="input2" class="input-with-select">
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
    <div class="content" ref="imgWarp" v-show="imgarr.length !== 0">
      <div class="content-warp">
        <div class="time" v-for="(item, index) in imgArrList" :key="index">
          <div class="time-desc">上传时间：{{ item.time }}</div>
          <div class="time-list">
            <div class="time-list-titel">
              <div class="time-list-titel-nuber">选择</div>
              <div class="time-list-titel-nuber">编号</div>
              <div class="time-list-titel-img">略图</div>
              <div class="time-list-titel-url">链接</div>
              <div class="time-list-titel-info">备注</div>
              <div class="time-list-titel-operation">操作</div>
            </div>
            <el-checkbox-group v-model="checkedCities" @change="changeAllDataArr">
              <div class="time-list-item" v-for="(o, j) in item.res" :key="j">
                <div class="time-list-item-nuber desc">
                  <el-checkbox :label="o"></el-checkbox>
                </div>
                <div class="time-list-item-nuber desc">
                  {{ o.id }}
                </div>
                <div class="time-list-item-img desc" @click="shouImgs(item.res, j)">
                  <img v-lazy="o.url" class="img" alt />
                </div>
                <div class="time-list-item-url desc">
                  <span class="ellipsis">{{ o.url }}</span>
                  <el-button
                    size="mini"
                    class="copy"
                    type="primary"
                    plain
                    v-clipboard:copy="o.url"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >拷贝</el-button
                  >
                </div>
                <div class="time-list-item-info desc">
                  <span class="text">{{ o.info }}</span>
                  <el-tooltip
                    v-if="o.info === null"
                    effect="dark"
                    content="点击添加"
                    class="item"
                    placement="bottom"
                  >
                    <el-button size="mini" @click="addInfo(o)">添加</el-button>
                  </el-tooltip>
                  <el-tooltip
                    v-if="o.info !== null"
                    effect="dark"
                    content="点击修改"
                    class="item"
                    placement="bottom"
                  >
                    <el-button size="mini" @click="addInfo(o)">修改</el-button>
                  </el-tooltip>
                </div>
                <div class="time-list-item-operation desc">
                  <el-button size="mini" @click="handeldell(o)" type="danger"
                    >删除</el-button
                  >
                </div>
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="none-warp" v-show="imgarr.length === 0">
      <div class="none"></div>
    </div>
    <div class="bottom" v-show="imgarr.length !== 0">
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
    <div class="mask" v-if="mask">
      <div class="mask_box">
        <div class="titel">修改信息</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="info">
          <el-form-item label="图片信息">
            <el-input v-model="info.info" placeholder="请输入信息"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="subinfo">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <my-img
      :img_Index="img_Index"
      :imgMask="imgMask"
      :img_list="img_list"
      @close="close"
    ></my-img>
  </div>
</template>

<script>
import { getStore } from "@/utils/storage.js";
import MyImg from "@/components/ShowImg";
import WaterFallflow from "@/components/Waterfallflow";
export default {
  data() {
    return {
      isAllCheckbox: false,
      checkedCities: [],
      img_Index: 0,
      imgMask: false,
      img_list: [],
      mask: false,
      //isAdd 默认true //添加修改信息，false为删除信息
      isAdd: true,
      currentPage: 1,
      labelPosition: "right",
      allData: 20,
      input2: "",
      value2: "",
      day1: "",
      day2: "",
      size: 20,
      loading: false,
      imgarr: [],
      info: {
        id: null,
        info: null,
        time: "",
        url: "",
      },
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
  components: {
    MyImg,
    WaterFallflow,
  },
  created() {},
  mounted() {
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
  computed: {
    imgArrList() {
      let arr = [];
      this.imgarr.forEach((oldData, i) => {
        let index = -1;
        const time = oldData.time.substring(0, 10);
        const isArr = arr.some((newData, j) => {
          if (oldData.time.substring(0, 10) === newData.time.substring(0, 10)) {
            index = j;
            return true;
          }
        });
        if (!isArr) {
          let res = [];
          res.push(oldData);
          arr.push({ time: oldData.time, res });
        } else {
          arr[index].res.push(oldData);
        }
      });
      return arr;
    },
  },
  methods: {
    needtData() {
      this.currentPage = this.currentPage + 1;
      this.getData();
    },
    loadingStart() {
      this.loading = true;
    },
    loadingStop() {
      this.loading = false;
    },
    asd(x) {
      this.$refs.imgWarp.style.height = x + "px";
    },
    dellData() {
      if (this.checkedCities.length === 0) {
        this.$Message.error("请选择你要删除的数据");
        return;
      }
      this.$MessageBox("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (Number(getStore("dell")) === 1) {
            this.loading = true;
            const res = await this.$http.post("/api/dellImg", {
              arr: this.checkedCities,
            });
            if (res.data.success === true) {
              this.loading = false;
              this.$Message({
                showClose: true,
                message: "提交成功",
                type: "success",
              });
              this.getData();
            } else {
              this.$Message.error("提交失败");
            }
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
        this.checkedCities = [];
        this.imgarr.forEach((element) => {
          this.checkedCities.push(element);
        });
      }
    },
    changeAllDataArr(e) {},
    close() {
      this.img_list = [];
      this.imgMask = false;
    },
    shouImgs(data, j) {
      let arr = [];
      data.forEach((item) => {
        arr.push(item.url);
      });
      this.img_list = arr;
      this.img_Index = j;
      this.imgMask = true;
    },
    //删除
    handeldell(item) {
      this.$MessageBox("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (Number(getStore("dell")) === 1) {
            this.info = item;
            this.isAdd = false;
            this.loading = true;
            this.sublistinfo();
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
    //提交
    async subinfo() {
      if (Number(getStore("dell")) === 1) {
        if (this.info.info === "" || this.info.info === null) {
          this.$Message.error("请输入信息");
          return;
        }
        this.loading = true;
        this.sublistinfo();
      } else {
        this.$Message.error("你没有修改权限");
      }
    },
    async sublistinfo() {
      const res = await this.$http.post("/api/subImg", {
        data: this.info,
        isAdd: this.isAdd,
        arr: this.checkedCities,
      });
      if (res.data.success === true) {
        this.loading = false;
        this.mask = false;
        this.$Message({
          showClose: true,
          message: "提交成功",
          type: "success",
        });
        this.getData();
        this.isAdd = true;
      } else {
        this.$Message.error("提交失败");
      }
    },
    //取消
    cancel() {
      this.mask = false;
      this.info.in = null;
      this.info.url = "";
      this.info.time = "";
      this.info.info = null;
    },
    //添加图片信息
    addInfo(item) {
      this.mask = true;
      let data = JSON.parse(JSON.stringify(item));
      this.info = data;
      this.sublistinfo();
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
    //执行搜索
    handelsearch() {
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
    getImgs(index) {
      let arrs = [];
      let data = JSON.parse(JSON.stringify(this.imgArrList));
      data[index].res.forEach((item) => {
        arrs.push(item.url);
      });
      this.img_list = arrs;
    },
    async getData() {
      this.loading = true;
      const res = await this.$http.post("/api/getimgs", {
        value: this.input2,
        size: this.size,
        page: this.currentPage,
        day1: this.day1,
        day2: this.day2,
        is: 2,
      });
      if (res.data.success === true) {
        // this.imgarr=[]
        this.$nextTick(() => {
          this.imgarr = res.data.data;
          this.allData = res.data.max;
          this.loading = false;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
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
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .bntWarp {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mask_box {
    width: 900px;
    background-color: $cf;
    border-radius: 4px;
    padding: 20px 50px 50px;
    .titel {
      font-size: 18px;
      text-align: center;
      font-weight: bold;
      color: $c6;
      margin-bottom: 30px;
    }
  }
}
.content {
  width: 100%;
  position: relative;
  .box {
    position: absolute;
    .box-img {
      //  padding: 15px 0px 0px 15px;
      .box-img-list {
        display: block;
        width: 400px;
        height: auto;
      }
    }
  }
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
        .time-list-item-nuber {
          width: 80px;
        }
        .time-list-item-img {
          // flex: 1;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .img {
            width: 90px;
            height: 90px;
            padding: 10px;
          }
        }
        .time-list-item-url {
          .ellipsis {
            width: 60%;
          }
          flex: 1;
          .copy {
            margin-left: 20px;
          }
        }
        .time-list-item-info {
          flex: 1;
          .text {
            display: inline-block;
            margin-right: 20px;
          }
        }
        .time-list-item-operation {
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
      .time-list-titel {
        display: flex;
        width: 100%;
        .time-list-titel-nuber {
          width: 80px;
        }
        .time-list-titel-img {
          width: 100px;
        }
        .time-list-titel-url {
          flex: 1;
        }
        .time-list-titel-info {
          flex: 1;
        }
        .time-list-titel-operation {
          width: 150px;
        }

        div + div {
          border-left: 1px solid $xt;
        }
        div {
          // flex: 1;
          height: 30px;
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
      margin-left: 30px;
      .dell {
        margin-left: 40px;
      }
    }
  }
}
</style>
