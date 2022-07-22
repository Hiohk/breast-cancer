<template>
  <el-container class="main-body">
    <el-header>
      <div class="header">
        <div class="logo"><img src="../../assets/login/logo.jpg" alt="1" /></div>
        <span>康姿-乳腺癌AI辅助诊断系统</span>
      </div>
    </el-header>
    <el-main>
      <div class="main-login">
        <!-- Swiper -->
        <div class="swiper-container get_main_bg">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="../../assets/login/1.jpg" alt="1" />
            </div>
            <div class="swiper-slide">
              <img src="../../assets/login/2.jpeg" alt="1" />
            </div>
            <div class="swiper-slide">
              <img src="../../assets/login/3.jpg" alt="1" />
            </div>
            <div class="swiper-slide">
              <img src="../../assets/login/4.jpeg" alt="1" />
            </div>
            <div class="swiper-slide">
              <img src="../../assets/login/5.png" alt="1" />
            </div>
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>

        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
          <h1 class="loginTitle">登录</h1>
          <el-form-item prop="phone">
            <el-input
              class="loginInput"
              v-model="loginForm.phone"
              auto-complete="false"
              placeholder="手机号"
              type="text"
              clearable=""
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="loginInput"
              v-model="loginForm.password"
              auto-complete="false"
              placeholder="密码"
              show-password
              clearable=""
            ></el-input>
          </el-form-item>
          <el-form-item prop="vcode">
            <el-input
              class="loginInput-vcode"
              v-model="loginForm.vcode"
              auto-complete="false"
              placeholder="验证码"
              type="text"
              clearable=""
            ></el-input>
            <span class="img-vcode">
              <!-- @click="getVcode()" -->
              <img
                @click="getVcode()"
                src="http://127.0.0.4:8888/vcode"
                id="imageMask"
                alt="验证码"
              />
            </span>
          </el-form-item>
          <!-- <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox> -->
          <br />
          <el-button round type="primary" @click="submitLogin('loginForm')" class="login"
            >登录</el-button
          >
          <div class="other-text">
            没有账号？<a href="#" class="red" @click="submitRegister">立即注册</a>
          </div>
          <div class="other-sign-type">
            <ul>
              <li>
                <a href="#"><img src="../../assets/bottom/cell.svg" alt="1" /> </a>
              </li>
              <li>
                <a href="#"><img src="../../assets/bottom/chest.svg" alt="2" /> </a>
              </li>
              <li>
                <a href="#"><img src="../../assets/bottom/eeg.svg" alt="3" /> </a>
              </li>
              <li>
                <a href="#"
                  ><img src="../../assets/bottom/first-aid-kit.svg" alt="4" />
                </a>
              </li>
            </ul>
          </div>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import loginApi from "@/api/login";
import homeApi from "@/api/home";
import "../../css/swiper.css";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "Login",
  data() {
    return {
      imgSrc: "http://127.0.0.4:8888/vcode",
      labelPosition: "right",
      checked: false,
      loginForm: {
        phone: "",
        password: "",
        vcode: "",
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        vcode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },

  components: {},
  computed: {
    form() {
      return this.$store.state.form;
    },
    // isLogin() {
    //   return this.$store.state.isLogin;
    // },
  },
  mounted() {
    new Swiper(".get_main_bg", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
  created() {},
  methods: {
    //获取验证码
    getVcode() {
      loginApi
        .getValidVcode()
        .then((res) => {
          document.getElementById("imageMask").src =
            document.getElementById("imageMask").src + "?nocache=" + new Date().getTime();
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "获取验证码请求失败",
            type: "error",
          });
        });
    },
    submitLogin(loginForm) {
      loginApi
        .loginValidate(this.loginForm)
        .then((res) => {
          console.log(res);
          console.log(res.status);
          if (res.status == 200) {
            // 登录成功
            // 1. 存储 token
            localStorage.setItem("token", "Bearer cancer987654320");
            this.$session.set("username", res.data.username);
            this.$session.set("phone", res.data.phone);
            this.$session.set("email", res.data.email);
            this.$session.set("password", res.data.password);
            // 2. 跳转到后台主页
            this.$message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
            this.$router.push("/user");
          } else {
            // 登录失败
            this.$message({
              showClose: true,
              message: "登录失败",
              type: "error",
            });
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "登录请求失败",
            type: "error",
          });
        });
    },
    handlerLock(data) {
      if (data) {
        this.$refs.loginForm.validateField(this.loginForm.vcode);
      }
    },
    submitRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
<style scoped>
.el-header {
  /*background: url("../../assets/pinkbg2.jpg");*/
  background-color: rgb(240, 197, 213);
  color: #333;
  text-align: center;
  line-height: 100px;
  height: 100px !important;
}

.el-main {
  /*background: url("../../assets/pinkbg2.jpg");*/
  color: #333;
  background-color: rgb(240, 197, 213);
}
.main-body {
  position: fixed;
  height: 100%;
  width: 100%;
}
.logo img {
  position: absolute;
  top: 0;
  left: 26%;
  height: 100px;
}
.header {
  position: relative;
}
.header span {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 40px;
  color: #333;
  text-align: center;
  line-height: 100px;
  letter-spacing: 5px;
}
.get_main_bg {
  position: absolute;
  top: 6%;
  left: 5%;
  width: 60%;
  height: 68%;
}
.get_main_bg img {
  width: 100%;
  height: 100%;
}
.main-login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
}
.loginContainer {
  position: absolute;
  top: 300px;
  transform: translateY(-50%);
  right: 4%;
  border-radius: 15px;
  background-clip: padding-box;
  /*margin: 130px auto 30px auto;*/
  width: 430px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
}
.loginContainer .loginInput {
  display: block;
  font-size: 16px;
  height: 48px;
  line-height: 48px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #353030;
}
.loginInput-vcode {
  width: 70%;
}
.img-vcode > img {
  height: 42px;
  float: right;
}
.slide {
  height: 48px;
  font-size: 16px;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.login {
  font-size: 20px;
  border: 0;
  width: 358px;
  border-radius: 6px;
  color: #fff;
  background: #fe4066;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  line-height: 25px;
  text-align: center;
  display: block;
}
.other-text {
  color: #8c8889;
  font-size: 14px;
  line-height: 22px;
  margin: 16px 0 -16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.red {
  color: #fe4066;
  display: inline-block;
}
.other-sign-type {
  margin-top: 30px;
}
.other-sign-type ul {
  list-style: none;
  display: flex;
  justify-content: center;
}
.other-sign-type ul li {
  flex: 1;
  text-align: center;
}
</style>
