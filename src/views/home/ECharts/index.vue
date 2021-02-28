<template>
  <div class="mian_warp">
    <div ref="main" class="mian"></div>
    <div class="tiem">
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
</template>

<script>
var domEle;
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  props: {
    date: {
      type: Array,
    },
    pirce: {
      type: Array,
    },
  },
  data() {
    let _this = this;
    return {
      value2: "",
      day1: "",
      day2: "",
      text: "近期收入",
      myChart: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 8);
              picker.$emit("pick", [start, end]);
              _this.text = "最近一周";
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
              _this.text = "最近一个月";
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
              _this.text = "最近三个月";
            },
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
              _this.text = "最近一年";
            },
          },
        ],
      },
      val: {
        title: {
          text: "近期收入",
          padding: [0, 0, 10, 100],
        },
        tooltip: {},
        color: ["#c23531", "#2f4554", "#61a0a8"],
        xAxis: {
          type: "category",
          name: "月份",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0)",
            },
            barCategoryGap: "30%",
            itemStyle: {
              borderRadius: [7, 7, 0, 0],
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    date(newVal, oldVal) {
      this.val.xAxis.data = newVal;
      this.val.series[0].data = this.pirce;
      this.init();
    },
  },
  methods: {
    fadata(e) {
      // console.log(e);
    },
    currntData(e) {
      e.forEach((element, index) => {
        if (index === 0) {
          this.day1 = element;
        } else if (index === 1) {
          this.day2 = element;
        }
      });
      this.val.title.text = this.text;
      this.getData();
    },
    async getData() {
      const res = await this.$http.post("/api/priceData", {
        day1: this.day1,
        day2: this.day2,
      });
      if (res.data.success === true) {
        this.val.xAxis.data = res.data.date;
        this.val.series[0].data = res.data.priec;
        this.val.title.text = this.text;
        this.init();
      } else {
        this.$Message.error("获取数据失败");
      }
    },
    init() {
      this.$nextTick(() => {
        if (this.myChart != null && this.myChart != "" && this.myChart != undefined) {
          this.myChart.dispose();
        }
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.$refs.main);
        // 绘制图表
        this.myChart.setOption(this.val, true);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.mian_warp {
  width: 100%;
  height: 400px;
  position: relative;
}
.mian {
  width: 100%;
  height: 100%;
}
.tiem {
  position: absolute;
  top: 0;
  right: 10%;
}
</style>
