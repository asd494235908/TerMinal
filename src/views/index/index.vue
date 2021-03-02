<template>
  <div
    class="contenert_warp"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="contenert_left" :class="{ contenert_left_hide: !showleft }">
      <template v-if="showleft"
        ><div class="link_item" v-for="(item, index) in homeList" :key="index">
          <div class="link_item-titel" @click="changeHeight(item, index)">
            <i class="iconfont" v-html="item.icon">{{ item.icon }}</i>
            {{ item.titel }}
            <i class="el-icon-arrow-down" :class="{ el_icon: item.heigt !== 0 }"></i>
          </div>
          <div class="link_items" :style="{ height: item.heigt }">
            <router-link
              v-for="(o, i) in item.list"
              :key="i"
              class="link_item_list"
              :class="{ lin_item_active: o.bg === true }"
              :to="o.link"
            >
              <div class="link_item_link" @click="changeColor(o)">
                {{ o.name }}
              </div>
            </router-link>
          </div>
        </div></template
      >

      <div class="laer_box">
        <div class="aa" @click="hanleChckContent">
          <i
            :class="{ 'el-icon-arrow-right': !showleft, 'el-icon-arrow-left': showleft }"
          ></i>
        </div>
      </div>
      <div class="logout" @click="logOut" v-if="showleft">退出登录</div>
    </div>
    <div class="contenert_right">
      <div class="contenert_right_top">
        <ul class="top_link_warp">
          <li
            class="top_item"
            :class="{ avtive_li: index === listIndex }"
            v-for="(item, index) in navLink"
            :key="index"
          >
            <router-link class="top_link" :to="item.link">{{ item.name }}</router-link>
            <i @click="removeTab(item, index)" class="el-icon-close"></i>
          </li>
        </ul>
      </div>
      <div class="contenert_right_bottom">
        <keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <div class="login_beian">
        <a href="http://beian.miit.gov.cn">蜀ICP备2020033541号</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { removeStore, getStore } from "@/utils/storage.js";
