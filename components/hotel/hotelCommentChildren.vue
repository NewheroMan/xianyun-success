<template>
  <div>
    <el-row class="contents">
      <el-col :span="3">
        <el-row>
          <el-col :span="10">
            <div class="logo">
              <img
                src="https://n4-q.mafengwo.net/s11/M00/64/81/wKgBEFsmE0WAPbqnAAAOwSUlOKY63.jpeg?imageMogr2%2Fthumbnail%2F%2196x96r%2Fgravity%2FCenter%2Fcrop%2F%2196x96%2Fquality%2F90"
                alt
              />
            </div>
          </el-col>
          <el-col :span="10">
            <p class="level" style="float:left">LV.8</p>
          </el-col>
        </el-row>
        <div class="time">2019-6-26</div>
      </el-col>
      <el-col :span="20">
        <div>badwoman</div>
        <el-input type="textarea" :rows="1" placeholder="请输入内容" v-model="textarea" resize="none"></el-input>
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
    mounted () {
        
    }
};
</script>

<style lang="less" scoped>
 .container {
    .contents {
      margin-top: 10px;
      border-top: 1px dashed #ddd;
      padding-top: 15px;
    }
    .logo {
      width: 50px;
      // height: 50px;
      // float: left;

      img {
        width: 80%;
        border-radius: 50%;
        // float: right;
      }
    }
    .level {
      color: #f30;
      font-size: 12px;
      margin-top: 6px;
    }
    .time {
      color: #666;
      font-size: 14px;
    }
  }
</style>

