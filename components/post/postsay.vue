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
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="sayTextArea" @change="createSay"></el-input>
        <el-button type="primary"  plain>提交</el-button>
     <!-- <div @click="createSay">提交</div> -->
   <!-- 图片上传 -->
  <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
      </div>
      <!-- 评论显示区 -->
      <el-card class="box-card">
     <div v-for="(item,index) in dislist" :key="index" class="text item">
    {{item.content }}
    <div v-if="item.follow">{{item.follow.content}}</div>
  </div>
</el-card>
      </div>
    </div>
</template>
<script>
import { log } from 'util';
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
      this.$axios({
        url:"/posts/comments",
        method:"GET"
      }).then(res=>{
        // console.log(res.data.data); 
        // console.log(res.data.data[0].pics); 评论照片地址[]
        // console.log(res.data.data[0].content) 评论
      // console.log(res.data.data[0].follow.content) 回复
      this.dislist=res.data.data 
  
      })
    },
    methods: {
      createSay(dislist){
        console.log(111);
        console.log(dislist);
       const newSay= this.sayTextArea
        // console.log(newSay);
        // dislist.push(newSay)
        

      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(this);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
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
    clear: both
  }

  .box-card {
    width: 700px;
  }
</style>


