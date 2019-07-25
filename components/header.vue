<template>
  <div class="main">
    <el-row type="flex" justify="space-between" class="container">
      <div class="logo">
        <h1>
          <nuxt-link to="/">
            <img src="http://157.122.54.189:9093/images/logo.jpg" alt="logo" />
          </nuxt-link>
        </h1>
      </div>
      <el-row type="flex" class="nav">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div class="info">
        <div v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
        <div class="loginInfo" v-else>
          <i class="el-icon-bell"></i>
          <span>消息</span>
           <i class="el-icon-caret-bottom"></i>
          <el-dropdown @command="handleCommand" style="margin-left:10px;">
            <span class="el-dropdown-link">
              <img
                :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                alt
              />
              <span>{{$store.state.user.userInfo.user.nickname}}</span>
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item command="toLogin">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCommand(toLogin) {
      // this.$store.state.user.userInfo.token = '';
      this.$store.commit("user/clearUserInfo");
      this.$router.push("/user/login");
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  box-shadow: 0 0px 3px #ccc;
  .container {
    height: 60px;
    width: 1000px;
    margin: 0 auto;
    line-height: 60px;
    .logo img {
      display: block;
      margin-top: 9px;
      width: 156px;
      height: 42px;
    }
    .nav {
      flex: 1;
      margin-left: 20px;
      a {
        display: block;
        padding: 0 20px;
        &:hover {
          // background-color: #409eff;
          color: #409eff;
          border-bottom: 5px solid #409eff;
        }
      }
      .nuxt-link-exact-active {
        background-color: #409eff;
        color: #fff;
        &:hover {
          // background-color: #409eff;
          color: #fff;
          // border-bottom: 5px solid #409eff;
        }
      }
    }
    .info {
      font-size: 14px;
      color: #606266;
      // /deep/.el-icon-bell {
      //   font-size: 18px;
      //   line-height: 60px;
      //   align-items: center;
      // }
      // /deep/.el-icon-caret-bottom {
      //   margin-right: 5px;
      // }
      &:hover {
      }
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        vertical-align: center;
      }
      .el-icon-arrow-down {
        margin-left: 5px;
      }
    }
  }
}
</style>


