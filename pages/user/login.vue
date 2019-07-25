<template>
  <div class="container">
    <div class="main">
      <div class="tabs">
        <!-- <span :class="{active:current === 0}">登录</span> -->
        <!--  <span :class="{active:current === 1}">注册</span> -->
        <span
          v-for="(e,i) in ['登录','注册']"
          :key="i"
          :class="{active:current===i}"
          @click="handerTabs(i)"
        >{{e}}</span>
      </div>
      <LoginForm v-if="current ===0" />
      <Register v-if="current ===1" />
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import LoginForm from "@/components/user/loginForm";
import Register from "@/components/user/register";
export default {
  components: {
    LoginForm,
    Register
  },
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handerTabs(i) {
      this.current = i;
      // console.log(i);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: url(http://127.1:1337/assets/images/th03.jfif) center 0
    no-repeat;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    width: 400px;
    // margin: 0 auto;
    background-color: #fff;
    // display: flex;
    // justify:center;
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
  }
}
</style>