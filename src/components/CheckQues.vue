<template>
  <div class="hello">
    <div class="mintitle">
      <el-button icon="el-icon-close" type="primary" @click="close()"
        >关闭问卷</el-button
      >
      <span v-if="seen == 2" style="font-size: 20px; margin-left: 280px"
        >非导管原位癌风险评估问卷（查看已填内容）</span
      >
      <span v-if="seen == 3" style="font-size: 20px; margin-left: 280px"
        >非导管原位癌风险评估问卷（修改问卷内容）</span
      >
    </div>

    <div class="main-que">
      <div v-show="!seenResult">
        <el-steps
          :active="active"
          align-center
          finish-status="success"
          process-status="process"
        >
          <el-step title="个人因素" description="1"></el-step>
          <el-step title="生理因素" description="2"></el-step>
          <el-step title="生活习惯" description="3"></el-step>
          <el-step title="个人健康信息" description="4"></el-step>
          <el-step title="个人及家族病史" description="5"></el-step>
          <el-step title="基因检测" description="6"></el-step>
        </el-steps>
        <div
          v-show="dataIndex === index1"
          v-for="(item1, index1) in questionModule"
          class="question"
          :key="index1"
        >
          <div class="content">
            <div class="num" style="font-size: 20px">{{ index1 + 1 }}.</div>
            <div class="title" style="font-size: 20px">
              {{ item1.questionModuleTitle }}
            </div>
            <div
              class="que_answer"
              v-for="(item2, index2) in item1.question"
              :key="index2"
            >
              <el-form ref="item2" :model="item2">
                <!-- 输入 -->
                <template
                  v-if="(item2.questionType === 0) & (item2.isRequired === '1')"
                >
                  <el-form-item label="">
                    <div style="font-size: 15px">
                      {{ item2.questionId }}.{{ item2.questionTitle }}
                    </div>
                    <div
                      v-if="item2.questionTitle === '出生日期'"
                      class="block"
                    >
                      <el-date-picker
                        v-model="item2.answer"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </div>
                    <el-input v-else v-model="item2.answer"></el-input>
                  </el-form-item>
                </template>
                <!-- 单选 -->
                <template
                  v-else-if="
                    (item2.questionType === 1) & (item2.isRequired === '1')
                  "
                >
                  <el-form-item>
                    <div>{{ item2.questionId }}.{{ item2.questionTitle }}</div>
                    <el-select
                      v-model="item2.answer"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item3 in item2.option"
                        :key="item3.optionId"
                        :label="item3.optionTitle"
                        :value="item3.optionTitle"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <!-- 多选 -->
                <template
                  v-else-if="
                    (item2.questionType === 2) & (item2.isRequired === '1')
                  "
                >
                  <el-form-item>
                    <div>{{ item2.questionId }}.{{ item2.questionTitle }}</div>
                    <el-select
                      v-model="item2.answer"
                      multiple
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item3 in item2.option"
                        :key="item3.optionId"
                        :label="item3.optionTitle"
                        :value="item3.optionTitle"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <!-- 单选 非必要 -->
                <template
                  v-if="
                    (item2.questionTitle === '民族') & (item2.answer === '其他')
                  "
                >
                  <div v-for="(item4, index4) in item1.question" :key="index4">
                    <div v-if="item4.questionTitle === '请注明民族类型'">
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}.{{ item4.questionTitle }}
                        </div>
                        <el-input
                          v-model="item4.answer"
                          placeholder="请输入民族"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </template>
                <template
                  v-if="
                    (item2.questionTitle === '您生育过几个孩子？') &
                    (item2.answer > '0')
                  "
                >
                  <div v-for="(item4, index4) in item1.question" :key="index4">
                    <div v-if="item4.questionTitle === '您生育头胎时几岁？'">
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}{{ item4.questionTitle }}
                        </div>
                        <el-input
                          v-model="item4.answer"
                          placeholder="请输入年龄"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div
                      v-if="
                        item4.questionTitle ===
                        '您母乳喂养的累积时间为多少个月？'
                      "
                    >
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}{{ item4.questionTitle }}
                        </div>
                        <el-input
                          v-model="item4.answer"
                          placeholder="请输入时间"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </template>
                <template
                  v-if="
                    (item2.questionTitle === '您经历绝经了吗？') &
                    (item2.answer === '已绝经')
                  "
                >
                  <div v-for="(item4, index4) in item1.question" :key="index4">
                    <div v-if="item4.questionTitle === '绝经年龄（岁）'">
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}{{ item4.questionTitle }}
                        </div>
                        <el-input
                          v-model="item4.answer"
                          placeholder="请输入年龄"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </template>
                <template
                  v-if="
                    (item2.questionTitle === '您吸烟吗？') &
                    ((item2.answer === '偶尔') |
                      (item2.answer === '经常') |
                      (item2.answer === '已戒烟'))
                  "
                >
                  <div v-for="(item4, index4) in item1.question" :key="index4">
                    <div v-if="item4.questionTitle === '您烟龄有多长？'">
                      <el-form-item>
                        <div>
                          {{ item4.questionId }}{{ item4.questionTitle }}
                        </div>
                        <el-select
                          v-model="item4.answer"
                          clearable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item5 in item4.option"
                            :key="item5.optionId"
                            :label="item5.optionTitle"
                            :value="item5.optionTitle"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                </template>
                <template
                  v-if="
                    (item2.questionTitle === '您吸烟吗？') &
                    (item2.answer === '从不')
                  "
                >
                  <div v-for="(item4, index4) in item1.question" :key="index4">
                    <div
                      v-if="
                        item4.questionTitle ===
                        '您平均每周有几天会被动吸烟？（被动吸烟指暴露在烟雾中15分钟）'
                      "
                    >
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}{{ item4.questionTitle }}
                        </div>
                        <el-select
                          v-model="item4.answer"
                          clearable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item5 in item4.option"
                            :key="item5.optionId"
                            :label="item5.optionTitle"
                            :value="item5.optionTitle"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                </template>
                <template
                  v-if="
                    (item2.questionTitle === '您是否使用过激素替代疗法？') &
                    ((item2.answer === '曾服用，已停用5年以上') |
                      (item2.answer === '曾服用，已停用不到5年') |
                      (item2.answer === '正在使用'))
                  "
                >
                  <div v-for="(item4, index4) in item1.question" :key="index4">
                    <div
                      v-if="
                        item4.questionTitle === '请说明使用激素替代疗法的原因'
                      "
                    >
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}{{ item4.questionTitle }}
                        </div>
                        <el-input
                          v-model="item4.answer"
                          placeholder="请输入原因"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </template>
                <template
                  v-if="
                    (item2.questionTitle === '您是否接受过胸部放疗？') &
                    (item2.answer === '是')
                  "
                >
                  <div v-for="(item4, index4) in item1.question" :key="index4">
                    <div
                      v-if="item4.questionTitle === '请说明接受胸部放疗的原因'"
                    >
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}{{ item4.questionTitle }}
                        </div>
                        <el-input
                          v-model="item4.answer"
                          placeholder="请输入原因"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div
                      v-if="item4.questionTitle === '请说明接受胸部放疗的年龄'"
                    >
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}{{ item4.questionTitle }}
                        </div>
                        <el-input
                          v-model="item4.answer"
                          placeholder="请输入年龄"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </template>
                <template
                  v-if="
                    (item2.questionTitle === '您是否接受过乳腺活检？') &
                    ((item2.answer === '1次活检') |
                      (item2.answer === '2次活检及以上'))
                  "
                >
                  <div v-for="(item4, index4) in item1.question" :key="index4">
                    <div v-if="item4.questionTitle === '您的乳腺活检结果是？'">
                      <el-form-item>
                        <div style="font-size: 15px">
                          {{ item4.questionId }}.{{ item4.questionTitle }}
                        </div>
                        <el-select
                          v-model="item4.answer"
                          multiple
                          clearable
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item5 in item4.option"
                            :key="item5.optionId"
                            :label="item5.optionTitle"
                            :value="item5.optionTitle"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                </template>
                <template
                  v-if="
                    (item2.questionTitle === '您或家族成员患过肿瘤吗？') &
                    (item2.answer === '是')
                  "
                >
                  <el-button
                    v-show="seen == 1 || seen == 2"
                    type="warning"
                    @click="addNewHiostory()"
                    >添加患病亲属的信息</el-button
                  >
                  <el-divider></el-divider>
                  <el-table
                    :data="tableData1"
                    style="width: 100%; margin-bottom: 20px"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form
                          label-position="left"
                          inline
                          class="demo-table-expand"
                        >
                          <el-form-item label="肿瘤类型:">
                            <span>{{ props.row.tumorType }}</span>
                          </el-form-item>
                          <el-form-item label="其他肿瘤类型名称:">
                            <span>{{ props.row.otherTumorType }}</span>
                          </el-form-item>
                          <el-form-item label="当前年龄:">
                            <span>{{ props.row.currentAge }}</span>
                          </el-form-item>
                          <el-form-item label="诊断年龄:">
                            <span>{{ props.row.diagnosisAge }}</span>
                          </el-form-item>
                          <el-form-item label="是否三阴性乳腺癌:">
                            <span>{{ props.row.tripleNegativeCancer }}</span>
                          </el-form-item>
                          <el-form-item label="乳腺癌原发病灶的数量:">
                            <span>{{ props.row.diseaseCount }}</span>
                          </el-form-item>
                          <el-form-item label="乳腺癌原发病灶是否在双侧:">
                            <span>{{ props.row.isInTwoSide }}</span>
                          </el-form-item>
                          <el-form-item label="乳腺癌原发病灶是否在双侧:">
                            <span>{{ props.row.filePath }}</span>
                          </el-form-item>
                          <el-form-item label="所上传文件：">
                            <el-image
                              style="width: 100px; height: 100px"
                              :src="props.row.filePath"
                              alt="尚未上传文件"
                            ></el-image>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column label="亲属关系" prop="relationship">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="success"
                          @click="
                            handleEditMedicalHistory(scope.$index, scope.row)
                          "
                          >编辑</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
                <template
                  v-if="
                    (item2.questionTitle ===
                      '您或家族成员做过基因检测，并被证实携带基因变异吗？') &
                    (item2.answer === '是')
                  "
                >
                  <el-button
                    v-show="seen == 1 || seen == 2"
                    type="warning"
                    @click="addNewGene()"
                    >添加基因检测亲属的信息</el-button
                  >
                  <el-divider></el-divider>
                  <el-table
                    :data="tableData2"
                    style="width: 100%; margin-bottom: 20px"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form
                          label-position="left"
                          inline
                          class="demo-table-expand"
                        >
                          <el-form-item label="样本类型:">
                            <span>{{ props.row.sampleType }}</span>
                          </el-form-item>
                          <el-form-item label="检测的基因:">
                            <span>{{ props.row.detectionGene }}</span>
                          </el-form-item>
                          <el-form-item label="变异类型:">
                            <span>{{ props.row.variationType }}</span>
                          </el-form-item>

                          <el-form-item label="所上传文件：">
                            <el-image
                              style="width: 100px; height: 100px"
                              :src="props.row.filePath"
                              alt="尚未上传文件"
                            ></el-image>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column label="基因检测亲属" prop="relationship">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="success"
                          @click="handleEditGene(scope.$index, scope.row)"
                          >编辑</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-form>
            </div>
            <template>
              <el-button-group>
                <span v-show="item1.questionModuleId === 1 ? isPrev : !isPrev">
                  <el-button
                    type="primary"
                    icon="el-icon-arrow-left"
                    @click="prePage()"
                    >上一页</el-button
                  >
                </span>
                <span
                  v-show="item1.questionModuleId === 6 ? isNext : !isNext"
                  class="next"
                >
                  <el-button type="primary" @click="nextPage()"
                    >下一页<i class="el-icon-arrow-right el-icon--right"></i
                  ></el-button>
                </span>
                <span
                  v-show="item1.questionModuleId === 6 ? isSubmit : !isSubmit"
                  class="submit"
                >
                  <el-button type="success" @click="submitPage()"
                    >提交问卷</el-button
                  >
                </span>
              </el-button-group>
            </template>
          </div>
        </div>
      </div>
      <div v-show="seenResult">
        <el-result icon="success" title="提交成功" subTitle="请点击关闭问卷">
        </el-result>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
      <span>确定关闭问卷吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="个人及家族病史"
      :visible.sync="dialogVisible2"
      width="30%"
    >
      <el-form ref="medicalHistory1" :model="medicalHistory1">
        <el-form-item>
          <div style="font-size: 15px">请选择亲属关系</div>
          <el-cascader
            clearable
            :options="options"
            :show-all-levels="false"
            v-model="medicalHistory1.relationship"
          ></el-cascader>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">30.请选择肿瘤类型</div>
          <el-select
            v-model="medicalHistory1.tumorType"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in tumorTypeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <div v-show="medicalHistory1.tumorType === '乳腺癌'">
            31.请上传病理检测报告
            <el-upload
              class="upload-demo"
              list-type="picture"
              action="http://127.0.0.1:8795/api-bcra/bcra/file/fileUpload/"
              accept="image/png,image/jpeg,image/jpg"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :on-exceed="handleExceed"
              :file-list="fileListHistory"
              :limit="1"
            >
              <div slot="tip" class="el-upload__tip">
                只能上传1个jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleHistory">
              <img width="100%" :src="dialogImageUrlHistory" alt="" />
            </el-dialog>
          </div>
          <div v-show="medicalHistory1.tumorType === '其他'">
            <div style="font-size: 15px">31.请注明疾病</div>
            <el-input
              v-model="medicalHistory1.otherTumorType"
              placeholder="请输入疾病名称"
            ></el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">32.请注明当前或死亡时年龄（岁）</div>
          <el-input
            v-model="medicalHistory1.currentAge"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">33.请注明诊断年龄（岁）</div>
          <el-input
            v-model="medicalHistory1.diagnosisAge"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">34.是否三阴性乳腺癌？</div>
          <el-radio v-model="medicalHistory1.tripleNegativeCancer" :label="1"
            >是</el-radio
          >
          <el-radio v-model="medicalHistory1.tripleNegativeCancer" :label="0"
            >否</el-radio
          >
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">35.乳腺癌原发病灶的数量？</div>
          <el-input
            v-model="medicalHistory1.diseaseCount"
            placeholder="请输入数量"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">36.乳腺癌原发病灶是否在双侧？</div>
          <el-radio v-model="medicalHistory1.isInTwoSide" :label="1"
            >是</el-radio
          >
          <el-radio v-model="medicalHistory1.isInTwoSide" :label="0"
            >否</el-radio
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog2()">取 消</el-button>
        <el-button type="primary" @click="confirmDialog2()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="基因检测" :visible.sync="dialogVisible3" width="30%">
      <el-form ref="geneDetection1" :model="geneDetection1">
        <el-form-item>
          <div>
            请上传基因检测报告
            <el-upload
              class="upload-demo"
              list-type="picture"
              action="http://127.0.0.1:8795/api-bcra/bcra/file/fileUpload/"
              accept="image/png,image/jpeg,image/jpg"
              :on-success="handleSuccessGene"
              :on-remove="handleRemoveGene"
              :on-preview="handlePictureCardPreviewGene"
              :on-exceed="handleExceedGene"
              :file-list="fileListGene"
              :limit="1"
            >
              <div slot="tip" class="el-upload__tip">
                只能上传1个jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleGene">
              <img width="100%" :src="dialogImageUrlGene" alt="" />
            </el-dialog>
          </div>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">38.受检者的身份</div>
          <el-input
            v-model="geneDetection1.relationship"
            placeholder="请输入受检者的身份"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">39.样本类型</div>
          <el-checkbox-group v-model="geneDetection1.sampleType">
            <el-checkbox label="胚系"></el-checkbox>
            <el-checkbox label="肿瘤组织"></el-checkbox>
            <el-checkbox label="不清楚"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">40.检测的基因</div>
          <el-input
            v-model="geneDetection1.detectionGene"
            placeholder="请输入基因型"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <div style="font-size: 15px">41.变异类型</div>
          <el-checkbox-group v-model="geneDetection1.variationType">
            <el-checkbox label="有害变异"></el-checkbox>
            <el-checkbox label="良性或意义不明的变异"></el-checkbox>
            <el-checkbox label="未检出"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog3()">取 消</el-button>
        <el-button type="primary" @click="confirmDialog3()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible4" width="30%">
      <span>您确定提交问卷吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible4 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import "./index.css";
