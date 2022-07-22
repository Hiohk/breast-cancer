<template>
  <div class="hello">
    <div class="mintitle">
      <el-button type="primary" plain @click="close()">返回</el-button>
    </div>
    <div class="question">
      <el-tabs type="border-card">
        <el-tab-pane label="细胞学活检">
          <el-form
            :model="cellForm"
            :rules="rules1"
            ref="cellForm"
            label-width="150px"
            class="demo-ruleForm cellForm"
          >
            <el-form-item label="1.姓名" prop="patientName">
              <el-input v-model="cellForm.patientName"></el-input>
            </el-form-item>

            <el-form-item label="2.肿块厚度" prop="thickness">
              <el-input v-model="cellForm.thickness"></el-input>
            </el-form-item>

            <el-form-item label="3.细胞大小的均匀性" prop="sizeUniformity">
              <el-input v-model="cellForm.sizeUniformity"></el-input>
            </el-form-item>

            <el-form-item label="4.细胞形状的均匀性" prop="shapeUniformity">
              <el-input v-model="cellForm.shapeUniformity"></el-input>
            </el-form-item>

            <el-form-item label="5.边际附着力" prop="adhesion">
              <el-input v-model="cellForm.adhesion"></el-input>
            </el-form-item>

            <el-form-item label="6.单个上皮细胞大小" prop="cellSize">
              <el-input v-model="cellForm.cellSize"></el-input>
            </el-form-item>

            <el-form-item label="7.裸核" prop="nakedCore">
              <el-input v-model="cellForm.nakedCore"></el-input>
            </el-form-item>

            <el-form-item label="8.染色质的颜色" prop="chromatinColor">
              <el-input v-model="cellForm.chromatinColor"></el-input>
            </el-form-item>

            <el-form-item label="9.核仁正常情况" prop="nucleolusCondition">
              <el-input v-model="cellForm.nucleolusCondition"></el-input>
            </el-form-item>

            <el-form-item label="10.有丝分裂情况" prop="mitosisSituation">
              <el-input v-model="cellForm.mitosisSituation"></el-input>
            </el-form-item>

            <div class="fillProgress">
              <el-progress
                type="circle"
                :percentage="percentage"
                :color="customColorMethod(percentage)"
              ></el-progress>
            </div>

            <div class="result" v-show="accuracy1">
              <el-card shadow="hover" class="box-card">
                <div slot="header" class="clearfix">
                  <span class="rate-card"
                    ><i class="el-icon-warning-outline"></i>患病风险</span
                  >
                </div>
                <div class="text item">
                  <div>
                    经过分析,患者
                    <span class="name-card">{{ cellForm.patientName }}</span>
                    的患病风险为:
                    <strong
                      ><el-tag size="medium" type="danger" class="cancer-rate"
                        >{{ (accuracy1 * 100).toFixed(2) }}%</el-tag
                      ></strong
                    >
                  </div>
                  <br />
                  <p style="color: red">请结合专家诊断！</p>
                </div>
              </el-card>
            </div>

            <el-form-item>
              <el-button type="primary" @click="submitForm1(cellForm)"
                >立即分析</el-button
              >
              <el-button @click="resetForm1('cellForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="血常规分析">
          <el-form
            :model="bloodForm"
            :rules="rules2"
            ref="bloodForm"
            label-width="250px"
            class="demo-ruleForm bloodForm"
          >
            <el-form-item label="1.姓名" prop="patientName">
              <el-input v-model="bloodForm.patientName"> </el-input>
            </el-form-item>
            <el-form-item label="2.年龄(Age)" prop="age">
              <el-input v-model="bloodForm.age"> </el-input>
            </el-form-item>

            <el-form-item label="3.身体质量指数(BMI)" prop="bmi">
              <el-input v-model="bloodForm.bmi">
                <i slot="suffix">kg/m²</i>
              </el-input>
            </el-form-item>

            <el-form-item label="4.葡萄糖(Glucose)" prop="glucose">
              <el-input v-model="bloodForm.glucose">
                <i slot="suffix">mg/mL</i>
              </el-input>
            </el-form-item>

            <el-form-item label="5.胰岛素(Insulin)" prop="insulin">
              <el-input v-model="bloodForm.insulin">
                <i slot="suffix">μU/mL</i>
              </el-input>
            </el-form-item>

            <el-form-item label="6.胰岛素抵抗(HOMA)" prop="homa">
              <el-input v-model="bloodForm.homa"></el-input>
            </el-form-item>

            <el-form-item label="7.瘦素(Leptin)" prop="leptin">
              <el-input v-model="bloodForm.leptin">
                <i slot="suffix">ng/mL</i>
              </el-input>
            </el-form-item>

            <el-form-item label="8.脂联素(Adiponectin)" prop="adiponectin">
              <el-input v-model="bloodForm.adiponectin">
                <i slot="suffix">μg/mL</i>
              </el-input>
            </el-form-item>

            <el-form-item label="9.抵抗素(Resistin)" prop="resistin">
              <el-input v-model="bloodForm.resistin">
                <i slot="suffix">ng/mL</i>
              </el-input>
            </el-form-item>

            <el-form-item label="10.单核细胞趋化蛋白-1(MCP-1)" prop="mcp1">
              <el-input v-model="bloodForm.mcp1">
                <i slot="suffix">pg/mL</i>
              </el-input>
            </el-form-item>

            <div class="fillProgress">
              <el-progress
                type="circle"
                :percentage="percentage2"
                :color="customColorMethod(percentage2)"
              ></el-progress>
            </div>

            <div class="bloodResult" v-show="accuracy2">
              <el-card shadow="hover" class="box-card">
                <div slot="header" class="clearfix">
                  <span style="fontsize: 16px"
                    ><i class="el-icon-warning-outline"></i>患病风险</span
                  >
                </div>
                <div class="text item">
                  <div>
                    经过分析,患者
                    <span class="name-card">{{ bloodForm.patientName }}</span>
                    的患病风险为:
                    <strong
                      ><el-tag size="medium" type="danger" class="cancer-rate"
                        >{{ (accuracy2 * 100).toFixed(2) }}%</el-tag
                      ></strong
                    >
                  </div>
                  <br />
                  <p style="color: red">请结合专家诊断！</p>
                </div>
              </el-card>
            </div>

            <el-form-item>
              <el-button type="primary" @click="submitForm2('bloodForm')"
                >立即分析</el-button
              >
              <el-button @click="resetForm2('bloodForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
      <span>确定关闭吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import "./index.css";
