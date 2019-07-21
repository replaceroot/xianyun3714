<template>
  <div class="select">
    <el-form
      class="search-form-content"
      ref="form"
    >
      <el-row
        type="flex"
        justify="space-between"
      >
        <!-- 输入目的地 -->
        <el-col :span="4">
          <el-form-item>
            <el-autocomplete
              v-model="form.city"
              :fetch-suggestions="querySearchHotel"
              placeholder="目的地"
              @select="handleSelectHotel"
            ></el-autocomplete>
          </el-form-item>
        </el-col>

        <!-- 日期选择 -->
        <el-col :span="10">
          <el-form-item>
            <div class="block">
              <el-date-picker
                v-model="form.enterTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>

        <!-- 人数选择 -->
        <el-col :span="6">
          <el-form-item>
            <el-select
              v-model="form.person"
              placeholder="人数未定"
            >
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 查看价格 -->
        <el-col :span="2">
          <el-form-item label="">
            <el-button
              type="primary"
             
              @click="handleSearch"
            >
              查看价格
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        city: '',       //城市id
        enterTime: '',   //入店时间
        person: '',       // 人数
      }
    }
  },
  methods: {
    // 输入目的地时触发
    querySearchHotel() { },
    // 选中下拉选中时触发
    handleSelectHotel() { },
    // 查看价格
    handleSearch() { }
  }
}
</script>
<style lang="less" scoped>

</style>
