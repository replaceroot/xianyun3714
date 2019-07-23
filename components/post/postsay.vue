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
        <!-- 图片上传 -->
        <el-upload
          action="http://127.0.0.1:1337/upload"
          list-type="picture-card"
          :on-success="handleSuccess"
          name="files"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <!-- 评论显示区 -->
      <el-card class="box-card">
        <div ref="dislist" v-for="(item,index) in dislist" :key="index" class="text item">
          {{item.content }}
          <div v-if="item.follow">{{item.follow.content}}</div>
          <div>
            <img style=" width:100px;height:100px;" v-if="item.pics[0]" :src="`${$axios.defaults.baseURL}${item.pics[0].url}`" alt />
          </div>
        </div>
        <!-- 分页器 -->
   
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sayTextArea: "",
      imageUrl: "",
      dislist: [],
      follow: {},
      pics: [],
      newSay: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  mounted() {
    //渲染旅游攻略评论
    this.getSay();
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.pics.push(response[0]);
    },
    getSay() {
      this.$axios({
        url: "/posts/comments",
        method: "GET"
      }).then(res => {
        console.log(res.data.data[0].pics, 2233); //评论照片地址[]
        // console.log(res.data.data[0].content) 评论
        // console.log(res.data.data[0].follow.content) 回复
        this.dislist = res.data.data;
      });
    },
    //新增旅游攻略评论
    createSay(sayTextArea) {
      console.log(sayTextArea);
      // 数据的拼接
      const data = {
        content: sayTextArea,
        score: this.score,
        loacation: this.loacation,
        pics: this.pics,
        post: 4
      };
      this.$axios({
        url: "/comments",
        method: "POST",
        data,
        //  添加授权的头信息
        headers: {
          // "Content-Type":"",
          // 下面请求头信息不是通用的，针对当前的项目的（基于JWT token标准）
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res, 123);
        console.log(res.config.data);
        this.getSay();
      });

      // sayTextArea = "";
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
  clear: both;
}

.box-card {
  width: 700px;
}
</style>


