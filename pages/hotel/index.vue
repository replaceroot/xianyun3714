<template>
  <section class="container">
    <div class="breadcrumb">
      <span>酒店</span>
      <i>></i>
      <span>xx市酒店预订</span>
    </div>
    <el-row
      type="flex"
      justify="space-between"
    >
      <!-- 酒店预订选择组件 -->
      <BookHotel />
    </el-row>

    <el-row>
      <!-- 酒店地图组件 -->
      <HotelMap />
    </el-row>
    <el-row>
      <!-- 酒店筛选栏组件 -->
      <HotelFilter />
    </el-row>
  </section>
</template>

<script>
import BookHotel from "@/components/hotel/bookHotel"
import HotelMap from "@/components/hotel/hotelMap"
import HotelFilter from "@/components/hotel/hotelFilter"
export default {
  components: {
    BookHotel,
    HotelMap,
    HotelFilter
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    overflow: hidden;
    padding: 20px 0;
    font-size: 14px;
    line-height: 1;
    color: #606266;
  }
}
</style>
