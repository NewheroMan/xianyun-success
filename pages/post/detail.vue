<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-row>
      <el-container>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游功略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-container>
    </el-row>
    <!-- 文章 -->
    <el-row>
      <el-col :span="18">
        <div class="header">
          <h1 v-html="info.title"></h1>
          <span class="shijian">攻略：{{info.created_at|shijian}} 阅读：{{info.watch}} </span>
          <span class="content"
                v-html="info.content"></span>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col :span="6">
        <h4 class="aside-title">相关攻略</h4>
        <Aside :data="item"
               v-for='(item,index) in gonglue.data'
               :key='index' />
        <!-- <Aside :data="gonglue" /> -->
      </el-col>
    </el-row>
    <!-- 点赞 -->
    <el-row>
      <div style="padding:15px 30px 20px 200px;
      display:flex"
           class="dianzan">
        <div>
          <i class="iconfont iconpinglun"></i>
          <p>评论({{yuedu.total}})</p>
        </div>
        <div>
          <i class="iconfont iconstar1"></i>
          <p data-v-741ea8d8="">收藏</p>
        </div>
        <div>
          <i class="iconfont iconfenxiang"></i>
          <p data-v-741ea8d8="">分享</p>
        </div>
        <div>
          <i class="iconfont iconding"></i>
          <p data-v-741ea8d8="">点赞({{info.like}})</p>
        </div>
      </div>
    </el-row>
    <!-- 评论提交 -->
    <el-row>
      <el-col :span="18">
        <div class="pinglun">
          <!-- 评论栏 -->
          <div class="tijiao">
            <el-input type="textarea"
                      :rows="2"
                      placeholder="说点什么吧.."
                      v-model="form.content"
                      resize="none"
                      ref="textarea">
            </el-input>
          </div>
          <!-- 图片上传 -->
          <el-row>
            <el-col :span="21">
              <div class="tupian"
                   style="margin-top:20px">
                <el-upload action="http://157.122.54.189:9095/upload"
                           list-type="picture-card"
                           :on-preview="handlePictureCardPreview"
                           :on-remove="handleRemove"
                           :on-success="handleSuccess"
                           :before-upload="handleBeforeUpload"
                           name="files"
                           ref="clear">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible"
                           size="tiny">
                  <img width="100%"
                       :src="pics">
                </el-dialog>
              </div>
            </el-col>
            <!-- 确定 -->
            <el-col :span="3">
              <div class="upload"
                   style="margin-top:20px">
                <el-button type="primary"
                           @click="upload">提交</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 评论显示 -->
        <!-- <el-row>
          <el-col>
            <div class="list">
              <div class="item"
                   v-for="(item,index) in pinglun.data"
                   :key="index">
                <img data-v-741ea8d8=""
                     src="http://157.122.54.189:9095/assets/images/avatar.jpg">
                <span>{{item.account.nickname}}</span>
                <span>{{item.created_at|shijian}}</span>
                <div class="ciyao">{{item.parent | guolv}}</div>
                <div class="zhuyao">{{item.content}}</div>
              </div>
            </div>
          </el-col>
        </el-row> -->
        <Comment :data="item"
                 v-for='(item,index) in dataList'
                 :key='index' />
        <!-- 分页 -->
        <el-col>
          <div class="block">
            <span class="demonstration"></span>
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="pageIndex"
                           :page-sizes="[5, 10, 15, 20]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Aside from "@/components/post/postAside"
