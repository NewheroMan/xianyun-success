<template>
  <div class="main">
    <div class="form">
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input v-model="userInfo.username" placeholder="用户名 /手机"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="userInfo.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <!-- <el-form-item> -->
        <!-- <span  class="forgetPwd">忘记密码</span> -->
        <p>
          <nuxt-link to="/user/login" class="forgetPwd">忘记密码</nuxt-link>
        </p>
        <!-- </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="handerToLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      current: 0,
      userInfo: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handerToLogin() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //   console.log(123)
          // this.$axios({
          //     method:'post',
          //     url:'/accounts/login',
          //     data:this.userInfo
          // })
          // .then( res =>{
          //     // console.log(res)
          //     if(res.status === 200){
          //       this.$store.commit('user/setUserInfo',res.data)
          //       console.log(this.$store)
          //         // localStorage.setItem('token',res.data.token)
          //         this.$message.success('登录成功，稍后自动跳转')
          //         setTimeout(() =>{
          //            this.$router.push('/')
          //         },2000)
          //     }
          // })
          this.$store.dispatch("user/login", this.userInfo).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message.success("登录成功，稍后自动跳转");
              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  span {
    flex: 1;
    width: 200px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    border-top: 2px solid #eee;
    background-color: #eee;
  }
  .active {
    background-color: #fff;
    color: orange;
    border-top-color: orange;
  }
}
.form {
  padding: 25px 25px 0 25px;
  p {
    text-align: right;
    margin: 10px;
    .forgetPwd {
      font-size: 12px;
      color: #409eff;
      text-align: right;
    }
  }
  /deep/ .el-form-item {
    width: 348px;
    padding: 0 15px;
    border-color: #67c23a;

    .el-form-item__content {
      margin-left: 0 !important;
      .el-button--primary {
        width: 318px;
      }
    }
  }
}
</style>