<template>
  <div class="hotelIntroduce">
    <el-row :gutter="20" class="introduce-list">
      <el-col :span="4" class="list-title">
        <div>基本信息</div>
      </el-col>
      <el-col :span="5">
        <div>入住时间: 14:00之后</div>
      </el-col>
      <el-col :span="5">
        <div>离店时间: 12:00之前</div>
      </el-col>
      <el-col :span="5">
        <div>{{data.creation_time}} / {{data.renovat_time}}</div>
      </el-col>
      <el-col :span="5">
        <div>酒店规模: {{data.roomCount}}间客房</div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="introduce-list">
      <el-col :span="4" class="list-title">
        <div>主要设施</div>
      </el-col>
      <el-col :span="20">
        <el-tag type="info">热水</el-tag>
        <el-tag type="info">停车服务</el-tag>
        <el-tag type="info">餐饮</el-tag>
        <div v-for="(item,index) in data.hotelassets" :key='index'>
            <el-tag type="info">{{item}}</el-tag>
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="20" class="introduce-list">
      <el-col :span="4" class="list-title">
        <div>停车服务</div>
      </el-col>
      <el-col :span="20">
        <div>-</div>
      </el-col>

    </el-row>
    <el-row :gutter="20" class="introduce-list">
      <el-col :span="4" class="list-title">
        <div>品牌信息</div>
      </el-col>
      <el-col :span="20">
        <div>-</div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props: {
    data:{
      type:Object,
      default:{}
    }
  }
};
</script>

<style lang="less" scoped>
.hotelIntroduce{
    margin-bottom: 50px;
    .introduce-list{
        height: 60px;
        line-height: 60px;
        font-size: 15px;
        color: #666;
        border-bottom: 1px solid #eee;
        .list-title{
            color: #000;
        }
    }
}
</style>

