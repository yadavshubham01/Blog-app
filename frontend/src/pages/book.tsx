import { Appbar } from "../components/Appbar"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hook"
import { BookCard } from "./BookCard"

export const Book =() => {
    const {loading,blogs} =useBlogs();
    
    //console.log(blogs)
    if(loading){
        return <div>
            <Appbar />
          <div className='flex justify-center'>
          <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    </div>
    }

    return (
        <div>
            <Appbar/>
        <div className="flex justify-center "> 
        <div>
            {blogs.map(blog => <BookCard 
            key={blog.id} 
            id={blog.id} 
            authorName={blog.author.name || "Unknown" }
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb 2023"}
            />)}
          </div>  
        </div>
        </div>
    )
}