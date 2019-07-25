<template>
  <div class="flights">
    <div class="flightsleft">
      <!-- 筛选模块 -->
      <flightssearch :data="cacheFlightsData" @changeDataList="changeDataList" />
      <div class="flightstitle">
        <el-row>
          <el-col :span="6">
            <div class="grid-content">航空信息</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">起飞时间</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">到达时间</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">价格</div>
          </el-col>
        </el-row>
      </div>
      <!-- 飞机票详情模块 -->
      <flightsmain v-for="(e,i) in page" :key="i" :data="e"  />
      <!-- 分页模块 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[ 4, 6, 8,12]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div class="flightsright">
      <div class="top">
          <div class="iCon">
            <el-row justify="space-between">
          <el-col :span="8">
            <div class="grid-content">
              <i class="el-icon-s-custom" style="font-size: 40px;color: rgb(64, 158, 255)"></i>
              <div>航协认证</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <i class="el-icon-user" style="font-size: 40px"></i>
              <div>出行保证</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <i class="el-icon-phone" style="font-size: 40px;color: rgb(64, 158, 255)"></i>
              <div>7x24</div>
            </div>
          </el-col>
        </el-row>
          </div>
        <div class="tel">
          <p>免费客服电话：4006345678转2</p>
        </div>
      </div>
      <div class="bottom">
        <div class="title">
          历史查询
        </div>
        <div class="searchInfo" v-for="(e,i) in searchInfo" :key="i">
            <div class="left">
              <p>{{e.departCity}} - {{e.destCity}}</p>
            <div class="time">
              {{e.departDate}}
            </div>
            </div>
            <div class="right">
              <nuxt-link :to="`/air/flights?departCity=${e.departCity}&departCode=${e.departCode}&destCity=${e.destCity}&destCode=${e.destCode}&departDate=${e.departDate}`">
               <el-button type="warning" size="mini" style="align-items: center;padding:2px 10px;height:18px;">选择</el-button>
              </nuxt-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flightssearch from "@/components/air/flightsSearch";
import flightsmain from "@/components/air/flightsmain";
export default {
  components: {
    flightssearch,
    flightsmain
  },
  computed: {
    page() {
      // console.log(this.flightsList)
      return this.flightsList.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    }
  },
  // watch:{
  //   $route(){
  //     this.getData()
  //   }
  // },
  beforeRouteUpdate (to, from, next) {
    // console.log(to)
    // console.log(from)
    // console.log(to)
      next()
      this.getData()
  },
  data() {
    return {
      flightsList: [],
      showList: [],
      pageSize: 4,
      pageNum: 1,
      total: 0,
      searchDate: {
        info: {},
        options: {},
        flights: {}
      },
      cacheFlightsData:{
         info: {},
        options: {},
        flights: {}
      },
      searchInfo:[]
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      // console.log(this.pageSize);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      // this.$refs.airmain.changeIsShow();
    },
    // 监听子组件发过来的数据
    changeDataList(arr) {
      // console.log(arr);
      this.flightsList = arr;
      this.total = arr.length;
    },
    // 右边历史查询部分
    // trueOtherTiket(val){
    //   console.log(val)
    //   this.$router.push({
    //     // path:`'/air/flights?departCity=${val.departCity}&departCode=${val.departCode}&destCity=${val.destCity}&destCode=${val.destCode}&departDate=${val.departDate}'`,
    //     // params:val
    //     path:'/air/flights',
    //     params:val
    //   })
    // }
    // 封装请求函数
    getData(){
      this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.flightsList = res.data.flights;
        this.total = res.data.total;
        this.searchDate.info = res.data.info;
        this.searchDate.options = res.data.options;
        this.searchDate.flights = res.data.flights;
        this.cacheFlightsData = { ...res.data}
      }
    })
    }
  },
  mounted() {
    this.getData(),
    this.searchInfo = JSON.parse(localStorage.getItem('setTicket')) || [];
  }
};
</script>

<style lang="less" scoped>
.flights {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  .flightsleft {
    width: 745px;
    .flightstitle {
      margin-top: 20px;
      background-color: #f6f6f6;
      border: 1px solid #ddd;
      font-size: 12px;
      text-align: center;
      height: 38px;
      line-height: 38px;
      color: #666;
      border-radius: 3px;
    }
  }
  .flightsright {
    box-sizing: border-box;
    width: 240px;
    // background-color: #aaa;
    // height: 50px;
    // padding: 0 10px;
    .top {
      border: 1px solid #eee;
      text-align: center;
      
      .iCon{
        padding: 15px 10px;
        div{
          font-size: 12px;
        }
      }
      .tel{
        background-color: #f6f6f6;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
      }
    }
    .bottom{
      border: 1px solid #ddd;
      padding: 10px;
      .title{
        border-bottom: 1px solid #eee;
        font-size: 16px;
        padding-bottom: 10px;
      }
      .searchInfo{
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        align-items: center;
        p{
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
