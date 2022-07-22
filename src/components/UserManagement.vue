<template>
  <div>
    <el-form :inline="true" ref="searchInfo" :model="searchInfo">
      <el-form-item label="手机号">
        <el-input v-model="searchInfo.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="fetchList()"
        >查询</el-button
      >
    </el-form>

    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column align="center" prop="username" label="用户名">
      </el-table-column>
      <el-table-column align="center" prop="phone" label="手机号">
      </el-table-column>
      <el-table-column align="center" prop="password" label="密码">
      </el-table-column>
      <el-table-column align="center" prop="email" label="邮箱地址">
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
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
import loginApi from '@/api/login'

export default {
  data() {
    return {
      searchInfo: {
        id: "",
        creatTime: "",
        password: "",
        username: "",
        phone: "",
        email:"",
      },
      pageSize: 5, //每页条数
      pageOptions: [2, 5, 10],
      currentPage: 1, //当前页码
      totalCount: 0, //总数据条数
      tableData: [],
     
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
   fetchList() {
      homeApi
        . getAllUser(
          this.currentPage,
          this.pageSize,
          this.searchInfo
        )
        .then((response) => {
          console.log(response.MSG_BODY.list);
          this.tableData = response.MSG_BODY.list;
          this.totalCount = response.MSG_BODY.total;
        })
        .catch((error) => {
          this.$message({
          });
        });
    },
    //删除用户操作，需要谨慎
      deleteUser(id){
         this.$confirm('此操作将永久删除该用户所有信息, 是否继续?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
         }).then(() => { //确定执行then方法
            loginApi.deleteUser(id)
                .then(response=>{
                  this.$message({
                    message: "用户删除成功",
                    type: "success",
                  })
                  this.fetchList()//再次调用查询
                })
                .catch(error=>{
                  this.$message({
                    message: "用户删除异常",
                    type: "error",
                  });
                })
         })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.fetchList();

    },
    //当前页
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage=val;
      this.fetchList();

    },

    
  },
};
</script>

<style>

  
</style>