<template>
  <div class="num-box">
    <p>
      <span ref="numberDom">{{ difal }}</span>
    </p>
  </div>
</template>

<script>
// Increasing_Number_End 数字完成时触发的事件
export default {
  data() {
    return {
      difal: 0,
      arr: [],
      timer: null,
    };
  },
  props: {
    //结束时候的数字
    num: {
      type: Number,
      default: 0,
    },
    //延迟速度
    delay: { type: Number, default: 0 },
  },
  mounted() {
    this.arr = this.num.toString().split("");
  },
  mounted() {
    this.init();
  },
  watch: {
    num() {
      this.init();
    },
  },
  methods: {
    init() {
      let time = Math.floor(Math.random() * 10);
      this.timer = setInterval(() => {
        time += 4;
        this.difal = time;
        if ((time / this.num) * 100 >= 100) {
          clearTimeout(this.timer);
          this.difal = this.num;
          this.$emit("Increasing_Number_End");
        }
      }, this.delay);
    },
  },
};
</script>

<style lang="scss" scoped>
.num-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  p {
    flex: 1;
    text-align: center;
    padding: 0 19px;
    display: inline-block;
  }
}
</style>