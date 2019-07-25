<template>
  <div class="register">
    <el-form
      :model="newUserInfo"
      :rules="rules"
      ref="newUserInfo"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input v-model="newUserInfo.username" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input placeholder="请输入验证码" v-model="newUserInfo.captcha">
          <template slot="append">
            <el-button @click="getCaptcha" v-html="text"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="newUserInfo.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="newUserInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="newUserInfo.ckpassword" placeholder="请再次输入密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="regbtn" @click="registerUser">注册</el-button>
  </div>
</template>

<script>
import { setInterval, clearInterval } from "timers";
export default {
  data() {
    return {
      newUserInfo: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        ckpassword: ""
      },
      text:'发送验证码',
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确手机号码", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        ckpassword: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getCaptcha() {
      if (!this.newUserInfo.username) {
        this.$message.warning("请输入手机号码再获取验证码");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel: this.newUserInfo.username }
      }).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.newUserInfo.captcha = res.data.code;
          this.$message.success(`验证码：${res.data.code}`);
          var i = 5;
          const timer = setInterval(() => {
            i--;
            // this.$refs.code.innerHTML(`验证码：${i}`);
            this.text = `验证码：${i}`
            // console.log(this.$refs.code)
            if (i === 0) {
              clearInterval(timer);
              this.text = "发送验证码"
            }
          }, 1000);
        }
      });
    },
    registerUser(){
      this.$refs.newUserInfo.validate(valid =>{
        if(valid){
          // console.log(1)
          let {ckpassword,...porps} = this.newUserInfo;
          this.$axios({
            method :'post',
            url:'/accounts/register',
            data:porps
          }).then (res =>{
            // console.log(res)
            if(res.status === 200){
              this.$message.success('注册成功,稍后自动跳转');
              // console.log(this.$router.back())
              const {username,password} = this.newUserInfo
              this.$store.dispatch('user/login',{username,password})
              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
            }
          })
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  padding: 25px;
  /deep/.el-form-item__content {
    margin-left: 0 !important;
  }
  .regbtn {
    width: 100%;
  }
}
</style>
