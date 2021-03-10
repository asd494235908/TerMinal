<template>
  <div
    class="addGoodList"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="top">
      <el-button
        icon="el-icon-refresh-right"
        @click="delfallgood"
        type="primary"
        class="defall"
        >恢复默认</el-button
      >
      <div class="top-left">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handesearch"></el-button>
        </el-input>
      </div>

      <!-- <div class="top-right">
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
      </div> -->
    </div>
    <div class="addGoodList_titel">
      <div class="nowprice">
        <div style="width: 50px">编号</div>
        <div class="icon">
          <div class="el-icon-caret-top" @click="handelsort(5)"></div>
          <div class="el-icon-caret-bottom" @click="handelsort(6)"></div>
        </div>
      </div>
      <div style="width: 200px">商品名称</div>
      <div style="width: 100px">商品款式</div>
      <div style="width: 100px" class="nowprice">
        <div style="width: 50px">现价</div>
        <div class="icon">
          <div class="el-icon-caret-top" @click="handelsort(1)"></div>
          <div class="el-icon-caret-bottom" @click="handelsort(2)"></div>
        </div>
      </div>
      <div style="width: 100px" class="nowprice">
        <div style="width: 50px">原价</div>
        <div class="icon">
          <div class="el-icon-caret-top" @click="handelsort(3)"></div>
          <div class="el-icon-caret-bottom" @click="handelsort(4)"></div>
        </div>
      </div>
      <div class="img">详情图</div>
      <div class="size">尺寸</div>
      <div style="width: 200px">操作</div>
    </div>
    <div class="addGoodList_item_box">
      <div class="addGoodList_item" v-for="(item, index) in dataList" :key="index">
        <div class="addGoodList_id">{{ item.spec_id }}</div>
        <div class="addGoodList_name">
          <span class="ellipsis">{{ item.spu_title }}</span>
        </div>
        <div class="addGoodList_pres">
          <span class="ellipsis">{{ item.show_name }}</span>
        </div>
        <div class="addGoodList_price">{{ toNuber(item.price) }}</div>
        <div class="addGoodList_oldprice">{{ toNuber(item.oldprice) }}</div>
        <div class="addGoodList_imglist">
          <img
            @click="handeShouImg(item, index, 0)"
            v-show="item.img_url1 !== null && item.img_url1 !== '' && item.img_url1 !== 'NULL'"
            v-lazy="item.img_url1"
            alt
          />
          <img
            @click="handeShouImg(item, index, 1)"
            v-show="item.img_url2 !== null && item.img_url2 !== '' && item.img_url2 !== 'NULL'"
            v-lazy="item.img_url2"
            alt
          />
          <img
            @click="handeShouImg(item, index, 2)"
            v-show="item.img_url3 !== null && item.img_url3 !== '' && item.img_url3 !== 'NULL'"
            v-lazy="item.img_url3"
            alt
          />
          <img
            @click="handeShouImg(item, index, 3)"
            v-show="item.img_url4 !== null && item.img_url4 !== ''&& item.img_url4 !== 'NULL'"
            v-lazy="item.img_url4"
            alt
          />
          <img
            @click="handeShouImg(item, index, 4)"
            v-show="item.img_url5 !== null && item.img_url5 !== ''&& item.img_url5 !== 'NULL'"
            v-lazy="item.img_url5"
            alt
          />
        </div>
        <div class="addGoodList_size">
          <el-tooltip
            effect="dark"
            content="点击修改"
            placement="bottom"
            class="item"
            v-for="(o, j) in item.size"
            :key="j"
          >
            <el-button size="mini" @click="handelSize(o, item.size)">{{
              o.size
            }}</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="点击添加" class="item" placement="bottom">
            <el-button size="mini" @click="handelListMskAdd(item)">添加</el-button>
          </el-tooltip>
        </div>
        <div class="addGoodList_but">
          <el-button size="mini" type="primary" @click="DellItem(item)">修改</el-button>
          <el-button size="mini" type="danger" @click="handelItem(item, index)"
            >删除</el-button
          >
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
        <div class="titel">修改商品信息</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="itemMaskArr">
          <el-form-item label="编号">
            <el-input v-model="itemMaskArr.spec_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="itemMaskArr.spu_title"></el-input>
          </el-form-item>
          <el-form-item label="商品款式">
            <el-input v-model="itemMaskArr.show_name"></el-input>
          </el-form-item>
          <el-form-item label="商品现价">
            <el-input v-model="itemMaskArr.price"></el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="itemMaskArr.oldprice"></el-input>
          </el-form-item>
          <el-form-item label="商品图片2">
            <el-input v-model="itemMaskArr.img_url1"></el-input>
          </el-form-item>
          <el-form-item label="商品图片3">
            <el-input v-model="itemMaskArr.img_url2"></el-input>
          </el-form-item>
          <el-form-item label="商品图片4">
            <el-input v-model="itemMaskArr.img_url3"></el-input>
          </el-form-item>
          <el-form-item label="商品图片5">
            <el-input v-model="itemMaskArr.img_url4"></el-input>
          </el-form-item>
          <el-form-item label="商品图片6">
            <el-input v-model="itemMaskArr.img_url5"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="danger" @click="submintItem">提交</el-button>
            <el-button @click="dellitideemHide">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="maskAdd" v-show="listMskAdd">
      <div class="mask_box">
        <div class="titel">添加商品尺寸</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="sizeListAdd">
          <el-form-item label="尺寸ID">
            <el-input v-model="sizeListAdd.detal_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="sizeListAdd.price"></el-input>
          </el-form-item>
          <el-form-item label="商品尺寸">
            <el-input v-model="sizeListAdd.size"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-input v-model="sizeListAdd.img"></el-input>
          </el-form-item>
          <div class="listWarp">
            <el-tooltip
              effect="dark"
              content="点击删除"
              placement="top"
              v-for="(item, index) in sizeListAddArr"
              :key="index"
            >
              <el-button size="mini" @click="delSizeList(index)">{{
                item.size
              }}</el-button>
            </el-tooltip>
          </div>
          <div class="bntWarp">
            <el-button type="primary" @click="handelListMskAddSucsass">完成</el-button>
            <el-button @click="delListMaskAdd">取消</el-button>
            <el-button type="danger" @click="handelListMskAddSubmit">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mask" v-show="listMask">
      <div class="mask_box">
        <div class="titel">修改商品尺寸</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="sizeList">
          <el-form-item label="尺寸ID">
            <el-input v-model="sizeList.detal_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="sizeList.price"></el-input>
          </el-form-item>
          <el-form-item label="商品尺寸">
            <el-input v-model="sizeList.size"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-input v-model="sizeList.img"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="handelDeTalList">提交</el-button>
            <el-button @click="delListMask">取消</el-button>
            <el-button type="danger" @click="handelDell">删除</el-button>
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
export default {
  data() {
    return {
      loading: false,
      input: "",
      currentPage: 1,
      allData: 0,
      size: 20,
      img_Index: 0,
      imgMask: false,
      img_list: [],
      id: 0,
      detalId: 0,
      dataList: null,
      listMask: false,
      listMskAdd: false,
      itemMask: false,
      labelPosition: "right",
      sizeListAddArr: [],
      sizeLngth: null,
      itemMaskArr: {
        id: "",
        spec_id: "",
        spu_title: "",
        show_name: "",
        price: "",
        oldprice: "",
        img_url1: "",
        img_url2: "",
        img_url3: "",
        img_url4: "",
        img_url5: "",
      },
      sizeListAdd: {
        detal_id: "",
        price: "",
        size: "",
        img: "",
      },
      sizeList: {
        id: "",
        detal_id: "",
        price: "",
        size: "",
        img: "",
      },
    };
  },
  created() {
    this.getData();
  },
  components: {
    MyImg,
  },
  computed: {},
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
    //显示图片
    handeShouImg(item, index, j) {
    console.log(item)
      this.img_Index = j;
      let arr = [];
      for (const i in item) {
        if (i.indexOf("img_url") !== -1 && item[i] !== null) {
          arr.push(item[i]);
        }
      }
      this.img_list = arr;
      this.imgMask = true;
    },
    //关闭图片
    close() {
      this.imgMask = false;
    },
    async handelItem(item, index) {
      if (Number(getStore("dell")) === 1) {
        let lastItem = true;
        let data = this.dataList;
        data = JSON.stringify(data);
        data = JSON.parse(data);
        data.splice(index, 1);
        data.forEach((element) => {
          if (element.spec_id === item.spec_id) {
            lastItem = false;
          }
        });
        const res = await this.$http.post("/api/dellItem", {
          lastItem,
          data: item,
        });
        if (res.data.success === true) {
          this.getData();
          this.$Message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
        }
      } else {
        this.$Message.error("您没有权限删除");
      }
    },
    //根据价格排序
    handelsort(index) {
      this.getData(index);
    },
    // 提交表单 修改商品信息表单
    async submintItem() {
      const dell = Number(getStore("dell"));
      if (dell === 1) {
        const res = await this.$http.post("/api/modifyItem", {
          data: this.itemMaskArr,
        });
        if (res.data.success === true) {
          this.getData();
          this.$Message({
            showClose: true,
            message: "提交成功",
            type: "success",
          });
          this.itemMask = false;
        }
      } else {
        this.$Message.error("对不起，您没有修改权限");
      }
    },
    //隐藏修改商品的界面
    dellitideemHide() {
      this.itemMask = false;
    },
    // 显示修改每个商品
    DellItem(item) {
      for (let i in item) {
        for (let k in this.itemMaskArr) {
          if (i === k) {
            this.itemMaskArr[k] = item[i];
          }
        }
      }
      this.itemMask = true;
    },
    //删除商品尺寸
    async handelDell() {
      const dell = Number(getStore("dell"));
      if (dell === 1) {
        const res = await this.$http.post("/api/operation", {
          type: 1,
          data: {
            sizeLngth: this.sizeLngth,
            sizeList: this.sizeList,
          },
        });
        if (res.data.success === true) {
          this.getData();
          this.$Message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });
          this.listMask = false;
        }
      } else {
        this.$Message.error("对不起，您没有删除权限");
      }
    },
    // 提交提交修改商品尺寸
    async handelDeTalList() {
      const dell = Number(getStore("dell"));
      if (dell === 1) {
        const res = await this.$http.post("/api/operation", {
          //type =  0 的是修改  等于1 的是删除 如果是删除data因该提交对象，告诉服务器是不是删除的是最后一个，
          type: 0,
          data: this.sizeList,
        });
        if (res.data.success === true) {
          this.getData();
          this.$Message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.listMask = false;
        } else {
          this.$Message.error("修改失败");
        }
      } else {
        this.$Message.error("对不起，您没有修改权限");
      }
    },
    delSizeList(index) {
      this.sizeListAddArr.splice(index, 1);
      this.$Message({
        showClose: true,
        message: "删除成功",
        type: "success",
      });
    },
    async handelListMskAddSubmit() {
      if (this.sizeListAddArr.length === 0) {
        this.$Message.error("请添加商品尺寸");
      } else {
        if (Number(getStore("dell")) === 1) {
          const res = await this.$http.post("/api/addSupDetal", {
            id: this.id,
            detalId: this.detalId,
            dataDtal: this.sizeListAddArr,
          });
          if (res.data.success === true) {
            this.getData();
            this.listMskAdd = false;
            this.$Message({
              showClose: true,
              message: "提交成功",
              type: "success",
            });
          }
        } else {
          this.$Message.error("对不起，您没有权限");
        }
      }
    },
    handelListMskAddSucsass() {
      if (this.sizeListAdd.size === "") {
        this.$Message.error("请添加商品尺寸");
      } else {
        let data = this.sizeListAdd;
        data = JSON.stringify(data);
        data = JSON.parse(data);
        this.sizeListAddArr.push(data);
        this.sizeListAdd.price = "";
        this.sizeListAdd.size = "";
        this.sizeListAdd.img = "";
        this.$Message({
          showClose: true,
          message: "添加成功",
          type: "success",
        });
      }
    },
    handelListMskAdd(item) {
      //判断点击的对象是否有size数组 有的话就从本地获取，没有就从服务器上获取
      if (item.size === undefined) {
        this.getDeTalId();
      } else {
        this.sizeListAdd.detal_id = item.size[0].detal_id;
        this.detalId = item.size[0].detal_id;
      }
      this.id = item.id;
      this.listMskAdd = true;
      this.sizeListAddArr = [];
    },
    delListMaskAdd() {
      for (let i in this.sizeListAdd) {
        this.sizeListAdd[i] = "";
      }
      this.sizeListAddArr = [];
      this.listMskAdd = false;
    },
    handelSize(item, size) {
      this.sizeLngth = size.length - 1 == 0 ? true : false;
      for (let i in item) {
        for (let k in this.sizeList) {
          if (i === k) {
            this.sizeList[k] = item[i];
          }
        }
      }
      this.listMask = true;
    },
    delListMask() {
      this.listMask = false;
    },
    toNuber(n) {
      return Number(n).toFixed(2);
    },
    async getDeTalId() {
      const res = await this.$http.get("/api/getdetalid");
      if (res.data.success === true) {
        this.sizeListAdd.detal_id = res.data.data + 1;
        this.detalId = res.data.data + 1;
      }
    },
    async getData(index) {
      this.loading = true;
      const res = await this.$http.post("/api/getGooList", {
        index,
        page: this.currentPage,
        size: this.size,
        value: this.input,
      });
      if (res.data.success === true) {
        this.dataList = res.data.data;
        this.allData = res.data.maxData;
        this.loading = false;
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
.maskAdd {
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
.addGoodList .addGoodList_item {
  width: 100%;
  // height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $xt;
  div {
    width: 130px;
    text-align: center;
    line-height: 80px;
    // height: 80px;
    // border-right: 1px solid $xt;

    // span{
    //     display: inline-block;
    //     width: 140px;
    //     padding: 0 10px;
    //   }
  }
  .addGoodList_but {
    width: 200px;
    // height: 80px;
  }
  .addGoodList_oldprice {
    width: 100px;
  }
  .addGoodList_price {
    width: 100px;
  }
  .addGoodList_pres {
    width: 100px;
  }
  .addGoodList_name {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .addGoodList_hot span {
    display: inline-block;
    width: 140px;
    padding: 0 10px;
  }
  .addGoodList_name span {
    display: inline-block;
    width: 200px;
    padding: 0 10px;
  }
  .addGoodList_size {
    flex: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .item {
      margin: 10px;
    }
  }
  .addGoodList_imglist {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    img {
      width: 65px;
      height: 65px;
      margin: 10px 5px;
      border: 1px solid $xt;
      cursor: pointer;
    }
  }
}
.addGoodList_item > div:nth-child(9) {
  border: none;
}
.addGoodList::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.addGoodList::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.addGoodList::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.addGoodList::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.addGoodList::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.addGoodList {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  overflow: auto;
  .addGoodList_item_box {
    border-left: 1px solid $xt;
    border-right: 1px solid $xt;
  }
  .addGoodList_titel {
    width: 100%;
    height: 40px;
    background-color: rgb(64, 158, 255);
    display: flex;
    align-items: center;

    div {
      width: 130px;
      text-align: center;
      color: $cf;
      cursor: pointer;
    }
    .img {
      flex: 1;
    }
    .size {
      flex: 1;
    }
  }
}
.nowprice {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    width: 14px !important;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .el-icon-caret-top,
    .el-icon-caret-bottom {
      width: 50%;
    }
  }
}
</style>
