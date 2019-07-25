import { Message } from "element-ui";
export default ({$axios,redirect}) =>{
    $axios.onError(err =>{
        console.log(err.response)
        if(err.response.data.statusCode === 400){
            Message.error(err.response.data.message)
        }   
        if(err.response.data.statusCode === 401 || err.response.data.statusCode === 403){
            console.log(111111111,'进来了')
            redirect("/user/login")
        }
    })
}