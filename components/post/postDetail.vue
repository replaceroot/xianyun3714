<template>
  <div class="postdetail">
    <!-- 面包屑 -->
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 文章开始 -->
    <div class="detail-main">
      <!-- 标题 -->
      <h1>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h1>
      <hr />
      <!-- 创建时间、 阅读量-->
      <div class="created">攻略：2019-05-22 10:57 阅读：2787</div>
      <!-- 文章内容-->
      <div class="content">
        <div
          class="jianyao"
        >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。</div>
        <img
          src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
          alt
        />
        <p>图：塞班岛。 by第5季旅游</p>
        <div class="content-detail">
          <h2>一、怎样用6000块玩转塞班？</h2>
          <p>大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。</p>
        <br>
          <h3>1.怎样订机票+酒店性价比最高？</h3>
          <p>机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了</p>
          <img
            src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            alt
          />
          <p>
            怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。
            在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。
            怎样在机票酒店上获得最高性价比的体验？ 直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。
          </p>
          <!-- 点赞-->
    
          <div class="el-row">
              <div class="ctrl-item">
                      <i class="iconfont iconpinglun" data-v-741ea8d8=""></i>
                      <p>评论(100)</p>
              </div>
                 <div class="ctrl-item">
                      <i class="iconfont iconpinglun" data-v-741ea8d8=""></i>
                      <p>收藏</p>
              </div>
                 <div class="ctrl-item">
                      <i class="iconfont iconpinglun" data-v-741ea8d8=""></i>
                      <p>分享</p>
              </div>
                 <div class="ctrl-item">
                      <i class="iconfont iconpinglun" data-v-741ea8d8=""></i>
                      <p>点赞(100)</p>
              </div>
          </div>

<!--评论模块 -->
<div class="say">
    <h4>评论</h4>
    <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>

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

        </div>
      </div>
      <!-- 文章结束 -->
    </div>
  </div>
</template>
<script>
export default {
     data() {
    return {
      textarea: ''
    }
  }
};
</script>
<style lang="less" scoped>
.postdetail {
  padding-top: 30px;
  margin: 0 auto;
  width: 700px;
}
img {
  width: 100%;
  margin: 10px 0;
}
.detail-main .created{
    text-align: right;
    padding: 20px 0;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
</style>


