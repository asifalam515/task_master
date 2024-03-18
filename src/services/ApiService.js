import axios from "axios";
export function getTasks(){
    return axios.get("https://task-master-drf.onrender.com/tasks/create/")
    .then(res=>{
        return res.data
    })
}

export function addCategory(category){
    return axios.post('https://task-master-drf.onrender.com/category/category/')
    
}