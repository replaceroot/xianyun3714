<template>
  <div class="hotel-list">
    <div class="content">
      <el-row
        type="flex"
        justify="space-between"
        v-for="(item,index) in data"
        :key="index"
      >
        <el-col
          :span="8"
          class="hotelPhoto"
        >
          <nuxt-link to="javascript:">
            <img
              :src=item.photos
              alt=""
            >
          </nuxt-link>
        </el-col>
        <el-col
          :span="10"
          class="hotelInfo"
        >
          <el-row>
            <h4>
              <nuxt-link to="javascript:">{{item.name}}</nuxt-link>
            </h4>

          </el-row>
          <el-row class="hotelInfoSencond">
            <span>{{item.alias}}</span>
            <span class="iconfont">
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
            <span>{{item.hoteltype.name}}</span>
          </el-row>
          <el-row class="hotelInfothird">
            <el-col :span="10">
              <el-rate
                v-model="item.stars"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </el-col>
            <el-col
              :span="7"
              class="comment"
            >
              <span>{{item.all_remarks}}</span>条评价
            </el-col>
            <el-col
              :span="7"
              class="post"
            >
              <span>{{travelNotes}}</span>条游记
            </el-col>
          </el-row>
          <el-row class="hotelInfoLast">
            <i class="iconfont iconlocation"></i>位于: {{item.address}}
          </el-row>
        </el-col>
        <el-col
          :span="6"
          class="hotelPrice"
        >
          <el-table
            :data="item.products"
            style="width: 100%"
            :show-header='false'
          >
            <el-table-column prop="name">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
               <nuxt-link to="javascript:"> <span> ￥ {{ scope.row.price}} 起 ></span></nuxt-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      grade: 0,    // 评分
      travelNotes:Math.floor(Math.random()*100) // 游记数量
    }
  },
  computed: {
    data() {
      return this.$store.state.hotel.hotelInfo
    }
  },
}
</script>
<style lang="less" scoped>
.hotel-list {
  .content {
    > div {
      padding: 25px 0;
      border-bottom: 1px solid #eee;
      .hotelPhoto {
        img {
          width: 320px;
          height: 210px;
        }
      }
      .hotelInfo {
        padding-left: 10px;
        padding-right: 10px;
        h4 {
          font-weight: 400;
          font-size: x-large;
        }
        .iconfont {
          > i {
            color: #f90;
          }
        }
      }
      .hotelPrice {
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 20px;
      }
    }
  }
}
.hotelInfoSencond {
  color: #999;
  margin-bottom: 0.5em;
}
.hotelInfothird {
  margin-left: -5px;
  margin-right: -5px;
  margin-bottom: 0.5em;
  .comment {
    padding-left: 5px;
    padding-right: 5px;
    span {
      color: #f90;
    }
  }
  .post {
    padding-left: 5px;
    padding-right: 5px;
    span {
      color: #f90;
    }
  }
}
.hotelInfoLast {
  font-size: 14px;
  color: #666;
}
</style>

