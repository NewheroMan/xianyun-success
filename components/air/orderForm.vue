<template>
  <div class="title">
    <h2>乘机人</h2>
    <div class="passenger" v-for="(e,i) in users" :key="i">
      <div class="pertype">乘机人类型</div>
      <el-input placeholder="姓名" v-model="e.username" class="input-with-select">
        <el-select value="成人" slot="prepend" placeholder="成人" class="select">
          <el-option label="成人" value="成人"></el-option>
        </el-select>
      </el-input>
      <span v-if="i != 0" @click="delpassenger(i)">-</span>
      <div class="paperstype">证件类型</div>
      <el-input placeholder="证件号码" v-model="e.id" class="input-with-select">
        <el-select value="1" slot="prepend" placeholder="身份证" class="select">
          <el-option label="身份证" value="1"></el-option>
          <el-option label="护照" value="2"></el-option>
        </el-select>
      </el-input>
    </div>
    <div class="btn">
      <el-button type="primary" @click="addNewpassenger">添加乘机人</el-button>
    </div>
    <div class="insurance">
      <h2>保险</h2>
      <div class="delayInsurance" v-for="(e,i) in data.insurances" :key="i">
        <el-checkbox @change="chooceInsurance(e.id)">{{e.type}}：￥{{e.price}}/份×1最高赔付{{e.compensation}}元</el-checkbox>
      </div>
    </div>
    <div class="linkman">
      <h2>联系人</h2>
      <div class="linkmanfrom">
        <el-form label-position="right" label-width="80px" :model="airorders">
          <el-form-item label="姓名">
            <el-input v-model="airorders.contactName"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="airorders.contactPhone">
              <template slot="append">
                <el-button  @click="getCaptchas" style="border: none;background-color: inherit;">获取验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="airorders.captcha"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="suretobook">
        <el-button type="warning" size="medium" @click="buyTiet">提交订单</el-button>
    </div>
    <input type="hidden" :value="sendusersinfo">
  </div>
</template>

<script>
import bus from '@/static/js/bus'
export default {
  data() {
    return {
      airorders: {
        contactName: "",
        contactPhone: "13800138000",
        invoice: false,
        seat_xid: "",
        air: 1,
        captcha:'',
      },
        users: [
          {
            username:'',
            id:''
          }
        ],
        insurances:[]
    };
  },
  props:{
    data:{
      type:Object,
      default:{ }
    }
  },
  // computed:{
  //   users(){
  //     const per = this.users.length
  //     const ins = this.insurances.length
  //     bus.$emit('senddata',{per,ins})
  //   }
  // },
  computed:{
    sendusersinfo(){
      const per = this.users.length
      const ins = this.insurances
      this.$emit('senddata',{per,ins})
    }
  },
  methods:{
    // 添加乘机人
    addNewpassenger(){
      this.users = [...this.users,{username:'',id:''}]
    },
    // 删除乘机人
    delpassenger(i){
      this.users.splice(i,1)
    },
    // 保险选择模块
    chooceInsurance(id){
      if(this.insurances.indexOf(id) != -1){
        this.insurances.splice(this.insurances.indexOf(id),1)
      }else{
      this.insurances.push(id)
      }
      // this.insurances.push(id)
      // console.log(this.insurances)
    },
    // 获取验证码

    getCaptchas(){
      // console.log(this.airorders.contactPhone)
      if(this.airorders.contactPhone.trim().length != 11) {
          this.$message.error('请输入正确手机号码')
          return
      }
      let tel = this.airorders.contactPhone;
      this.$store.dispatch('user/gerCode',tel).then(res =>{
        console.log(res)
          this.$message.success(`验证码：${res.data.code}`)
          // console.log(res.data[0].code)
          this.airorders.captcha = res.data.code
      })
      // this.$axios({
      //   url:'/captchas',
      //   methid:'post',
      //   data:{tel}
      // }).then(res =>{
      //   if(res.status === 200){
      //     this.$message.success(`验证码：${res.data[0].code}`)
      //     // console.log(res.data[0].code)
      //     this.airorders.captcha = res.data[0].code
      //   }     
      // })
    },
    // 提交订单
    buyTiet(){
      const data = {
        users:this.users,
        insurances:this.insurances,
        contactName:this.airorders.contactName,
        contactPhone:this.airorders.contactPhone,
        invoice:this.airorders.invoice,
        seat_xid:this.$route.query.seat_xid,
        air:this.$route.query.id*1,
        captcha:this.airorders.captcha
      }
      // console.log(data)
      this.$axios({
        url:'/airorders',
        method:'POST',
        data,
        headers:{
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res =>{
        // console.log(res)
        this.$message.success('正在生成订单')
        setTimeout( ()=>{
          this.$router.push('/air/pay/?id='+ res.data.data.id)
        },1500)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  padding: 20px 0;
  width: 595px;
  h2 {
    padding-bottom: 15px;
    font-size: 22px;
    font-weight: normal;
    color: #000;
  }
  .passenger {
    position: relative;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    .input-with-select {
      width: 590px;
      margin: 10px 0;
      height: 40px;
      .select {
        width: 128px;
        background-color: #fff;
        height: 38px;
        border-top: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        color: #999;
      }
    }
    >span{
      position: absolute;
      top: 90px;
      right: -10px;
      background-color: #ddd;
      border-radius: 50%;
      display: block;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      cursor: pointer;
    }
  }
  .btn {
    padding: 20px 0;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 20px;
  }
  .insurance {
    padding: 20px 0;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 20px;
    .delayInsurance {
      border: 1px solid #dcdfe6;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 3px;
      width: 300px;
    }
    .accidentInsurance {
      border: 1px solid #dcdfe6;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 3px;
      width: 300px;
    }
  }
  .linkman {
    padding: 20px 0;
    // border-bottom: 1px solid #dcdfe6;
    margin-bottom: 20px;
    .linkmanfrom {
      width: 345px;
      // display: flex;      
    }
  }
  .suretobook{
    //   margin: 0 auto;
    .el-button{
      margin: 0 auto;
      display: block;
    // margin-left: 170px;
      padding: 12px 20px;
      width: 250px;
      height: 50px;
    }
  }
}
</style>