import Comment from "@/components/post/comment";
import strftime from "strftime"
import { setTimeout } from 'timers';
import { constants } from 'crypto';
export default {
  components: {
    Comment,
    Aside
  },
  data () {
    return {
      info: {},
      yuedu: {},
      time1: {},
      time2: {},
      pinglun: [],
      gonglue: [],
      textarea: "",
      pics: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      dialogVisible: false,
      currentPage4: 4,
      commentsList: [],
      form: {
        content: "",
        post: "",
        follow: ""
      }
    }
  },
  computed: {
    // 当前页面渲染的列表数据
    dataList () {
      return this.commentsList.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      )
    }
  },
  filters: {
    guolv (content) {
      console.log(content)
      if (content === undefined) {
        return content = ""
      }
    },
    shijian (time) {
      return time = strftime('%F %T', new Date(time))
    }
  },
  methods: {
    getData () {
      const { id } = this.$route.query
      this.$axios({
        url: "/posts/comments",
        params: { post: id, _limit: 100, _start: (this.pageIndex - 1) * this.pageSize }
      }).then(res => {
        console.log(res, "评论")
        this.commentsList = res.data.data;
        // let sj = res.data.data[0].created_at
        // let sj1 = res.data.data[1].created_at
        // this.time1 = strftime('%F %T', new Date(sj))
        // this.time2 = strftime('%F %T', new Date(sj1))
        // console.log(this.commentsList);
        this.total = res.data.data.length;
        this.yuedu = res.data
      });
    },
    handleRemove (file) {
      console.log(file, '2222');
      if (!file.response[0]) {
        return;
      }
      this.pics.forEach((e, i) => {
        if (e.id === file.response[0].uid) {
          this.pics.splice(i, 1);
        }
      });
    },
    handleSuccess (response) {
      if (!response.length === 0) return;
      this.pics.push(response[0]);
    },
    handleBeforeUpload (file) {
      if (file.type.indexOf("image/") === -1) {
        this.$message({
          type: "error",
          message: "格式错误"
        });
        return false;
      }
    },
    handlePictureCardPreview (file) {

      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange (value) {
      console.log(value, "2222")
      this.pageSize = value
      this.pageIndex = 1
      this.getData()
    },
    handleCurrentChange (value) {
      console.log(value, "1111")
      this.pageIndex = value
      this.getData()
    },
    upload () {
      const { id } = this.$route.query
      this.$axios({
        url: "/comments",
        method: "POST",
        data: {
          content: this.form.content,
          post: id,
          pics: this.pics
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {

        console.log(res, '44444')
        if (res.status === 200) {
          this.$message.success('提交成功')
          this.pageIndex = 1
          this.getData()
          this.form.content = ''
          return true;
        } else {
          return false;
        }
      })
    }
  },
  mounted () {
    this.getData();
    const { id } = this.$route.query;
    // console.log(id, '232322')
    this.$axios({
      url: '/posts',
      params: { id }
    }).then(res => {
      console.log(res, "页面")
      // console.log(res.data.created_at)
      // let sj = res.data.created_at
      return this.info = res.data.data[0];
    }),
      // this.$axios({
      //   url: "/posts/comments",
      //   params: {
      //     post: 4,
      //     _start: 0,
      //     _limit: 2
      //   }
      // }).then(res => {
      //   console.log(res.data)
      //   console.log(res.data.data[0].content)
      //   console.log(res.data.data[1].content)
      //   let sj = res.data.data[0].created_at
      //   let sj1 = res.data.data[1].created_at
      //   this.time1 = strftime('%F %T', new Date(sj))
      //   this.time2 = strftime('%F %T', new Date(sj1))
      //   return this.pinglun = res.data
      // })
      this.$axios({
        url: "/posts/recommend",
      }).then(res => {
        console.log(res, "攻略")
        return this.gonglue = res.data
      })
  }
}
</script>


<style scoped lang="less">
.aside-title {
  font-weight: 400;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.container {
  width: 1000px;
  margin: 20px auto;
}
.shijian {
  color: #999;
  padding: 20px;
  text-align: right;
  margin: 350px;
}
.header {
  width: 700px;
}
h1 {
  width: 700px;
  margin: 20px auto;
  border-bottom: 1px #ddd solid;
  padding: 0 0 50px 0;
}
.content {
  margin: 30px;
  /deep/img {
    max-width: 700px;
    margin: 10px;
  }
}
.dianzan {
  /deep/ p {
    margin-top: 5px;
    font-size: 14px;
    color: #999;
  }
  div {
    margin: 0 20px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  }
  i {
    display: block;
    font-size: 28px;
    color: orange;
  }
}
.button {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  display: inline-block;
}
.tijiao {
  margin-top: 20px;
}
.list {
  /deep/ img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
  margin-top: 20px;
  border: 1px solid #ddd;
}
.item {
  border-bottom: 1px dashed #ddd;
  padding: 20px 20px 5px;
}
.info {
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
}
.content {
  padding: 0 0 0 30px;
}

.block {
  margin-top: 20px;
  margin-left: 60px;
}
.list {
  border: 1px solid #ddd;
}
.item {
  border-bottom: 1px dashed #ddd;
  padding: 20px 20px 5px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
}
.zhuyao {
  font-size: 15px;
  color: rgb(0, 0, 0);
  margin-top: 10px;
  word-wrap: break-word;
  word-break: normal;
}
.tupian {
  margin-bottom: 20px;
}
</style>

