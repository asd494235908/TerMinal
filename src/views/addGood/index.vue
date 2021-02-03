<template>
  <div class="box">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="编号">
        <el-input v-model="formLabelAlign.spec_id" placeholder="关联id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品名字">
        <el-input v-model="formLabelAlign.spu_title" placeholder="商品名字"></el-input>
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input v-model="formLabelAlign.spu_sub_title" placeholder="商品简介"></el-input>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input v-model="formLabelAlign.spu_sub_title_hover" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="默认显示">
        <el-input v-model="formLabelAlign.spu_defall_show" placeholder="默认显示"></el-input>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="formLabelAlign.search" placeholder="搜索的关键字"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="formLabelAlign.price" placeholder="价格主要用来排序"></el-input>
      </el-form-item>
      <el-form-item label="详情图">
        <el-input v-model="formLabelAlign.imglist" placeholder="详情图"></el-input>
      </el-form-item>
      <div class="list_btn">
        <div
          v-for="(item,index) in list"
          :key="index"
          class="list_btn_item"
          @click="handeDell(item,index)"
          @mouseover="handeIndex(index)"
          @mouseout="handeIndex(-1)"
          :class="{list_btn_item_hover:btnHover === index}"
        >{{item.color}}</div>
        <el-button @click="showMask" :type="danger" icon="el-icon-plus">添加分类</el-button>
      </div>
      <div class="submit_item">
        <el-button @click="submit" type="primary" icon="el-icon-upload2" style="width:160px">提交</el-button>
      </div>
    </el-form>
    <div class="mask" v-show="isMask">
      <div class="maskbox">
        <el-form :label-position="labelPosition" label-width="80px" :model="listdetal">
          <el-form-item label="关联id">
            <el-input v-model="listdetal.spec_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品名字">
            <el-input v-model="listdetal.spu_title" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="款式">
            <el-input v-model="listdetal.color"></el-input>
          </el-form-item>
          <el-form-item label="款式图片">
            <el-input v-model="listdetal.showName"></el-input>
          </el-form-item>
          <el-form-item label="折后价">
            <el-input v-model="listdetal.price"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="listdetal.oldPrice"></el-input>
          </el-form-item>
          <el-form-item label="详情图片1">
            <el-input v-model="listdetal.img1"></el-input>
          </el-form-item>
          <el-form-item label="详情图片2">
            <el-input v-model="listdetal.img2"></el-input>
          </el-form-item>
          <el-form-item label="详情图片3">
            <el-input v-model="listdetal.img3"></el-input>
          </el-form-item>
          <el-form-item label="详情图片4">
            <el-input v-model="listdetal.img4"></el-input>
          </el-form-item>
          <el-form-item label="详情图片5">
            <el-input v-model="listdetal.img5"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="complete">完成</el-button>
            <el-button @click="delMask">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mask_list" v-show="isMask_list">
      <div class="maskbox">
        <el-form :label-position="labelPosition" label-width="80px" :model="listdetal_list">
          <el-form-item label="关联id">
            <el-input v-model="listdetal_list.spec_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品名字">
            <el-input v-model="listdetal_list.spu_title" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="款式">
            <el-input v-model="listdetal_list.color"></el-input>
          </el-form-item>
          <el-form-item label="折后价">
            <el-input v-model="listdetal_list.price"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="listdetal_list.oldPrice"></el-input>
          </el-form-item>
          <el-form-item label="详情图片1">
            <el-input v-model="listdetal_list.img1"></el-input>
          </el-form-item>
          <el-form-item label="详情图片2">
            <el-input v-model="listdetal_list.img2"></el-input>
          </el-form-item>
          <el-form-item label="详情图片3">
            <el-input v-model="listdetal_list.img3"></el-input>
          </el-form-item>
          <el-form-item label="详情图片4">
            <el-input v-model="listdetal_list.img4"></el-input>
          </el-form-item>
          <el-form-item label="详情图片5">
            <el-input v-model="listdetal_list.img5"></el-input>
          </el-form-item>
          <div class="bntWarp">
            <el-button type="primary" @click="complete_list">完成</el-button>
            <el-button type="danger" @click="dellList">删除</el-button>
            <el-button @click="delMask_list">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnHover: -1,
      isMask: false,
      isMask_list: false,
      delIndex: 0,
      danger:'',
      labelPosition: "right",
      formLabelAlign: {
        spu_title: "",
        spu_sub_title: "",
        spu_sub_title_hover: "",
        spec_id: "",
        search:'',
        spu_defall_show: "",
        imglist: "",
        price:''
      },
      listdetal: {
        spec_id: "",
        spu_title: "",
        color: "",
        showName:'',
        price: "",
        oldPrice: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
      },
      listdetal_list: {
        spec_id: "",
        spu_title: "",
        color: "",
        price: "",
        showName:'',
        oldPrice: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
      },
      list: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    dellList() {
      this.list.splice(this.delIndex, 1);
      this.isMask_list = false;
    },
    complete_list() {
      this.isMask_list = false;
    },
    delMask_list() {
      // for (let i in thsi.listdetal_list) {
      //   this.listdetal_list[i] = ""
      // }
      // this.listdetal_list.spec_id = this.formLabelAlign.spec_id
      // this.listdetal_list.spu_title = this.formLabelAlign.spu_title
      this.isMask_list = false;
    },
    async submit() {
      if (this.list.length === 0) {
        this.$Message.error("请添加商品信息");
        this.danger = 'danger'
        return;
      } else {
        const res = await this.$http.post("/api/addDeta", {
          dataTitel: this.formLabelAlign,
          dataList: this.list,
        });
        if (res.data.success === true) {
          this.$Message({
            showClose: true,
            message: "提交成功",
            type: "success",
          });
          this.getData();
          this.danger = ''
          
        } else {
          this.$Message.error("提交失败");
        }
      }
    },
    handeDell(item, index) {
      this.delIndex = index;
      this.listdetal_list = item;
      this.isMask_list = true;
    },
    handeIndex(index) {
      this.btnHover = index;
    },
    complete() {
      let data;
      data = JSON.stringify(this.listdetal);
      data = JSON.parse(data);
      this.list.push(data);
      this.isMask = false;
      for (let key in this.listdetal) {
        this.listdetal[key] = "";
      }
    },
    showMask() {
      if (
        this.formLabelAlign.spec_id === "" &&
        this.formLabelAlign.spu_sub_title === ""
      ) {
        this.$Message.error("请至少添加 关联ID 和 商品名字");
        return;
      }
      this.isMask = true;
      this.listdetal.spec_id = this.formLabelAlign.spec_id;
      this.listdetal.spu_title = this.formLabelAlign.spu_title;
    },
    delMask() {
      this.isMask = false;
      for (let key in this.listdetal) {
        this.listdetal[key] = "";
      }
    },
    handelBlur(e) {
    },
    async getData() {
      const res = await this.$http.get("/api/getspecid");
      for (let i in this.formLabelAlign) {
        this.formLabelAlign[i] = ''
      }
      this.list = []
      this.formLabelAlign.spec_id = res.data.data + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.submit_item {
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list_btn {
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 80px;
  .list_btn_item {
    padding: 0 20px;
    height: 38px;
    line-height: 40px;
    border-radius: 4px;
    border: 1px #dadada solid;
    color: #999;
    margin: 0 20px;
    background-color: #fff;
    cursor: pointer;
    position: relative;
  }
  .list_btn_item_hover {
    border-color: rgb(32, 119, 250);
  }
  .list_btn_item_hover::after {
    content: "点击修改";
    position: absolute;
    top: 28px;
    left: 0px;
    width: 60px;
    color: rgb(243, 113, 113);
    font-weight: bold;
    font-size: 12px;
  }
}
.bntWarp {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mask_list {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .maskbox {
    width: 500px;
    background-color: #fff;
    padding: 20px 20px;
    border-radius: 4px;
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
  .maskbox {
    width: 500px;
    background-color: #fff;
    padding: 20px 20px;
    border-radius: 4px;
  }
}
.box::-webkit-scrollbar-thumb:horizontal { /*水平滚动条的样式*/
      width: 4px;
      background-color: #CCCCCC;
      -webkit-border-radius: 6px;
  }
.box::-webkit-scrollbar-track-piece {
      background-color: #fff; /*滚动条的背景颜色*/
      -webkit-border-radius: 0; /*滚动条的圆角宽度*/
 }
.box::-webkit-scrollbar {
     width: 10px; /*滚动条的宽度*/
     height: 8px; /*滚动条的高度*/
 }
.box::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
     height: 50px;
     background-color: #999;
     -webkit-border-radius: 4px;
     outline: 2px solid #fff;
     outline-offset: -2px;
     border: 2px solid #fff;
 }
.box::-webkit-scrollbar-thumb:hover { /*滚动条的hover样式*/
     height: 50px;
     -webkit-border-radius: 4px;
 }
.box {
  width: 100%;
  margin: 0 auto;
  padding:50px 100px;
}
</style>