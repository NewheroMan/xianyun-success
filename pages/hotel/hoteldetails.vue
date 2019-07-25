<template>
  <div class="hotelsDetail">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="hotel-nav">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
      <el-breadcrumb-item>好来商务酒店</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店展示栏 -->
    <hotelShow :data="hotelData"></hotelShow>
    <!-- 价格对比栏 -->
    <hotelPrice :data="hotelData"></hotelPrice>
    <!-- 地图 -->
    <hotelMap :data="hotelData"></hotelMap>
    <!-- 酒店详情介绍栏 -->
    <hotelIntroduce :data="hotelData"></hotelIntroduce>
    <!-- 酒店评论页 -->
    <hotelComments :data='hotelData'></hotelComments>
  </div>
</template>

<script>
import hotelShow from "@/components/hotel/hotelShow.vue";
import hotelPrice from "@/components/hotel/hotelPrice.vue";
import hotelMap from "@/components/hotel/hotelMap.vue";
import hotelIntroduce from "@/components/hotel/hotelIntroduce.vue";
import hotelComments from "@/components/hotel/hotelComments.vue";
export default {
  data() {
    return {
      hotelData: {
        hotellevel: {},
        location: {},
        city:{}
      }
    };
  },
  components: {
    hotelShow,
    hotelPrice,
    hotelMap,
    hotelIntroduce,
    hotelComments
  },
  mounted() {
    console.log(this.$route.query,'44444')
    this.$axios({
      url: "/hotels",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.hotelData = res.data.data[0];
      console.log(this.hotelData);
    });
  }
};
</script>

<style lang="less" scoped>
.hotelsDetail {
  width: 1000px;
  margin: 0 auto;
  .hotel-nav {
    margin: 20px 0;
  }
}
</style>

