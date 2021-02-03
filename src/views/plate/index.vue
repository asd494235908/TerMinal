<template>
  <div class="warp">
    <class :data="classData" @getData="listGetData"></class>
    <hot :data="hotData" @getData="listGetData" :titel="'热门商品板块管理'" :icon="'&#xe61b;'"></hot>
    <hot :data="detailData" @getData="listGetData" :titel="'详情分类组件管理'" :icon="'&#xe676;'"></hot>
    <!-- <de-tails :data="detailData"></de-tails> -->
  </div>
</template>

<script>
import Class from '@/views/plate/class'
import Hot from '@/views/plate/hot'
// import DeTails from '@/views/plate/details'
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    this.getData()
  },
  computed: {
    classData() {
      let arr = []
      this.data.forEach(item=>{
        if(item.type === 0){
          arr.push(item)
        }
      })
      return arr
    },
    hotData() {
      let arr = []
      this.data.forEach(item=>{
        if(item.type === 1){
          arr.push(item)
        }
      })
      return arr
    },
    detailData() {
      let arr = []
      this.data.forEach(item=>{
        if(item.type === 2){
          arr.push(item)
        }
      })
      return arr
    }
  },
  components: {
    Class,
    Hot,
  },
  methods: {
    listGetData(){
      this.getData()
    },
    async getData() {
      const res = await this.$http.post("/api/plate", {});
      if(res.data.code === 200){
        this.data = res.data.data
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
.warp{
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>