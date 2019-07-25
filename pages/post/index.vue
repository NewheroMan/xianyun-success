<template>
  <div class="postIndex">
    <el-row>
      <el-col :span="8">
        <!-- 导航栏 -->
        <div>
          <NavMenu />
        </div>
        <!-- 推荐城市 -->
        <div>
          <AsideRecommend />
        </div>
      </el-col>
      <el-col :span="16">
        <!-- 搜索框 -->
        <div>
          <Search />
        </div>
        <!-- 攻略主页 -->
        <div>
          <el-row type="flex" justify="space-between" class="recommend_header">
            <span class="recommend_header_title">推荐攻略</span>
                <el-button type="primary" icon="el-icon-edit" @click="handlePushCreate">写游记</el-button>
          </el-row>
          <!-- 游记列表 -->
          <div v-for="(item,index) in posts" :key="index" class="recommend_item">
            <h4 class="recommend_title" @click="handlePushById(item.id)">{{item.title}}</h4>
            <p v-html="item.summary" class="recommend_item_content" @click="handlePushById(item.id)"></p>
            <div class="recommend_picture" @click="handlePushById(item.id)">
              <img v-for="(item2,index2) in item.images" :key="index2" :src="item2" alt />
            </div>
            <!-- 攻略底部 -->
            <el-row type="flex" justify="space-between">
              <el-row type="flex" class="recommend_bottom_left">
                <div class="recommend_bottom_city">
                  <i class="el-icon-location-outline"></i>
                  {{item.cityName}}
                </div>
                <span>&nbsp;&nbsp;by</span>
                <div class="recommend_bottom_nickname" @click="handlePushUserPersonal()">
                    &nbsp;
                  <img :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`" alt /> 
                  {{item.account.nickname}}
                </div>
                <div class="recommend_bottom_watch">
                    &nbsp;&nbsp;
                  <i class="el-icon-view"></i>
                  {{item.watch}}
                </div>
              </el-row>
              <span class="recommend_bottom_like">{{item.like || 78}} 赞</span>
            </el-row>           
          </div>
          <!-- 分页器 -->
            <el-row type="flex" justify="center" class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    background
                    small
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavMenu from "@/components/post/navMenu.vue";
import Search from "@/components/post/search.vue";
import AsideRecommend from "@/components/post/asideRecommend.vue";

export default {
  data() {
    return {
        total:null,
        // 渲染页面的数据
      posts: [],
      //当前页
      currentPage:1,
      //每页条数
      pageSize:5,
      // 每页第一条的索引
      start:0
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
      //获取文章
    getPosts() {
      this.$axios({
        url: "/posts",
        methods: "GET",
        params: {
          city:this.$route.query.city,
          //分页处理
          _start:this.start,
          _limit:this.pageSize
        }
      }).then(res => {
        // console.log(res);
        const { data,total } = res.data;
        this.posts = data;
        this.total = total;
      });
    },
    // 跳转文章详情页
    handlePushById(id){
        // console.log(id);
        this.$router.push({
            path:"/post/detail",
            query:{
                id
            }
        })
    },
    // 添加游记
    handlePushCreate(){
        this.$router.push({
            path:"/post/addarticle"
        })
    },
    // 跳转个人页
    handlePushUserPersonal(){
        this.$message("暂无该页面")
    },
    //每页条数
      handleSizeChange(val) { 
         this.pageSize = val;
         this.getPosts();
        // console.log(`每页 ${val} 条`);
      },
    //   当前页
      handleCurrentChange(val) {
          this.currentPage = val;
          this.start = (this.currentPage-1) * this.pageSize;
          this.getPosts();
        // console.log(`当前页: ${val}`);
      }
  },
  watch: {
    $route() {
      //路由改变时，回到第一页重新渲染数据
      this.start = 0;
      this.currentPage = 1;
      this.getPosts();
    }
  },
  components: {
    NavMenu,
    Search,
    AsideRecommend
  }
};
</script>

<style lang="less">
.postIndex {
  width: 1000px;
  margin: 0 auto;
  .recommend_header {
      border-bottom: 1px solid #ccc;
    .recommend_header_title {
        color: orange;
        font-size: 18px;
        border-bottom: 2px solid orange;
        padding-top: 6px;
    }
    .el-button {
        margin-bottom: 10px;
    }
  }
  .recommend_item {
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
    .recommend_title {
      cursor: pointer;
      margin: 10px 0;
    }
    .recommend_item_content {
      cursor: pointer;
      font-size: 14px;
      color: grey;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .recommend_picture {
      cursor: pointer;
      margin: 10px 0;
      img {
        width: 32%;
        height: 150px;
        margin-right: 4px;
        &:nth-child(3n) {
            margin-right: none;
        }
      }
    }
    .recommend_bottom_left {
        height: 30px;
        line-height: 30px;
      color: #999;
      font-size: 12px;
      .recommend_bottom_nickname {
          cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        color: orange;
        span {
          color: #999;
        }
      }
    }
    .recommend_bottom_like {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      color: orange;
    }
  }
  .pagination {
      margin: 20px 0;
  }
}
</style>
