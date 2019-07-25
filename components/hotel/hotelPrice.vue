<template>
  <!-- <nuxt-link to="#" style>
    <el-table :data="productsList" style="width: 100%" class="hotel-price">
      <el-table-column prop="name" label="价格来源" width="400"></el-table-column>
      <el-table-column prop="bestType" label="低价房型" width="400"></el-table-column>
      <el-table-column prop="price" label="最低价格/每晚"></el-table-column>
    </el-table>
  </nuxt-link>-->
  <div class="hotel-price">
    <!-- 表头 -->
    <el-row :gutter="20" class="price-title">
      <el-col :span="9">
        <div>价格来源</div>
      </el-col>
      <el-col :span="9">
        <div>低价房型</div>
      </el-col>
      <el-col :span="6">
        <div>最低价格/每晚</div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="price-list" v-for="(item,index) in productsList" :key="index">
      <el-col :span="9">
        <div>{{item.name}}</div>
      </el-col>
      <el-col :span="9">
        <div>{{item.bestType}}</div>
      </el-col>
      <el-col :span="6">
        <div>
          <i style="font-style: normal;color:orange;font-size:20px;">{{item.price}}</i>
          起
          <i style="font-style: normal;color:orange;" class="el-icon-arrow-right"></i>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productsList: []
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
      this.productsList = this.data.products.map(v => {
        v.price = "￥" + v.price;
        return v;
      });
      // console.log(this.productsList);
    }
  }
};
</script>

<style lang="less" scoped>
.hotel-price {
  margin-bottom: 50px;
  .price-title {
    font-size: 14px;
    font-weight: 600;
    color: #999;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
  }
  .price-list {
    font-size: 15px;
    color: #666;
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
  }
}
</style>

