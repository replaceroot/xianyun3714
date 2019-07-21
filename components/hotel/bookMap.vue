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
              <div class="road">
                <span class="both">全部</span>
                <nuxt-link to="javascript:">XXX路</nuxt-link>
                <nuxt-link to="javascript:">南京路</nuxt-link>
                <nuxt-link to="javascript:">北京路</nuxt-link>
                <nuxt-link to="javascript:">上海路</nuxt-link>
              </div>
              <i
                class="el-icon-caret-bottom"
                @click="handleExtation"
              >等XX个区域</i>
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
              >
                <el-col :span="6">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom-start"
                  >
                    <span>
                      <i class="el-icon-star-off"></i>
                      <i class="el-icon-star-off"></i>
                      <i class="el-icon-star-off"></i>
                      ￥XXX
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
                      <i class="el-icon-star-off"></i>
                      <i class="el-icon-star-off"></i>
                      <i class="el-icon-star-off"></i>
                      ￥XXX
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
                      <i class="el-icon-star-off"></i>
                      <i class="el-icon-star-off"></i>
                      <i class="el-icon-star-off"></i>
                      ￥XXX
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
  methods: {
    // 点击扩展区域
    handleExtation() {

    }
  },
  mounted() {
    // 页面加载之后执行
    window.onLoad = function () {
      // 生成地图hotelMap是显示地图的div的id
      var map = new AMap.Map('hotelMap', {
        zoom: 11,//放大级别
        center: [118.8718107, 31.32846821],//中心点坐标，经纬度
        viewMode: '3D'//使用3D视图
      });

      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        //content: "<div style='width:20px; height:20px; background:red;'>1</div>",
        position: new AMap.LngLat(118.8718107, 31.32846821),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      });

      map.add(marker);
    }

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

#question-mark {
  background-color: #ccc;
  color: #fff;
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  text-align: center;
  border-radius: 100%;
}
</style>
