<template>
  <div id="wrap">
    <div id="top_content">
      <div id="header">
        <div id="rightheader">

          <p>
            <a href=" " @click="quit">安全退出</a>
            2009/11/20
            <br/>
          </p>
        </div>
        <div id="topheader">
          <h1 id="title">
            <a href="#">main</a>
          </h1>
        </div>
        <div id="navigation">
        </div>
      </div>
      <div id="content">
        <p id="whereami">
        </p>
        <h1>
          <h4>欢迎{{username}}登录</h4>
        </h1>
        <table class="table">
          <tr class="table_header">
            <td>ID</td>
            <td>Name</td>
            <td>Photo</td>
            <td>Salary</td>
            <td>Age</td>
            <td>Operation</td>
          </tr>
          <tr class="row2" v-for="emp in emp_list" :key="emp.id">
            <td>{{ emp.id }}</td>
            <td>{{ emp.emp_name }}</td>
            <td><img :src=emp.full_img style="height: 60px;"></td>
            <td>{{ emp.salary }}</td>
            <td>{{ emp.age }}</td>
            <td>
              <el-button @click="dell(emp.id)" type="text" size="small">删除员工</el-button>
              <el-button @click="upda(emp.id)" type="text" size="small">更新员工</el-button>
            </td>
          </tr>
        </table>
        <p>
          <el-button type="primary"><router-link to="/add">添加员工</router-link></el-button>
        </p>
      </div>
    </div>
    <div id="footer">
      <div id="footer_bg">
        ABC@126.com
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      emp_list: [],
      username:'',
    }
  },
  methods: {
    get_all_emp() {
      let username = sessionStorage.getItem("username")
      if (username) {
        this.username=username
        this.$axios.get("http://127.0.0.1:8000/user/employees/").then(res => {
          console.log(res.data);
          this.emp_list = res.data;
        }).catch(error => {
          console.log(error);
        })
      } else {
        this.$message.error("当前用户未登录,请登录");
        this.$router.push("/login");
      }
    },
    dell(id){
      console.log(id,"111");
      this.$axios({
        url: "http://127.0.0.1:8000/user/employees/"+id,
        method: "delete",
      }).then(res=>{
        // 请求成功后可以走到这个回调函数
          this.$router.go(0)
          alert('删除成功')
      })
    },quit(){
      sessionStorage.clear()},
    upda(id){
      this.$message({
        message: '跳转修改页面',
        type: 'success',
        showClose: true,
        duration: 1000,
      });
      this.$router.push({path: "/update?id=" + id,
      })
    },
  },
  created() {
    this.get_all_emp();
  }
}
</script>

<style scoped>

</style>
