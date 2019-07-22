<template>
    <div class="postDetail">
        <h2>相关攻略</h2>
     <el-row>
  <el-col v-for="(o, index) in 2" :key="o"  >
    <el-card :body-style="{ padding: '0px' }" >
      <img src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90" class="image">
      <div style="padding: 14px;">
        <span>{{index}}好吃的汉堡</span>
      </div>
    </el-card>
  </el-col>
</el-row>
    </div>
</template>
<script>
export default {
     data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>
<style lang="less" scoped>
.postDetail{
    width: 280px;
    // text-align: center;
}
.time {
    font-size: 13px;
    color: #999;
  }

  .image {
    width: 100px;
    height: 80px;
    // display: block;
  }

//   .clearfix:before,
//   .clearfix:after {
//     //   display: table;
//       content: "";
//   }
  
//   .clearfix:after {
//       clear: both
//   }
</style>


