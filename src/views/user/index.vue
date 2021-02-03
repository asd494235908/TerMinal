<template>
  <div
    class="order-warp"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="top">
      <el-button
        icon="el-icon-refresh-right"
        @click="defallGetData"
        type="primary"
        class="defall"
        >恢复默认</el-button
      >
      <el-button
        icon="el-icon-user-solid"
        :type="blacklist ? 'success' : 'info'"
        class="defall"
        @click="handelblacklist"
        >查看黑名单</el-button
      >
      <div class="top-left">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          class="input-with-select"
        >
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="请选择"
            class="select-warp"
            :class="{ select_warp_active: isselect }"
          >
            <el-option label="账号" value="username"></el-option>
            <el-option label="id" value="uid"></el-option>
            <el-option label="用户名" value="user_name"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handesearch"
          ></el-button>
        </el-input>
      </div>

      <div class="top-right">
        <!-- <el-date-picker
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
        ></el-date-picker> -->
      </div>
    </div>
    <div class="contenner" v-if="allDataArr.length !== 0">
      <div class="contenner-top">
        <div class="uid">UID</div>
        <div class="username">账号</div>
        <div class="user_name">用户昵称</div>
        <div class="time">用户生日</div>
        <div class="add">添加权限</div>
        <div class="dell">删除权限</div>
        <div class="userinfo">账号描述</div>
        <div class="user_img">用户头像</div>
        <div class="sex">用户性别</div>
        <div class="user_autograph">用户签名</div>
        <div class="address_defall">操作</div>
      </div>
      <div class="contenner-min">
        <div class="checkbox-warp">
          <div class="checkbox-item" v-for="item in allDataArr" :key="item.id">
            <div class="uid">{{ item.uid }}</div>
            <div class="username">{{ item.username }}</div>
            <div class="user_name">
              <p
                class="user_time-text noer"
                v-if="item.user_name === null || item.user_name === 'null'"
              >
                未设置
              </p>
              <p
                class="user_time-text"
                v-if="item.user_name !== null && item.user_name !== 'null'"
              >
                {{ item.user_name }}
              </p>
            </div>
            <div class="time">
              <p
                class="user_time-text noer"
                v-if="item.user_time === null || item.user_time === 'null'"
              >
                未设置
              </p>
              <p
                class="user_time-text"
                v-if="item.user_time !== null && item.user_time !== 'null'"
              >
                {{ item.user_time }}
              </p>
            </div>
            <div class="add">
              <p class="noer" v-if="item.isadd === 0 || item.isadd === null">
                没有权限
              </p>
              <p v-if="item.isadd !== 0 && item.isadd !== null">
                {{ item.isadd }}
              </p>
            </div>
            <div class="dell">
              <p class="noer" v-if="item.dell === 0 || item.dell === null">
                没有权限
              </p>
              <p v-if="item.dell !== 0 && item.dell !== null">
                {{ item.dell }}
              </p>
            </div>
            <div class="userinfo">
              <p class="userinfo-text noer" v-if="item.userinfo === null">
                未设置
              </p>
              <p class="user_autograph-text" v-if="item.userinfo !== null">
                {{ item.userinfo }}
              </p>
            </div>
            <div class="user_img">
              <p
                class="noer"
                v-if="item.user_img === null || item.user_img === 'null'"
              >
                暂无头像
              </p>
              <img
                v-lazy="item.user_img"
                alt=""
                v-if="item.user_img !== null && item.user_img !== 'null'"
              />
            </div>
            <div class="sex">
              <p
                class="sex-text noer"
                v-if="item.sex === null || item.sex === 'null'"
              >
                未设置
              </p>
              <p
                class="sex-text"
                v-if="item.sex !== null && item.sex !== 'null'"
              >
                {{ item.sex }}
              </p>
            </div>
            <div class="user_autograph">
              <p
                class="user_autograph-text noer"
                v-if="
                  item.user_autograph === null || item.user_autograph === 'null'
                "
              >
                未设置
              </p>
              <p
                class="user_autograph-text"
                v-if="item.sex !== null && item.user_autograph !== 'null'"
              >
                {{ item.user_autograph }}
              </p>
            </div>
            <div class="address_defall">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="modifyUser(item)"
                >操作</el-button
              >
              <el-button
                icon="el-icon-s-check"
                type="danger"
                size="mini"
                v-if="item.blacklist === 0"
                @click="addblacklist(item, true)"
                >加入黑名单</el-button
              >
              <el-button
                icon="el-icon-refresh-right"
                type="danger"
                size="mini"
                v-if="item.blacklist !== 0"
                @click="addblacklist(item, false)"
                >恢复</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="none-warp" v-if="allDataArr.length === 0">
      <div class="none"></div>
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
    <div class="user-mask" v-if="isUser">
      <div class="content">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="currentUser"
        >
          <el-form-item label="用户ID">
            <el-input v-model="currentUser.uid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input
              v-model="currentUser.username"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="密码">
            <el-input
              v-model="currentUser.password"
              :type="ispassword"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="昵称">
            <el-input v-model="currentUser.user_name"></el-input>
          </el-form-item>
          <el-form-item label="用户生日">
            <el-input v-model="currentUser.user_time"></el-input>
          </el-form-item>
          <el-form-item label="添加权限">
            <el-input v-model="currentUser.isadd"></el-input>
          </el-form-item>
          <el-form-item label="删除权限">
            <el-input v-model="currentUser.dell"></el-input>
          </el-form-item>
          <el-form-item label="账号描述">
            <el-input v-model="currentUser.userinfo"></el-input>
          </el-form-item>
          <el-form-item label="用户头像">
            <el-input v-model="currentUser.user_img"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="currentUser.sex"></el-input>
          </el-form-item>
          <el-form-item label="用户签名">
            <el-input
              v-model="currentUser.user_autograph"
              type="textarea"
              size="small"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="bntWarp">
          <el-button type="primary" @click="submitUser">完成</el-button>
          <el-button @click="clerUser">取消</el-button>
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
      input: "",
      select: "",
      value: "",
      labelPosition: "right",
      currentPage: 1,
      allData: 0,
      allDataArr: [],
      size: 20,
      loading: false,
      isselect: false,
      goodMask: false,
      lookGood: {},
      isUser: false,
      blacklist: false,
      currentUser: {
        isadd: null,
        dell: null,
        id: null,
        password: "",
        sex: null,
        uid: null,
        user_autograph: null,
        user_img: null,
        user_name: null,
        user_time: null,
        userinfo: "",
        username: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      day1: "",
      day2: "",
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ispassword() {
      return Number(getStore("dell")) === 1 ? "text" : "password";
    },
    isgoogShow() {
      let arr = Object.keys(this.lookGood);
      return arr.length === 0 ? false : true;
    },
  },
  watch: {
    select(x, y) {
      if (x !== "") {
        this.isselect = false;
      }
    },
  },
  methods: {
    //加入黑名单 和恢复白名单
    addblacklist(item, x) {
      this.$MessageBox("此操作用户无法登录！是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (Number(getStore("dell")) === 1) {
            let id = item.id;
            //x = true 添加黑名单 false 取消黑名单
            const res = await this.$http.post("/api/changeblacklist", {
              id,
              x,
            });
            if (res.data.success === true) {
              this.$Message({
                showClose: true,
                message: "提交成功",
                type: "success",
              });
              this.getData();
            }
          } else {
            this.$Message.error("你没有操作权限");
          }
        })
        .catch(() => {
          this.$Message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //查看黑名单
    handelblacklist() {
      this.blacklist = !this.blacklist;
      this.getData();
    },
    //提交修改用户列表
    submitUser() {
      this.$MessageBox("确认提交？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (Number(getStore("dell")) === 1) {
            const res = await this.$http.post("/api/submitUser", {
              data: this.currentUser,
            });
            if (res.data.success === true) {
              this.$Message({
                showClose: true,
                message: "提交成功",
                type: "success",
              });
              this.getData();
              this.isUser = false;
            } else {
              this.$Message.error("提交失败");
            }
          } else {
            this.$Message.error("你没有操作权限");
          }
        })
        .catch(() => {
          this.$Message({
            type: "info",
            message: "已取消",
          });
        });
    },
    //取消修改User
    clerUser() {
      this.currentUser = {
        isadd: null,
        dell: null,
        id: null,
        password: "",
        sex: null,
        uid: null,
        user_autograph: null,
        user_img: null,
        user_name: null,
        user_time: null,
        userinfo: "",
        username: "",
      };
      this.isUser = false;
    },
    //修改当前user内容
    modifyUser(item) {
      let data = JSON.parse(JSON.stringify(item));
      this.currentUser = data;
      this.isUser = true;
    },
    //返回订单状态
    istype(type) {
      switch (type) {
        case 0:
          return "待支付";
          break;
        case 1:
          return "待处理";
          break;
        case 2:
          return "待确认收获";
          break;
        case 3:
          return "已超时";
          break;
        case 4:
          return "已完成";
          break;
      }
    },
    //默认获取数据
    defallGetData() {
      this.day1 = "";
      this.day2 = "";
      this.select = "";
      this.input = "";
      this.blacklist = false;
      this.getData();
    },
    //关闭订单详情
    heideood() {
      this.goodMask = true;
      this.lookGood = {};
    },
    //显示商品详情
    showGood(item) {
      this.goodMask = true;
      this.lookGood = item;
    },
    //搜索查询的内容
    handesearch() {
      //判断又没选择查询的类型 select是否为空值
      if (this.select === "") {
        this.isselect = true;
        this.$Message.error("请选择查询的类型");
        return;
      }
      if (this.input === "") {
        this.$Message.error("请输入查询的内容");
        return;
      }
      this.day1 = "";
      this.day2 = "";
      this.getData();
    },
    async getData() {
      this.loading = true;
      const res = await this.$http.post("/api/getUser", {
        page: this.currentPage,
        size: this.size,
        day1: this.day1,
        day2: this.day2,
        select: this.select,
        value: this.input,
        blacklist: this.blacklist,
      });
      if (res.data.success === true) {
        this.allData = res.data.maxData;
        this.allDataArr = res.data.data;
        this.loading = false;
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    //选择的日期
    currntData(e) {
      e.forEach((element, index) => {
        if (index === 0) {
          this.day1 = element;
        } else if (index === 1) {
          this.day2 = element;
        }
      });
      this.input = "";
      this.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
.user-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 800px;
    background-color: $cf;
    padding: 30px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    border-radius: 8px;
  }
  .bntWarp {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.contenner-bouttom {
  width: 100%;
  padding: 0 1%;
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .contenner-bouttom-left {
  }
  .contenner-bouttom-right {
  }
}

.contenner {
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  .contenner-top {
    display: flex;
    background-color: $head-bg;
    color: $cf;
    padding: 5px;
    .uid,
    .dell,
    .userinfo,
    .add,
    .sex {
      width: 100px;
    }
    .username {
      width: 300px;
    }
    .user_name,
    .time,
    .user_img {
      width: 100px;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .user_autograph {
      flex: 1;
    }
    .address_defall {
      flex: 1;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .contenner-min {
    width: 100%;
    .checkbox-warp {
      .checkbox-item {
        display: flex;
        // justify-content: center;
        align-items: center;
        border-left: 1px solid $xt;
        border-right: 1px solid $xt;
        .noer {
          color: $cc;
        }
        .uid,
        .dell,
        .userinfo,
        .add,
        .sex {
          width: 100px;
        }
        .username {
          width: 300px;
        }
        .user_name,
        .time,
        .user_img {
          width: 100px;
          img {
            width: 60px;
            height: 60px;
          }
        }
        .user_autograph {
          flex: 1;
        }
        .address_defall {
          flex: 1;
        }
        div + div {
          border-left: 1px solid $xt;
        }
        div {
          // flex: 1;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid $xt;
        }
      }
    }
  }
}

.none-warp {
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.none {
  width: 300px;
  height: 400px;
  background: url("https://www.dcmaomi.com:3000/serverImage/search.png")
    no-repeat;
}
.order-warp::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.order-warp::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
.order-warp::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
.order-warp::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
.order-warp::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  -webkit-border-radius: 4px;
}
.order-warp {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 2%;

  .top {
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
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>