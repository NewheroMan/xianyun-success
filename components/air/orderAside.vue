<template>
  <div class="orderaside">
    <el-row type="flex" class="row-bg top" justify="space-between">
        <div class="grid-content">{{Alldata.arr_date}}</div>
        <div class="grid-content">{{Alldata.org_city_name}} - {{Alldata.dst_city_name}}</div>
    </el-row>
    <el-row type="flex" class="row-bg sectop" justify="space-between">

        <div class="grid-content bg-purple">
            <div class="left">
                <div class="time">
                   {{Alldata.dep_time}}
                </div>
                <div class="airport">
                    {{Alldata.org_airport_name}}{{Alldata.org_airport_quay}}
                </div>
            </div>
        </div>
        <div class="grid-content bg-purple-light">
            <div class="center">
                <div class="lasttime">
                    -- {{getPrice}} ---
                </div>
                <div class="air">
                    {{Alldata.airline_name}}{{Alldata.flight_no}}
                </div>
            </div>
        </div>
      

        <div class="grid-content bg-purple">
            <div class="right">
                <div class="time">
                    {{Alldata.arr_time}}
                </div>
                <div class="airport">
                    {{Alldata.dst_airport_name}}{{Alldata.dst_airport_quay}}
                </div>
            </div>
        </div>
      
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">

        <div class="grid-content bg-purple">订单总价</div>
      

        <div class="grid-content bg-purple-light">金额</div>
      

        <div class="grid-content bg-purple">数量</div>
      
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between">

        <div class="grid-content bg-purple">成人机票</div>
      

        <div class="grid-content bg-purple-light">￥{{Alldata.seat_infos.org_settle_price}}</div>
      

        <div class="grid-content bg-purple">x{{data.per}}</div>
      
    </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">

        <div class="grid-content bg-purple">机建＋燃油</div>
      

        <div class="grid-content bg-purple-light">¥{{Alldata.airport_tax_audlet}}/人/单程</div>
      

        <div class="grid-content bg-purple">x{{data.per}}</div>
      
    </el-row >
        <el-row type="flex" class="row-bg" justify="space-between" v-for="(e, i) in data.ins" :key="i"
        v-show="e === 1">

        <div class="grid-content bg-purple">航空延误险</div>
      

        <div class="grid-content bg-purple-light">¥30/人/单程</div>
      

        <div class="grid-content bg-purple">x{{data.per}}</div>
      
    </el-row>
        <el-row type="flex" class="row-bg" justify="space-between"  v-for="(e) in data.ins" :key="e*3"
        v-show="e === 2 ">

        <div class="grid-content bg-purple">航空意外险</div>
      

        <div class="grid-content bg-purple-light">¥30/人/单程</div>
      

        <div class="grid-content bg-purple">x{{data.per}}</div>
      
    </el-row>
    <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <div class="grid-content bg-purple">应付总额：</div>
        <div class="grid-content bg-purple-light price">￥{{getAllPrice}}</div>
      
    </el-row>
  </div>
</template>

<script>
import bus from '@/static/js/bus'
export default {
props:{
    Alldata:{
        type:Object,
        default:{}
    },
    data:{
        type:Object,
        default:{per:1,ins:[ ]}
    }
},
data(){
    return{}
},
computed:{
    getAllPrice(){
        // let arr = this.data.ins !== undefined ? []: this.data.ins
        let arr = this.data.ins
        // this.arr.splice(2, 0, '123')
        // this.$set(this.arr, 0, '12')
        // console.log(arr, 'hgygygi')
        // console.log(arr.length, 'hgygygi')
        // const length = this.data.ins.length
        const price = (this.Alldata.seat_infos.org_settle_price + this.Alldata.airport_tax_audlet +arr.length * 30)
                         * this.data.per
        return price
    },
    getPrice(){
            // 数据还未请求回来
            if(!this.Alldata.dep_time) return "";

            // 转化为分钟
            const dep = this.Alldata.dep_time.split(":");
            const arr = this.Alldata.arr_time.split(":");
            const depVal = dep[0] * 60 + +dep[1];
            const arrVal = arr[0] * 60 + +arr[1];

            // 到达时间相减得到分钟
            let dis = arrVal - depVal;

            // 如果是第二天凌晨时间段，需要加24小时
            if(dis < 0){
                dis = arrVal + 24 * 60 - depVal;
            }

            // 得到相差时间
            return `${ Math.floor(dis / 60)}时${dis % 60}分`
        
    }
},
mounted(){
    // console.log(this.Adata)
//     this.bus.$on('senddata',(data)=>{
//         console.log(data)
//     })
// console.log(this.Alldata)
setTimeout(()=>{
console.log(this.Alldata)
},0)
}
};
</script>

<style lang="less" scoped>
.orderaside{
        border: 1px solid #ddd;
        // text-align: center;
        margin-top: 20px;
        width: 350px;
        margin-left: 30px;
        padding-top: 5px;
        .row-bg {
            padding: 10px;
            border-top: 1px dashed #ddd;
        }
        .top{
            padding: 10px;
            border-top:none;
            font-size: 16px;
            color: #000;
        }
        .sectop{
            border-top:none;
            padding-right: 5px;
            padding-bottom: 15px;
            padding-top: 0;
            .time{
                font-size: 22px;
                color: #000;
                padding-bottom: 5px;
            }
            .airport{
                font-size: 12px;
                color: #999;
                padding-right: 5px;
            }
            .center{
                padding-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
        .price{
            color: orange;
            font-size: 28px;
        }
}
</style>

