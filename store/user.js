export const state = ()=>{
    return {
        userInfo :{
            token:'',
            data:{}
        }
    }
}

export const mutations = {
    setUserInfo(state,val){
        state.userInfo = val
    },
    clearUserInfo(state){
        state.userInfo.token = ''
    }
}
export const actions = {
    login({commit},data){
        return this.$axios({
            method:'post',
            url:'/accounts/login',
            data
        })
        .then( res =>{
            if(res.status === 200){
              commit('setUserInfo',res.data)
              return res
            }
        })
    },
    gerCode(store,tel){
        return this.$axios({
          url:'/captchas',
          method:'post',
          data:{tel}
        }).then(res =>{
          if(res.status === 200){
              return res
          }     
        })
    }
}