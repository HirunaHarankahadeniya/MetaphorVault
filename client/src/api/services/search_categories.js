import axiosClient from "../axios";


export default function SearchCategories(phrase, categories){
    return  axiosClient.post("/search-categories", {
        phrase: phrase,
        categories:categories
    })
   
}