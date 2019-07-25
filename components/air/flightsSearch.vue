<template>
  <div class="aircontainer">
    <div class="search">
      <div class="searchleft">
        <p>单程： {{data.info.departCity}} - {{data.info.destCity}} / {{data.info.departDate}}</p>
      </div>
      <div class="searchright">
        <el-select v-model="airport" placeholder="起飞机场" @change="handerFltairport">
          <el-option
            v-for="(item ,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select v-model="flightTimes" placeholder="起飞时间" @change="handerFltTime">
          <el-option
            v-for="(item ,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
        <el-select v-model="company" placeholder="航空公司"  @change="handerFltCompany">
          <el-option
            v-for="(item ,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select v-model="airSize" placeholder="机型" @change="handerAirSize">
          <el-option
            v-for="(item ,index) in planeSize"
            :key="index"
            :label="item.type"
            :value="item.size"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="Sizerbtn">
      <span>筛选：</span>
      <el-button type="primary " plain class="btn" @click="del">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //判断多选的数据
      filters:{
        startAirport:{value:'',key:'org_airport_name'},
        company:{value:'',key:'airline_name'},
        airSize:{value:'',key:'plane_size'},

      },

      airport: "", 
      flightTimes: "", 
      company: "", 
      airSize: "", 
      options: [],
      planeSize: [
        { type: "大", size: "L" },
        { type: "中", size: "M" },
        { type: "小", size: "S" }
      ]
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mounted() {},
  methods: {
   
    // 根据起飞时间进行筛选
    handerFltTime(val) {
      // console.log(val)
      let [from, to] = val.split(",");
      // console.log(from,to)  dep_time
      let arr = this.data.flights.filter(e => {
        let [start] = e.dep_time.split(":");
        return +from <= +start && +start < +to;
      });
      this.$emit("changeDataList", arr);
    },
    // 根据机场筛选
    handerFltairport(val){
          let arr = this.data.flights.filter(e => {
            return e.org_airport_name === val
      })
      this.$emit("changeDataList", arr);
    },
    // 根据公司进行筛选
    handerFltCompany(val){
      console.log(val)
      let arr = this.data.flights.filter(e => {
            return e.airline_name === val
      })
      // console.log(arr)
      this.$emit("changeDataList", arr);
    },
    // 根据机型筛选
    handerAirSize(val){
      let arr = this.data.flights.filter( e=>{
        return e.plane_size === val
      })
      this.$emit("changeDataList", arr);
    },
    // 撤销筛选
    del(){
      this.airport = "", 
      this.flightTimes = "", 
      this.company = "", 
      this.airSize = "",
      this.$emit("changeDataList", this.data.flights);
    }
  }

};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  .searchleft {
    flex: 1;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }
  .searchright {
    flex: 2;
    display: flex;
    justify-content: space-between;
    /deep/ .el-input__inner {
      flex: 1;
      height: 28px;
      line-height: 28px;
      width: 115px;
      box-sizing: border-box;
      font-size: 12px;
    }
    /deep/ .el-select__caret {
      height: 28px;
      line-height: 28px;
    }
  }
}
.Sizerbtn {
  margin-top: 10px;
  .btn {
    width: 58px;
    height: 26px;
    padding: 7px 15px;
    line-height: 12px;
    // text-align: center;
    margin: 0 auto;
    border-radius: 20px;
    font-size: 12px;
  }
}
</style>