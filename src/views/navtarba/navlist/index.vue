<template>
  <div class="list_warp">
    <p class="list_id">板块编号：{{ data.nav_id }}</p>
    <p class="list_name">板块名称：{{ data.name }}</p>
    <p class="list_link">板块参数：{{ data.nav_link }}</p>
    <p class="list_img">板块图片：<img v-lazy="data.img" alt="" class="img" /></p>
    <div class="anction">
      <el-button type="primary" icon="el-icon-edit" @click="modifyData"
        >修改</el-button
      >
      <el-button type="danger" icon="el-icon-delete-solid" @click="dellData"
        >删除</el-button
      >
    </div>
    <div class="list_item_warp">
      <el-tooltip
        effect="dark"
        content="点击修改"
        placement="bottom"
        v-for="(item, index) in data.list"
        :key="index"
        :disabled="disabled"
        class="item_box"
      >
        <div class="img_item" @click.stop="modifyItem(item)">
          <p class="img_sort">
            详情列表名称: <i class="img_sort_list">{{ item.list_name }}</i>
          </p>
          <ul>
            <el-tooltip
              effect="dark"
              content="点击修改"
              placement="left"
              class="list_li flex"
              v-for="(o, j) in item.dtail_list"
              :key="j"
            >
              <li
                class="list_li"
                @click.stop="modifyItemList(o)"
                @mousemove="disabled = true"
                @mouseout="disabled = false"
              >
                {{ o.name }}
              </li></el-tooltip
            >
            <el-tooltip
              effect="dark"
              content="点击添加"
              placement="bottom"
              class="list_li flex"
            >
              <li @click.stop="addNavDetail(item)">
                <i class="el-icon-plus"></i>点击添加
              </li>
            </el-tooltip>
          </ul>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="点击添加"
        placement="bottom"
        class="add_list_item flex"
      >
        <div @click="additem"><i class="el-icon-plus"></i>点击添加1</div>
      </el-tooltip>
    </div>
    <div class="mask" v-show="isMask">
      <div class="maskbox">
        <div class="maskbox_titel" v-show="isListAdd == true">添加详情</div>
        <div class="maskbox_titel" v-show="isListAdd == false">修改详情</div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="list"
          ><el-form-item label="板块编号">
            <el-input v-model="list.nav_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="分类编号">
            <el-input v-model="list.dtail_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="分类名字">
            <el-input v-model="list.list_name"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="submitlist">完成</el-button>
            <el-button @click="clerItem">取消</el-button>
            <el-button
              type="danger"
              v-show="isListAdd == false"
              @click="dellList"
              >删除</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
    <div class="mask_detail" v-show="isMask_detail">
      <div class="maskbox">
        <div class="maskbox_titel" v-show="isListAdd_detail == true">
          添加详情信息
        </div>
        <div class="maskbox_titel" v-show="isListAdd_detail == false">
          修改详情信息
        </div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="list_detail"
          ><el-form-item label="分类编号">
            <el-input
              v-model="list_detail.dtail_id"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类名称">
            <el-input v-model="list_detail.name"></el-input>
          </el-form-item>
          <el-form-item label="分类图标">
            <el-input v-model="list_detail.img"></el-input>
          </el-form-item>
          <el-form-item label="关键词">
            <el-input v-model="list_detail.search"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="submitlistDtail">完成</el-button>
            <el-button @click="clerItemDetail">取消</el-button>
            <el-button
              type="danger"
              v-show="isListAdd_detail == false"
              @click="dellListDetail"
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
      isListAdd: false, //决定是修改，还是添加 详情表
      isListAdd_detail: false, //决定是修改，还是添加 详情表list_dtail
      labelPosition: "right",
      isMask: false,
      isMask_detail: false,
      disabled: false,
      list: {
        dtail_id: "",
        list_name: "",
        nav_id: "",
        dtail_list: [],
        id: "",
      },
      list_detail: {
        dtail_id: "",
        id: "",
        name: "",
        img: "",
        nav_id: "",
        search: "",
      },
    };
  },
  props: {
    data: Object,
  },
  methods: {
    dellData() {
      this.$MessageBox("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (Number(getStore("dell")) === 1) {
            const res = await this.$http.post("/api/dellData", {
              data: this.data,
            });
            if (res.data.success === true) {
              this.$emit("getData");
              this.$Message({
                showClose: true,
                message: "删除成功",
                type: "success",
              });
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
    modifyData() {
      this.$emit("modifyData", this.data);
    },
    addNavDetail(item) {
      this.isListAdd_detail = true;
      this.isMask_detail = true;
      this.list_detail.dtail_id = item.dtail_id;
    },
    clerItemDetail() {
      this.isMask_detail = false;
      for (const key in this.list_detail) {
        this.list_detail[key] = "";
      }
    },
    additem() {
      this.isMask = true;
      this.isListAdd = true;
      this.list.nav_id = this.data.nav_id;
      this.getNavId();
    },
    clerItem() {
      this.isMask = false;
      for (const key in this.list) {
        this.list[key] = "";
        if (key === "dtail_list") {
          this.list[key] = [];
        }
      }
    },
    modifyItem(item) {
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.list = data;
      this.isListAdd = false;
      this.isMask = true;
    },
    modifyItemList(item) {
      let data = item;
      data = JSON.stringify(data);
      data = JSON.parse(data);
      this.list_detail = data;
      this.isListAdd_detail = false;
      this.isMask_detail = true;
    },
    async getNavId() {
      const res = await this.$http.get("/api/getNavId");
      if (res.data.success === true) {
        this.list.dtail_id = res.data.dtail_id + 1;
      }
    },
    async submitlistDtail() {
      if (
        this.list_detail.name === "" &&
        this.list_detail.img === "" &&
        this.list_detail.search === ""
      ) {
        this.$Message.error("请添加完整的数据");
        return;
      }
      if (Number(getStore("dell")) === 1) {
        const res = await this.$http.post("/api/submitlistDtail", {
          isListAdd_detail: this.isListAdd_detail,
          data: this.list_detail,
        });
        if (res.data.success === true) {
          this.isListAdd_detail = false;
          this.$emit("getData");
          this.clerlistDtail();
          this.isMask_detail = false;
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
    async submitlist() {
       if (
        this.list.list_name === ""
      ) {
        this.$Message.error("请添加完整的数据");
        return;
      }
      if (Number(getStore("dell")) === 1) {
        const res = await this.$http.post("/api/submitlist", {
          isListAdd: this.isListAdd,
          data: this.list,
        });
        if (res.data.success === true) {
          this.isMask = false;
          this.$emit("getData");
          this.clerlist();
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
    dellList() {
      this.$MessageBox("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (Number(getStore("dell")) === 1) {
            const res = await this.$http.post("/api/dellList", {
              data: this.list,
            });
            if (res.data.success === true) {
              this.$emit("getData");
              this.isMask = false;
              this.clerlist();
              this.$Message({
                showClose: true,
                message: "提交成功",
                type: "success",
              });
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
    async dellListDetail() {
      this.$MessageBox("此操作将永久删除,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (Number(getStore("dell")) === 1) {
            const res = await this.$http.post("/api/dellListDetail", {
              data: this.list_detail,
            });
            if (res.data.success === true) {
              this.$emit("getData");
              this.isMask_detail = false;
              this.clerlistDtail();
              this.$Message({
                showClose: true,
                message: "提交成功",
                type: "success",
              });
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
    clerlistDtail() {
      for (const key in this.list_detail) {
        this.list_detail[key] = "";
      }
    },
    clerlist() {
      for (const key in this.list) {
        this.list[key] = "";
        if (key === "dtail_list") {
          this.list[key] = [];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.anction:hover {
  border-color: rgb(64, 158, 255);
}
.anction {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 20px;
  border: 1px solid $xt;
  border-radius: 4px;
  transition: all 0.5s;
}
.bntWarp {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mask_detail {
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
.list_item_warp {
  display: flex;
  justify-content: center;
  .add_list_item {
    width: 123px;
    height: 292px;
    border: 1px solid $xt;
    border-radius: 4px;
    margin: 0 10px;
    padding: 10px;
    cursor: pointer;
  }
  .item_box:hover {
    border-color: rgb(64, 158, 255);
  }
  .item_box {
    border: 1px solid $xt;
    border-radius: 4px;
    margin: 0 10px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.5s;
    .img_sort_list {
      font-weight: bold;
      font-size: 14px;
    }
    .list_li {
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid $xt;
      margin: 0 0 10px 0;
      border-radius: 4px;
      transition: all 0.5s;
    }
    .list_li:hover {
      border-color: rgb(64, 158, 255);
    }
  }
}
.list_warp {
  width: 90%;
  overflow: hidden;
  border: 1px solid $xt;
  border-radius: 4px;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  background-color: $cf;
  box-shadow: 0px 0px 4px 1px rgba(18, 18, 3, 0.05);
  p {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .list_img {
    display: flex;
    margin-bottom: 20px;
  }
  .img {
    width: 300px;
    height: 150px;
  }
}
</style>