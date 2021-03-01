<template>
  <div class="swiper_warp">
    <div class="titel"><i class="iconfont icon">&#xe677;</i>轮播图管理</div>
    <div class="img_warp">
      <el-tooltip
        effect="dark"
        content="点击修改"
        placement="bottom"
        v-for="(item, index) in imgList"
        :key="index"
      >
        <div class="img_item" @click="isMaskShow(item)">
          <p class="img_sort">板块权重: {{ item.sort }}</p>
          <img v-lazy="item.img_url" :alt="item.alt" class="img" />
        </div>
      </el-tooltip>

      <div class="img_item flex add_item" @click="addItem">
        <i class="el-icon-plus"></i>点击添加
      </div>
    </div>
    <div class="mask" v-show="isMask">
      <div class="maskbox">
        <div class="maskbox_titel">轮播图修改</div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="list"
          ><el-form-item label="轮播编号">
            <el-input v-model="list.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="图片地址">
            <el-input v-model="list.img_url"></el-input>
          </el-form-item>
          <el-form-item label="图片说明">
            <el-input v-model="list.alt"></el-input>
          </el-form-item>
          <el-form-item label="图片链接">
            <el-input v-model="list.link"></el-input>
          </el-form-item>
          <el-form-item label="图片权重">
            <el-input
              v-model="list.sort"
              placeholder="必须是数字"
              @blur="isNuber"
            ></el-input>
            <p style="color: red" v-show="disebo">必须是数字</p>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="submint">完成</el-button>
            <el-button @click="isMaskHide">取消</el-button>
            <el-button type="danger" @click="dellSubmint" v-show="dellBtn"
              >删除</el-button
            >
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
      disebo: false,
      isMask: false,
      labelPosition: "right",
      isadd: false,
      dellBtn: true,
      imgList: [],
      list: {
        alt: "",
        id: "",
        link: "",
        img_url: "",
        sort: "",
      },
    };
  },
  created() {
    this.getSwiper();
  },
  methods: {
    async dellSubmint() {
      if (this.list.sort == "" && this.list.img_url == "") {
        this.$Message.error("请添加数据");
        return;
      }
      this.$MessageBox("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (Number(getStore("dell")) === 1) {
            const res = await this.$http.post("/api/clerSwiper", {
              data: this.list,
            });
            if (res.data.success === true) {
              this.getSwiper();
              this.isMask = false;
              this.$Message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
              for (const i in this.list) {
                this.list[i] = "";
              }
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
    async submint() {
      if (Number(getStore("dell")) === 1) {
        const res = await this.$http.post("/api/dellSwiper", {
          isadd: this.isadd,
          data: this.list,
        });
        if (res.data.success === true) {
          this.getSwiper();
          this.$Message({
            showClose: true,
            message: "提交成功",
            type: "success",
          });
          for (const i in this.list) {
            this.list[i] = "";
          }
          this.isMask = false;
        }
      } else {
        this.$Message.error("您没有修改删除权限");
      }
    },
    addItem() {
      this.isadd = true;
      this.isMask = true;
      this.dellBtn = false;
    },
    isMaskHide() {
      for (const i in this.list) {
        this.list[i] = "";
      }
      this.isMask = false;
    },
    isMaskShow(item) {
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.list = data;
      this.isadd = false;
      this.dellBtn = true;
      this.isMask = true;
    },
    isNuber() {
      if (isNaN(this.list.sort)) {
        this.disebo = true;
        this.list.sort = "";
      }
    },
    async getSwiper() {
      const res = await this.$http.post("/api/getSwiper", {});
      if (res.data.success === true) {
        this.imgList = res.data.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.bntWarp {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
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
  z-index: 999;
  .maskbox_titel {
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
  }
  .maskbox {
    width: 550px;
    background-color: #fff;
    padding: 20px 20px;
    border-radius: 4px;
    .item_list {
      margin: 20px 0;
    }
  }
}
.swiper_warp::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.swiper_warp::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.swiper_warp::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.swiper_warp::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.swiper_warp::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.swiper_warp {
  width: 100%;
  height: 100%;
  overflow: auto;
  .titel {
    font-size: 26px;
    padding-left: 10px;
    margin-top: 20px;
  }
  .icon {
    font-size: 26px;
    color: rgb(64, 158, 255);
  }
}
.img_warp {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px 0;
  .add_item {
    width: 642px;
    height: 329px;
  }
  .add_item:hover {
    border-color: rgb(64, 158, 255);
  }
  .img_item:hover {
    border-color: rgb(64, 158, 255);
  }
  .img_item {
    margin-bottom: 30px;
    border: solid 1px $xt;
    padding: 20px;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    background-color: $cf;
    box-shadow: 0px 0px 4px 1px rgba(18, 18, 3, 0.05);
    .img_sort {
      font-size: 16px;
      margin-bottom: 10px;
      text-align: center;
    }
  }
  .img {
    width: 600px;
    height: 250px;
  }
}
</style>