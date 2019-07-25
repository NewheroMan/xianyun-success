export const state = ()=>{
    return {
        cityid:0,
        hotelInfo:[],
        total:0
    }
}

export const mutations = {
    setHotelInfo(state,val){
        state.hotelInfo = val
    },
    setid(state,val){
        state.cityid = val
    },
    settotal(state,val){
        state.total = val
    }
}

export const actions = {
    setHotelInfo( {commit},val){
        setHotelInfo(val)
    }
}