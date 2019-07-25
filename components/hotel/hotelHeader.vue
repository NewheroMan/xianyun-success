<template>
  <div class="hotelheader">
    <div class="Breadcrumb">
      <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">
          <span style="font-weight:normal;">酒店</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">{{goalcity[0].value}}酒店预订</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="search">
        <el-form ref="form" :model="hotelForm" label-width="80px" :inline="true">
          <el-form-item>
            <!-- 酒店城市模块 -->
            <el-autocomplete
              v-model="hotelForm.city"
              :fetch-suggestions="querySearchAsync"
              placeholder="目的地"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <!-- 中间居住时间段模块 -->
          <el-form-item>
            <el-date-picker
            v-model="timer"
              @change="getLivingTime"
              type="daterange"
              range-separator="至"
              start-placeholder="入住日期"
              end-placeholder="离店日期"
               format="yyyy 年 MM 月 dd 日">
            ></el-date-picker>
          </el-form-item>
          <!-- 最右侧人数模块 -->
          <el-form-item @click.native="isshowperNum = !isshowperNum" @blur.native="isshowperNum = true">
            <el-input placeholder="人数未定" suffix-icon="el-icon-user" v-model="allpernum"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="getPriceBtn">查看价格按钮</el-button>
          </el-form-item>
        </el-form>
        <div :class="{isshowperNum:isshowperNum,perNum:true,clearfix:true}">
          <el-row style="border-bottom:1px solid #ebeef5;padding-bottom:20px;">
            <el-col :span="8">
              <div class="grid-content bg-purple">每间</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-select v-model="mannum" clearable placeholder="请选择" style="height:28px">
                  <el-option v-for="(item,i) in options" :key="i" :label="item +'成人'" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-select v-model="childnum" clearable placeholder="请选择" style="height:28px">
                  <el-option v-for="(it,i) in option" :key="i*6" :label="it +'儿童'" :value="it"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row class="sure">
            <el-col :span="6">
              <div class="grid-content"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content"></div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-button size="mini" type="primary" @click.native="getper">确定</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="hoteloption">
        <el-row>
          <el-col :span="14">
            <el-col class="grid-content detail">
              <!-- 区域 -->
              <el-row>
                <el-col :span="4">
                  <div class="grid-content bg-purple">区域</div>
                </el-col>
                <el-col :span="20">
                  <div :class="{scenics:isscenics}"  style="font-size:14px; color:#666;">
                    <nuxt-link
                      to="/hotel"
                      v-for="(e,i) in this.citydata[0].scenics"
                      :key="i*10"
                      style="padding-right:15px;"
                    >{{e.name}}</nuxt-link>
                </div> 
                   <a href="javascript:;" @click="isscenics= !isscenics">
                    <i class="el-icon-circle-plus-outline"></i> 
                    <span>等{{this.citydata[0].scenics.length}}个区域</span> 
                  </a>
                </el-col>
              </el-row>
              <el-row>
                <!-- 攻略 -->
                <el-col :span="4">
                  <div class="grid-content">攻略:</div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content">
                    北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。
                    景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。
                    由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
                  </div>
                </el-col>
              </el-row>
              <!-- 均价 -->
              <el-row>
                <el-col :span="4">
                  <div class="price">
                    均价
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                      placement="top-start"
                    >
                      <span class="mark">?</span>
                    </el-tooltip>
                    <span class="colon">:</span>
                  </div>
                </el-col>
                <el-col :span="20">
                  <div class="grid-content allstart">
                    <div class="perprice">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                        placement="end"
                      >
                        <div class="perstart">
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                        </div>
                      </el-tooltip>
                      <span>¥332</span>
                    </div>
                    <div class="perprice">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                        placement="end"
                      >
                        <div class="perstart">
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                        </div>
                      </el-tooltip>
                      <span>¥521</span>
                    </div>
                    <div class="perprice">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                        placement="end"
                      >
                        <div class="perstart">
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-star-on"></i>
                        </div>
                      </el-tooltip>
                      <span>¥768</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-col>
          <el-col :span="10">
            <div class="grid-content map">
              <div id="container" style="height:260px;z-index:2"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <input type="hidden" :value="mapdata">
  </div>
