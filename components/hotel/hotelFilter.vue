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
          >0-XXXX</el-col>
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
            multiple
            collapse-tags
            placeholder="不限"
          >
            <el-option
              v-for="item in hotelLevelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
              v-for="item in hotelTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
              v-for="item in hoteLassetList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>酒店品牌</el-row>
        <el-row>
          <el-select
            v-model="hotelbrand"
            multiple
            collapse-tags
            placeholder="不限"
          >
            <el-option
              v-for="item in hotelBrandList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
      priceRange: 50,    // 酒店价格
      hotellevel: [],     // 酒店等级
      hotelLevelList: [     // 下拉框 酒店等级
        {
          value: '1',
          label: '1星'
        }, {
          value: '2',
          label: '2星'
        }, {
          value: '3',
          label: '3星'
        }, {
          value: '4',
          label: '4星'
        }, {
          value: '5',
          label: '5星'
        }
      ],
      hoteltype: [],        // 酒店类型
      hotelTypeList: [      // 下拉框 酒店类型
        {
          value: '1',
          label: '经济型'
        }, {
          value: '2',
          label: '舒适型'
        }, {
          value: '3',
          label: '高档型'
        }, {
          value: '4',
          label: '豪华型'
        }, {
          value: '5',
          label: '度假村'
        },
        {
          value: '6',
          label: '公寓式酒店'
        },
      ],
      hotelasset: [],        // 酒店设施
      hoteLassetList: [      // 下拉框 酒店设施 
        {
          value: '1',
          label: 'wifi'
        }, {
          value: '2',
          label: '热水壶'
        }, {
          value: '3',
          label: '吹风机'
        }, {
          value: '4',
          label: '外币兑换服务'
        }, {
          value: '5',
          label: '洗衣服务'
        },
        {
          value: '6',
          label: '电梯'
        },
      ],
      hotelbrand: [],        // 酒店品牌
      hotelBrandList: [       // 下拉框酒店品牌
        {
          value: '1',
          label: '7天连锁'
        }, {
          value: '2',
          label: '汉庭'
        }, {
          value: '3',
          label: '如家'
        }, {
          value: '4',
          label: '格林豪泰'
        },
      ]
    }
  },
  methods: {
    // 拖动滑块触发
    priceTooltip(val) {
      // console.log(val);

    }
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
    .hotellevel {
      .hotelLeveList {
        display: inline-block;
        border: none;
      }
    }
  }
}
</style>
