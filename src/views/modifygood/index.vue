<template>
  <div
    class="modifygood"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="top">
      <el-button
        icon="el-icon-refresh-right"
        type="primary"
        class="defall"
        @click="delfallgood"
        >恢复默认</el-button
      >
      <div class="top-left">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handesearch"></el-button>
        </el-input>
      </div>
    </div>
    <div class="title">
      <div class="blckid">
        <div class="name">板块编号</div>
        <div class="icon">
          <div class="el-icon-caret-top" @click="handelsort(1)"></div>
          <div class="el-icon-caret-bottom" @click="handelsort(2)"></div>
        </div>
      </div>
      <div class="title_name">商品名称</div>
      <div class="title_desc">商品简介</div>
      <div class="title_price">
        <div class="price">价格</div>
        <div class="icon">
          <div class="el-icon-caret-top" @click="handelsort(3)"></div>
          <div class="el-icon-caret-bottom" @click="handelsort(4)"></div>
        </div>
      </div>
      <div class="title_defal">默认显示</div>
      <div class="title_search">关键词</div>
      <div class="title_dec">操作</div>
    </div>
    <div class="contenner_warp">
      <div class="contenner" v-for="(item, index) in list" :key="index">
        <div class="contenner_blckid">{{ item.spec_id }}</div>
        <div class="contenner_name">
          <span class="text ellipsis">{{ item.spu_title }}</span>
        </div>
        <div class="contenner_desc">
          <span class="text ellipsis">{{ item.spu_sub_title }}</span>
        </div>
        <div class="contenner_price">
          <span class="text ellipsis">{{ numTow(item.price) }}</span>
        </div>
        <div class="contenner_defal">
          <span class="text ellipsis">{{ item.spu_defall_show }}</span>
        </div>
        <div class="contenner_search">
          <el-tooltip
            effect="dark"
            content="点击修改"
            placement="bottom"
            class="item"
            v-for="(o, j) in strArr(item.search)"
            :key="j"
          >
            <el-button size="mini" @click="modifyItme(item, o, j)">{{ o }}</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="点击添加" class="item" placement="bottom">
            <el-button size="mini" @click="addsearch(item)">添加</el-button>
          </el-tooltip>
        </div>
        <div class="contenner_dec">
          <el-button type="primary" size="mini" @click="modiufly(item)">修改</el-button>
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
    <div class="itemMask" v-show="itemMask">
      <div class="mask_box">
        <div class="titel" v-show="isAdd === true">添加搜索关键词</div>
        <div class="titel" v-show="isAdd !== true">修改搜索关键词</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="searchArr">
          <el-form-item label="关键词">
            <el-input v-model="searchArr.val"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="submitsearch">提交</el-button>
            <el-button @click="clersearch">取消</el-button>
            <el-button type="danger" @click="dellitem" v-show="isAdd !== true"
              >删除</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
    <div class="mask" v-show="listMask">
      <div class="mask_box">
        <div class="titel">修改商品信息</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="searchItem">
          <el-form-item label="商品名称">
            <el-input v-model="searchItem.spu_title"></el-input>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input v-model="searchItem.spu_sub_title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="searchItem.price" placeholder="主要用于排序"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="submitItem">提交</el-button>
            <el-button @click="clermodiufiy">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getStore } from "@/utils/storage.js";
