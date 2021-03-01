<template>
  <div>
    <div class="class_titel_top">
      <span class="iconfont icon">&#xe677;</span>商品分类管理
    </div>
    <div class="class_warp">
      <div class="class_item" v-for="(item, index) in data" :key="index">
        <p class="class_titel">板块名称: {{ item.activity }}</p>
        <p class="class_desc">板块说明: {{ item.activity_ative }}</p>
        <p class="class_sort">板块权重：{{ item.sort }}</p>
        <p style="text-align: center">板块分类</p>
        <div class="class_mask">
          <el-button type="primary" icon="el-icon-edit" @click="ismask(item)"
            >修改</el-button
          >
        </div>
        <div class="class_arr_warp">
          <div class="class_arr" v-for="(o, j) in item.listArr" :key="j">
            <!-- <div class="arr_link">{{ o.hot_link }}</div> -->
            <div class="arr_name">分类名称：{{ o.hot_name }}</div>
            <img v-lazy="o.img" alt="" class="img" />
          </div>
        </div>
      </div>
      <div class="add_item flex" @click="addItem">
        <i class="el-icon-plus"></i>点击添加
      </div>
    </div>
    <div class="mask" v-show="isMask">
      <div class="maskbox">
        <div>分类管理</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="listdetal"
          ><el-form-item label="板块编号">
            <el-input v-model="listdetal.hot_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="板块名称">
            <el-input v-model="listdetal.activity"></el-input>
          </el-form-item>
          <el-form-item label="板块说明">
            <el-input v-model="listdetal.activity_ative"></el-input>
          </el-form-item>
          <el-form-item label="板块权重">
            <el-input
              v-model="listdetal.sort"
              placeholder="必须是数字"
              @blur="isNuber"
            ></el-input>
            <p style="color: red" v-show="disebo">必须是数字</p>
          </el-form-item>

          <div class="item_list">
            <el-tooltip
              effect="dark"
              content="点击修改"
              placement="top"
              class="item"
              v-for="(o, j) in listdetal.listArr"
              :key="j"
            >
              <el-button size="mini" @click="arrListItem(o)">{{ o.hot_name }}</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="点击添加" class="item" placement="top">
              <el-button size="mini" @click="addArrList">添加</el-button>
            </el-tooltip>
          </div>
          <div class="bntWarp">
            <el-button type="primary" @click="submint">完成</el-button>
            <el-button @click="unIsMask">取消</el-button>
            <el-button type="danger" @click="handelDell">删除</el-button>
          </div>
        </el-form>
      </div>
      <div class="mask" v-show="isMasklist">
        <div class="maskbox">
          <el-form :label-position="labelPosition" label-width="80px" :model="maskList">
            <el-form-item label="分类编号">
              <el-input v-model="maskList.hot_id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="分类名称">
              <el-input v-model="maskList.hot_name"></el-input>
            </el-form-item>
            <el-form-item label="分类简介">
              <el-input v-model="maskList.hot_link"></el-input>
            </el-form-item>
            <el-form-item label="分类图片">
              <el-input v-model="maskList.img"></el-input>
            </el-form-item>
            <el-form-item label="分类图标">
              <el-input v-model="maskList.icon"></el-input>
            </el-form-item>
            <div class="bntWarp">
              <el-button type="primary" @click="arrListsub">完成</el-button>
              <el-button @click="arrListHide">取消</el-button>
              <el-button type="danger" @click="arrListdel">删除</el-button>
            </div>
          </el-form>
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
      isMask: false,
      isMasklist: false,
      labelPosition: "right",
      isadd: false,
      isaddList: false,
      disebo: false,
      maskList: {
        hot_id: "",
        hot_name: "",
        hot_link: "",
        hot_img: "",
        id: "",
        icon: "",
      },
      listdetal: {
        listArr: [],
        activity: "",
        activity_ative: "",
        sort: "",
        hot_id: "",
      },
    };
  },
  props: {
    data: Array,
  },
  watch: {
    isadd(a, b) {
      if (a === true) {
        this.getListId();
      }
    },
  },
  methods: {
    isNuber() {
      if (isNaN(this.listdetal.sort)) {
        this.disebo = true;
        this.listdetal.sort = "";
      }
    },
    // 删除板块
    handelDell() {
      if (
        this.listdetal.sort == "" &&
        this.listdetal.activity == "" &&
        this.listdetal.activity_ative == ""
      ) {
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
            const res = await this.$http.post("/api/dellClass", {
              isadd: this.isadd,
              data: this.listdetal,
            });
            if (res.data.success === true) {
              this.$emit("getData");
              this.isMask = false;
              this.$Message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
              for (let i in this.listdetal) {
                this.listdetal[i] = "";
                if (i == "listArr") {
                  this.listdetal.listArr = [];
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
    // 提交板块
    async submint() {
      if (this.listdetal.listArr.length !== 4) {
        this.$Message.error("请添加4个分类");
        return;
      }
      if (Number(getStore("dell")) === 1) {
        const res = await this.$http.post("/api/addClassList", {
          isadd: this.isadd,
          data: this.listdetal,
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
      } else {
        this.$Message.error("您没有修改删除权限");
      }
    },
    addArrList() {
      this.isMasklist = true;
      this.isaddList = true;
      for (let i in this.maskList) {
        this.maskList[i] = "";
        if (this.isadd === true) {
          this.getListId();
        }
      }
    },
    arrListdel() {
      // if (Number(getStore("dell")) == 1) {
      this.listdetal.listArr.forEach((item, index) => {
        if (item.id === this.maskList.id) {
          this.listdetal.listArr.splice(index, 1);
        }
      });
      this.isMasklist = false;
      // } else {
      //   console.log("你没有删除权限");
      // }
    },
    arrListHide() {
      for (let i in this.maskList) {
        this.maskList[i] = "";
      }
      this.isMasklist = false;
    },
    arrListsub() {
      if (this.isaddList === false) {
        this.listdetal.listArr.forEach((item, index) => {
          if (item.id === this.maskList.id) {
            this.listdetal.listArr.splice(index, 1);
            this.listdetal.listArr.splice(index, 0, this.maskList);
          }
        });
      } else {
        let data = this.maskList;
        data = JSON.stringify(data);
        data = JSON.parse(data);
        this.listdetal.listArr.push(data);
      }
      this.isMasklist = false;
    },
    arrListItem(item) {
      this.isMasklist = true;
      this.isaddList = false;
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.maskList = data;
    },
    addItem() {
      this.getListId();
      this.listdetal.type = 0;
      this.isMask = true;
      this.isadd = true;
    },
    ismask(item) {
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.listdetal = data;
      this.isMask = true;
      this.isadd = false;
    },
    unIsMask() {
      this.isMask = false;
      for (let i in this.listdetal) {
        this.listdetal[i] = "";
        if (i == "listArr") {
          this.listdetal.listArr = [];
        }
      }
    },
    async getListId() {
      const res = await this.$http.get("/api/classId");
      if (res.data.success === true) {
        this.listdetal.hot_id = res.data.data + 1;
        this.maskList.hot_id = res.data.data + 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.class_titel_top {
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
.add_item {
  height: 274px;
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
.class_warp {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .class_item:hover {
    border-color: rgb(64, 158, 255);
  }
  .class_item:hover .class_mask {
    display: block;
    border-color: rgb(64, 158, 255);
  }
  .class_item {
    // width: 600px;
    margin: 5px 10px;
    border: solid 1px $xt;
    padding: 10px;
    border-radius: 4px;
    transition: all 0.5s;
    cursor: pointer;
    position: relative;
    background-color: $cf;
    box-shadow: 0px 0px 4px 1px rgba(18, 18, 3, 0.05);
    .class_mask {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 274px;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.05);
    }
    p {
      width: 100%;
      height: 30px;
      line-height: 30px;
    }
    .class_arr_warp {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 20px;
    }
    .class_arr {
      display: flex;
      align-items: center;
      flex-direction: column;
      border: 1px solid $xt;
      border-radius: 4px;
      margin: 0 10px;
      padding: 10px;
      .img {
        width: 60px;
        height: 60px;
        margin-top: 10px;
      }
    }
  }
}
</style>
