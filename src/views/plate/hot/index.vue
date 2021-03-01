<template>
  <div class="hoot_warp">
    <div class="hto_titel">
      <samp class="iconfont icon" v-html="icon"></samp>{{ titel }}
    </div>
    <div class="hot_item_warp">
      <div class="hot_item" v-for="(item, index) in data" :key="index">
        <p class="class_titel">板块名称: {{ item.activity }}</p>
        <p class="class_desc">板块说明: {{ item.activity_ative }}</p>
        <p class="class_sort">板块权重：{{ item.sort }}</p>
        <p
          class="class_sort"
          style="width: 200px; height: 140px; margintop: 8px"
          v-show="item.type === 2"
        >
          板块图片：<img
            v-lazy="item.hot_img"
            style="width: 200px; height: 140px; margintop: 8px"
            alt=""
          />
        </p>
        <p style="text-align: center">板块分类</p>
        <div class="class_arr_warp">
          <el-tooltip
            effect="dark"
            content="点击修改"
            placement="top"
            v-for="(o, j) in item.listArr"
            :key="j"
          >
            <div class="class_arr" @click="modify(item)">
              <!-- <div class="arr_link">{{ o.hot_link }}</div> -->
              <div class="arr_name">
                <p class="ellipsis">分类名称：{{ o.spu_title }}</p>
              </div>
              <img v-lazy="o.list[0].img_url1" alt="" class="img" />
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="add_item flex" @click="addItem">
        <i class="el-icon-plus"></i>点击添加
      </div>
    </div>
    <div class="mask" v-show="isMask">
      <div class="mask_warp">
        <div class="titel">修改板块信息</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="addData">
          <el-form-item label="板块编号">
            <el-input v-model="addData.hot_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="板块名称">
            <el-input v-model="addData.activity"></el-input>
          </el-form-item>
          <el-form-item label="板块说明">
            <el-input v-model="addData.activity_ative"></el-input>
          </el-form-item>
          <el-form-item label="板块图片">
            <el-input v-model="addData.hot_img"></el-input>
          </el-form-item>
          <el-form-item label="板块类型">
            <el-input v-model="addData.type"></el-input>
          </el-form-item>
          <el-form-item label="板块权重">
            <el-input
              v-model="addData.sort"
              @blur="isNuber"
              placeholder="必须是数字"
            ></el-input>
            <p style="color: red" v-show="disebo">必须是数字</p>
          </el-form-item>
          <div class="mask_list_item">
            <div class="mask_titel">
              <p style="width: 100px">选择</p>
              <p class="ittel_list">商品名称</p>
              <p class="ittel_list">商品简介</p>
              <p style="width: 180px">已关联板块编号</p>
            </div>
            <div class="item_warp">
              <el-checkbox-group v-model="list" :max="8">
                <div v-for="(item, index) in supInfo" :key="index" class="checkbox_warp">
                  <div class="item_checkbox">
                    <el-checkbox
                      :label="item.id"
                      :checked="isDefal(item.hot_id)"
                      :disabled="asd(item.hot_id)"
                    ></el-checkbox>
                  </div>
                  <div class="item_name">{{ item.spu_title }}</div>
                  <div class="item_desc">{{ item.spu_sub_title }}</div>
                  <div class="item_hot_id" style="width: 180px">
                    {{ item.hot_id }}
                  </div>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <div class="bntWarp">
            <el-button type="primary" @click="submint">提交</el-button>
            <el-button @click="cancelItem">取消</el-button>
            <el-button @click="dellSubMit" type="danger">删除</el-button>
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
      isMask: false,
      disebo: false,
      isAdd: false,
      list: [],
      supInfo: [],
      addData: {
        activity: "",
        activity_ative: "",
        hot_id: "",
        hot_img: "",
        listArr: [],
        sort: "",
        type: "",
      },
      labelPosition: "right",
    };
  },
  props: {
    data: Array,
    titel: String,
    icon: String,
  },
  methods: {
    //删除热门板块
    dellSubMit() {
      if (this.isAdd === true) {
        this.$Message({
          showClose: true,
          message: "这是添加数据",
          type: "warning",
        });
        return;
      }
      this.$MessageBox("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (Number(getStore("dell")) === 1) {
            const res = await this.$http.post("/api/dellHot", {
              data: this.addData,
            });
            if (res.data.success === true) {
              this.$emit("getData");
              this.isMask = false;
              this.$Message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
              for (let i in this.addData) {
                this.addData[i] = "";
                if (i == "listArr") {
                  this.addData.listArr = [];
                }
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
    //是否默认选中
    isDefal(id) {
      if (!this.isAdd) {
        // 不是添加商品 就是修改 渲染时判断返回的数据 是否和本地有相同的 有相同的就默认选中
        if (id === this.addData.hot_id) {
          return true;
        } else {
          return false;
        }
      }
    },
    // 是否默认不可选
    asd(id) {
      if (this.isAdd) {
        // 是添加板块  渲染数据是 判断是否已被其他板块选中过 选中过就默认不可选
        if (id !== null) {
          return true;
        } else {
          return false;
        }
      }
    },
    //点击显示修改界面(添加修改同一个界面，数据不同)
    modify(item) {
      //将数据深拷贝后 赋予 绑定的this.addData
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.addData = data;
      this.isAdd = false;
      this.getSupList();
      this.isMask = true;
    },
    submint() {
      if (
        this.addData.sort == "" &&
        this.addData.activity == "" &&
        this.addData.activity_ative == ""
      ) {
        this.$Message.error("请添加数据");
        return;
      }
      if (Number(getStore("dell")) !== 1) {
        this.$Message.error("您没有修改删除权限");
        return;
      }
      if (this.isAdd) {
        this.list.forEach((item, index) => {
          this.supInfo.forEach((o, j) => {
            if (item === o.id) {
              this.addData.listArr.push(o);
            }
          });
        });
        this.submintInfo({
          isAdd: this.isAdd,
          data: this.addData,
        });
      } else {
        this.addData.listArr = [];
        this.list.forEach((item, index) => {
          this.supInfo.forEach((o, j) => {
            if (item === o.id) {
              this.addData.listArr.push(o);
            }
          });
        });
        this.submintInfo({
          isAdd: this.isAdd,
          data: this.addData,
        });
      }
    },
    async submintInfo({ isAdd, data }) {
      const res = await this.$http.post("/api/addHotList", {
        isAdd,
        data,
      });
      if (res.data.success === true) {
        this.$emit("getData");
        this.isMask = false;
        this.$Message({
          showClose: true,
          message: "提交成功",
          type: "success",
        });
      }
    },
    addItem() {
      this.getListId();
      this.getSupList();
      this.isAdd = true;
      if (this.data.length !== 0) {
        this.addData.type = this.data[0].type;
      }
      this.isMask = true;
    },
    cancelItem() {
      for (let i in this.addData) {
        this.addData[i] = "";
        if (i == "listArr") {
          this.addData.listArr = [];
        }
      }
      this.list = [];
      this.isMask = false;
    },
    async getListId() {
      const res = await this.$http.get("/api/classId");
      if (res.data.success === true) {
        this.addData.hot_id = res.data.data + 1;
      }
    },
    async getSupList() {
      this.supInfo = [];
      const res = await this.$http.post("/api/getSupList", {});
      if (res.data.code === 200) {
        this.supInfo = res.data.data;
      }
    },
    isNuber() {
      if (isNaN(this.addData.sort)) {
        this.disebo = true;
        this.addData.sort = "";
      } else {
        this.disebo = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.checkbox_warp {
  display: flex;
  border-bottom: 1px solid $xt;
  padding: 10px;
  .item_checkbox {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item_name,
  .item_desc {
    flex: 1;
    padding: 0 5px;
  }
  div {
    // flex: 1;
    text-align: center;
  }
}
.mask_list_item {
  width: 100%;
  overflow: hidden;
  .item_warp {
    width: 100%;
    height: 300px;
    // max-height: 300px;
    overflow: auto;
    border: solid 1px $xt;
    border-top: none;
    border-radius: 0 0 4px 4px;
  }
  .mask_titel {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: $ee;
    border-radius: 4px 4px 0 0;
    .ittel_list {
      flex: 1;
      text-align: center;
    }
    p {
      text-align: center;
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  .mask_warp {
    width: 800px;
    background-color: $cf;
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
    .bntWarp {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
    .titel {
      text-align: center;
      font-size: 22px;
      padding: 10px 0;
    }
  }
}
.hoot_warp {
  width: 100%;
  .hto_titel {
    margin-top: 30px;
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: bold;
    padding-left: 20px;
    cursor: pointer;
    .icon {
      font-size: 22px;
      color: rgb(64, 158, 255);
    }
  }
  .hot_item_warp:hover .class_mask {
    display: block;
    border-color: rgb(64, 158, 255);
  }

  .hot_item_warp {
    display: flex;
    flex-wrap: wrap;
    .class_arr_warp {
      display: flex;
      width: 970px;
      align-items: center;
      // justify-content: start;
      flex-wrap: wrap;
      margin-top: 20px;
      .class_arr {
        display: flex;
        align-items: center;
        flex-direction: column;
        border: 1px solid $xt;
        border-radius: 4px;
        margin: 20px 10px 0;
        padding: 10px;
        p {
          width: 200px;
          text-align: center;
        }
        .img {
          width: 60px;
          height: 60px;
          margin-top: 10px;
        }
      }
    }
    p {
      height: 30px;
      line-height: 30px;
    }
    .class_item:hover {
      border-color: rgb(64, 158, 255);
    }
    .add_item {
      width: 274px;
      border: solid 1px $xt;
      border-radius: 4px;
      padding: 10px;
      margin: 5px 10px;
      cursor: pointer;
      transition: all 0.5s;
      font-size: 16px;
      background-color: $cf;
      box-shadow: 0px 0px 4px 1px rgba(18, 18, 3, 0.05);
    }
    .add_item:hover {
      border-color: rgb(64, 158, 255);
    }
    .hot_item:hover {
      border-color: rgb(64, 158, 255);
    }
    .hot_item {
      margin: 5px 10px;
      border: solid 1px $xt;
      padding: 10px;
      border-radius: 4px;
      transition: all 0.5s;
      cursor: pointer;
      position: relative;
      background-color: $cf;
      box-shadow: 0px 0px 4px 1px rgba(18, 18, 3, 0.05);
    }
  }
}
</style>
