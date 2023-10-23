import axiosClient from "../axios";


export default function SearchAll(phrase){
    return  axiosClient.post("/search-all", {
        phrase: "moon"
    })
   
}