<template>
  <div>
    <!-- 轮播图模块 -->
    <el-carousel>
      <el-carousel-item v-for="(item,i) in pics" :key="i">
        <div
          class="banner"
          :style="`background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
      background-size:contain contain;`"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <div class="tabsAndSearch">
      <div class="tabs">
        <span v-for="(e,i) in tabs" :key="i" @click="changeTabs(i)" :class="{active:current === i}">{{e.title}}</span>
      </div>
      <el-input
        :placeholder="tabs[current].placeholder"
        suffix-icon="el-icon-search"
        v-model="search"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // active:active,
      search: "",
      current: 0,
      pics: [],
      tabs: [
        {
          title: "攻略",
          placeholder: "搜索城市"
        },
        {
          title: "酒店",
          placeholder: "搜索酒店"
        },
        {
          title: "机票",
          placeholder: ""
        }
      ]
    };
  },
  methods: {
    changeTabs(i) {
      this.current = i;
      if(i === 2){
        this.$router.push()
      }
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res);
      // console.log(this.$axios.defaults);
      if (res.status === 200) {
        this.pics = res.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-carousel__container {
  height: 700px;
  .banner {
    height: 700px;
    position: relative;
  }
}
.tabsAndSearch {

  position: absolute;
  top: 400px;
  left: 50%;
  margin-left: -261px;
  margin-top: -34px;
  z-index: 2;
     span {
      cursor: pointer;
      position: relative;
      display: inline-block;
      // padding: 0.5em 1em 0.35em;
      color: white;
      width: 82px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      &:before {
        content: ""; /*用伪元素来生成一个矩形*/
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: rgba(0, 0,0 , .5);
        transform: scaleY(1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
      }
    }

/deep/ input {
    height: 46px;
    padding: 13px 15px;
    width: 478px;
    border-top-left-radius:0;
  }
  /deep/ .el-input__icon {
    // &:before {
    //   width: 22px;
    // height: 22px;
    padding: 0 10px;
    font-size: 22px;
    color: #000;
  }
}
.tabsAndSearch  .active{
  // background-color: #eee;
  color: #000;
  // :before:background-color: #eee;
}
.tabsAndSearch .active::before{
  background: rgb(238, 238, 238);
  color: #000;
}
</style>
