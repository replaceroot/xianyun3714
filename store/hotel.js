export const state = ()=>{
    return {
        // 酒店的信息
        hotelInfo:[],
    }
}

export const mutations = {
    // 设置酒店的信息
    setHotelInfo(state,data){
        state.hotelInfo = data;
    }
}