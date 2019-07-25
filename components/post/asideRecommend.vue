<template>
  <div>
    <div class="asideRecommend">
      <div>
         <h4>最新活动</h4> 
        <el-carousel height="150px" arrow="always">
          <el-carousel-item v-for="(item,index) in banners" :key="index">
            <img :src="item" >
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="asideRecommend">
         <h4 style="margin-top10px;">免费专属旅游顾问咨询</h4>     
        <p style="font-size:14px;color:orange;">专属旅游顾问免费提供全品类预定咨询，服务从预定到出游，归来以及后续全程</p>
        <p style="font-size:14px;color:orange;">国内服务电话 4000-000-000</p>
    </div>
    <div class="asideRecommend">
      <h4>为您推荐</h4>
      <div>
        <img src="http://photocdn.sohu.com/20111207/Img328215620.jpg" alt />
        <p style="font-size:14px;color:#999;">【精品路线】超10000人出游,近5000人真实点评,25人以内精品小团,全程五星,保证拼房,10日9晚双飞,含WiFi,自助晚餐，无购物，现在报名送豪华大礼包……</p>
      </div>
    </div>
    <div class="asideRecommend">
      <h4>积分商城</h4>
      <div>
        <img src="http://image1.juanlaoda.com/adminimageupload/39184252.jpg" alt />
      </div>
        <p>【2019年33期】闲云优惠券</p>
        <p>截止日期：2019年8月16日，每个账户累计使用上限5张，快来领取吧！</p>
        <p style="font-size:12px;color:#999;">注：本商品为电子优惠券，一旦兑换成功，概不退换！</p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            banners:[
                "http://ah.offcn.com/dl/2019/0507/20190507105207659.jpg",
                "http://img1.gtimg.com/sports/pics/hv1/132/171/1016/66109137.jpg",
                "http://img2.imgtn.bdimg.com/it/u=557113728,8890688&fm=26&gp=0.jpg"
            ]
        }
    }
};
</script>

<style lang="less" scoped>
.asideRecommend {
  width: 264px;
  margin-top: 20px;
  h4 {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  div {
    width: 100%;

    img {
      width: 100%;
    }
  }
}
</style>
