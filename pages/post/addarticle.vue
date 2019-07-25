<template>
  <div>
    <div class="main">
      <el-row type="flex" justify="space-between">
        <!-- 游记左边布局 -->
        <el-col :span="18" class="left">
          <h2>发布新功略</h2>
          <p>分享您的个人游记，让更多人看到哦！</p>
          <el-form ref="form" :model="form">
            <el-form-item>
              <el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <VueEditor :config="config" ref="vueEditor" />
            </el-form-item>
            <el-form-item label="选择城市">
              <el-autocomplete
                class="inline-input"
                v-model="form.city"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
                clearable
              ></el-autocomplete>
            </el-form-item>
            <el-button type="primary" class="sumitBtn" @click.native="submitNewArticle">发布</el-button>
            <span style="fontSize:14px">或者</span>
            <span class="draft" @click="handleDraft">保存到草稿</span>
          </el-form>
        </el-col>
        <el-col :span="5" class="right">
          <div class="contain">
            <h3>草稿箱({{draftData.length}})</h3>
            <div v-for="(item,index) in draftData" :key="index" style="position:relative">
              <div class="content" @click="handeleGetDraft(index)">
                <span>{{item.title}}</span>
                <i class="el-icon-edit artcleIcon" slot="suffix"></i>
              </div>
              <button @click="handleDel(index,item)">-</button>
              <p>{{item.time}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  data() {
    return {
      //草稿的存储数据
      draftData: [],
      //选择游玩城市绑定的数据
      cityData: [],
      //游记绑定的表单内容
      form: {
        title: "",
        textarea: "",
        city: ""
      },
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },
  mounted() {
    //渲染时从store中获取历史草稿
    setTimeout(() => {
      this.draftData = this.$store.state.postArticle.articleDraftData.slice();
      // console.log(this.draftData,'4444')
    }, 0);
  },
  //组件注册
  components: {
    VueEditor
  },
  methods: {
    //点击后提交新文章
    submitNewArticle() {
      this.form.textarea = this.$refs.vueEditor.editor.root.innerHTML;
      console.log(this.form, "44444");
      const { city, textarea, title } = this.form;
      console.log(this.$store.state.user.userInfo.token, "2323232");
      //  return
      //调用接口
      this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: {
          content: textarea,
          title,
          city
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.$message.success("提交新文章成功");
            //保存后清除
            this.form = {
              title: "",
              textarea: "",
              city: ""
            };
            this.$refs.vueEditor.editor.root.innerHTML = "";
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //点击删除草稿的按钮
    handleDel(index, value) {
      //   console.log(index,value)
      //让用户判断是否真的删除
      this.$confirm(
        "此操作将永久删除标题为" + value.title + "的草稿, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //真正实现删除
          this.draftData.splice(index, 1);
          // console.log(this.draftData)
          this.$store.commit("postArticle/delArticleDraft", index);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //点击右边的草稿，取得历史的数据
    handeleGetDraft(index) {
      console.log(this.draftData[index]);
      //把点击的历史草稿赋值回原表单
      this.form = this.draftData[index];
      this.$refs.vueEditor.editor.root.innerHTML = this.form.textarea;
    },
    //点击保存草稿
    handleDraft() {
      //获得富文本内容
      this.form.textarea = this.$refs.vueEditor.editor.root.innerHTML;
      //获得当前时间
      let time = moment(new Date()).format("YYYY-MM-DD");
      this.form.time = time;
      //把表单内容存到数组中
      this.draftData.push({ ...this.form });
      //  console.log(this.draftData)
      //调用store存储该数组
      this.$store.commit("postArticle/setArticleDraft", this.draftData);
      //保存后清除
      this.form = {
        title: "",
        textarea: "",
        city: ""
      };
      this.$refs.vueEditor.editor.root.innerHTML = "";
      //   this.$message.success('保存草稿成功')
    },
    //封装获取城市数据的方法
    getCityData(name) {
      //调用接口，获取城市
      return this.$axios({
        url: "/cities",
        params: { name }
      })
        .then(res => {
          return res;
        })
        .catch(err => {
          console.error(err);
        });
    },
    //匹配建议的方法
    querySearch(value, cb) {
      //调用接口匹配带有输入值的城市
      this.getCityData(value).then(res => {
        console.log(res);
        this.cityData = res.data.data;
        this.cityData.forEach(v => {
          v.value = v.name;
        });
        cb(this.cityData);
        //如果用户没选择。默认第一个
        this.form.city = this.cityData[0].value;
      });
    },
    handleSelect(item) {
      // console.log(item,'2323232')
      this.form.city = item.value;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  //左边布局样式
  .left {
    h2 {
      font-size: 22px;
      font-weight: 400;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      margin-bottom: 10px;
      color: #999;
    }
    /deep/ .ql-editor {
      height: 392px;
    }
    /deep/ .sumitBtn {
      width: 60px;
      height: 35px;
      line-height: 0;
      padding: 0;
    }
    .draft {
      color: orange;
      font-size: 14px;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  //右边布局样式
  .right {
    .contain {
      border: 1px solid #ddd;
      padding: 10px;

      h3 {
        color: #666;
        font-weight: 400;
        margin-bottom: 10px;
        font-size: 16px;
      }
      //草稿删除按钮
      button {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        top: 5px;
        border: none;
        border-radius: 50%;
        background-color: #ddd;
      }
      .content {
        &:hover {
          color: orange;
          text-decoration: underline;
        }

        span {
          font-size: 14px;
        }

        .artcleIcon {
          line-height: 0;
        }
      }
      p {
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>

