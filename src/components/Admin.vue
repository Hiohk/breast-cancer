<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="问卷编号">
        <el-input v-model="searchInfo.id" placeholder="问卷编号" />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="center"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchInfo.bcraPhone" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="问卷姓名">
        <el-input v-model="searchInfo.name" placeholder="问卷姓名" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchList()"
        >查询</el-button
      >
      <el-button type="primary" icon="el-icon-download" @click="DownloadList()"
        >导出</el-button
      >
      <br /><br />
    </el-form>
    <el-table
      size="small"
      :data="quenaireTableData"
      row-key="referenceNo"
      :default-sort="{ prop: 'createTime', order: 'ascending' }"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      stripe
    >
      <el-table-column align="center" type="selection" width="200">
      </el-table-column>
      <el-table-column align="center" prop="id" label="问卷编号">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column align="center" prop="name" label="问卷姓名">
      </el-table-column>
      <el-table-column align="center" prop="bcraPhone" label="手机号">
      </el-table-column>
      <el-table-column align="center" prop="notes" label="备注">
        <template slot-scope="scope">
          <el-tag  effect="dark" type="info" v-if="scope.row.notes === 'false'">未修改</el-tag>
          <el-tag  effect="dark" v-else>已修改</el-tag>
        </template>
        
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="goDetail(scope.row.id)"
            title="编辑"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteQuestionnaireInformaiton(scope.row.id)"
            title="删除"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
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

  </div>
</template>

<script>
import homeApi from "@/api/home";


export default {
  name: "my-admin",
  data() {
    return {
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
      searchInfo: {
        // questionnaireNo: "",
        // create_time: "",
        // phone: "",
        // itsname: "",
        // comments: "",
        id: "",
        bcraPhone: "",
        createTime: "",
        notes: "",
        name: "",
        overTime: "",
        startTime: "",
      },
      // searchObj: {
      //   id: "",
      //   name: "",
      //   overTime: "",
      //   phone: "",
      //   startTime: "",
      // },
      value1: "",
      pageSize: 5, //每页条数
      pageOptions: [2, 5, 10],
      currentPage: 1, //当前页码
      totalCount: 0, //总数据条数
      offset: 0, //起始行数
      dialogFormVisible: false,
      quenaireTableData: [],
      dialogVisible: false,
    };
  },
  created() {
    this.fetchList();
  },
  computed: {
    seen() {
      return this.$store.state.seen;
    },
    quesId() {
      return this.$store.state.quesId;
    },
  },
  methods: {
    goDetail(id) {
      this.$store.commit("ChangeUserState", 3);
      this.$store.commit("getQuesId", id);
    },
    fetchList() {
      if (this.value1 != null) {
        this.searchInfo.startTime = this.value1[0];
        this.searchInfo.overTime = this.value1[1];
      } else if (this.value1 == null) {
        this.value1 = String(this.value1);
        this.value1 = "";
        this.searchInfo.startTime = "";
        this.searchInfo.overTime = "";
      }
      homeApi
        .queryQuestionnaireList(
          this.currentPage,
          this.pageSize,
          this.searchInfo
        )
        .then((response) => {
          //console.log(response.MSG_BODY.list);
          this.quenaireTableData = response.MSG_BODY.list;
          this.totalCount = response.MSG_BODY.total;

          for (let key in this.value1) {
            console.log(this.value1[key]);
            console.log("I want time:" + dateFormat(this.value1[key]));
          }
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "获取问卷信息失败",
            type: "error",
          });
        });
    },

    //删除问卷
    deleteQuestionnaireInformaiton(id) {
      this.$confirm("此操作将永久删除该问卷, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //确定执行then方法
        homeApi
          .deleteQuestionnaire(id)
          .then((response) => {
            this.$message({
              message: "问卷删除成功",
              type: "success",
            });
            this.fetchList(); //再次调用查询
          })
          .catch((error) => {
            this.$message({
              message: "问卷删除异常",
              type: "error",
            });
          });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchList();
    },
  },
};
</script>

<style>
</style>