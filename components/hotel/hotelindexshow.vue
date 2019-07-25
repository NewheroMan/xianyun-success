<template>
  <div class="show">
    <div class="hotelshow" v-for="(e,i) in getHotelData" :key="i">
      <div class="img">
        <div @click="sendHotelDatail(e)">
          <img :src="`${e.photos}`" alt style="width:320px;height:210px" />
        </div>
      </div>
      <div class="detail">
        <h2 @click="sendHotelDatail(e)">{{e.name}}</h2>
        <div class="engName">
          {{e.alias}}
          <el-tooltip
            class="item"
            effect="light"
            :content="e.hotellevel |  changeStart"
            placement="top"
          >
            <span class="perstart" v-if="e.hotellevel">
              <i class="el-icon-star-on" v-show="e.hotellevel.level>1"></i>
              <i class="el-icon-star-on" v-show="e.hotellevel.level>2"></i>
              <i class="el-icon-star-on" v-show="e.hotellevel.level>3"></i>
              <i class="el-icon-star-on" v-show="e.hotellevel.level>4"></i>
              <i class="el-icon-star-on" v-show="e.hotellevel.level>0"></i>
            </span>
          </el-tooltip>
          <span>{{e.hoteltype.name}}</span>
        </div>
        <div class="grade">
          <div class="gradestart">
            <el-rate
              v-model="e.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
          <div class="gradenum">
            <span>{{e.all_remarks}}</span> 条评价
          </div>
          <div class="node">
            <span>{{e.common_remarks}}</span> 篇游记
          </div>
        </div>
        <div class="place">
          <i class="el-icon-location-information"></i>
          <span>位于: {{e.address}}</span>
        </div>
      </div>

      <div class="groupon">
        <div class="groupname" v-for="(item,index) in e.products" :key="index*10086">
          <div class="name">{{item.name}}</div>
          <div class="price">
            <span>￥{{item.price}}</span> 起
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-show="$store.state.hotel.hotelInfo === []">暂无符合条件的酒店</div>
    <div class="pagin">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <input type="hidden" :value="changeShowData">
      <input type="hidden" :value="changetotal">
    </div>
  </div>
</template>

<script>
export default {
  // props:{
  //   data:{
  //     type:Object,
  //     default:{start:'all',
  //       type:'all',
  //       facility:'all'}
  //   }
  // },
  data() {
    return {
      value: 0,
      hoteldata: [],
      total:0,
      currentPage:1,
      pageSize:5,
      _limit:5
    };
  },
  filters: {
    changeStart(hotellevel) {
      if (hotellevel === null) {
        return "暂无星级";
      } else {
        return hotellevel.name;
      }
    }
  },
  computed: {
    getHotelData() {
      this.hoteldata = this.$store.state.hotel.hotelInfo;
      return this.hoteldata;
    },
    changetotal(){
      this.total =  this.$store.state.hotel.total
    },
    changeShowData(){
      // if(this.data.start ==='all')
      // Object.keys(this.data).forEach( e =>{
      //   if(this.data[e] === "all"){
      //     // this.data[e] = null
      //     console.log
      //     let { e, ...prop} = this.data
      //   }
      // console.log(prop)

      // })
      //  let _start = 1;
      // let _limit = 5;
      // console.log(prop)
      // prop._start = 1;
      // prop._limit = 5
      // prop.city = this.$store.state.hotel.cityid;
      // this.$axios({
      //   url: "/hotels/",
      //   params: prop
      // }).then(res => {
      //   console.log(res);
      //   this.newCityData = res.data.data;
      //   this.$store.commit("hotel/setHotelInfo", this.newCityData);
      // });
    }
  },
  methods: {
    // 点击详情页跳转并发送数据
    sendHotelDatail(val) {
      const { id } = val;
      // console.log(id ,'88888')
      this.$router.push({path:'hotel/hoteldetails',query:{id}},
      );
    },
    handleSizeChange(val){
      // let _start = val
      // console.log(val)
      this._limit = val;
      let _start = 1;
      this.city = this.$store.state.hotel.cityid;
      this.$axios({
        url: `/hotels/?city=${this.city}&_start=${_start}&_limit=${this._limit}`,
        // params: { city: this.city, _start,_limit:this._limit }
      }).then(res => {
        console.log(res)
        this.hoteldata = res.data.data;
        this.$store.commit("hotel/setHotelInfo", this.hoteldata);
      });
    },
    handleCurrentChange(val){
      var _start = val * this.pageSize;
      var _limit = this.pageSize;
      this.city = this.$store.state.hotel.cityid;
      this.$axios({
        url: `/hotels/`,
        params: { city: this.city, _start,_limit }
      }).then(res => {
        console.log(res)
        this.hoteldata = res.data.data;
        this.$store.commit("hotel/setHotelInfo", this.hoteldata);
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.hoteldata = this.$store.state.hotel.hotelInfo;
      this.total = this.$store.state.hotel.total
      // console.log(this.total)
    });
  }
};
</script>

<style lang="less" scoped>
.show {
  .hotelshow {
    display: flex;
    padding-bottom: 25px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    .img {
      cursor: pointer;
    }
  }
  .detail {
    width: 405px;
    padding: 5px 20px;
    h2 {
      font-weight: normal;
      cursor: pointer;
    }
    .engName {
      // display: flex;
      .perstart {
        color: #f90;
        letter-spacing: -5px;
      }
    }
    .grade {
      display: flex;
      justify-content: space-between;
      /deep/ i {
        letter-spacing: -10px;
      }
      .gradenum {
        span {
          color: #f90;
          width: 50%;
        }
      }
      .node {
        span {
          color: #f90;
          width: 50%;
        }
      }
    }
    .place {
      color: #666;
      font-size: 14px;
    }
  }
  .groupon {
    padding: 20px 0 0 0;
    width: 250px;
    margin-left: 30px;
    font-size: 14px;
    color: #606266;
    .groupname {
      display: flex;
      justify-content: space-between;
      padding: 15px 30px 15px 15px;
      border-bottom: 1px solid #ddd;
      .price {
        font-size: 16px;
        span {
          color: #f90;
        }
      }
    }
  }
}
</style>

