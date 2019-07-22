<template>
    <div class="create">
        <el-row type="flex" justify="space-between" :span="16">
            <div class="create-title">
                <h3>发表新攻略</h3>
                <p>分享你的个人游记,让更多人看到哦！</p>
                <el-form ref="form" class="search-form-content" >
                <el-form-item>
                   <el-input placeholder="请输入标题" v-model="form.input" ></el-input>
                   </el-form-item>
                   </el-form>
                <!-- 富文本 -->
                <div class="app">
                    <VueEditor :config="config" />
                </div>
                
                 <el-form ref="form" class="search-form-content" >
               
                    <el-form-item label="出发城市">
                    <el-autocomplete
                        placeholder="请搜索游玩的城市"
                        :fetch-suggestions="querySearchAsync"
                        @select="handleSelect"
                        v-model="form.departCity"

                        style="width:200px; margin-left:10px"
                        
                    ></el-autocomplete>
                    </el-form-item>
        </el-form>
        <!-- <CreateForm/> -->
         <div class="create-footer">
                    <el-button
                        type="primary"
                        @click="handleSubmit"
                        size="mini"
                        style="margin-right: 20px;"
                    >发布</el-button>
                    或者
                    <span>保存到草稿箱</span>
                </div>
            </div>
           <Aside/>
        </el-row>
    </div>
</template>
<script>
// import VueEditor from "vue-word-editor";
// 需要单独引入样式
import "quill/dist/quill.snow.css";
// import CreateForm from "@/components/post/createForm" 
import Aside from "@/components/post/aside"
let VueEditor;

if (process.browser) {
    VueEditor = require("vue-word-editor").default;
}
export default {
    components: {
        VueEditor,
        // CreateForm,
        Aside
    },
    data() {
        return {
             form :{
                 input:"",
                departCity:"",
                departCode:"",
            },
           
            config: {
                modules: {
                    // 工具栏
                    toolbar: [
                        ["bold", "italic", "underline", "strike"], // toggled buttons
                        // ["blockquote", "code-block"],
                        [{ header: 1 }, { header: 2 }],
                        ["image", "video"]
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
       methods:{
        querySearchAsync(value,cb){
            // console.log(value);
        if (!value.trim()){
            cb([])
            return
        } 
           this.$axios({
               url:"/airs/city",
               params:{
                //搜索关键字，输入框的值
                name:value
               }
           }).then(res=>{
               console.log(res);
               const {data}=res.data
            //  添加一个value
                const newDate=data.map(v=>{
                    return{
                        ...v,
                        value:v.name
                    }
                })
                this.form.departCity=newDate[0].value
                this.form.departCode=newDate[0].value
                cb(newDate)
           })
           
        },
        handleSelect(item){
        //   console.log(item);
          this.form.departCity=item.value
          this.form.departCode=item.sort
          
        },
        handleSubmit(){
            // 自定义
            console.log(123);
            
          const rules={
              input:{
               value:this.form.input,
               message:"请输入标题"
           },
            departCity:{
                value:this.form.departCity,
                message:"请输入游玩城市"
            }
           
          }
        // 验证结果初始值为true
          let valid=true;
          Object.keys(rules).forEach(v=>{
            //如果有一次验证不通过，直接返回
              if(!valid) return;
              if(!rules[v].value){
                  valid=false;
                  this.$message.warning(rules[v].message)
              }
          });
          if(valid){
             this.$router.push({
                 path:"/user/login",
                 query:this.form
             })
          }
        // 添加到本地存储
        // const post=JSON.parse(localStorage.getItem("post")||`[]`);
        // post.push(this.form);
        // localStorage.setItem("post",JSON.stringify(post));
        // this.$router.push({
        //          path:"/user/login",
        //          query:this.form
        //      })
        }
    }
};
</script>
<style lang="less" scoped>
.create {
    padding: 20px;
    width: 1000px;
    margin: 0 auto;
    h3 {
        font-weight: 400;
    }
    p {
        font-size: 12px;
        color: #666;
        padding: 10px 0;
    }
    /deep/.ql-editor {
        height: 400px;
    }
    .create-title {
        width: 760px;
    }
     .search-form-content{
       margin-top:20px;
   }
   .create-footer {
        margin-top: 20px;
        span {
            color: orange;
            cursor: pointer;
        }
    }
}
</style>