export default {
  data() {
    return {
      loading: false,
      showleft: true,
      homeList: [
        {
          titel: "首页",
          icon: "&#xe66c;",
          showHide: false,
          heigt: 0,
          list: [
            {
              name: "主页",
              link: "/home",
              bg: false,
            },
            {
              name: "导航条管理",
              link: "/navtarba",
              bg: false,
            },
            {
              name: "轮播图管理",
              link: "/swiperPage",
              bg: false,
            },
            {
              name: "板块管理",
              link: "/plate",
              bg: false,
            },
          ],
        },
        {
          titel: "订单管理",
          icon: "&#xe61a;",
          showHide: false,
          heigt: 0,
          list: [
            {
              name: "待处理订单",
              link: "/Order",
              bg: false,
            },
            {
              name: "全部订单",
              link: "/allOrder",
              bg: false,
            },
          ],
        },
        {
          titel: "商品管理",
          icon: "&#xe608;",
          showHide: false,
          heigt: 0,
          list: [
            {
              name: "上传商品",
              link: "/AddGood",
              bg: false,
            },
            {
              name: "修改商品",
              link: "/modifygood",
              bg: false,
            },
            {
              name: "添加商品详情",
              link: "/AddGoodList",
              bg: false,
            },
          ],
        },
        {
          titel: "图片管理",
          icon: "&#xe66d;",
          showHide: false,
          heigt: 0,
          list: [
            {
              name: "上传图片",
              link: "/Upload",
              bg: false,
            },
            {
              name: "查看图片",
              link: "/setServerImg",
              bg: false,
            },
            {
              name: "查看图片2",
              link: "/setServerImg2",
              bg: false,
            },
          ],
        },
        {
          titel: "用户管理",
          icon: "&#xe66d;",
          showHide: false,
          heigt: 0,
          list: [
            {
              name: "设置用户",
              link: "/User",
              bg: false,
            },
          ],
        },
        {
          titel: "系统管理",
          icon: "&#xe62f;",
          showHide: false,
          heigt: 0,
          list: [
            {
              name: "系统日志",
              link: "/VisitList",
              bg: false,
            },
          ],
        },
      ],
      isIndex: 0,
      listIndex: 0,
    };
  },
  mounted() {
    this.homeList.forEach((item, index) => {
      if (item.link === this.$route.path) {
        this.isIndex = index;
      }
    });
    let nav = getStore("nav");
    if (nav !== null) {
      nav = JSON.parse(nav);
      this.addNavLink(nav);
    } else {
      const home = {
        bg: false,
        link: "/home",
        name: "主页",
      };
      this.addNavLink(home);
    }

    if (Number(getStore("dell")) === 0) {
      this.$Notification({
        title: "提示",
        message: "欢迎体验，您的身份是游客",
      });
    } else if (Number(getStore("dell")) === 1) {
      this.$Notification({
        title: "提示",
        message: "欢迎体验，您的身份是管理员",
      });
    }
    this.$nextTick(() => {
      this.loading = false;
    });
  },
  computed: {
    ...mapState(["navLink"]),
  },
  watch: {
    navLink(a, b) {
      if (a.length == 0) {
        this.$router.push({ path: "/" });
        const home = {
          bg: false,
          link: "/home",
          name: "主页",
        };
        this.addNavLink(home);
      } else {
        // this.$router.push({ path: a[a.length - 1].link });
      }
    },
    $route(to, from) {
      this.navLink.forEach((item, index) => {
        if (item.link === to.path) {
          this.listIndex = index;
        }
      });
    },
  },
  methods: {
    ...mapMutations(["addNavLink", "removeNavLink"]),
    hanleChckContent() {
      this.showleft = !this.showleft;
    },
    logOut() {
      removeStore("token");
      window.location.href = "/";
    },
    removeTab(e, index) {
      this.navLink.forEach((item) => {
        if (item.name == e.name) {
          this.removeNavLink(item);
        }
      });
    },
    toasd(item) {
      this.$router.push({ path: item.link });
    },
    changeHeight(item, index) {
      this.homeList.forEach((o, index) => {
        if (o.titel === item.titel) {
          o.showHide = !o.showHide;
        }
      });
      this.homeList.forEach((o, index) => {
        if (o.showHide === true) {
          o.heigt = o.list.length * 32 + "px";
        } else {
          o.heigt = 0;
        }
      });
    },
    changeColor(item) {
      this.homeList.forEach((o) => {
        o.list.forEach((i) => {
          i.bg = false;
        });
      });
      this.homeList.forEach((o) => {
        o.list.forEach((i) => {
          if (i.name === item.name) {
            i.bg = true;
          }
        });
      });
      this.addNavLink(item);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/index.scss";
@import "@/assets/style/theme.scss";
.laer_box {
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(50%);
}
.aa {
  width: 15px;
  height: 60px;
  position: relative;
  background-color: #000c18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $cf;
  cursor: pointer;
}
.aa::before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  top: -15px;
  left: 0px;
  border-width: 15px 0 0 15px;
  border-style: solid;
  border-color: transparent #000c18 transparent;
}
.aa::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  bottom: -15px;
  left: 0px;
  // border-width: 40px 0 0 40px;
  border-width: 15px 15px 0 0;
  border-style: solid;
  // border-color: transparent yellow transparent;
  border-color: #000c18 transparent transparent;
}
.login_beian {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  a {
    color: $c3;
  }
}
.logout {
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 200px;
  height: 60px;
  line-height: 60px;
  color: $cf;
  font-size: 16px;
  cursor: pointer;
}
.link_items {
  overflow: hidden;
  transition: all 0.3s;
}
.link_item {
  width: 100%;
  .lin_item_active {
    background-color: rgb(0, 42, 83);
  }
  .el-icon-menu {
    padding-right: 10px;
  }
  .link_item-titel {
    width: 100%;
    height: 42px;
    line-height: 42px;
    color: $cf;
    padding-left: 10px;
    cursor: pointer;
    position: relative;
    .el_icon {
      transform: rotate(180deg);
    }
    .el-icon-arrow-down {
      position: absolute;
      right: 10px;
      top: 21px;
      margin-top: -7px;
      transition: all 0.2s;
    }
  }
  .link_item_list {
    width: 100%;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    padding-left: 40px;
    color: $cf;
  }
  .link_item_list:hover {
    background-color: rgb(0, 42, 83);
  }
}
.avtive_li {
  background-color: rgb(64, 158, 255) !important;
  border: none !important;
  font-weight: normal !important;
  .top_link {
    color: $cf !important;
  }
  .el-icon-close::before {
    color: $cf !important;
  }
}
.contenert_warp {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  .contenert_left {
    min-width: 230px;
    width: 230px;
    background-color: rgb(0, 12, 24);
    position: relative;
    transition:  all .5s ease-in-out;
    .link_warp {
      width: 100%;
    }
  }
  .contenert_left_hide {
    width: 0px;
    min-width: 0px;
    // overflow: hidden;
  }
  .contenert_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    background-color: $ee;
    .contenert_right_top {
      width: 100%;
      height: 33px;
      display: flex;
      align-items: center;
      // border-bottom: 1px solid $xt;
      margin-top: 10px;
      .top_link_warp {
        display: flex;
        align-items: center;
        .top_item {
          display: block;
          padding: 0 20px;
          height: 32px;
          line-height: 32px;
          margin-right: 10px;
          // border: 1px solid $xt;
          // border-bottom: none;
          border-radius: 6px 6px 0 0;
          box-sizing: border-box;
          background-color: $cf;
          .top_link {
            display: inline-block;
            align-items: center;
            justify-items: center;
            color: $c6;
            font-weight: bold;
          }
          .el-icon-close {
            transform: scale(0);
            transition: all 0.4s;
            width: 0;
            height: 0;
            display: inline-block;
            cursor: pointer;
          }
        }
        .top_item:hover .el-icon-close {
          width: 12px;
          height: 12px;
          transform: scale(1);
          margin-left: 8px;
        }
      }
    }
    .contenert_right_bottom {
      // padding: 10px 0px;
      overflow: hidden;
      margin-bottom: 10px;
      flex: 1;
      // border: 1px solid $xt;
      border-top: none;
      border-radius: 0 0 8px 8px;
      background-color: $cf;
      box-shadow: 0px 1px 2px 0px rgba($color: #000000, $alpha: 0.1);
      background-color: rgb(250, 250, 250);
    }
  }
}
</style>
