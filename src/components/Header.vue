<template>
  <div>
    <el-dropdown>
      <el-row class="demo-avatar demo-basic">
        <el-col>
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar size="medium" :src="circleUrl"></el-avatar>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          ><i class="el-icon-setting" @click="personalInfo()">
            个人信息</i
          ></el-dropdown-item
        >
        <el-dropdown-item
          ><i class="el-icon-key" @click="dialogFormVisible = true">
            信息修改</i
          ></el-dropdown-item
        >

        <el-dropdown-item
          ><i class="el-icon-switch-button" @click.prevent="handleSignout()" herf="#">
            退出登录</i
          ></el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :visible.sync="dialogVisible" width="40%">
      <el-form :model="form">
        <el-descriptions class="margin-top" title="个人信息" :column="2" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            {{ form.username }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            {{ form.phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-message"></i>
              邮箱
            </template>
            {{ form.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-key"></i>
              密码
            </template>
            {{ form.password }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              角色
            </template>
            <el-tag size="medium" effect="dark" type="warning" v-if="form.phone === '123'"
              >管理员</el-tag
            >
            <el-tag size="medium" effect="dark" type="success" v-else>个人用户</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="30%" title="信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入旧密码"
            readonly
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="newpassword" label="新密码">
          <el-input v-model="form.newPass" autocomplete="off" placeholder="请输入新密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="checkpassword" label="确认密码">
          <el-input
            v-model="form.checkPass"
            autocomplete="off"
            placeholder="请输入确认密码"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="FormVisible()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import homeApi from "@/api/home";

export default {
  name: "my-header",
  data() {
    // <!--验证密码-->
    let validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkpassword !== "") {
          this.$refs.form.validateField("checkpassword");
        }
        callback();
      }
    };
    // <!--二次验证密码-->
    let validatepassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        username: "",
        phone: "",
        email: "",
        password: "",
        newPass: "",
        checkPass: "",
      },
      formLabelWidth: "100px",
      dialogVisible: false,
      rules: {
        newpassword: [{ validator: validatepassword, trigger: "change" }],
        checkpassword: [{ validator: validatepassword2, trigger: "change" }],
      },
    };
  },
  created() {
    this.getPersonalInfo();
  },
  methods: {
    getPersonalInfo() {
      this.form.username = this.$session.get("username");
      this.form.phone = this.$session.get("phone");
      this.form.email = this.$session.get("email");
      this.form.password = this.$session.get("password");
    },
    personalInfo() {
      this.dialogVisible = true;
    },

    FormVisible() {
      this.form.phone = this.$session.get("phone");
      if (this.form.newPass == this.form.checkPass) {
        homeApi
          .resetPassword(this.form.phone, this.form.username, this.form.newPass)
          .then((response) => {
            this.$message({
              message: "修改密码成功",
              type: "success",
            });
            this.$router.push("/");
          })
          .catch((error) => {
            this.$message({
              message: "修改密码失败",
              type: "error",
            });
          });
      } else {
        this.$message({
          message: "两次输入密码不一致！",
        });
      }
    },

    handleSignout() {
      //1.清除token
      localStorage.clear();
      //2。提示退出登录
      this.$session.clear();
      this.$message.success("退出成功");
      //3.退出到登录页面
      this.$router.push({ name: "Login" });
    },
  },
  handleClick() {
    alert("button click");
  },
};
</script>
<style scoped>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
/* .modify {
  margin: 0 auto;
  width: 900px;
  padding: 15px 35px 15px 35px;
} */
</style>
