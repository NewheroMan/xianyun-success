<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{info.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
    import QRCode from "qrcode"
export default {
  data() {
    return {
        info:{},
        timer:null
    };
  },
   destroyed (){
        clearInterval(this.timer)
    },
  mounted() {
    let { id } = this.$route.query;
    //   console.log(id)
    setTimeout(() => {
        // 获取ID 并生成二维码，由于队列原因，需要用定时器
      this.$axios({
        url: "/airorders/" + id,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        this.info = res.data
        // 生成二维码
        var canvas = document.getElementById("qrcode-stage");
        QRCode.toCanvas(canvas, res.data.payInfo.code_url,  {
        //   console.log("success!");
        width:250
        })
        //  验证是否已经付款
        this.timer = setInterval(()=>{
            this.$axios({
                url:'/airorders/checkpay',
                data:{
                    id,
                    nonce_str:res.data.payInfo.nonce_str,
                    out_trade_no:res.data.orderNo
                    },
                method:'post',
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                }
            }).then(res =>{
                // console.log(res)
                if(res.data.statusTxt === "支付完成"){
                    clearInterval(this.timer)
                    this.$message.success('支付成功')
                }
            })
        },3000)
      });
    }, 0);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
