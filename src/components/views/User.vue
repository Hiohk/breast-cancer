<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0px 0px">
        <el-container style="height: 100%; width: 100%">
          <el-header style="height: 150px">
            <div class="header">
              <div class="main-header">
                <my-header></my-header>
              </div>
            </div>
          </el-header>
          <el-main class="main">
            <div>
              <div v-if="seen == 0">
                <el-form :inline="true" class="demo-form-inline">
                  <el-button type="primary" icon="el-icon-plus" @click="goAddQusetionNa()"
                    >辅助诊断</el-button
                  >
                </el-form>
                <br />
                <!-- 细胞学活检   血常规分析 -->
                <div>
                  <el-tabs type="border-card">
                    <el-tab-pane>
                      <span slot="label"
                        ><i class="el-icon-data-analysis"></i>细胞学活检</span
                      >
                      <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="姓名">
                          <el-input
                            v-model="searchInfo.name"
                            size="medium"
                            placeholder="姓名"
                          />
                        </el-form-item>
                        <el-button
                          size="medium"
                          type="primary"
                          icon="el-icon-search"
                          @click="fetchCell(searchInfo.name)"
                          >查询</el-button
                        >
                      </el-form>
                      <el-table :data="tableData" stripe border style="width: 100%">
                        <el-table-column width="200" align="center" type="selection">
                        </el-table-column>
                        <el-table-column prop="id" label="ID" align="center">
                        </el-table-column>
                        <el-table-column
                          prop="create_time"
                          label="创建时间"
                          align="center"
                          sortable=""
                        >
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" align="center">
                        </el-table-column>
                        <el-table-column prop="operation" label="操作" align="center">
                          <template slot-scope="scope">
                            <el-popover placement="right" width="400" trigger="click">
                              <el-descriptions
                                class="margin-top"
                                title="详细信息"
                                :column="1"
                                :detailedData="detailedData"
                                border
                              >
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-user"></i>
                                    姓名
                                  </template>
                                  {{ detailedData.name }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    肿块厚度
                                  </template>
                                  {{ detailedData.thickness }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    细胞大小的均匀性
                                  </template>
                                  {{ detailedData.sizeUniformity }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    细胞形状的均匀性
                                  </template>
                                  {{ detailedData.shapeUniformity }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    边际附着力
                                  </template>
                                  {{ detailedData.adhesion }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    单个上皮细胞大小
                                  </template>
                                  {{ detailedData.cellSize }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    裸核
                                  </template>
                                  {{ detailedData.nakedCore }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    染色质的颜色
                                  </template>
                                  {{ detailedData.chromatinColor }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    核仁正常情况
                                  </template>
                                  {{ detailedData.nucleolusCondition }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    有丝分裂情况
                                  </template>
                                  {{ detailedData.mitosisSituation }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    患病风险
                                  </template>
                                  <el-tag size="small" type="danger"
                                    >{{
                                      (detailedData.disease_rate * 100).toFixed(2)
                                    }}%</el-tag
                                  >
                                </el-descriptions-item>
                              </el-descriptions>
                              <el-button
                                slot="reference"
                                size="small"
                                type="primary"
                                @click="checkInfo(scope.row.id)"
                                >查看</el-button
                              >
                            </el-popover>
                            <el-button
                              type="danger"
                              size="small"
                              @click="cellInformation(scope.row.id)"
                            >
                              删除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        align="center"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="pageOptions"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount"
                      >
                      </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane>
                      <span slot="label"
                        ><i class="el-icon-data-line"></i>血常规分析</span
                      >
                      <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="姓名">
                          <el-input
                            v-model="searchInfo.name"
                            size="medium"
                            placeholder="姓名"
                          />
                        </el-form-item>
                        <el-button
                          size="medium"
                          type="primary"
                          icon="el-icon-search"
                          @click="fetchBlood(searchInfo.name)"
                          >查询</el-button
                        >
                      </el-form>
                      <el-table :data="bloodData" stripe border style="width: 100%">
                        <el-table-column width="200" align="center" type="selection">
                        </el-table-column>
                        <el-table-column prop="id" label="ID" align="center">
                        </el-table-column>
                        <el-table-column
                          prop="create_time"
                          label="创建时间"
                          align="center"
                          sortable=""
                        >
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" align="center">
                        </el-table-column>
                        <el-table-column prop="operation" label="操作" align="center">
                          <template slot-scope="scope">
                            <el-popover placement="right" width="400" trigger="click">
                              <el-descriptions
                                class="margin-top"
                                title="详细信息"
                                :column="1"
                                :detailedBloodData="detailedBloodData"
                                border
                              >
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-user"></i>
                                    姓名
                                  </template>
                                  {{ detailedBloodData.name }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    年龄
                                  </template>
                                  {{ detailedBloodData.age }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    身体质量指数(BMI)
                                  </template>
                                  {{ detailedBloodData.bmi }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    葡萄糖
                                  </template>
                                  {{ detailedBloodData.glucose }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    胰岛素
                                  </template>
                                  {{ detailedBloodData.insulin }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    胰岛素抵抗
                                  </template>
                                  {{ detailedBloodData.homa }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    瘦素
                                  </template>
                                  {{ detailedBloodData.leptin }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    脂联素
                                  </template>
                                  {{ detailedBloodData.adiponectin }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    抵抗素
                                  </template>
                                  {{ detailedBloodData.resistin }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    单核细胞趋化蛋白-1
                                  </template>
                                  {{ detailedBloodData.mcp1 }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                  <template slot="label">
                                    <i class="el-icon-tickets"></i>
                                    患病风险
                                  </template>
                                  <el-tag size="small" type="danger"
                                    >{{
                                      (detailedBloodData.disease_rate * 100).toFixed(2)
                                    }}%</el-tag
                                  >
                                </el-descriptions-item>
                              </el-descriptions>
                              <el-button
                                slot="reference"
                                size="small"
                                type="primary"
                                @click="checkBloodInfo(scope.row.id)"
                                >查看</el-button
                              >
                            </el-popover>
                            <el-button
                              type="danger"
                              size="small"
                              @click="bloodInformation(scope.row.id)"
                            >
                              删除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        align="center"
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page="currentPage2"
                        :page-sizes="pageOptions2"
                        :page-size="pageSize2"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount2"
                      >
                      </el-pagination>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <br />
              </div>
              <div v-else-if="seen == 1">
                <my-qnaire ref="myqnaire"></my-qnaire>
              </div>
              <!-- <div v-else-if="seen == 2">
                <check-ques></check-ques>
              </div> -->
            </div>
          </el-main>
          <el-footer class="footer">©All Rights Reserved</el-footer>

          <el-dialog title="" :visible.sync="dialogVisibleCell" width="30%">
            <span class="delete-span"
              ><i class="el-icon-info" style="color: red"></i>
              确定删除该数据吗？该操作不可撤销</span
            >
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleCell = false">取 消</el-button>
              <el-button type="primary" @click="deleteInformation()">确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog title="" :visible.sync="dialogVisibleBlood" width="30%">
            <span class="delete-span"
              ><i class="el-icon-info" style="color: red"></i>
              确定删除该数据吗？该操作不可撤销</span
            >
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleBlood = false">取 消</el-button>
              <el-button type="primary" @click="deleteBloodInfo()">确 定</el-button>
            </span>
          </el-dialog>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import homeApi from "@/api/home";
import MyHeader from "@/components/Header.vue";
import MyQnaire from "@/components/QuestionNaire.vue";
import CheckQues from "@/components/CheckQues.vue";
import cellApi from "@/api/prediction.js";
import moment from "moment";

export default {
  components: {
    MyHeader,
    MyQnaire,
    CheckQues,
  },
  data() {
    return {
      cellId: 0,
      bloodId: 0,
      dialogVisibleBlood: false,
      dialogVisibleCell: false,
      pageSize: 5, //每页条数
      pageOptions: [2, 5, 10, 20],
      currentPage: 1, //当前页码
      totalCount: 0, //总数据条数\

      pageSize2: 5, //每页条数
      pageOptions2: [2, 5, 10, 20],
      currentPage2: 1, //当前页码
      totalCount2: 0, //总数据条数
      searchInfo: {
        id: "",
        name: "",
      },
      detailedData: {},
      detailedBloodData: {},
      tableData: [],
      bloodData: [],
    };
  },
  computed: {
    seen() {
      this.fetchList();
      this.fetchBloodList();
      return this.$store.state.seen;
    },
    quesId() {
      return this.$store.state.quesId;
    },
  },
  created() {
    this.fetchList();
    this.fetchBloodList();
  },
  methods: {
    fetchList() {
      // this.searchInfo.phone = this.$session.get("phone");
      // this.searchInfo.bcraPhone = this.$store.state.form.phone;
      // console.log("手机号", this.$store.state.form.phone);
      // console.log(this.searchInfo.phone);
      cellApi
        .cellBiopsyGet()
        .then((response) => {
          this.tableData = response;
          this.totalCount = this.tableData.length;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].create_time = moment(this.tableData[i].create_time)
              .utc()
              .format("YYYY-MM-DD HH:mm:ss");
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "查询数据失败",
            type: "error",
          });
        });
    },
    //删除一条数据
    cellInformation(id) {
      this.dialogVisibleCell = true;
      this.cellId = id;
    },
    deleteInformation() {
      cellApi
        .cellBiopsyDelete(this.cellId)
        .then((response) => {
          this.tableData = response;
          this.totalCount = this.tableData.length;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].create_time = moment(this.tableData[i].create_time)
              .utc()
              .format("YYYY-MM-DD HH:mm:ss");
          }
          this.$message({
            showClose: true,
            message: "删除数据成功",
            type: "warning",
          });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "删除数据失败",
            type: "error",
          });
        });
      this.dialogVisibleCell = false;
    },

    fetchBloodList() {
      cellApi
        .bloodAnalysisGet()
        .then((response) => {
          this.bloodData = response;
          this.totalCount2 = this.bloodData.length;
          for (let i = 0; i < this.bloodData.length; i++) {
            this.bloodData[i].create_time = moment(this.bloodData[i].create_time)
              .utc()
              .format("YYYY-MM-DD HH:mm:ss");
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "查询血常规数据失败",
            type: "error",
          });
        });
    },
    //血常规分析模块删除数据
    bloodInformation(id) {
      this.dialogVisibleBlood = true;
      this.bloodId = id;
    },
    deleteBloodInfo() {
      cellApi
        .bloodAnalysisDelete(this.bloodId)
        .then((response) => {
          this.bloodData = response;
          this.totalCount2 = this.bloodData.length;
          for (let i = 0; i < this.bloodData.length; i++) {
            this.bloodData[i].create_time = moment(this.bloodData[i].create_time)
              .utc()
              .format("YYYY-MM-DD HH:mm:ss");
          }
          this.$message({
            showClose: true,
            message: "删除数据成功",
            type: "warning",
          });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "删除数据失败",
            type: "error",
          });
        });
      this.dialogVisibleBlood = false;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // this.fetchList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.fetchList();
    },
    handleSizeChange2(val) {
      this.pageSize2 = val;
      // this.fetchBloodList();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      // this.fetchBloodList();
    },
    goAddQusetionNa() {
      this.$store.commit("ChangeUserState", 1);
      this.$router.push({
        name: "Questionnaire",
      });
    },
    checkInfo(id) {
      this.tableData.some((item) => {
        if (item.id === id) {
          this.detailedData = item;
        }
      });
    },
    checkBloodInfo(id) {
      this.bloodData.some((item) => {
        if (item.id === id) {
          this.detailedBloodData = item;
        }
      });
    },
    fetchCell(name) {
      if (this.searchInfo.name == "") {
        this.fetchList();
      } else {
        this.tableData = this.tableData.filter((item) => item.name.includes(name));
      }
    },
    fetchBlood(name) {
      if (this.searchInfo.name == "") {
        this.fetchBloodList();
      } else {
        this.bloodData = this.bloodData.filter((item) => item.name.includes(name));
      }
    },
  },
};
</script>

<style scoped>
.main-header {
  width: 50px;
  height: 20px;
  /* padding: 10px 0px 0px 1630px; */
  padding: 1% 6% 0 94%;
}
.main {
  margin-bottom: 20px;
}
.selectTab {
  width: 350px;
  height: 40px;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.header {
  width: 100%;
  height: 150px;
  margin: 0;
  padding: 0;
  background: url("../../assets/kz.png") no-repeat;
  background-repeat: no-repeat;
  /* -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover; */
  background-size: 100% 100%;
}
.el-header {
  padding: 0px 0px;
  /* line-height: 80px; */
  /* border-bottom: 1px solid #d6dfea; */
}
.footer {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px !important;
  line-height: 30px;
  text-align: center;
  background-color: rgb(229, 229, 229);
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
.delete-span {
  font-size: 16px;
}
</style>
