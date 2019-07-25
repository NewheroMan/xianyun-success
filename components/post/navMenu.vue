<template>
  <div>
    <el-row class="tac">
      <el-col :span="8">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="true"
          active-text-color="#303133"
          v-for="(item,index) in cities"
          :key="index"
        >
          <el-submenu index="index" class="el-submenu">
            <template slot="title">
              <el-row type="flex" justify="space-between" align="middle">
                {{item.type}}
                <i class="el-icon-arrow-right"></i>
              </el-row>
            </template>
            <el-menu-item
              index="index-index2"
              v-for="(item2,index2) in item.children"
              :key="index2"
              @click="handlePushByCity(item2.city)"
            >
              <span class="nav_item_index">{{index2+1}}&nbsp;&nbsp;</span>
              <span class="nav_item_city">{{item2.city}}&nbsp;&nbsp;</span>
              <span class="nav_item_desc">{{item2.desc}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      cities: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities",
      methods: "GET"
    }).then(res => {
      const { data } = res.data;
      this.cities = data;
    });
  },
  methods: {
    handlePushByCity(city) {
      this.$router.push({
        query: { city }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tac {
  margin-top: 20px;
  .el-menu-vertical-demo {
    width: 264px;
    color: inherit;
    border: 1px solid #ccc;
    border-bottom: none;

    &:last-child {
      border: 1px solid #ccc;
    }
    .el-submenu {
      /deep/ .el-submenu__title {
        height: 40px;
        line-height: 40px;
        &:hover {
          color: #409eff;
       
            /deep/ .el-menu-item {
            height: 30px;
            line-height: 30px;
          }
       
        }
        
      }
    }
  }
}
.nav_item_index {
  color: orange;
  font-size: 20px;
  font-style: italic;
}
.nav_item_city {
  color: orange;
  font-size: 14px;
}
.nav_item_desc {
  color: #999999;
  font-size: 12px;
}

</style>
