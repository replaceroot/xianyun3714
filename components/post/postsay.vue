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
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        <!-- 图片上传 -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
        >
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>

      <!-- 评论显示区 -->
      <el-card class="box-card">
     <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: ""
    };
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


