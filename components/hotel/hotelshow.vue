<template>
  <div class="hotelShow">
    <!-- 酒店名称 -->
    <el-row class="hotel-name">
      <el-col :span="24">
        <h2>
          {{data.name}}
          <span v-for="(item,index) in level" :key="index">
            <i class="el-icon-star-on" style="color:orange;"></i>
          </span>
        </h2>
      </el-col>
      <el-col :span="24">
        <span>{{data.alias}}</span>
      </el-col>
      <el-col :span="24">
        <span class="el-icon-location-information">{{data.address}}</span>
      </el-col>
    </el-row>
    <!-- 酒店照片 -->
    <el-row class="hotel-pic" :gutter="20">
      <el-col :span="16" class="pic-big">
        <img :src="picture" alt />
      </el-col>
      <el-col :span="8" class="pic-small">
        <div class="pic" v-for="(item,index) in pics" :key="index">
          <img :src="item" alt @click="handleShowPic(index)" />
        </div>
      </el-col>
      <!-- <el-col :span="4" class="pic-small">
        <img src="@/assets/images/hotel-pics/2.jpeg" alt />
        <img src="@/assets/images/hotel-pics/4.jpeg" alt />
        <img src="@/assets/images/hotel-pics/6.jpeg" alt />
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pics: [
        "/images/hotel-pics/1.jpeg",
        "/images/hotel-pics/2.jpeg",
        "/images/hotel-pics/3.jpeg",
        "/images/hotel-pics/4.jpeg",
        "/images/hotel-pics/5.jpeg",
        "/images/hotel-pics/6.jpeg"
      ],
      picture: "/images/hotel-pics/1.jpeg",
      level: ""
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
      if (!this.data.hotellevel) {
        this.level = 0;
      } else {
        this.level = this.data.hotellevel.level;
      }
      console.log(this.level);
    }
  },
  methods: {
    handleShowPic(index) {
      this.picture = this.pics[index];
    }
  }
};
</script>
<style lang="less" scoped>
.hotelShow {
  .hotel-name {
    margin-bottom: 30px;
    h2 {
      font-size: 25px;
      font-weight: 400;
    }
    span {
      font-size: 14px;
      color: #333;
    }
  }
  .hotel-pic {
    margin-bottom: 50px;
    .pic-big {
      height: 358px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .pic-small {
      height: 358px;

      .pic {
        display: inline-block;
        width: 150px;
        margin-bottom: 24px;
        margin-right: 7px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
