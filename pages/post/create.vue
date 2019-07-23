<template>
    <div class="create">
        <el-row type="flex" justify="space-between" :span="16">
            <div class="create-title">
                <h3>发表新攻略</h3>
                <p>分享你的个人游记,让更多人看到哦！</p>
                <el-form ref="form" class="search-form-content">
                    <el-form-item>
                        <el-input placeholder="请输入标题" v-model="form.input"></el-input>
                    </el-form-item>
                </el-form>
                <div>
                    <VueEditor :config="config" ref="vueEditor" />
                </div>

                <el-form ref="form" class="search-form-content">
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

                <div class="create-footer">
                    <el-button
                        type="primary"
                        @click="handleSubmit"
                        size="mini"
                        style="margin-right: 20px;"
                    >发布</el-button>或者
                    <span @click="handleDrafts" class="save">保存到草稿箱</span>
                </div>
            </div>
            <!-- 侧边栏 -->

            <div class="aside">
                <div>
                    <span>草稿箱({{total}})</span>
                </div>
                <el-row v-for="(item,index) in drafts" :key="index">
                    <div>
                        <span @click="handleChange(index)" :v-model="index"  class="caogao" >{{item.title}}</span>
                        <i class="el-icon-edit caogao"></i>
                    </div>
                    <p>{{item.time}}</p>
                </el-row>
            </div>
        </el-row>
    </div>
</template>
<script>
// 需要单独引入样式
import "quill/dist/quill.snow.css";
import moment, { localeData } from "moment";

let VueEditor;

if (process.browser) {
    VueEditor = require("vue-word-editor").default;
}
export default {
    components: {
        VueEditor
    },
    data() {
        return {
            drafts: [],
            total: 0,
            time: "",
            form: {
                input: "",
                departCity: "",
                departCode: "",
            },
            config: {
                modules: {
                    // 工具栏
                    toolbar: [
                        ["bold", "italic", "underline", "strike"], // toggled buttons
                        // ["blockquote", "code-block"],
                        [{ header: 1 }, { header: 2 }], // custom button values
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

    methods: {
        // 右侧草稿箱
             handleChange(index) {
               const editor=JSON.parse(localStorage.getItem("post-caogao"))
               this.form.input=editor[index].title
               this.$refs.vueEditor.editor.root.innerHTML=editor[index].content
               this.form.departCity=editor[index].departCity
        },
        querySearchAsync(value, cb) {
            // console.log(value);
            if (!value.trim()) {
                cb([]);
                return;
            }
            
            this.$axios({
                url: "/airs/city",
                params: {
                    //搜索关键字，输入框的值
                    name: value
                }
            }).then(res => {
                // console.log(res);
                const { data } = res.data;
                //  添加一个value
                const newDate = data.map(v => {
                    return {
                        ...v,
                        value: v.name
                    };
                });
                this.form.departCity = newDate[0].value;
                this.form.departCode = newDate[0].value;
                cb(newDate);
            });
        },
        handleSelect(item) {
            //   console.log(item);
            this.form.departCity = item.value;
            this.form.departCode = item.sort;
        },
        // 发布
        handleSubmit() {
            // 自定义
            // console.log(123);
            const token=this.$store.state.user.userInfo.token
            console.log(token);
            // 判断token
            if(!token){
                this.$message.success("请先登录")
                this.$router.push({
                    path:"/user/login",
                    query:this.form
                })
                return
            }
            const rules = {
                input: {
                    value: this.form.input,
                    message: "请输入标题"
                },
                departCity: {
                    value: this.form.departCity,
                    message: "请输入游玩城市"
                }
            };
            // 验证结果初始值为true
            let valid = true;
            Object.keys(rules).forEach(v => {
                // console.log(v);
                
                //如果有一次验证不通过，直接返回
                if (!valid) return;
                if (!rules[v].value) {
                    valid = false;
                    this.$message.warning(rules[v].message);
                }
            });
            // 发布成功后的提示和清空表单
            if(valid){
                this.$message.success("发布新增成功")
                this.form.input="",
                this.form.departCity="",
                this.$refs.vueEditor.editor.root.innerHTML=""
            }

            this.$axios({
                url: "/posts",
                method: "POST",
                data: {
                    content: this.$refs.vueEditor.editor.root.innerHTML,
                    title: this.input,
                    city: this.departCity
                },
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.userInfo
                        .token || "NO TOKEN"}`
                }
            }).then(res => {
                console.log(res);
                
            });

            //    console.log(this.$refs.vueEditor.editor.root.innerHTML);
        },

        // 草稿箱
        handleDrafts() {
            // console.log(12345);
            // const title = this.form.input;
            // const content = this.$refs.vueEditor.editor.root.innerHTML;
            // console.log(title, content);

            this.time = moment().format("YYYY-MM-DD");
            this.drafts.unshift({
                title:this.form.input,
                content:this.$refs.vueEditor.editor.root.innerHTML,
                time: this.time
            });
            this.total = this.drafts.length;
             this.form.input="",
            this.$refs.vueEditor.editor.root.innerHTML="",
            this.form.departCity=""
            // console.log(this.total);

            // 限制的条数
            if (this.drafts.length > 5) {
                this.drafts.length = 5;
            }
            // 本地存储
            localStorage.setItem("post-caogao", JSON.stringify(this.drafts));
           
        },
        
 
    },
    mounted(){
       this.drafts=JSON.parse(localStorage.getItem("post-caogao")||`[]`)
       this.total=this.drafts.length
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
    .search-form-content {
        margin-top: 20px;
    }
    .create-footer {
        margin-top: 20px;
        .save {
            color: orange;
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .aside {
        width: 200px;
        height: 340px;
        border: 1px solid #ddd;
        padding-left: 10px;
        span {
            padding-top: 10px;
        }
    }
    .caogao{
        cursor: pointer;
        &:hover{
            color:orange
        }
    }
}
</style>

