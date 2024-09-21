import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    "content": string,
    "title": string,
    "id": number,
      "author":{
        "name":string
      }
}

export const useBlog = ({id} : {id:string}) => {
  
    const [loading,setLoading] =useState(false);
    const [blog, setBlog] =useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/book/${id}`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
         .then(response => {
                setBlog(response.data.post);
                console.log(response.data)
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false); // make sure to handle errors by setting loading state to false
            });

    }, [id])


    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    
    const [loading,setLoading] =useState(true);
    const [blogs, setBlogs] =useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/book/bulk`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.posts);
                console.log(response.data.posts)
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setLoading(false); // make sure to handle errors by setting loading state to false
            });
    }, [])

    return {
        loading,
        blogs
    }
}

