<template>
  <div>
    <el-header style="height: 150px">
      <div class="header">
        <div class="main-header">
          <my-header></my-header>
        </div>
      </div>
    </el-header>
    <el-main style="height: 520px" class="elmain">
      <div class="container-fluid no-gutters">
        <div class="row no-gutters">
          <div class="col-xs-6 col-md-4 col-lg-2 tac">
            <el-row>
              <el-col>
                <el-menu
                  :router="true"
                  default-active="1"
                  class="el-menu-vertical-demo nav"
                >
                  <el-menu-item index="admin">
                    <i class="el-icon-menu"></i>
                    <span slot="title">问卷管理</span>
                  </el-menu-item>
                  <el-menu-item index="userman">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">用户管理</span>
                  </el-menu-item>
                  <el-menu-item index="datas">
                    <i class="el-icon-document"></i>
                    <span slot="title">数据统计</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-8 col-lg-10 main-view">
            <div v-if="seen == 3">
              <check-ques></check-ques>
            </div>
            <div v-else>
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer style="height: 20px">©All Rights Reserved</el-footer>
  </div>
</template>

<script>
import MyHeader from "@/components/Header.vue";
import MyAdmin from "@/components/Admin.vue";
import CheckQues from "@/components/CheckQues.vue";
export default {
  components: {
    MyHeader,
    MyAdmin,
    CheckQues,
  },
  data() {
    return {
      // loading: false,
    };
  },
  computed: {
    seen() {
      return this.$store.state.seen;
    },
  },
  methods: {},
};
</script>

<style scoped>
.main-view {
  /* position: relative;
  overflow: hidden; */
  overflow-y: hidden;
}
.container {
  height: 100%;
  width: 100%;
  margin: 0px 0px;
  padding: 0px 0px;
}
.nav {
  height: 600px;
  background-color: #adb7c2;
}
.main-header {
  width: 50px;
  height: 20px;
  padding: 1% 6% 0 94%;
}

/* .selectTab {
  width: 350px;
  height: 40px;
} */
body {
  margin: 0;
  padding: 0;
}
.header {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: url("../../assets/BG.jpg") no-repeat;
  background-size: 100% 100%;
}
.el-header {
  padding: 0px 0px;
  width: 100%;
  /* line-height: 80px; */
  /* border-bottom: 1px solid #d6dfea; */
}
.el-footer {
  text-align: center;
  line-height: 20px;
  margin: 0px;
  padding: 0px;
}
.elmain {
  height: 100%;
  margin: 0px;
  padding: 0px 0px;
  margin-top: 10px;
}
.el-card {
  /* margin: 0px 0px;
  padding: 0px 0px; */
  line-height: 10px;
  display: flex;
  justify-content: space-between;
}
.smallspan {
  border: 1px black solid;
  height: 20px;
}
.tab1 {
  margin: 0px 10px 0px 10px;
  /* width: 580px; */
  /* display: flex;
  justify-content: space-between; */
}
.tab2 {
  border: 1px solid #c9cdd1;
  margin: 0px 220px 0px 220px;
  height: 40px;
  background-color: #c4d3e5;
}
.tac {
  padding: 0px 0px;
}
</style>