</template>

<script>
export default {
  data() {
    return {
      total:0,
      timer:'',
      allhotelData:[],
      livingTime:[ ],
      allpernum:'',
      childnum: 0,
      mannum: 0,
      goalcity:[{value:'深圳市'}],
      hotelForm: {
        region: "",
        city: "深圳市",
        cityid:0,
        cityData: {}
      },
      isscenics:true,
      isshowperNum:true,
      perNum:true,
      // this.citydata 用于下拉菜单
      citydata: [{scenics:[],id:0} ] ,
      form: {
        name: ""
      },
      options: [1, 2, 3, 4, 5],
      option: [1, 2, 3, 4, 5],
      input1: "",
      scenic: [],
      location :[ ],
      // 中心点坐标
      middellocation:[]
    };
  },
  methods: {
    getcityData(val) {
      return this.$axios({
        url: "/cities",
        params: { name: val }
      }).then(res =>{
        return res
      });
    },
    // 远程筛选获取城市列表
    querySearchAsync(val, cb) {
      if (!val) {
        cb([]);
        return;
      }
      // console.log(val)
      this.getcityData(val).then( res =>{
        console.log(res)
        if(res.data.data.length === 0){
          console.log(1)
          this.goalcity =  [{value:'深圳市'}]
          // this.citydata = this.citydata[0].value
        }
        else{
          console.log(2)
          this.citydata = res.data.data.map(e => {
          e.value = e.name;
          console.log(e,111)
          return e;
        })
        this.hotelForm.cityid = this.citydata[0].id
        this.hotelForm.city = this.citydata[0].value;
        this.goalcity = this.citydata[0].value;
        }
        // console.log(res)
        // console.log(this.citydata)
        // this.hotelForm.cityid = this.citydata[0].id
        //  console.log( this.citydata)
        // if(res.data.data !== []) {
          // console.log(1)
          // this.goalcity =  []
          // this.citydata = [{scenics:''}]
          // return
        //   console.log(12)
        //   this.hotelForm.city = this.citydata[0].value;
        // this.goalcity = this.citydata[0].value;
        // }else{
        //   console.log(1)
        //   this.goalcity =  []
        //   this.citydata = [{scenics:''}]
        // }
       // 默认获取第一项
        // this.hotelForm.city = this.citydata[0].value;
        // this.goalcity = this.citydata[0].value;
        cb(this.goalcity);
        }
      )

    },
    // 选中城市
    handleSelect(val) {
      console.log(val);
      this.hotelForm.cityData = val;
      this.hotelForm.city = val.value;
      this.goalcity = val.value
    },
    // 人数模块
    getper(){
      // console.log(this.childnum)
      // console.log(this.mannum)
      this.allpernum = `${this.mannum}成年,${this.childnum}儿童`
      this.isshowperNum = true
    },
    // 获取选中时间段
    getLivingTime(onPick ){
      // console.log( onPick )
      this.livingTime = onPick[0]
    },
    // 根据筛选条件查看价格
    getPriceBtn(){
      let city = +this.hotelForm.cityid;
      let enterTime = this.livingTime;
      let person = +(this.childnum + this.mannum);
      // console.log(city,enterTime,person)
      this.$axios({
        url:'/hotels',
        params:{city,enterTime}
      }).then(res =>{
        // console.log(res)
        this.allhotelData = res.data.data
        this.cityid = res.data.data[0].city.id
        this.$store.commit('hotel/setid',this.cityid)
        // console.log(this.cityid)
        this.$store.commit('hotel/setHotelInfo',this.allhotelData)
        this.allhotelData.forEach(e =>{
          e.location.name = e.name
          this.location.push(e.location)
        })
        this.middellocation = [this.location[0].longitude,this.location[0].latitude]
      })
    },
    // 封装地图方法
    map(){
       let that = this
       
    this.window = window
    this.document = document
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        center: that.middellocation, //中心点坐标
        viewMode: "3D"
      });
      let marker = that.location.map((e,i) =>{
        var markeri = new AMap.Marker({
          // content:`${i}`,
        position: new AMap.LngLat(e.longitude, e.latitude),
        title: e.name
      });
        return markeri
      })
      map.add(marker);
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=5b8083747a67fbcb50239bbf7e7d4196&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    }
  },
  computed:{
    mapdata(){
    // this.map()
    }
  },
  mounted() {
    this.map()
      // 页面加载完先获取默认城市的数据
      this.getcityData(this.hotelForm.city).then(res =>{
        // console.log(res)
        let _start = 1
        let _limit = 5
        this.hotelForm.cityData = res.data.data[0];
        this.hotelForm.cityid = res.data.data[0].id;
        // console.log(this.citydata[0].scenics)
        this.citydata = res.data.data
        this.$store.commit('hotel/setid',this.hotelForm.cityid)
         this.$axios({
          url:'/hotels',
          params:{city:this.hotelForm.cityid,_start,_limit}
        }).then(res =>{
          console.log(res)
          this.total = res.data.total;
        this.$store.commit('hotel/settotal',this.total);
          this.allhotelData = res.data.data
        this.$store.commit('hotel/setHotelInfo',this.allhotelData);
        this.allhotelData.forEach(e =>{
          e.location.name = e.name
          this.location.push(e.location)
          // console.log(this.location)
        })
        this.middellocation = [this.location[0].longitude,this.location[0].latitude]
        })
      })
  }
};
</script>

