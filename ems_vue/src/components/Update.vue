<template>
  <div id="wrap">
    <div id="top_content">
      <div id="header">
        <div id="rightheader">
          <p>
            2009/11/20
            <a href=" " @click="quit">安全退出</a>
            <br/>
          </p>
        </div>
        <div id="topheader">
          <h1 id="title">
            <a href="#">Main</a>
          </h1>
        </div>
        <div id="navigation">
        </div>
      </div>
      <div id="content">
        <p id="whereami">
        </p>
        <h1>
          update Emp info:
        </h1>
        <form action="emplist.html" method="post">
          <table cellpadding="0" cellspacing="0" border="0"
                 class="form_table">
            <tr>
              <td valign="middle" align="right">id:</td>
              <td valign="middle" type="hidden" align="left" v-model="emp.id">{{ emp.id }}</td>
            </tr>
            <tr>
              <td valign="middle" align="right">name:</td>
              <td valign="middle" align="left"><input  type="text" v-model="emp.emp_name" class="inputgri"
                                                       name="name"/></td>
            </tr>
            <tr>
              <td valign="middle" align="right">photo:
              </td>
              <td valign="middle" align="left"><input  ref="img" type="file" name="photo"/></td>
            </tr>
            <tr>
              <td valign="middle" align="right">salary:</td>
              <td valign="middle" align="left"><input type="text" v-model="emp.salary" class="inputgri" name="salary"/>
              </td>
            </tr>
            <tr>
              <td valign="middle" align="right">age:</td>
              <td valign="middle" align="left"><input type="text" v-model="emp.age" class="inputgri" name="age"/></td>
            </tr>
          </table>
          <p>
            <!--                        <input type="submit" class="button" value="Confirm"/>-->
            <el-button type="primary" @click="update_emp">确定更新</el-button>
          </p>
        </form>
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
  name: "UpdateEmp",
  data() {
    return {
      emp: []

    }
  },
  methods: {
    get_emp() {
      let id=this.$route.query.id;
      console.log(id);
      this.$axios({
        url: "http://127.0.0.1:8000/user/employees/" + id,
        method: 'get',
      }).then(res => {
        console.log(res.data);
        this.emp = res.data
      })

    },
    update_emp() {
      let formData = new FormData();
      console.log("123");
      formData.append("emp_name", this.emp.emp_name)
      console.log(456);
      formData.append("salary", this.emp.salary)
      formData.append("age", this.emp.age)
      formData.append("img", this.$refs.img.files[0])

      this.$axios({
        url: "http://127.0.0.1:8000/user/employees/" + this.emp.id,
        method: "patch",
        data: formData,
        headers: {
          "content-type": "multipart/form-data"
        },
      }).then(res => {
        console.log(res.status, typeof res.status);
        this.$router.push("/show");
      }).catch(error => {
        console.log(error);
      })

    },quit(){
      sessionStorage.clear()},

  },
  created() {
    this.get_emp();
  }

}
</script>

<style scoped>

</style>
