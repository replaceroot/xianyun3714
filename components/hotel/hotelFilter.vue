<template>
  <div class="container">
    <el-row
      type="flex"
      justify="space-between"
      class="hotelFilter"
    >
      <el-col :span="8">
        <el-row
          type="flex"
          justify="space-between"
        >
          <el-col :span="12">价格</el-col>
          <el-col
            :span="12"
            class="hotelPrice"
          >0-{{selectHotelPrice}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-slider
              v-model="priceRange"
              :format-tooltip="priceTooltip"
            ></el-slider>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>住宿等级</el-row>
        <el-row>
          <el-select
            v-model="hotellevel"
            placeholder="不限"
            @change="handleLevel"
          >
            <el-option
              v-for="(item,index) in hotelLevelList"
              :key="index"
              :label="item.name"
              :value="item.level"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>住宿类型</el-row>
        <el-row>
          <el-select
            v-model="hoteltype"
            multiple
            collapse-tags
            placeholder="不限"
          >
            <el-option
              v-for="(item,index) in hotelTypeList"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>酒店设施</el-row>
        <el-row>
          <el-select
            v-model="hotelasset"
            multiple
            collapse-tags
            placeholder="不限"
          >
            <el-option
              v-for="(item,index) in hoteLassetList"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col
        :span="6"
        class="last"
      >
        <el-row>酒店品牌</el-row>
        <el-row>
          <el-select
            v-model="hotelbrand"
            multiple
            collapse-tags
            placeholder="不限"
          >
            <el-option
              v-for="(item,index) in hotelBrandList"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectHotelPrice: 4000,  // 选择酒店的价格    
      priceRange: 100,
      hotellevel: [],     // 酒店等级
      hotelLevelList: [     // 下拉框 酒店等级
      ],
      hoteltype: [],        // 酒店类型
      hotelTypeList: [      // 下拉框 酒店类型      
      ],
      hotelasset: [],        // 酒店设施
      hoteLassetList: [      // 下拉框 酒店设施 
      ],
      hotelbrand: [],        // 酒店品牌
      hotelBrandList: [       // 下拉框酒店品牌
      ]
    }
  },
  computed: {
    // 获取store中酒店的信息
    getHotelList() {
      return this.$store.state.hotel.hotelInfo
    },
  },
  methods: {
    // 拖动滑块触发
    priceTooltip(val) {
      //   console.log(val);
      this.selectHotelPrice = val / 100 * 4000
      return val / 100 * 4000

      // console.log(this.selectHotelPrice);
    },
    // 点击住宿等级
    handleLevel(v) {
      // console.log(v);
      // console.log(this.getHotelList);
      const newHotelList = JSON.parse(JSON.stringify(this.getHotelList))
      // console.log(JSON.parse(JSON.stringify(this.getHotelList)));

      // console.log(this.hotelLevelList);

      // 过滤满足条件的酒店数据
      let newHotelAry = newHotelList.filter(item => {
        return item.hotellevel && (item.hotellevel.level === v)
        // console.log(item);     
      })
      console.log(newHotelAry);
      // 将过滤后的数据存储到store
      this.$store.commit("hotel/setAfterFilter", newHotelAry)

    }

  },
  mounted() {
    this.$axios({
      url: '/hotels/options'
    }).then(res => {
      const { data } = res.data
      //   console.log(data);         
      this.hoteLassetList = data.assets
      this.hotelBrandList = data.brands
      this.hotelLevelList = data.levels
      this.hotelTypeList = data.types
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  .hotelFilter {
    border: 1px solid #ddd;
    color: #666;
    padding: 5px 0;
    > div {
      border-right: 1px solid #ddd;
      padding: 5px 20px;
      font-size: 14px;
      .hotelPrice {
        text-align: right;
      }
    }
    .last {
      border: no;
    }
    .hotellevel {
      .hotelLeveList {
        display: inline-block;
        border: none;
      }
    }
  }
}
</style>
