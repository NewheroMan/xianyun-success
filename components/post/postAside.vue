<template>
  <div class="aside">
    <div class="recommend-list">
      <a :href="`/post/detail?id=${data.id}`">
        <div class="post-imgText">
          <div class="post-img">
            <img :src="(data.images)"
                 alt="">
          </div>
          <div class="post-text">
            <div>{{data.title}}</div>
            <p>{{data.created_at|shijian}} 阅读 {{data.watch}} </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import strftime from "strftime"
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
}
</script>

<style lang="less" scoped>
a {
  display: block;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}
.post-imgText {
  display: flex;
}
.post-img {
  width: 100px;
  height: 80px;
  flex-shrink: 0;
  background: #ddd;
  overflow: hidden;
  margin-right: 10px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.post-text {
  flex: 1;
  position: relative;
  div {
    position: relative;
    line-height: 1.4em;
    height: 2.8em;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  p {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 12px;
    color: #999;
  }
}
</style>
