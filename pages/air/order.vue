<template>
  <div class="order">
    <el-row>
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <OrderForm :data="airInfo"  @senddata="senddata"/>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple-light">
          <div class="aside">
            <OrderAside :Alldata="airInfo" :data="userInfo"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data() {
    return {
      airInfo:{ seat_infos:{}},
      userInfo:{
        per:1,ins:[ ]
      }
    };
  },
  mounted(){
    let info = this.$route.query;
    // console.log(info)
    this.$axios({
      url:`/airs/${info.id}`,
      params:{seat_xid:info.seat_xid}
    }).then(res =>{
      console.log(res)
      if(res.status === 200){
        this.airInfo = res.data;
      }
    })
  },
  methods:{
    senddata(data){
      // console.log(data,'444')
      this.userInfo = data
    }
  }
};
</script>

<style lang="less" scoped>
.order {
  width: 1000px;
  margin: 0 auto;
  font-size: 14px;
  color: #666;
}
</style>