<style lang="less" scoped>
.hotelheader {
  .Breadcrumb {
    padding: 20px 0;
  }
  .search {
    position: relative;
    padding: 20px 0 0 0;
    .el-input__inner {
      height: 40px;
    }
    .perNum {
      box-sizing: border-box;
      width: 326px;
      height: 123px;
      padding: 10px 10px 20px 10px;
      // display: flex;
      // align-items: center;
      font-size: 14px;
      background-color: #fff;
      border: 1px solid #ebeef5;
      border-radius: 3px;
      position: absolute;
      top: 65px;
      right: 95px;
              z-index: 199;
      /deep/ .el-input__inner {
        height: 28px;
      }
      /deep/.el-icon-arrow-up {
        height: 28px;
        line-height: 28px;
      }
      .sure {
        position: absolute;
        bottom: 15px;
        right: 15px;
      }
    }
    .isshowperNum{
        display: none;
      }
  }
  .hoteloption {
    font-size: 14px;
    color: #666;
    .el-row {
      padding-bottom: 15px;
      .scenics{
        height: 40px;
        overflow: hidden;
      }
      .price {
        position: relative;
        .mark {
          color: #fff;
          background-color: #ccc;
          border-radius: 50%;
          display: block;
          width: 15px;
          height: 15px;
          text-align: center;
          line-height: 15px;
          position: absolute;
          top: -2px;
          left: 30px;
        }
        .colon {
          position: absolute;
          top: 0px;
          left: 50px;
        }
      }
      .allstart {
        display: flex;
        .perprice {
          margin-right: 30px;
          .perstart {
            display: inline;
            /deep/ .el-icon-star-on {
              letter-spacing: -5px;
              color: #ff9900;
            }
          }
          span {
            letter-spacing: 0px;
            margin-left: 5px;
          }
        }
      }
    }
  }
     .clearfix:after，.clearfix:before {
        content:"";
        height:0;
        line-height:0;
        display:block;
        clear:both;
        visibility:hidden;
    }
    .clearfix {
        zoom:1; /* 兼容ie6*/
    }

}

</style>
