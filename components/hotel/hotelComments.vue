<template>
  <div class="comments">
    <h4>{{commentsData.all_remarks}}条真实用户评论</h4>
    <el-row class="commentSum">
      <el-col :span="4">
        <p>总评数： {{commentsData.all_remarks}}</p>
        <p>好评数： {{commentsData.good_remarks}}</p>
        <p>差评数： {{commentsData.bad_remarks}}</p>
      </el-col>
      <el-col :span="5" style="position:relative;padding-top:20px">
        <el-rate v-model="commentsData.stars" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
        <div class="recommen">
          <div class="circle">推荐</div>
        </div>
      </el-col>
      <div v-for="(item,index) in firstData" :key="index">
        <el-col :span="3" class="father">
          <el-progress
            type="circle"
            :percentage="item.value*20"
            :show-text="isshow"
            :width="70"
            :stroke-width=2
            :color="colors"
          ></el-progress>
          <span class="content">{{item.name}}</span>
          <span class="score">{{item.value}}分</span>
        </el-col>
      </div>
      <!-- <el-col :span="3"></el-col>
      <el-col :span="3"></el-col>-->
    </el-row>
    <div class="container">
     <!-- 评论组件 -->
     <CommentChildren/>
    </div>
  </div>
</template>

<script>
import CommentChildren from '@/components/hotel/hotelCommentChildren'
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  
  data() {
    return {
      //评论的渲染数组
      firstData: [
        { name: "环境" ,value:''},
        { name: "产品" ,value:''},
        {
          name: "服务",value:''
        }
      ],
      //评论的对象
      commentsData: {
        stars: "",

        all_remarks: "",
        bad_remarks: "",
        good_remarks: ""
      },
      //是否显示进度圆的进度文字
      isshow: false,
      //进度条的颜色
      colors: "orange",
      //进度条的进度
      // score: 60,

      value5: 3.7,
      textarea: ""
    };
  },
  components: {
    CommentChildren
  },
  mounted() {
    setTimeout(() => {
      console.log(this.data,'55555')
      const {
        stars,
        scores,
        all_remarks,
        bad_remarks,
        good_remarks
      } = this.data;
      this.commentsData.stars = stars||5;
      this.commentsData.all_remarks = all_remarks||5;
      this.commentsData.bad_remarks = bad_remarks||5;
      this.commentsData.good_remarks = good_remarks||5;
     
         this.firstData[0].value = Number(scores.environment/2).toFixed(1)!=0? Number(scores.environment/2).toFixed(1):'5.0';
      this.firstData[1].value = Number(scores.product/2).toFixed(1)!=0?Number(scores.product/2).toFixed(1):'5.0';
      this.firstData[2].value = Number(scores.service/2).toFixed(1)!=0?Number(scores.service/2).toFixed(1):'5.0';
        console.log(this.firstData, '我是对的');
   
 
    
      console.log(this.commentsData, "232323");
  
    }, 1000);
    // let data ={
    //         content:'你爱我吗',
    //         location:3.5,
    //         service:3.6,
    //         fancility:3.7,
    //         all:3.5,
    //         hotel:141,
    //         follow:1,

    //     }
       
    //     this.$axios({
    //         url:'/comments',
    //          headers: {
    //       Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
    //     },
    //     method:'POST',
    //     data
    //     }).then(
    //         res=>{
    //             console.log(res,'2222222')
    //         }
    //     ).catch(err=>{
    //         console.error(err)
    //     })
  },
  method: {}
};
</script>

<style lang="less" scoped>
.comments {
  width: 1000px;
  margin: 0 auto;
  .commentSum {
    padding: 20px 0;
    p {
      color: #666;
    }
    //进度条的父元素
    .father {
      position: relative;
      .content {
        position: absolute;
        left: 20px;
        top: 15px;
        color: orange;
      }
      .score {
        position: absolute;
        left: 18px;
        top: 35px;
        color: orange;
      }
    }
    .recommen {
      width: 70px;
      height: 70px;
      position: absolute;
      left: 18px;
      top: 0;

      //   background-color: red;
      transform: rotate(-30deg);
      .circle {
        text-align: center;
        line-height: 70px;
        width: 70px;
        height: 70px;
        border: 2px solid #fa3;
        color: #fa3;
        border-radius: 50%;
        opacity: 0.25;
      }
    }
  }
 
}
</style>

