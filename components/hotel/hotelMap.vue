<template>
  <div class="hotel-map">
    <el-row
      type="flex"
      justify="space-between"
    >
      <!-- 左侧内容区 -->
      <el-col :span="14">
        <div class="content">
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="3">区域:</el-col>
            <el-col :span="21">
              <div class="road hidden-all">
                <span class="both">全部</span>
                <nuxt-link
                  to="javascript:"
                  v-for="(item,index) in cityAreaInfo.scenics"
                  :key="index"
                  class="area"
                >{{item.name}}</nuxt-link>

              </div>
              <span
                class="areaNum"
                @click="handleExtation"
              > <i class="el-icon-d-arrow-right"></i>等{{AreaNum}}个区域</span>

            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="3">攻略:</el-col>
            <el-col :span="21">
              北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="3">均价:
              <el-tooltip
                class="price-item"
                effect="dark"
                content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                placement="top-start"
              >
                <sup id="question-mark">?</sup>
              </el-tooltip>

            </el-col>
            <el-col :span="21">
              <el-row
                type="flex"
                justify="space-between"
                class="iconhuangguan"
              >
                <el-col :span="6">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom-start"
                  >
                    <span>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ￥332
                    </span>
                  </el-tooltip>

                </el-col>
                <el-col :span="6">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom-start"
                  >
                    <span>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ￥521
                    </span>
                  </el-tooltip>
                </el-col>
                <el-col :span="6">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom-start"
                  >
                    <span>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ￥768
                    </span>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 右侧地图展示区 -->
      <el-col :span="10">
        <div class="map">
          <div id="hotelMap">

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {

  data() {
    return {
      iconTag: true,  // 点击标签扩展
      hotelLocation: {}    // 酒店位置信息
    }
  },
  computed: {
    // 城市区域信息
    cityAreaInfo() {
      return this.$store.state.hotel.cityArea
    },
    // 城市区域数量
    AreaNum() {
      return this.$store.state.hotel.cityAreaNum
    },
    // 获取城市酒店的信息
    CityhotelInfo() {
      return this.$store.state.hotel.hotelInfo
    }

  },
  methods: {
    init() {
      // 生成地图hotelMap是显示地图的div的id
      var map = new AMap.Map('hotelMap', {
        zoom: 8,//放大级别
        center: [118.8718107, 31.32846821],//中心点坐标，经纬度
        viewMode: '3D'//使用3D视图
      });

      // 创建一个 Marker 实例：
      this.CityhotelInfo.forEach(v => {
        map.add(new AMap.Marker({
          //content: "<div style='width:20px; height:20px; background:red;'>1</div>",
          position: new AMap.LngLat(v.location.longitude, v.location.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: '北京'
        }));
      })
    },
    // 点击扩展区域
    handleExtation() {
      // 获取icon 标签
      const iTag = document.querySelector(".areaNum .el-icon-d-arrow-right")
      // 获取显示区域的box
      const roadBox = document.querySelector(".road")
      if (this.iconTag) {
        iTag.style.transform = "rotate(270deg)";
        roadBox.classList.remove('hidden-all')
        this.iconTag = false
      } else {
        iTag.style.transform = "rotate(90deg)";
        roadBox.classList.add('hidden-all')
        this.iconTag = true
      }

    }
  },
  mounted() {
    // 设置定时器 等待酒店信息全部获取后执行，遍历酒店信息获取酒店location

    // 页面加载之后执行
    window.onLoad = this.init

    // 地图的链接
    var key = "	9b7c3f319b857206392cb57315b87209"
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }

}
</script>
<style lang="less" scoped>
.hotel-map {
  min-height: 260px;
  margin-bottom: 20px;
  .content {
    > div {
      margin-bottom: 20px;
      color: #666;
      font-size: 14px;
    }
  }
  .map {
    width: 100%;
    height: 100%;
    overflow: hidden;
    #hotelMap {
      height: 260px;
      width: 420px;
    }
  }
}
.iconhuangguan {
  i {
    color: #f90;
  }
}
#question-mark {
  background-color: #ccc;
  color: #fff;
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  text-align: center;
  border-radius: 100%;
}
.road {
  .area {
    margin-right: 1em;
    padding: 0 2px;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
  }
}
.areaNum {
  cursor: pointer;
  .el-icon-d-arrow-right {
    transform: rotate(90deg);
    color: #f90;
  }
}
.hidden-all {
  max-height: 3em;
  overflow: hidden;
}
</style>
