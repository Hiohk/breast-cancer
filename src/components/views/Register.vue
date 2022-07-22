<template>
  <el-container class="main-body">
    <el-header>
      <div class="header">
        <div class="logo"><img src="../../assets/login/logo.jpg" alt="1" /></div>
        <span>康姿-乳腺癌AI辅助诊断系统</span>
      </div>
    </el-header>
    <el-main>
      <div class="main-register">
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
        <el-form
          :model="registerForm"
          status-icon
          :rules="rules"
          ref="registerForm"
          class="registerContainer"
          label-position="right"
        >
          <h1 class="registerTitle">注册</h1>
          <el-form-item prop="phone">
            <el-input
              v-model="registerForm.phone"
              auto-complete="off"
              placeholder="请输入手机号"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              auto-complete="off"
              placeholder="请输入用户名"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              auto-complete="off"
              placeholder="请输入邮箱地址"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              auto-complete="off"
              placeholder="输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="checkpassword">
            <el-input
              type="password"
              v-model="registerForm.checkpassword"
              auto-complete="off"
              placeholder="确认密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              round
              type="primary"
              class="register"
              @click="submitForm('registerForm')"
              >注册</el-button
            >
            <el-button
              round
              class="reset"
              type="primary"
              @click="resetForm('registerForm')"
              >重置</el-button
            >
          </el-form-item>
          <div class="other-text">
            已有账号？<a href="#" class="red" @click="linkLogin">立即登录</a>
          </div>
          <div class="other-text">
            <el-checkbox label="" name="type" v-model="checked"
              >已阅读并同意<router-link :to="{ path: '/agreement' }" target="_blank"
                ><el-link type="primary" :underline="false" class="red"
                  >《使用协议》及《隐私政策》</el-link
                >
              </router-link></el-checkbox
            >
          </div>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import loginApi from "@/api/login";
import "../../css/swiper.css";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "register",
  data() {
    // <!--验证手机号是否合法
    let checkTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!this.checkMobile(value)) {
        callback(new Error("手机号码不合法"));
      } else {
        callback();
      }
    };

    //验证邮箱是否合法
    let checkEmail = (rule, value, callback) => {
      //验证邮箱
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else if (!this.checkEmail(value)) {
        callback(new Error("邮箱地址不合法"));
      } else {
        callback();
      }
    };

    // <!--验证密码-->
    let validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkpassword !== "") {
          this.$refs.registerForm.validateField("checkpassword");
        }
        callback();
      }
    };
    // <!--二次验证密码-->
    let validatepassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      drawer: false,
      checked: false,
      registerForm: {
        password: "",
        checkpassword: "",
        phone: "",
        email: "",
        username: "",
        role: "",
      },
      rules: {
        password: [{ required: true, validator: validatepassword, trigger: "blur" }],
        checkpassword: [
          { required: true, validator: validatepassword2, trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkTel, trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
    };
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
  methods: {
    // <!--提交注册-->
    submitForm(registerForm) {
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          if (this.checked == true && this.registerForm.username != "admin") {
            this.registerForm.role = "user";
            loginApi
              .register(this.registerForm)
              .then((response) => {
                console.log(response);
                if (response == "username-failed") {
                  this.$message({
                    showClose: true,
                    message: "用户名已被注册",
                    type: "error",
                  });
                }
                if (response == "phone-failed") {
                  this.$message({
                    showClose: true,
                    message: "手机号已存在",
                    type: "error",
                  });
                }
                if (response == "email-failed") {
                  this.$message({
                    showClose: true,
                    message: "邮箱已存在",
                    type: "error",
                  });
                }
                if (response == "注册成功") {
                  this.$message({
                    showClose: true,
                    message: "注册成功",
                    type: "success",
                  });
                  this.$router.push("/login");
                }
              })
              .catch((error) => {
                this.$message({
                  showClose: true,
                  message: "注册失败",
                  type: "error",
                });
              });
          } else {
            this.$message({
              showClose: true,
              message: "请勾选用户协议",
              type: "warning",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //验证邮箱
    checkEmail(str) {
      let re = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },

    // 验证手机号
    checkMobile(str) {
      let re = /^1\d{10}$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    linkLogin() {
      //页面跳转
      this.$router.push("/");
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
.main-register {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
}

.registerTitle {
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 32px;
  text-align: center;
}

.registerContainer {
  position: fixed;
  top: 400px;
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
.register {
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
.reset {
  font-size: 20px;
  border: 0;
  width: 358px;
  margin: 10px 0 0 0;
  border-radius: 6px;
  color: #fff;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  line-height: 25px;
  text-align: center;
  display: block;
}
.linkTo {
  margin: 0px 110px;
  text-align: center;
}
.other-text {
  color: #8c8889;
  font-size: 14px;
  line-height: 22px;
  margin: 16px 0 -16px;
  padding-bottom: 20px;
}
.red {
  color: #fe4066;
  display: inline-block;
}
</style>
