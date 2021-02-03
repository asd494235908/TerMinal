<template>
  <div class="details_warp">
    <div class="details_titel">
      <i class="iconfont icon">&#xe676;</i>详情分类组件管理
    </div>
    <div class="detaisl_warp_item">
      <div class="details_item" v-for="(item, index) in data" :key="index">
        <p class="detaisl_titel_1">板块名称: {{ item.activity }}</p>
        <p class="detaisl_desc">板块说明: {{ item.activity_ative }}</p>
        <p class="detaisl_sort">板块权重：{{ item.sort }}</p>
        <p class="detaisl_img">
          板块图片：<img
            v-lazy="item.hot_img"
            alt=""
            style="width: 200px; height: 140px ;marginTop: 8px;"
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
            <div class="class_arr">
              <!-- <div class="arr_link">{{ o.hot_link }}</div> -->
              <div class="arr_name">
                <p class="ellipsis">分类名称：{{ o.spu_title }}</p>
              </div>
              <img v-lazy="o.list[0].img_url1" alt=""  style="width: 60px; height: 60px; " class="img" />
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="details_add_item"><i class="el-icon-plus"></i>点击添加</div>
    </div>
    <div class="mask" v-show="isMask">
      <div class="mask_warp">
        <div class="titel">修改板块信息</div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="addData"
        >
          <el-form-item label="板块编号">
            <el-input v-model="addData.hot_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="板块名称">
            <el-input v-model="addData.activity"></el-input>
          </el-form-item>
          <el-form-item label="板块说明">
            <el-input v-model="addData.activity_ative"></el-input>
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
                <div
                  v-for="(item, index) in supInfo"
                  :key="index"
                  class="checkbox_warp"
                >
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
        listArr: [],
        sort: "",
        type: "1",
      },
      labelPosition: "right",
    }
  },
  props: {
    data: Array,
  },
  methods: {
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

.details_warp {
  width: 100%;
  .detaisl_warp_item {
    display: flex;
    .details_add_item:hover {
      border-color: rgb(64, 158, 255);
    }
    .details_add_item {
      height: 616px;
      width: 274px;
      text-align: center;
      line-height: 616px;
      border: solid 1px $xt;
      border-radius: 4px;
      padding: 10px;
      margin: 5px 10px;
      cursor: pointer;
      transition: all 0.5s;
    }
    .details_item {
      margin: 5px 10px;
      border: solid 1px $xt;
      padding: 10px;
      border-radius: 4px;
      transition: all 0.5s;
      cursor: pointer;
      position: relative;
      p {
        width: 100%;
        height: 30px;
        line-height: 30px;
      }
      .detaisl_img {
        height: 170px;
        display: flex;
      }
    }
    .details_item:hover {
      border-color: rgb(64, 158, 255);
    }
  }
  .details_titel {
    font-size: 22px;
    margin: 30px 0 10px;
    font-weight: bold;
    padding-left: 20px;
    cursor: pointer;
    .icon {
      font-size: 22px;
      color: rgb(64, 158, 255);
    }
  }
}
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
          width: 200px !important;
          text-align: center;
        }
        .img {
          width: 60px;
          height: 60px;
          margin-top: 10px;
        }
      }
    }
</style>