import "../../src/utils/jquery.min.js";
import cellApi from "@/api/prediction.js";

export default {
  name: "my-qnaire",
  components: {},
  data() {
    return {
      accuracy1: "",
      accuracy2: "",
      dialogVisible: false,
      percentage: 0,
      percentage2: 0,
      cellForm: {
        patientName: "", //姓名
        thickness: "", //肿块厚度
        sizeUniformity: "", //细胞大小的均匀性
        shapeUniformity: "", //细胞形状的均匀性
        adhesion: "", //边际附着力
        cellSize: "", //单个上皮细胞大小
        nakedCore: "", //裸核
        chromatinColor: "", //染色质的颜色
        nucleolusCondition: "", //核仁正常情况
        mitosisSituation: "", //有丝分裂情况
      },
      bloodForm: {
        patientName: "",
        age: "", //年龄
        bmi: "", //身体质量指数(BMI) (kg/m²)
        glucose: "", //葡萄糖
        insulin: "", //胰岛素
        homa: "", //胰岛素抵抗
        leptin: "", //瘦素
        adiponectin: "", //脂联素
        resistin: "", //抵抗素
        mcp1: "", //单核细胞趋化蛋白-1
      },
      rules1: {
        patientName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        thickness: [
          { required: true, message: "请输入肿块厚度", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        sizeUniformity: [
          { required: true, message: "请输入细胞大小的均匀性", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        shapeUniformity: [
          { required: true, message: "请输入细胞形状的均匀性", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        adhesion: [
          { required: true, message: "请输入边际附着力", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        cellSize: [
          { required: true, message: "请输入单个上皮细胞大小", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        nakedCore: [
          { required: true, message: "请输入裸核", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        chromatinColor: [
          { required: true, message: "请输入染色质的颜色", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        nucleolusCondition: [
          { required: true, message: "请输入核仁正常情况", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        mitosisSituation: [
          { required: true, message: "请输入有丝分裂情况", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
      },
      rules2: {
        patientName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        bmi: [
          { required: true, message: "请输入身体质量指数", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        glucose: [
          { required: true, message: "请输入葡萄糖数量", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        insulin: [
          { required: true, message: "请输入胰岛素数量", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        homa: [
          { required: true, message: "请输入胰岛素抵抗", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        leptin: [
          { required: true, message: "请输入瘦素", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        adiponectin: [
          { required: true, message: "请输入脂联素", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        resistin: [
          { required: true, message: "请输入抵抗素", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        mcp1: [
          { required: true, message: "请输入单核细胞趋化蛋白-1", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    submitElementCell() {
      const { cellForm } = this;
      return {
        cellForm,
      };
    },
    submitElementBlood() {
      const { bloodForm } = this;
      return {
        bloodForm,
      };
    },
  },
  watch: {
    submitElementCell: {
      handler: function (val) {
        let innerCount = 0;
        if (val.cellForm.patientName) {
          innerCount++;
        }
        if (val.cellForm.thickness) {
          innerCount++;
        }
        if (val.cellForm.sizeUniformity) {
          innerCount++;
        }
        if (val.cellForm.shapeUniformity) {
          innerCount++;
        }
        if (val.cellForm.adhesion) {
          innerCount++;
        }
        if (val.cellForm.cellSize) {
          innerCount++;
        }
        if (val.cellForm.nakedCore) {
          innerCount++;
        }
        if (val.cellForm.chromatinColor) {
          innerCount++;
        }
        if (val.cellForm.nucleolusCondition) {
          innerCount++;
        }
        if (val.cellForm.mitosisSituation) {
          innerCount++;
        }
        this.percentage = parseInt((innerCount / 10) * 100);
      },
      deep: true,
    },
    submitElementBlood: {
      handler: function (val) {
        let innerCount = 0;
        if (val.bloodForm.patientName) {
          innerCount++;
        }
        if (val.bloodForm.age) {
          innerCount++;
        }
        if (val.bloodForm.bmi) {
          innerCount++;
        }
        if (val.bloodForm.glucose) {
          innerCount++;
        }
        if (val.bloodForm.insulin) {
          innerCount++;
        }
        if (val.bloodForm.homa) {
          innerCount++;
        }
        if (val.bloodForm.leptin) {
          innerCount++;
        }
        if (val.bloodForm.adiponectin) {
          innerCount++;
        }
        if (val.bloodForm.resistin) {
          innerCount++;
        }
        if (val.bloodForm.mcp1) {
          innerCount++;
        }
        this.percentage2 = parseInt((innerCount / 10) * 100);
      },
      deep: true,
    },
  },
  methods: {
    //点击关闭问卷
    close() {
      this.dialogVisible = true;
    },
    //确定关闭问卷
    handleConfirm() {
      this.dialogVisible = false;
      this.$router.push("/user");
      this.$store.commit("ChangeUserState", 0);
    },
    //细胞学活检
    submitForm1(e) {
      cellApi
        .cellBiopsyPost(this.cellForm)
        .then((response) => {
          console.log("response", response);
          this.accuracy1 = response;
          this.$message({
            showClose: true,
            message: "提交成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "提交失败",
            type: "error",
          });
        });
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },
    customColorMethod(percentage) {
      if (percentage < 20) {
        return "#909399";
      } else if (percentage < 40) {
        return "#F0E68C";
      } else if (percentage < 60) {
        return "#FFD700";
      } else if (percentage < 80) {
        return "#E6A23C";
      } else if (percentage < 90) {
        return "#788D6D";
      } else {
        return "#67c23a";
      }
    },
    //血常规分析
    submitForm2(e) {
      cellApi
        .bloodAnalysisPost(this.bloodForm)
        .then((response) => {
          this.accuracy2 = response;
          this.$message({
            showClose: true,
            message: "提交成功",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "提交失败",
            type: "error",
          });
        });
    },
    resetForm2(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.fillProgress {
  position: absolute;
  top: 15px;
  right: 20%;
}
.result {
  position: absolute;
  top: 30%;
  transform: translate(0, 0, 0);
  right: 10%;
  width: 300px;
}
.bloodResult {
  position: absolute;
  top: 30%;
  transform: translate(0, 0, 0);
  right: 6%;
  width: 300px;
}
.btn:focus {
  outline: none;
}

.text {
  font-size: 16px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.hello {
  position: relative;
}
.mintitle {
  position: absolute;
  top: 0;
  left: 15%;
}
.question {
  width: 60%;
  margin: 0 auto;
}
.cellForm {
  width: 52%;
}
.bloodForm {
  width: 60%;
}
.cancer-rate {
  font-size: 24px;
}
.rate-card {
  font-size: 16px;
}
.name-card {
  font-weight: 600;
  color: orange;
}
</style>
