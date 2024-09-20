import { useParams } from "react-router-dom";
import { useBlog } from "../hook"
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/spinner";

export const Blog =() => {
    const { id } =useParams();
    const {loading,blog} =useBlog({
        id:id || ""
    });
    if(loading){
        return <div> 
            <Appbar></Appbar>
            <Spinner/>
        </div>
    }
    return (
    <div>
       
        <FullBlog blog={blog}/>
    </div>
    )
}