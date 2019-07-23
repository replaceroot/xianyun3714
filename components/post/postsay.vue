<template>
  <div class="mian">
    <!-- 点赞-->

    <div class="el-row">
      <div class="ctrl-item">
        <i class="iconfont iconpinglun" data-v-741ea8d8></i>
        <p>评论(100)</p>
      </div>
      <div class="ctrl-item">
        <i class="iconfont iconpinglun" data-v-741ea8d8></i>
        <p>收藏</p>
      </div>
      <div class="ctrl-item">
        <i class="iconfont iconpinglun" data-v-741ea8d8></i>
        <p>分享</p>
      </div>
      <div class="ctrl-item">
        <i class="iconfont iconpinglun" data-v-741ea8d8></i>
        <p>点赞(100)</p>
      </div>
    </div>

    <div class="saylike">
      <!--评论模块 -->
      <div class="say">
        <h4>评论</h4>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          ref="sayTextArea"
          v-model="sayTextArea"
        ></el-input>
        <el-button type="primary" @click="createSay(sayTextArea)" plain>提交</el-button>
        <!-- <div @click="createSay">提交</div> -->
        <!-- 图片上传 -->
        <!-- 'POST', 'http://127.0.0.1:1337/upload' -->
        <el-upload
          class="avatar-uploader "
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          ref="pics"
          :model="pics"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 评论显示区 -->
      <el-card class="box-card">
        <div ref="dislist" v-for="(item,index) in dislist" :key="index" class="text item">
          {{item.content }}
          <div v-if="item.follow">{{item.follow.content}}</div>
          <div v-if="true" style="width:100px;height:100px;border:1px solid red"><img :src="item.pics[0]" alt=""/></div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
// import { log } from 'util';
// import { log } from 'util';
export default {
  data() {
    return {
      sayTextArea: "",
      imageUrl: "",
      dislist:[],
      follow:{ },
      pics:[],
      newSay:"",
    };
  },
 mounted(){
   //渲染旅游攻略评论
 this.getSay()
    },
    methods: {
        getSay(){
        this.$axios({
        url:"/posts/comments",
        method:"GET",
      }).then(res=>{
        console.log(res.data.data[0].pics,2233); //评论照片地址[]
        // console.log(res.data.data[0].content) 评论
      // console.log(res.data.data[0].follow.content) 回复
      this.dislist=res.data.data;
     
      })
        },
        //新增旅游攻略评论
        createSay(sayTextArea){
          console.log(sayTextArea);
            // 数据的拼接
            const data = {
              content:sayTextArea,
                score: this.score,
                loacation: this.loacation,
                pics: this.pics,
                post: 4,
            }
     this.$axios({
        url:"/comments",
        method:"POST",
        data,
        //  添加授权的头信息
        headers: {
                    // "Content-Type":"",
                    // 下面请求头信息不是通用的，针对当前的项目的（基于JWT token标准）
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                }
      }).then(res=>{

        console.log(res,123); 
        console.log(res.config.data); 
         this.getSay()
       
      })
        sayTextArea=""
      },
      //上传图片
      handleAvatarSuccess(res, file){
        
      this.imageUrl = URL.createObjectURL(file.raw);
      this.pics=this.imageUrl
      //  console.log(66666666,this.pics);
      const data={
        pics:this.pics
      }

      },
    }
};
</script>
<style lang="less" scoped>

.mian {
  padding-top: 30px;
  margin: 0 auto;
  width: 700px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-row {
  text-align: center;
}
.el-row > div {
  display: inline-block;
  text-align: center;
  margin: 40px 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  border-bottom: 1px dashed #eee;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 700px;
}
</style>


