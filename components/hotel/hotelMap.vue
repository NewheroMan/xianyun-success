<template>
  <div class="hotelmap">
    <el-row :gutter="20">
      <el-col :span="16">
        <div id="container"></div>
      </el-col>
      <el-col :span="8">
        <!-- tab栏 -->
        <el-tabs v-model="activeName" @click.native="handleClick(activeName)">
          <!-- 表格 -->

          <el-tab-pane label="风景" name="first">
            <el-table :data="scenics" style="width: 100% ;margin-top:-50px;" height="350">
              <el-table-column fixed prop="name" width="100"></el-table-column>
              <el-table-column prop="address" width="150"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <el-table :data="scenics" style="width: 100% ;margin-top:-50px;" height="350">
              <el-table-column fixed prop="name" width="100"></el-table-column>
              <el-table-column prop="address" width="150"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      locationCenter: [],
      scenics: []
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  watch: {
    data: function() {
      const { latitude, longitude } = this.data.location;
      this.data.location.latitude = longitude;
      this.data.location.longitude = latitude;
      this.locationCenter = Object.keys(this.data.location).map(key => {
        return this.data.location[key];
      });
      // console.log(latitude, longitude);
      setTimeout(this.getMap(), 1);
    }
  },
  mounted() {
    this.getmapData("风景名胜");
  },
  methods: {
    getmapData(types) {
      setTimeout(() => {
        const index = this.data.city.name.indexOf("市");
        const city = this.data.city.name.slice(0, index);
        const mapData = {
          city: city,
          location: `${this.data.location.latitude},${this.data.location.longitude}`,
          types: types,
          output: "json",
          page: 1,
          offset: 10,
          key: "79041dfa1c752f49599e2b507c64da42"
        };
        this.$axios({
          baseURL: "https://restapi.amap.com/v3/place/text",
          params: mapData
        }).then(res => {
          this.scenics = res.data.pois;
          console.log(this.scenics);
        });
      }, 1000);
    },
    getMap() {
      let that = this;
      this.window = window;
      window.onLoad = function() {
        var map = new AMap.Map("container", {
          zoom: 14,
          center: that.locationCenter,
          viewMode: "3D"
        });
        //获取所有的地标
        setTimeout(() => {
          console.log("ffff", that.scenics);
          var positionArr=[];
          that.scenics.forEach(v=>{
            var arr=v.location.split(',');
            arr[0]= +arr[0];
            arr[1]= +arr[1];
            console.log(arr);
            positionArr.push(arr);
          })
          console.log(positionArr);
          var markerList=[];
          for (var i = 0; i < that.scenics.length; i++) {
            markerList[i] = new AMap.Marker({
             content: `<div style="background: url(http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png);background-size:100%;width:28px;height:30px;line-height:26px;text-align:center;">${i}</div>`,
             position: new AMap.LngLat(positionArr[i][0],positionArr[i][1]),
             title: that.scenics[i].name
            });
            // markerList.push();
          }
          console.log("lllll", markerList);
          map.add(markerList); //添加到地图
        }, 2000);
      };
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=5b8083747a67fbcb50239bbf7e7d4196&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    },
    handleClick(activeName) {
      console.log(activeName);
      if (activeName === "first") {
        this.getmapData("风景名胜");
      } else if (activeName === "second") {
        this.getmapData("交通设施服务");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hotelmap {
  height: 360px;
  margin-bottom: 50px;
  #container {
    width: 100%;
    height: 360px;
    
  }
}
</style>