export default {
  data() {
    return {
      loading: false,
      input: "",
      currentPage: 1,
      allData: 0,
      size: 20,
      list: [],
      itemMask: false,
      listMask: false,
      labelPosition: "right",
      dellIndex: 0,
      isAdd: false,
      searchArr: {
        val: "",
      },
      searchItem: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //恢复默认
    delfallgood() {
      this.input = "";
      this.getData();
    },
    //搜索
    handesearch() {
      if (this.input === "") {
        this.$Message.error("请输入你想搜索的内容");
        return;
      }
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
    submitItem() {
      this.submiData();
      this.listMask = false;
    },
    modiufly(item) {
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.searchItem = data;
      this.listMask = true;
    },
    clermodiufiy() {
      this.searchItem = {};
      this.listMask = false;
    },
    dellitem() {
      let arr = this.searchItem.search.split("-");
      arr.splice(this.dellIndex, 1);
      this.searchItem.search = arr.join("-");
      this.submiData();
    },
    submitsearch() {
      if (this.searchArr.val === "") {
        this.$Message.error("请添加关键词");
        return;
      }
      if (this.searchItem.search === "" || this.searchItem.search === null) {
        this.searchItem.search = this.searchArr.val;
        this.submiData();
      } else {
        let arr = this.searchItem.search.split("-");
        arr.push(this.searchArr.val);
        if (this.isAdd === false) {
          arr.splice(this.dellIndex, 1);
        }
        this.searchItem.search = arr.join("-");
        this.submiData();
      }
    },
    modifyItme(item, o, j) {
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.searchItem = data;
      this.searchArr.val = o;
      this.dellIndex = j;
      this.isAdd = false;
      this.itemMask = true;
    },
    addsearch(item) {
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.searchItem = data;
      this.isAdd = true;
      this.itemMask = true;
    },
    clersearch() {
      this.itemMask = false;
      for (let i in this.searchArr) {
        this.searchArr[i] = "";
      }
      this.searchItem = {};
    },
    strArr(str) {
      if (str === null || str === "") {
        return [];
      }
      const Arr = str.split("-");
      return Arr;
    },
    numTow(num) {
      return Number(num).toFixed(2);
    },
    async submiData() {
      if (Number(getStore("dell")) === 1) {
        const res = await this.$http.post("/api/submitSup", {
          data: this.searchItem,
        });
        if (res.data.success === true) {
          this.$Message({
            showClose: true,
            message: "提交成功",
            type: "success",
          });
          this.getData();
          this.clersearch();
          this.itemMask = false;
        } else {
           this.$Message.error("添加失败");
        }
      } else {
        this.$Message.error("你没有权限");
        this.itemMask = false;
      }
    },
    handelsort(id) {
      this.getData(id);
    },
    async getData(id) {
      this.loading = true;
      const res = await this.$http.get(
        `/api/modifygood?id=${id}&page=${this.currentPage}&size=${this.size}&value=${this.input}`
      );
      if (res.data.success === true) {
        this.list = res.data.data;
        this.loading = false;
        this.allData = res.data.maxData;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.top {
  margin: 20px 0;
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 60px;
  margin: 30px 0;
}
.mask {
  position: absolute;
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
    width: 500px;
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
.itemMask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  .listWarp {
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .bntWarp {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mask_box {
    width: 800px;
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
.contenner {
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $xt;
  border-left: 1px solid $xt;
  border-right: 1px solid $xt;
  div {
    height: 100%;
  }
  .contenner_dec,
  .contenner_blckid,
  .contenner_name,
  .contenner_desc,
  .contenner_price,
  .contenner_defal {
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-right: 1px solid $xt;
    .text {
      display: inline-block;
      width: 150px;
      text-align: center;
    }
  }
  .contenner_search {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    // border-right: 1px solid $xt;
    .item {
      margin: 10px;
    }
  }
}
.title {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: rgb(64, 158, 255);
  color: $cf;
  div {
    width: 160px;
    text-align: center;
    height: 100%;
    line-height: 40px;
  }
  .title_search {
    flex: 1;
  }
  .blckid,
  .title_price {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      width: 14px !important;
      height: 14px !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .el-icon-caret-top::before,
      .el-icon-caret-bottom::before {
        width: 14px;
        position: relative;
        top: -10px;
        cursor: pointer;
      }
    }
  }
}
.modifygood::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.modifygood::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.modifygood::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.modifygood::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.modifygood::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.modifygood {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  overflow: auto;
}
</style>
