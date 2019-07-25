<template>
  <div class="adv">
    <div class="advtitle">
      <span>
        <i class="iconfont icon-anquan"></i>
        100%航协认证
      </span>
      <span>
        <i class="el-icon-s-marketing"></i>
        出行保障
      </span>
      <span>
        <i class="el-icon-phone"></i>
        7x24小时服务
      </span>
    </div>
    <div class="SpecialOffer">
      <div class="SpecialOfferTitle">
        <i class="el-icon-position"></i>
        特价机票
      </div>
      <div class="SpecialOfferMain">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6" v-for="(e,i) in saleTiket" :key="i">
            <div class="grid-content bg-purple">
               <nuxt-link :to="`/air/flights?departCity=${e.departCity}&departCode=${e.departCode}&destCity=${e.destCity}&destCode=${e.destCode}&departDate=${e.departDate}`">
               <img
                style="width:100%"
                :src="`${e.cover}`"
              /></nuxt-link>
              <div class="SpecialOfferfly">
                <div class="where">
                  <span>{{e.departCity}}</span>-
                  <span>{{e.destCity}}</span>
                </div>
                <div class="price">￥{{e.price}}</div>
              </div>
            </div>
          </el-col>


        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            saleTiket:[]
        }
    },
    methods:{

    },
    mounted(){
            this.$axios({
            url:'/airs/sale',
            }).then( res =>{
                console.log(res)
                if(res.status === 200){
                    this.saleTiket = res.data.data
                }
            })
        }
    
};
</script>

<style lang="less" scoped>
.adv {
  width: 1000px;
  margin: 0 auto;
  .advtitle {
    display: flex;
    padding: 10px 0;
    height: 58px;
    background-color: #f5f5f5;
    box-sizing: border-box;
    line-height: 38px;
    border: 1px solid #ddd;
    margin-bottom: 15px;
    span {
      flex: 1;
      text-align: center;
      border-right: 1px solid #ddd;
      &:last-child {
        border-right: none;
      }
    }
  }
  .SpecialOffer {
    padding-bottom: 15px;
    .SpecialOfferTitle {
      color: #409eff;
      font-size: 20px;
    }
    .SpecialOfferMain {
      border: 1px solid #ddd;
      padding: 20px;
      overflow: hidden;
      .el-col-6{
          margin-right: 15px;
                height: 140px;
          &:last-child{
              margin-right: 0; 
          }
          .bg-purple {
          position: relative;
          
        .SpecialOfferfly {
          display: flex;
          justify-content: space-between;
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          color: #fff;
          padding: 0 15px;
          box-sizing: border-box;
        }
      }
      }
      
    }
  }
}
</style>

