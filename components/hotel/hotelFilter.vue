<template>
  <div class="filter">
    <div class="priceFilter">
      <div class="title">
        <span>价格</span>
        <span>0-4000</span>
      </div>
      <el-slider v-model="price_in" @change="handlePrice" :max="4000" :min="0"></el-slider>
    </div>
    <div class="startFilter">
      <div class="title">
        <span>住宿等级</span>
      </div>
      <el-dropdown @command="handleStartCommand" multiple>
        <span class="el-dropdown-link">
          {{startFilter}}
          <i class="el-icon-arrow-down el-icon--right" style="margin-left:100px;"></i>
        </span>
        <el-dropdown-menu slot="dropdown"  placement="top" style="margin-top:30px">
          <el-dropdown-item command="all">不限</el-dropdown-item>
          <el-dropdown-item
            style="width:50px;"
            v-for="(e,i) in levels"
            :key="i"
            :command="e.id"
          >{{e.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 住宿类型 -->
    <div class="typeFilter">
      <div class="title">
        <span>住宿类型</span>
      </div>
      <el-dropdown @command="handleTypeCommand" multiple>
        <span class="el-dropdown-link">
          {{typeFilter}}
          <i class="el-icon-arrow-down el-icon--right" style="margin-left:100px;"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">不限</el-dropdown-item>
          <el-dropdown-item v-for="(e,inde) in types" :key="inde" :command="`${e.id}&${e.name}`">{{e.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="facilityFilter">
      <div class="title">
        <span>酒店设施</span>
      </div>
      <el-dropdown @command="handleFacilityCommand">
        <span class="el-dropdown-link">不限
          <i class="el-icon-arrow-down el-icon--right" style="margin-left:100px;"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">不限</el-dropdown-item>
          <el-dropdown-item v-for="(e,i) in assets" :key="i" :command="e.id">{{e.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="brandFilter">
      <div class="title">
        <span>酒店品牌</span>
      </div>
      <el-dropdown @command="handleBrandCommand">
        <span class="el-dropdown-link">
          {{brandFilter}}
          <i class="el-icon-arrow-down el-icon--right" style="margin-left:100px;"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="不限">不限</el-dropdown-item>
          <el-dropdown-item v-for="(ev,ind) in brands" :key="ind" :command="ev.id">{{ev.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: 0,
      price_in: 0,
      start: "",
      levels: [1, 2, 3, 4, 5],
      // 筛选后的结果
      newCityData: [],
      assets: [],
      types: [],
      brands: [],
      code: 0,
      startFilter: "不限",
      typeFilter:"不限",
      facilityFilter:"不限",
      brandFilter:'不限'
    };
  },
  methods: {
    // handleCommand(command) {
    //   this.$message("click on item " + command);
    // },
    // 价钱滑块
    handlePrice(val) {
      console.log(val)
      val = +val;
      this.city = this.$store.state.hotel.cityid;
      let city = (this.city = 0 ? null : this.city);
      this.$axios({
        url: `/hotels?city=${this.city}&price_lt=${val}`
      }).then(res => {
        // console.log(res)
        this.newCityData = res.data.data;
        this.$store.commit("hotel/setHotelInfo", this.newCityData);
        this.$store.commit("hotel/settotal", res.data.total);
      });
      
    },
    // 住宿等级
    handleStartCommand(val) {
      // console.log(val)
      if (val === "all") {
        this.startFilter = "不限";
        // this.$emit('changestart',val)
      } else {
        this.startFilter = val + "星";
        // this.$emit('changestart',val)
      }
        this.$emit('changestart',val)
      let _start = 1;
      let _limit = 5;
      this.city = this.$store.state.hotel.cityid;
      this.$axios({
        url: `/hotels?city=${this.city}&hotellevel=${val}`,
        params: { _start, _limit }
      }).then(res => {
        console.log(res);
        this.newCityData = res.data.data;
        this.$store.commit("hotel/setHotelInfo", this.newCityData);
        this.$store.commit("hotel/settotal", res.data.total);

      });
    },
    // 住宿类别
    handleTypeCommand(val) {
      // console.log(val);
      if (val === "all") {
        this.typetFilter = "不限";
        // this.$emit('changetype',val)
        this.$store.commit("hotel/setHotelInfo", this.newCityData);
      } else {
        // console.log(val.split('&')[1])
        this.typetFilter = val.split('&')[1]
        // console.log(this.typetFilter,11)
        // this.$emit('changetype',val)
      }
      let _start = 1;
      let _limit = 5;
      this.city = this.$store.state.hotel.cityid;
      this.$axios({
        url: `/hotels/`,
        params: { city: this.city, hoteltype: +val.split('&')[0], _start, _limit }
      }).then(res => {
        console.log(res)
        this.newCityData = res.data.data;
        this.$store.commit("hotel/setHotelInfo", this.newCityData);
        this.$store.commit("hotel/settotal", res.data.total);
      });
    },
    // 酒店设施
    handleFacilityCommand(val) {
      //  val = +val;
            if (val === "all") {
        this.startFilter = "不限";
        this.$emit('changefacility',val)
      } else {
        this.typetFilter = val + "星";
        this.$emit('changefacility',val)

      }
      // console.log(val);
      let _start = 1;
      let _limit = 5;
      this.city = this.$store.state.hotel.cityid;
      this.$axios({
        url: "/hotels/",
        params: { city: this.city, hotelasset: val, _start, _limit }
      }).then(res => {
        console.log(res);
        this.newCityData = res.data.data;
        this.$store.commit("hotel/setHotelInfo", this.newCityData);
      });
    },
    // 酒店品牌
    handleBrandCommand() {}
  },
  mounted() {
    // 获取酒店选项
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      console.log(res, 1);
      this.assets = res.data.data.assets;
      this.levels = res.data.data.levels;
      this.types = res.data.data.types;
      this.brands = res.data.data.brands;
    });
  },
  load() {
    this.count += 2;
  }
};
</script>

<style lang="less" scoped>
.filter {
  display: flex;
  border: 1px solid #ddd;
  font-size: 14px;
  color: #666;
  padding: 5px 0 5px 20px;
  height: 67px;
  margin-bottom: 20px;
  .priceFilter {
    width: 247px;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    .title {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
  }
  .startFilter {
    width: 188px;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    .title {
      margin: 10px 0;
    }
  }

  .typeFilter {
    width: 188px;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    .title {
      margin: 10px 0;
    }
  }
  .facilityFilter {
    width: 188px;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    .title {
      margin: 10px 0;
    }
    /deep/#dropdown-menu-7540 {
      width: 150px;
      height: 200px;
      overflow-x: hidden;
      overflow-y: scroll;
      line-height: 30px;
      text-align: center;
    }
  }
  .brandFilter {
    border-right: none;
    width: 188px;
    padding: 0 10px;
    .title {
      margin: 10px 0;
    }
  }
}

/deep/#dropdown-menu-7540 {
  width: 150px;
  height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
  line-height: 30px;
  text-align: center;
}
</style>




