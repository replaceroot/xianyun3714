export const state = () => {
    return {
        // 酒店的信息
        hotelInfo: [],
        // 城市区域信息
        cityArea: {},
        // 城市区域数量
        cityAreaNum: '',
        // 过滤后的酒店信息
        afterFilter:[],
    }
}

export const mutations = {
    // 设置酒店的信息
    setHotelInfo(state, data) {
        state.hotelInfo = data;
    },
    // 设置城市区域信息
    setCityArea(state, data) {
        state.cityArea = data
    },
    // 设置城市区域数量
    setCityAreaNum(state, data) {
        state.cityAreaNum = data
    },
    // 设置过滤后的酒店信息
    setAfterFilter(state,data){
        state.afterFilter = data
    }
}