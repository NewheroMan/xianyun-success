<template>
  <div class="flightmain">
    <div class="flightsclass">
      <div class="flightsShow" @click="isshow = !isshow">
        <el-row>
          <el-col :span="6">
            <div class="grid-content">{{data.airline_name }} {{data.flight_no}}</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-row>
                <el-col :span="8">
                  <div class="grid-content dep">
                    <div class="deptime">{{data.dep_time }}</div>
                    <div class="depairport">{{data.org_airport_name }} {{data.org_airport_quay }}</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content lastTime">
                    <span>{{getTime}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content des">
                    <div class="desttime">{{data.arr_time }}</div>
                    <div class="desairport">{{data.dst_airport_name }} {{data.dst_airport_quay }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              ￥
              <span class="saleMoney">{{data.base_price / 2}}</span>起
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="fligthdetail" v-show="isshow">
        <el-row style="display:flex">
          <el-col :span="4" style="display:flex;align-items:center">
            <div class="grid-content">低价推荐</div>
          </el-col>
          <el-col :span="20" class="detailMore">
            <div class="grid-content">
              <el-row v-for="(e,i) in data.seat_infos" :key="i">
                <el-col :span="16">
                  <div class="grid-content">
                    <span class="economyClass">{{e.name}}</span> | 上海一诺千金航空服务有限公司
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content saleMoney">￥{{Number( e.org_settle_price).toFixed(2)}}</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content fligthdetailSure">
                    <el-button type="warning" class="sure" @click="suerToOrder(data.id,e.seat_xid)">选定</el-button>
                    <div class="residue">剩余：{{e.discount}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  
  data() {
    return {
      isshow: false
    };
  },
  watch:{
    data(){
      this.isshow =false;
      return this.data;
    }
  },
  computed:{
    getTime(){
      let deptime = this.data.dep_time.split(':');
      let destime =  this.data.arr_time.split(':');
      // console.log(deptime,destime)
      if(deptime > destime){
        destime[0] += 24
      }
      let dis =(destime[0] * 60 + +destime[1]) - (deptime[0] * 60 + +deptime[1]) 
      return `${Math.floor(dis / 60)}时${dis % 60}分`
    } 

  },
  methods:{
    suerToOrder(id,seat_xid){
      // console.log(this.data)
      this.$router.push({
        path:'/air/order',
        query:{id,seat_xid}
      })
    }
  }
};
</script>

<style lang="less" scoped>
.flightsclass {
  border: 1px solid #ddd;
  margin-top: 10px;
  font-size: 14px;
  .flightsShow {
    padding: 15px;
    height: 52px;
    line-height: 52px;
    align-items: center;
    .grid-content {
      text-align: center;
      .dep {
        text-align: center;
        line-height: 26px;
            padding-left: 45px;
        .deptime {
          font-size: 24px;
        }
        .depairport {
          font-size: 12px;
          color: #999;
        }
      }
      .lastTime {
        span {
          font-size: 14px;
          border-bottom: 1px solid #eee;
          padding: 10px 0;
          color: #999;
        }
      }
      .des {
        // text-align: center;
        line-height: 26px;
            padding-right: 45px;
        .desttime {
          font-size: 24px;
        }
        .desairport {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .saleMoney {
      color: orange;
      font-size: 24px;
    }
  }
  .fligthdetail {
    background-color: #f6f6f6;
    padding: 0 20px;
    // line-height: 72px;
    // height: 72px;
    align-items: center;
    .detailMore {
      padding: 10px 0;
      line-height: 52px;
      font-size: 12px;
      .el-row {
        border-bottom: 1px solid #eee;
      }
      .economyClass {
        color: green;
      }
      .saleMoney {
        color: orange;
        font-size: 24px;
      }
      .fligthdetailSure {
        line-height: 13px;
        .sure {
          padding: 7px 20px;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .residue {
          text-align: center;
        }
      }
    }
  }
}
</style>

