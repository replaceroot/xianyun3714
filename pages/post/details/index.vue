<template>
<div class="post" >
    <el-row type="flex" justify="space-between">
    <div class="left">
    <!-- 正文 -->
     <PostDetail :data="$store.state.post.postlist"/>
     <!--评论模块 -->
       <PostSay/>  
   
    </div>
    <div class="right">
       <!-- 侧边栏 -->
       <PostDetailAside/>
       </div>
    </el-row>
</div>
</template>

<script>

import PostDetail from "@/components/post/postDetail";
import PostSay from "@/components/post/postsay"
import PostDetailAside from "@/components/post/postDetailAside"
export default {
    components: {
        PostDetail,
        PostSay,
        PostDetailAside
    },
    data(){
return{}
    },
      // 对象的方式声明组件可以接收的属性
//     props: {
//         data: {
//          id:""   
//         }
//     },
// mounted(){
//       this.$axios({
//           url:"/posts",
//       }).then(res=>{
//           console.log(res.data.data[0].title);
//         const data=res.data.data[0]
//         // 保存给store
//             this.$store.commit("post/setPostData", data);
//       })
//   }
}
</script>

<style>
.post{
width: 1100px;
margin: 0 auto
}
.left{
   flex:3;
   
}
.right{
    flex:1;
    width: 300px;
}
</style>
