<template>
  <div class="container">
    <div class="title">
      <i class="iconfont icon-feiji2"></i>
      <span>国内机票</span>
    </div>
    <div class="ticket">
      <div class="search">
        <div class="tabs">
          <span
            v-for="(e,i) in ['单程','返程']"
            :key="i"
            :class="{active:i===0}"
            @click="changeTab(e,i)"
          >
            <i class="iconfont icon-gonglve1" v-if="i ===0"></i>
            <i class="iconfont icon-aixin" v-if="i ===1"></i>
            {{e}}
          </span>
        </div>
        <div class="searchmain">
          <div class="go">
            出发城市
            <el-autocomplete
              v-model="searchTicket.departCity"
              :fetch-suggestions="querySearchdepartCity"
              placeholder="请输入出发城市"
              @select="handleDepartCity"
              style="width:203px; margin-bottom: 22px; margin-left: 14px"
            ></el-autocomplete>
          </div>
          <div class="go">
            目的城市
            <el-autocomplete
              v-model="searchTicket.destCity"
              :fetch-suggestions="querySearchdestCity"
              placeholder="请输入目的城市"
              @select="handleDestCity"
              style="width:203px; margin-bottom: 22px;  margin-left: 14px"
            ></el-autocomplete>
          </div>
          <div class="block">
            <span class="demonstration">出发时间</span>
            <el-date-picker
              v-model="searchTicket.departDate"
              type="date"
              placeholder="选择日期"
              style="width:203px; margin-bottom: 22px;  margin-left: 14px"
              format="yyyy-MM-dd"
              @change="getTime"
            ></el-date-picker>
          </div>
          <el-button type="primary" class="searchbtn" @click="gettiket">
            <i class="el-icon-search"></i> 搜索
          </el-button>
          <div class="change">
            <span @click="changgeCity">换</span>
          </div>
        </div>
      </div>
      <div class="img">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
      </div>
    </div>
  </div>
</template>
<script>
import monent from "moment";
export default {
  data() {
    return {
      searchTicket: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      allCity: [],
      localStorageData: []
    };
  },
  methods: {
    // 切换tab栏
    changeTab(e, i) {
      if (i === 1) {
        this.$message.warning("暂不支持往返");
      }
    },
    // 动态获取选择框城市
    querySearchdepartCity(val, cb) {
      if (!val) {
        cb([]);
        return;
      }
      // console.log(val)
      this.$axios({
        url: "/airs/city",
        params: { name: val }
      }).then(res => {
        // console.log(res);
        this.allCity = res.data.data.map(e => {
          e.value = e.name.replace("市", "");
          return e;
        });
        this.searchTicket.departCode = res.data.data[0].sort;
        this.searchTicket.departCity = res.data.data[0].value;
        cb(this.allCity);
      });
    },
    querySearchdestCity(val, cb) {
      if (!val) {
        cb([]);
        return;
      }
      this.$axios({ url: "/airs/city", params: { name: val } }).then(res => {
        // console.log(res);
        this.allCity = res.data.data.map(e => {
          e.value = e.name.replace("市", "");
          // this.searchTicket.departCode = e.sort
          return e;
        });
        this.searchTicket.destCode = res.data.data[0].sort;
        this.searchTicket.destCity = res.data.data[0].value;
        cb(this.allCity);
      });
    },
    handleDepartCity(item) {
      // console.log(item);
      this.searchTicket.departCode = item.sort;
      this.searchTicket.departCity = item.value;
    },
    handleDestCity(item) {
      this.searchTicket.destCode = item.sort;
      this.searchTicket.destCity = item.value;
    },
    // 修改时间格式
    getTime(val) {
      this.searchTicket.departDate = monent(val).format("YYYY-MM-DD");
    },
    // 互换地市
    changgeCity() {
      const { departCity, destCity, destCode, departCode } = this.searchTicket;
      this.searchTicket.departCity = destCity;
      this.searchTicket.destCity = departCity;
      this.searchTicket.destCode = destCode;
      this.searchTicket.departCode = departCode;
    },
    gettiket() {
      // console.log(this.searchTicket)
      const { departCity, destCity, departDate } = this.searchTicket;
      const obj = { departCity, destCity, departDate };
      // console.log(obj)
      let valid = true;
      Object.keys(obj).forEach(e => {
        // console.log(obj[e])
        if (!valid) {
          return;
        }
        if (!obj[e]) {
          valid = false;
          if (e === "departCity") this.$message.warning("请输入出发城市");
          if (e === "destCity") this.$message.warning("请输入目的城市");
          if (e === "departDate") this.$message.warning("请输入出发时间");
        }
      });
      if (valid) {
        let airs = JSON.parse(localStorage.getItem("setTicket")) || [];
        airs.unshift(this.searchTicket);
        if (airs.length > 5) {
          airs.length = 5;
        }
        localStorage.setItem("setTicket", JSON.stringify(airs));
        this.$router.push({ path: "/air/flights", query: this.searchTicket });
        // this.$axios({
        //   url:'/airs',
        //   params:this.searchTicket
        // }).then( res =>{
        //   // console.log(res)
        //   if(res.status === 200){
        //       this.$router.push('/air/flights')
        //   }
        // })
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .title {
    color: orange;
    font-size: 20px;
    margin: 15px 0;
    .iconfont {
      font-size: 20px;
    }
  }
  .ticket {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .search {
      width: 360px;
      border: 1px solid #ddd;
      border-top: none;
      box-sizing: border-box;
      .tabs {
        display: flex;
        span {
          flex: 1;
          display: block;
          height: 47px;
          line-height: 47px;
          text-align: center;
          background-color: #eee;
          border-top: 3px solid #eee;
        }
        .active {
          border-top-color: orange;
          background-color: #fff;
        }
      }
      .searchmain {
        position: relative;
        padding: 15px 50px 15px 15px;
        font-size: 14px;
        color: #606266;
        .go,
        .block {
          padding-left: 15px;
        }
        .searchbtn {
          margin-left: 86px;
          width: 67%;
          cursor: pointer;
        }
        .change {
          &::before {
            display: block;
            content: "";
            width: 25px;
            height: 1px;
            background-color: #ccc;
            position: absolute;
            top: 35px;
            right: 27px;
          }
          &::after {
            display: block;
            content: "";
            width: 25px;
            height: 1px;
            background-color: #ccc;
            position: absolute;
            top: 95px;
            right: 27px;
          }
          span {
            position: absolute;
            top: 55px;
            right: 17px;
            background-color: #999;
            color: #fff;
            display: block;
            width: 20px;
            height: 20px;
            text-align: center;
            cursor: pointer;
            font-size: 12px;
            &::after {
              display: block;
              content: "";
              width: 1px;
              height: 20px;
              background-color: #ccc;
              position: absolute;
              top: 21px;
              right: 10px;
            }
            &::before {
              display: block;
              content: "";
              width: 1px;
              height: 20px;
              background-color: #ccc;
              position: absolute;
              top: -19px;
              right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>


