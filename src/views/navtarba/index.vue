<template>
  <div class="nav_warp">
    <div class="nav_warp_titel">导航条管理</div>
    <nav-list
      v-for="(item, index) in data"
      :key="index"
      :data="item"
      @getData="getNavData"
      @modifyData="modifyDataTion"
    ></nav-list>
    <div class="add_nav">
      <el-tooltip effect="dark" content="点击添加" placement="bottom">
        <i class="el-icon-plus" @click="addNav">添加板块</i>
      </el-tooltip>
    </div>

    <div class="mask" v-show="isMask">
      <div class="maskbox">
        <div class="maskbox_titel" v-show="isListAdd == true">添加详情</div>
        <div class="maskbox_titel" v-show="isListAdd == false">修改详情</div>
        <el-form :label-position="labelPosition" label-width="80px" :model="nav"
          ><el-form-item label="板块编号">
            <el-input v-model="nav.nav_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="板块名称">
            <el-input v-model="nav.name"></el-input>
          </el-form-item>
          <el-form-item label="板块图片">
            <el-input v-model="nav.img"></el-input>
          </el-form-item>
          <el-form-item label="板块参数">
            <el-input v-model="nav.nav_link"></el-input>
          </el-form-item>

          <div class="bntWarp">
            <el-button type="primary" @click="submit">完成</el-button>
            <el-button @click="clerNav">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import NavList from "@/views/navtarba/navlist";
import { getStore } from "@/utils/storage.js";
export default {
  data() {
    return {
      data: [],
      isMask: false,
      isListAdd: false,
      labelPosition: "right",
      nav: {
        id: "",
        img: "",
        list: [],
        name: "",
        nav_id: "",
        nav_link: "",
      },
    };
  },
  components: {
    NavList,
  },
  created() {
    this.getNavData();
  },
  methods: {
    async submit() {
      if (
        this.nav.nav_id === "" &&
        this.nav.name === "" &&
        this.nav.img === "" &&
        this.nav.nav_link === ""
      ) {
        this.$Message.error("请添加完整的数据");
        return;
      }
      if (Number(getStore("dell")) === 1) {
        const res = await this.$http.post("/api/addNav", {
          isListAdd: this.isListAdd,
          data: this.nav,
        });
        if (res.data.success === true) {
          this.isMask = false;
          this.clerlist();
          this.getNavData();
          this.$Message({
            showClose: true,
            message: "提交成功",
            type: "success",
          });
        } else {
          this.$Message.error("提交失败");
        }
      } else {
        this.$Message.error("您没有修改删除权限");
      }
    },
    modifyDataTion(data) {
      let arr = data;
      arr = JSON.stringify(arr);
      arr = JSON.parse(arr);
      this.nav = arr;
      this.isListAdd = false;
      this.isMask = true;
    },
    addNav() {
      this.getNavId();
      this.isListAdd = true;
      this.isMask = true;
    },
    clerNav() {
      this.isMask = false;
      this.clerlist();
    },
    async getNavId() {
      const res = await this.$http.get("/api/getNavId");
      if (res.data.success === true) {
        this.nav.nav_id = res.data.nav_id + 1;
      }
    },
    async getNavData() {
      try {
        const res = await this.$http.get("/api/navData");
        if (res.data.success === true) {
          this.data = res.data.data;
        }
      } catch (error) {
      }
    },
    clerlist() {
      for (const key in this.nav) {
        this.nav[key] = "";
        if (key === "list") {
          this.nav[key] = [];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.nav_warp_titel::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.nav_warp_titel::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.nav_warp_titel::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.nav_warp_titel::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.nav_warp_titel::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.nav_warp_titel{
  font-size: 22px;
  padding: 10px 20px;
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
.nav_warp {
  width: 100%;
  height: 100%;
  overflow: auto;
  .add_nav:hover {
    border-color: rgb(64, 158, 255);
  }
  .add_nav {
    width: 90%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    border: 1px solid $xt;
    border-radius: 4px;
    transition: all 0.5s;
    background-color: $cf;
    box-shadow: 0px 0px 4px 1px rgba(18, 18, 3, 0.05);
    .el-icon-plus {
      cursor: pointer;
    }
  }
}
</style>