import "../../src/utils/jquery.min.js";
import questionnaire from "@/api/questionnaire";
import answerApi from "@/api/answer.js";

let tableIndex = 0;
let geneIndex = -1;

export default {
  name: "check-ques",
  // components: {},
  data() {
    return {
      searchObj: {
        name: "",
        phone: "",
        questionnaireId: "",
        questionModuleId: [],
        questionId: [],
        answerId: [],
        answer: [],
      }, //所需要返回的信息
      dialogImageUrlHistory: "",
      dialogVisibleHistory: false,
      dialogImageUrlGene: "",
      dialogVisibleGene: false,
      questionnaireResponseId: null,
      fileListHistory: [],
      fileListGene: [],
      seenResult: false, //提交问卷后提示结果
      tableData1: [],
      tableData2: [],
      tumorTypeOpt: [
        {
          value: "乳腺癌",
          label: "乳腺癌",
        },
        {
          value: "卵巢癌",
          label: "卵巢癌",
        },
        {
          value: "输卵管癌",
          label: "输卵管癌",
        },
        {
          value: "腹膜癌",
          label: "腹膜癌",
        },
        {
          value: "胰腺癌",
          label: "胰腺癌",
        },

        {
          value: "前列腺癌且Gleason评分≥7",
          label: "前列腺癌且Gleason评分≥7",
        },
        {
          value: "李-佛美尼综合征",
          label: "李-佛美尼综合征",
        },
        {
          value: "Cowden（多发性错构瘤）综合征",
          label: "Cowden（多发性错构瘤）综合征",
        },
        {
          value: "Peutz－Jeghers（黑斑息肉）综合征",
          label: "Peutz－Jeghers（黑斑息肉）综合征",
        },
        {
          value: "遗传性弥漫性胃癌综合症",
          label: "遗传性弥漫性胃癌综合症",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      //个人与家族病史
      medicalHistory1: {
        relationship: "", //亲属关系
        tumorType: "", //肿瘤类型
        otherTumorType: "", //其他肿瘤类型名称
        currentAge: "", //当前年龄
        diagnosisAge: "", //诊断年龄
        tripleNegativeCancer: "", //是否三阴性乳腺癌？0代表否，1代表是
        diseaseCount: "", //乳腺癌原发病灶的数量
        isInTwoSide: "", //乳腺癌原发病灶是否在双侧?0代表否，1代表是
        fileId: "", //病例文件id
        filePath: "",
        // questionnaireResponseId: ""
      },
      medicalHistory2: [], //存放所填写的问卷信息
      //基因检测
      geneDetection1: {
        // questionnaireResponseId: "",
        relationship: "", //基因检测亲属
        sampleType: [], //样本类型
        detectionGene: "", //检测的基因
        variationType: [], //变异类型
        fileId: null, //基因检测报告id
        filePath: "",
      },
      geneDetection2: [],
      options: [
        {
          value: "本人",
          label: "本人",
          children: [
            {
              value: "本人",
              label: "本人",
            },
          ],
        },
        {
          value: "一级亲属",
          label: "一级亲属",
          children: [
            {
              value: "父亲",
              label: "父亲",
            },
            {
              value: "母亲",
              label: "母亲",
            },
            {
              value: "兄弟",
              label: "兄弟",
            },
            {
              value: "姐妹",
              label: "姐妹",
            },
            {
              value: "儿子",
              label: "儿子",
            },
            {
              value: "女儿",
              label: "女儿",
            },
          ],
        },
        {
          value: "二级亲属",
          label: "二级亲属",
          children: [
            {
              value: "祖父",
              label: "祖父",
            },
            {
              value: "祖母",
              label: "祖母",
            },
            {
              value: "叔父",
              label: "叔父",
            },
            {
              value: "姑母",
              label: "姑母",
            },
            {
              value: "侄子",
              label: "侄子",
            },
            {
              value: "侄女",
              label: "侄女",
            },
            {
              value: "孙子",
              label: "孙子",
            },
            {
              value: "孙女",
              label: "孙女",
            },
            {
              value: "同父异母兄弟",
              label: "同父异母兄弟",
            },
            {
              value: "同父异母姐妹",
              label: "同父异母姐妹",
            },
            {
              value: "外祖父",
              label: "外祖父",
            },
            {
              value: "外祖母",
              label: "外祖母",
            },
            {
              value: "舅父",
              label: "舅父",
            },
            {
              value: "姨母",
              label: "姨母",
            },
            {
              value: "外甥",
              label: "外甥",
            },
            {
              value: "外甥女",
              label: "外甥女",
            },
            {
              value: "外孙",
              label: "外孙",
            },
            {
              value: "外孙女",
              label: "外孙女",
            },
            {
              value: "同母异父兄弟",
              label: "同母异父兄弟",
            },
            {
              value: "同母异父姐妹",
              label: "同母异父姐妹",
            },
          ],
        },
        {
          value: "三级亲属",
          label: "三级亲属",
          children: [
            {
              value: "三级亲属等人",
              label: "三级亲属等人",
            },
          ],
        },
      ],
      dialogVisible: false,
      active: 0, //控制步骤条
      dataIndex: 0, //问题索引
      isPrev: false, //上一题是否显示
      isNext: false, //下一题是否显示
      isSubmit: true, //提交是否显示
      questionnaireId: 1,
      questionnaireTitle: "乳腺癌风险评估系统",
      questionnaireDescription:
        "基于Gail model结合中国人群数据，预测女性的乳腺癌风险",
      questionModule: [],
    };
  },
  computed: {
    seen() {
      return this.$store.state.seen;
    },
  },
  created() {
    this.getquetionnaire(1);
    this.getquesAnswer(this.$store.state.quesId);
  },
  methods: {
    getquesAnswer(id) {
      answerApi
        .getQuesAnswer(id)
        .then((response) => {
          console.log(response.MSG_BODY);
          this.questionModule = response.MSG_BODY.questionModule;
          answerApi.getFamilyModuleAnswer(id).then((response) => {
            this.tableData1 = response.MSG_BODY;
            console.log("问题5的答案1：", response);
            console.log("问题5的答案：", response.MSG_BODY);
          });
          answerApi.getGeneModuleAnswer(id).then((response) => {
            this.tableData2 = response.MSG_BODY;
            console.log("问题6的答案1：", response);
            console.log("问题6的答案：", response.MSG_BODY);
          });
        })
        .catch((error) => {
          console.log("获取已填问卷内容失败了！");
        });
    },
    //删除问题模块5患病亲属的信息
    handleDeleteMedicalHistory(index, row) {
      //删除已经添加的患病亲属信息时，删除对应的文件
      if (row.fileId != "" || row.fileId != null) {
        var fileId = row.fileId;
        questionnaire
          .deleteFile(fileId)
          .then((response) => {
            console.log("删除文件：", response);
          })
          .catch((error) => {
            console.log("删除文件异常：", error);
          });
      }
      this.medicalHistory2.splice(index, 1);
      this.tableData1.splice(index, 1);
      // console.log("删除后：" + this.medicalHistory2);
      tableIndex--;
    },
    //编辑问题模块5患病亲属的信息
    handleEditMedicalHistory(index, row) {
      this.medicalHistory1 = row;
      this.dialogVisible2 = true;
    },
    //删除问题模块6基因检测亲属的信息
    handleDeleteGene(index, row) {
      if (row.fileId != "" || row.fileId != null) {
        var fileId = row.fileId;
        questionnaire
          .deleteFile(fileId)
          .then((response) => {
            console.log("删除文件：", response);
          })
          .catch((error) => {
            console.log("删除文件异常：", error);
          });
      }
      this.geneDetection2.splice(index, 1);
      this.tableData2.splice(index, 1);
    },
    //编辑问题模块6基因检测亲属的信息
    handleEditGene(index, row) {
      this.geneDetection1 = row;
      this.geneDetection1.sampleType =
        this.geneDetection1.sampleType.split(",");
      this.geneDetection1.variationType =
        this.geneDetection1.variationType.split(",");
      this.dialogVisible3 = true;
      geneIndex = index;
    },

    //获取一份问卷
    getquetionnaire(id) {
      questionnaire
        .getQuestionnaire(id)
        .then((response) => {
          this.questionnaireId = response.MSG_BODY.questionnaireId;
          this.questionnaireTitle = response.MSG_BODY.questionModuleTitle;
          this.questionnaireDescription =
            response.MSG_BODY.questionnaireDescription;
          this.questionModule = response.MSG_BODY.questionModule;
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "获取问卷失败哦",
            type: "error",
          });
        });
    },
    cancelDialog3() {
      this.geneDetection1 = {
        relationship: "",
        sampleType: [],
        detectionGene: "",
        variationType: [],
        fileId: null,
        filePath: "",
      };
      this.dialogVisible3 = false;
    },
    addNewGene() {
      this.dialogVisible3 = true;
    },

    //问题5模块点击确定时调用
    confirmDialog2() {
      console.log("this.tableData1", this.tableData1);
      console.log("this.tableData1 index", tableIndex);

      this.medicalHistory1.fileId =
        this.fileListHistory.length == 0 ? "" : this.fileListHistory[0].fileId;
      this.medicalHistory1.filePath =
        this.fileListHistory.length == 0
          ? ""
          : this.fileListHistory[0].filePath;
      if (this.$store.state.seen == 1 || this.$store.state.seen == 2) {
        this.medicalHistory2.push(this.medicalHistory1);
        this.tableData1.push(this.medicalHistory1); //获取所填的数据，在表格中显示
        this.tableData1[tableIndex++].relationship =
          this.medicalHistory1.relationship[1];
        console.log(this.medicalHistory2);
        // console.log("置空后的1项:", this.medicalHistory1);
      }
      if (this.$store.state.seen == 3) {
        let tempIndex = tableIndex;
        this.tableData1[tableIndex++] = this.medicalHistory1;
        this.tableData1[tempIndex].relationship =
          this.medicalHistory1.relationship[1];
        this.medicalHistory2[tempIndex] = this.medicalHistory1;
        console.log(this.medicalHistory2);
      }
      this.medicalHistory1 = {
        relationship: "",
        tumorType: "",
        otherTumorType: "",
        currentAge: null,
        diagnosisAge: null,
        tripleNegativeCancer: null,
        diseaseCount: null,
        isInTwoSide: null,
        fileId: null,
        filePath: "",
      };
      this.fileListHistory = [];
      this.dialogVisible2 = false;
    },
    //问题5模块点击取消调用
    cancelDialog2() {
      if (this.fileListHistory.length != 0) {
        var fileId = this.fileListHistory[0].fileId;
        questionnaire
          .deleteFile(fileId)
          .then((response) => {
            console.log("删除文件：", response);
          })
          .catch((error) => {
            console.log("删除文件异常：", error);
          });
        this.fileListHistory = [];
      }

      this.medicalHistory1 = {
        relationship: "",
        tumorType: "",
        otherTumorType: "",
        currentAge: null,
        diagnosisAge: null,
        tripleNegativeCancer: null,
        diseaseCount: null,
        isInTwoSide: null,
        fileId: null,
      };
      this.dialogVisible2 = false;
    },
    addNewHiostory() {
      this.dialogVisible2 = true;
    },
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
    //
    toUser() {
      this.$router.push("/user");
      this.$store.commit("ChangeUserState");
    },
    prePage() {
      //上一题
      this.dataIndex -= 1;
      this.active--;
    },
    nextPage() {
      //下一题
      this.dataIndex += 1;
      this.active++;
    },
    handleConfirm() {
      this.dialogVisible = false;
      if (this.$store.state.seen == 2) {
        this.$router.push("/user");
        this.$store.commit("ChangeUserState", 0);
      } else if (this.$store.state.seen == 3) {
        this.$store.commit("ChangeUserState", 0);
        this.$router.push("/home");
      }
    },
    //问题5模块文件上传成功调用
    handleSuccess(response, file, fileList) {
      console.log("问题5模块文件上传成功调用:", response);
      this.fileListHistory.push({
        name: file.name,
        url: file.url,
        fileId: response.MSG_BODY.Result,
      });
    },
    //问题5模块删除文件，从文件列表中删除时，要删除本地文件和数据库中的文件记录
    handleRemove(file, fileList) {
      var fileId = file.fileId;
      questionnaire
        .deleteFile(fileId)
        .then((response) => {
          console.log("删除文件：", response);
        })
        .catch((error) => {
          console.log("删除文件异常：", error);
        });
      this.fileListHistory = [];
    },
    //问题5模块上传文件超出限制数量
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //问题5模块预览上传的文件
    handlePictureCardPreview(file) {
      this.dialogImageUrlHistory = file.url;
      this.dialogVisibleHistory = true;
    },

    //问题6模块文件上传成功调用
    handleSuccessGene(response, file, fileList) {
      console.log("问题6模块文件上传成功调用:", response);
      this.fileListGene.push({
        name: file.name,
        url: file.url,
        fileId: response.MSG_BODY.Result,
      });
    },
    //问题6模块删除文件，从文件列表中删除时，要删除本地文件和数据库中的文件记录
    handleRemoveGene(file, fileList) {
      var fileId = file.fileId;
      questionnaire
        .deleteFile(fileId)
        .then((response) => {
          console.log("删除文件：", response);
        })
        .catch((error) => {
          console.log("删除文件异常：", error);
        });
      this.fileListGene = [];
    },
    //问题6模块预览上传的文件
    handlePictureCardPreviewGene(file) {
      this.dialogImageUrlGene = file.url;
      this.dialogVisibleGene = true;
    },
    //问题6模块上传文件超出限制数量
    handleExceedGene(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //问题6模态框点击确定
    confirmDialog3() {
      this.geneDetection1.fileId =
        this.fileListGene.length == 0 ? "" : this.fileListGene[0].fileId;
      this.geneDetection1.filePath =
        this.fileListGene.length == 0 ? "" : this.fileListGene[0].filePath;
      if (this.$store.state.seen == 1 || this.$store.state.seen == 2) {
        this.geneDetection1.sampleType =
          this.geneDetection1.sampleType.toString();
        this.geneDetection1.variationType =
          this.geneDetection1.variationType.toString();
        this.geneDetection2.push(this.geneDetection1);
        this.tableData2.push(this.geneDetection1); //获取所填的数据，在表格中显示
        console.log(this.geneDetection2);
      }
      if (this.$store.state.seen == 3) {
        console.log(this.geneDetection2);
        this.geneDetection1.sampleType =
          this.geneDetection1.sampleType.toString();
        this.geneDetection1.variationType =
          this.geneDetection1.variationType.toString();
        this.geneDetection2[geneIndex] = this.geneDetection1;
        // this.tableData2[geneIndex] = this.geneDetection1;
        console.log("test:", this.geneDetection2);
      }
      this.geneDetection1 = {
        fileId: null,
        filePath: "",
        relationship: "",
        sampleType: [],
        detectionGene: "",
        variationType: [],
      };
      this.fileListGene = [];
      this.dialogVisible3 = false;
    },
    submitPage() {
      console.log("展示:", this.questionModule);
      this.searchObj.phone = this.$session.get("phone");
      this.searchObj.name = this.questionModule[0].question[0].answer;
      this.searchObj.questionnaireId = this.questionnaireId;

      for (let i = 0; i < this.questionModule.length; i++) {
        this.searchObj.questionModuleId.push(
          this.questionModule[i].questionModuleId
        );
        for (let j = 0; j < this.questionModule[i].question.length; j++) {
          if (this.questionModule[i].question[j].answer) {
            //如果问题不为空，那么录入问题信息

            if (this.questionModule[i].question[j].option.length < 2) {
              //如果单选的选项只有一个，那么表示的就是文本域名
              this.questionModule[i].question[j].answerId =
                this.questionModule[i].question[j].option[0].optionId;
              this.searchObj.answerId.push(
                this.questionModule[i].question[j].answerId
              );
              this.searchObj.answer.push(
                this.questionModule[i].question[j].answer
              );
              this.searchObj.questionId.push(
                this.questionModule[i].question[j].questionId
              );
            } else {
              if (this.questionModule[i].question[j].questionType != 2) {
                //如果问题不是多选
                for (
                  let k = 0;
                  k < this.questionModule[i].question[j].option.length;
                  k++
                ) {
                  if (
                    this.questionModule[i].question[j].answer ==
                    this.questionModule[i].question[j].option[k].optionTitle
                  ) {
                    this.searchObj.answer.push(
                      this.questionModule[i].question[j].answer
                    );
                    this.questionModule[i].question[j].answerId =
                      this.questionModule[i].question[j].option[k].optionId;
                    this.searchObj.answerId.push(
                      this.questionModule[i].question[j].answerId
                    );
                    this.searchObj.questionId.push(
                      this.questionModule[i].question[j].questionId
                    );
                  }
                }
              } else {
                //如果是多选的话

                for (
                  let a = 0;
                  a < this.questionModule[i].question[j].answer.length;
                  a++
                ) {
                  //先存答案
                  this.searchObj.answer.push(
                    this.questionModule[i].question[j].answer[a]
                  );

                  for (
                    let k = 0;
                    k < this.questionModule[i].question[j].option.length;
                    k++
                  ) {
                    if (
                      this.questionModule[i].question[j].answer[a] ==
                      this.questionModule[i].question[j].option[k].optionTitle
                    ) {
                      this.questionModule[i].question[j].answerId =
                        this.questionModule[i].question[j].option[k].optionId;
                      this.searchObj.answerId.push(
                        this.questionModule[i].question[j].answerId
                      );
                      this.searchObj.questionId.push(
                        this.questionModule[i].question[j].questionId
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
      console.log("展示:", this.searchObj);

      if (this.$store.state.seen == 1) {
        questionnaire
          .submitQuestionnaire(this.searchObj)
          .then((responser) => {
            this.questionnaireResponseId = responser.MSG_BODY;
            //获取到medicalHistory2和geneDetection2中所有亲属上传文件的id,用于更新文件表中的responseId
            var fileIdList = getFileIds(
              this.medicalHistory2,
              this.geneDetection2
            );
            console.log("fileIdList:", fileIdList);
            questionnaire
              .updateFileResponseId(fileIdList, this.questionnaireResponseId)
              .then((response) => {
                console.log("更新文件responseId：", response);
              })
              .catch((error) => {
                console.log("更新文件responseId异常：", error);
              });

            //提交问题5模块答案
            questionnaire
              .submitFamilyModuleAnswer(
                this.questionnaireResponseId,
                this.medicalHistory2
              )
              .then((response) => {
                console.log("提交模块5结果：", response);
              })
              .catch((error) => {
                console.log("提交模块5结果异常：", error);
              });

            //提交问题6模块答案
            questionnaire
              .submitGeneModuleAnswer(
                this.questionnaireResponseId,
                this.geneDetection2
              )
              .then((response) => {
                console.log("提交模块6结果：", response);
              })
              .catch((error) => {
                console.log("提交模块6结果异常：", error);
              });
          })
          .catch((error) => {
            console.log("提交问卷异常：", error);
          });
      }

      this.seenResult = true;
      tableIndex = 0; //恢复初始值0
      if (this.$store.state.seen == 3) {
        //提交5,6模块的修改信息
        questionnaire
          .updateFamilyModuleAnswer(this.medicalHistory2)
          .then((response) => {
            console.log("提交5模块的修改信息成功");
          })
          .catch((error) => {
            console.log("提交5模块的修改信息失败");
          });
        questionnaire
          .updateGeneModuleAnswer(this.geneDetection2)
          .then((response) => {
            console.log("提交6模块的修改信息成功");
          })
          .catch((error) => {
            console.log("提交6模块的修改信息失败");
          });
        let notes = "true";
        questionnaire
          .updateQuestionnaireNotes(this.$store.state.quesId, notes)
          .then((response) => {
            this.$message({
              showClose: true,
              message: "提交修改信息成功",
              type: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            this.$message({
              message: "提交备注信息失败",
              type: "error",
            });
          });
      }
    },
  },
};
//取出这5-6问题模块上传的文件的fileId
function getFileIds(medicalHistory2, geneDetection2) {
  var fileIds = [];
  if (medicalHistory2.length > 0) {
    medicalHistory2.forEach((medicalHistory) => {
      if (medicalHistory.fileId != null && medicalHistory.fileId != "") {
        fileIds.push(medicalHistory.fileId);
      }
    });
  }
  if (geneDetection2.length > 0) {
    geneDetection2.forEach((geneDetection) => {
      if (geneDetection.fileId != null && geneDetection.fileId != "") {
        fileIds.push(geneDetection.fileId);
      }
    });
  }
  return fileIds;
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.next {
  margin-left: 120px;
}
.submit {
  margin-left: 120px;
}
.main-que {
  padding: 5px 35px 5px 35px;
}
.mintitle {
  background-color: #69b2fc;
  width: 1000px;
  height: 41px;
  border-radius: 4px;
}
.hello {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 5px auto;
  width: 1000px;
  padding: 0px 0px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  height: 100%;
  /* margin-left: 315px; */
}
input[type="file"] {
  display: none;
}
.que_answer {
  width: 350px;
  padding: 0px 10px 0px;
}
.question {
  margin-left: 42px;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
  width: 860px;
  height: auto;
  /* background-color: #f8f8f6; */
  border-radius: 20px;
  z-index: 0;
}
.title {
  margin-bottom: 38px;
  color: #62affc;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  width: 154px;
  height: 23px;
  display: inline;
}
/* .content {
  margin-left: 20px;
  margin-top: 38px;
  display: inline-block;
  width: 520px;
  /*background: #ff1d5e;
}*/
.num {
  /* position: absolute; */
  /* left: 20px; */
  /* top: 0; */
  float: left;
  display: inline;
  width: 20px;
  height: 23px;
  font-size: 20px;
  color: #409eff;
  /* background-color: #409EFF; */
}
</style>