<template>
  <div
    class="login"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255,255, 1)"
  >
    <div class="login_titel">
      <div class="logo">dcmaomi</div>
      <div class="text">欢迎登录后台管理系统</div>
    </div>
    <div class="login_warp">
      <form class="login_list">
        <div class="username iconfont" :class="{ input_active: isUser }">
          &#xe638;<input
            type="text"
            v-model="userInfo.username"
            placeholder="请输入用户名"
            @blur="userOnblur"
            @focus="userOnfocus"
            autofocus
          />
        </div>
        <div class="password iconfont" :class="{ input_active: isPwd }">
          &#xe651;<input
            type="password"
            v-model="userInfo.pwd"
            placeholder="请输入密码"
            @blur="pwdOnblur"
            @focus="pwdOnfocus"
            @keyup.enter="logIn"
          />
        </div>
        <div class="verification">
          <div class="left">
            <input type="number" maxlength="20" v-model="input3" />
          </div>
          <div class="right" v-html="svg"></div>
        </div>
        <span @click="open2" :style="{ opacity: isfalls ? 1 : 0 }"
          >账号或密码输入错误</span
        >
        <p @click="open2">忘记密码?</p>

        <div class="btn" @click="logIn">登录</div>
      </form>
    </div>
    <div class="login_desc">欢迎来到dcmaomi后台管理系统</div>
    <div class="login_beian">
      <a href="http://beian.miit.gov.cn">蜀ICP备2020033541号</a>
    </div>
  </div>
</template>

<script>
import { setStore } from "@/utils/storage.js";
export default {
  data() {
    return {
      isUser: false,
      isPwd: false,
      isfalls: false,
      loading: false,
      svg: "",
      text: 0,
      input3: "",
      userInfo: {
        username: "",
        pwd: "",
      },
    };
  },
  created() {
    this.open2();
    this.getverification();
    //图片加载完毕
    this.initBg();
  },
  methods: {
    initBg() {
      this.loading = true
      const img = require('../../../public/static/images/lioginBg.png')
      const loadImg = new Promise((resolve, reject) => {
          const objImg = new Image();
          objImg.src = img;
          objImg.onload = () => resolve();
          objImg.onerror = () => reject(new Error(  " load error"));
        });
        loadImg.then(() => {
          // console.log('加载成功');
          //  store.commit("seveMask", true);
          this.loading = false
        }).catch(()=>{
          // console.log('加载失败');
        })
    },
    async getverification() {
      const res = await this.$http.post("/api/verification");
      this.svg = res.data.data;
      this.text = Number(res.data.text);
      this.input3 = this.text;
    },
    pwdOnfocus() {
      this.isPwd = true;
    },
    pwdOnblur() {
      this.isPwd = false;
    },
    userOnfocus() {
      this.isUser = true;
      this.isfalls = false;
    },
    userOnblur() {
      this.isUser = false;
    },
    open2() {
      this.$Notification({
        title: "提示",
        message: "游客账户名为admin，密码为admin",
      });
    },
    async logIn() {
      if (this.input3 === "") {
        this.$Message.error("请输入验证码");
        return;
      }
      if (Number(this.input3) !== Number(this.text)) {
        this.$Message.error("验证码输入错误");
        this.getverification();
        return;
      }
      this.loading = true;
      const res = await this.$http.post("/api/Login", {
        userInfo: this.userInfo,
      });
      if (res.data.success === true) {
        this.loading = false;
        setStore("token", res.data.token);
        window.location.href = "/";
      } else {
        this.$Message.error("账号密码输入错误");
        this.isfalls = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";
@import "@/assets/style/index.scss";

.input_active {
  border-color: rgb(56, 112, 247) !important;
}
.open2 {
  position: absolute;
  top: 30px;
  right: 0;
}
.login {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: url("../../../public/static/images/lioginBg.png");
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  .login_beian {
    position: absolute;
    bottom: 10px;
    font-size: 14px;
    letter-spacing: 2px;
    a {
      color: $c3;
    }
  }
  .login_desc {
    position: absolute;
    bottom: 50px;
    font-size: 22px;
    color: $c3;
    letter-spacing: 3px;
  }
  .login_titel {
    font-size: 26px;
    color: $cf;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-weight: bold;
      border-right: 1px solid $cf;
      padding-right: 10px;
      margin-right: 10px;
      letter-spacing: 6px;
    }
    .text {
      font-size: 22px;
      letter-spacing: 6px;
    }
  }
  .login_warp {
    width: 500px;
    height: 400px;
    margin-top: 100px;
    background-color: $cf;
    border-radius: 8px;
    box-shadow: 0 1px 10px 4px rgba($color: #035080, $alpha: 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    .login_list {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .btn {
        font-family: PingFang SC;
        width: 300px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin-top: 30px;
        border-radius: 30px;
        font-size: 16px;
        letter-spacing: 12px;
        color: $cf;
        background-color: rgb(87, 137, 255);
        cursor: pointer;
      }
      .btn:hover {
        background-color: rgb(56, 112, 247);
      }
      span {
        margin-top: 10px;
        display: inline-block;
        width: 280px;
        text-align: start;
        color: rgb(255, 104, 104);
      }
      p {
        width: 300px;
        text-align: right;
        color: $c9;
        cursor: pointer;
      }
      .username {
        width: 72%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #dadada;
        margin: 0 60px 20px;
        border-radius: 8px;
        font-size: 16px;
        color: $c3;
        input {
          width: 300px;
          height: 36px;
          margin-left: 10px;
          letter-spacing: 1px;
          font-family: PingFang SC;
          font-size: 14px;
        }
      }
      .password {
        width: 72%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #dadada;
        margin: 0 60px;
        border-radius: 8px;
        font-size: 16px;
        color: $c3;
        input {
          width: 300px;
          height: 36px;
          margin-left: 10px;
        }
      }
      .verification {
        width: 72%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #dadada;
        margin: 20px 60px 0;
        border-radius: 8px;
        font-size: 16px;
        color: $c3;
        overflow: hidden;
        .left {
          flex: 1;
          width: 100%;
          height: 36px;
          input {
            width: 80%;
            height: 36px;
            margin-left: 10px;
          }
        }
        .right {
          width: 150px;
          height: 36px;
        }
      }
    }
  }
}
</style>
