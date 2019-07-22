<template>
  <div class="select">
    <div class="breadcrumb">
      <span>酒店</span>
      <i>></i>
      <span>{{cityName}}酒店预订</span>
    </div>
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
              v-model="cityName"
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
                @change="handelDatePicker"
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
              @click="handleSearchPrice"
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
import moment from "moment";
export default {
  data() {
    return {
      form: {
        city: 74,       //城市id
        enterTime: '',   //入店时间
        leftTime:''      //离开时间
      },
      person: '',    // 人数
      destinationForm: [],   // 目的地表单
      cityName: '南京市'   // 城市名称
    }
  },
  methods: {
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    querySearchHotel(value, cb) {
      this.querySearchCity(value).then(arr => {
        if (arr.length > 0) {
          // 设置到达城市的第一个为默认值
          this.form.city = arr[0].id
          this.cityName = arr[0].name
        }

        // 执行回调
        cb(arr);
      })
    },
    // 输入目的地时触发
    querySearchCity(queryString) {
      return new Promise((resolve, reject) => {
        // 如果是空就不发起请求
        if (!queryString.trim()) {
          resolve([])
          return
        }
        this.$axios({
          url: "/airs/city",
          params: {
            // 搜索关键字，输入框的值
            name: queryString
          }
        }).then(res => {
          const { data } = res.data
          // 添加一个value属性，值等于name没有市字
          const newData = data.map(v => {
            return {
              ...v,
              value: v.name.replace("市", ""),
            }
          });

          // 默认选中第一个
          resolve(newData)
        })
      })
    },
    // 选中下拉选中时触发
    handleSelectHotel(item) {
      // console.log(item);
      this.form.city = item.id
      this.cityName = item.name
    },
    // 入住时间/离开时间
    handelDatePicker(val){
      // console.log(val);     
      this.form.enterTime = moment(val[0]).format("YYYY-MM-DD")
      this.form.leftTime = moment(val[1]).format("YYYY-MM-DD")
      // console.log( this.form.enterTime,this.form.leftTime); 
      
    },
    // 查看价格
    handleSearchPrice() { 
      console.log(11);
      
    }
  },
  mounted(){
    // 获取城市酒店信息
    this.$axios({
      url:'/hotels',
      params:{
        city:this.form.city
      }
    }).then(res=>{
      // console.log(res);
      // 自动跳转到 南京页面
    this.$router.push({
      path:'/hotel?city='+this.form.city
    })
    })
    
  }
}
</script>
<style lang="less" scoped>
.breadcrumb {
  overflow: hidden;
  padding: 20px 0;
  font-size: 14px;
  line-height: 1;
  color: #606266;
}
</style>
