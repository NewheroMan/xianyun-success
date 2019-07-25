import { Message } from "element-ui";;
export const state = ()=>{
    return {
        articleDraftData:[]
    }
}
export const mutations = {
    setArticleDraft(state,data){
       
        state.articleDraftData = [...data]
        Message.success('保存草稿成功')
        
       
        
    },
    delArticleDraft(state,index){
        // console.log(123)
        state.articleDraftData.splice(index,1)
    }
}
export const actions = {
    
}