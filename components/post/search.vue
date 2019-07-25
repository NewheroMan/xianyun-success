<template>
    <div class="search">
        <el-input
        v-model="city"
        placeholder="请输入想去的地方，比如：'广州'"
        class="el-input"
         @keydown.enter.native="handleSearch">
        <i slot="suffix" class="el-icon-search" @click="handleSearch"></i>
        </el-input>
        <el-row class="advise">
            <i>推荐:</i>
            <span v-for="(item, index) in adviseCity" :key="index" @click="handlePush(item)">
                {{item}}
            </span>
        </el-row>
        
    </div>
</template>

<script>
export default {
    data() {
      return {
          //默认推荐城市
        adviseCity:["北京","上海","广州"],
        //双向绑定搜索城市
        city: ''
      }
    },
    watch:{
        $route(){
            // console.log(this.$route.query.city);
            this.city =  this.$route.query.city;
        }
    },
    methods:{
        // 搜索城市
        handleSearch(){
            this.$router.push({
                query:{city:this.city}
            })
        },
        // 推荐城市
        handlePush(city){
            this.$router.push({
                query:{
                    city
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .search {
        padding: 20px 0;
        /deep/ .el-input {
            input{
                border: 3px solid orange;
                border-radius: 10px;
            }
            .el-icon-search {
                color: orange;
                line-height: 40px;
                font-weight: 600;
                font-size: 18px;
                padding-right: 5px;
                cursor: pointer;
            }
        }
        .advise {
            font-size: 14px;
            padding-top: 14px;
            i {
                font-style: normal;
            }
            span {
                cursor: pointer;
                &:hover {
                    color: #409eff;
                }
            }
        }
    }
</style>
