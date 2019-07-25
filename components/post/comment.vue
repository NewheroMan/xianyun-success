<template>
  <el-row>
    <el-col>
      <div class="list">
        <div class="item">
          <img class="touxiang"
               :src="$axios.defaults.baseURL+(data.account?data.account.defaultAvatar:'')">
          <span>{{data.account?data.account.nickname:''}}</span>
          <span>{{data.account?data.account.created_at:''|shijian}}</span>
          <div class="zhuyao">{{data.content?data.content:''}}</div>
          <div class="pic">
            <img class="tupian"
                 :src="$axios.defaults.baseURL+(item1.url)"
                 alt=""
                 v-for='(item1,index1) in (data.pics?data.pics:[])'
                 :key='index1'>
          </div>
          <Item :data='data.parent||[] '
                v-if='data.parent' />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import strftime from "strftime"
// import children from '@/components/post/children.vue'
export default {
  name: "Item",
  props: {
    data: {
      type: Object,
      default: {

      }

    }
  },

  data () {
    return {

    };
  },
  // components: {
  //   children
  // },
  mounted () {


  },
  filters: {
    guolv (content) {
      if (content === null) {
        return content = ""
      }
    },
    shijian (time) {
      return time = strftime('%F %T', new Date(time))
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.list {
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
.item {
  padding: 20px 20px 5px;
  font-size: 12px;
}
.zhuyao {
  font-size: 15px;
  color: rgb(0, 0, 0);
  margin-top: 10px;
  word-wrap: break-word;
  word-break: normal;
}
.touxiang {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
.tupian {
  display: block;
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
}
</style>

