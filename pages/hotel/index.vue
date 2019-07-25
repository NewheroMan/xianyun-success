<template>
  <div class="hotel">
    <hotelHeader />
    <hotelFilter />
    <hotelShow />
  </div>
</template>

<script>
import hotelHeader from "@/components/hotel/hotelHeader";
import hotelFilter from "@/components/hotel/hotelFilter";
import hotelShow from "@/components/hotel/hotelindexshow";
export default {
  components: {
    hotelHeader,
    hotelFilter,
    hotelShow
  },
  data(){
    return {
      // search:{
      //   start:'all',
      //   type:'all',
      //   facility:'all'
      // }
    }
  },
  // methods:{
  //   changestart(val){
  //     this.search.start = val
  //   },
  //   changetype(val){
  //     this.search.type = +val.split('&')[0]
  //   },
  //   changefacility(val){
  //     this.search.facility = val
  //   }
  // },
  // mounted() {
  //   this.$axios({
  //     // url:'/hotels?city=197&enterTime=2019-07-22&leftTime=2019-07-23&_limit=5&_start=1',
  //     url: "/cities",
  //     params: { name: "深圳" }
  //   }).then(res => {
  //     // console.log(res)
  //   });
  // }
};
</script>

<style lang="less" scoped>
.hotel{
  width: 1000px;
  margin: 0 auto;
}
</style>