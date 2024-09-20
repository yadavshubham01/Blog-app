import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}
export const BookCard = ({
   id,
 authorName,
 title,
 content,
 publishedDate

}:BlogCardProps) =>  {

    return  <Link to={`/book/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer">
       <div className="flex"> 
         <div className="flex justify-center flex-col">
         <Avatar size={"small"} name={authorName}/>
         </div>
         <div className="font-extralight text-md pl-2">
         {authorName}
         </div>
         <div className="pl-2 font-thin text-slate-400">
            {publishedDate}
          </div> 
       </div>
       <div className="pt-3">
       <div className="text-xl font-semibold text-black">
        {title}
       </div>
       <div className="text-md font-light text-black">
          {content.slice(0,250)+"..."}
       </div>
       <div className="grid grid-cols-2">
       <div className="text-slate-500 text-sm font-thin pt-3 flex justify-start">
          {`${Math.ceil(content.length/100)} minutes(s)
          read `}
       </div>
       <div className="grid justify-end">
       <div className="flex items-center pt-3 gap-2">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
         </svg>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>
        </div> 
        </div>
       </div>
       </div>
    </div>
    </Link>
}


export function Avatar({name,size= "small" }:{name:string , size: "small" | "big"}){
    return  <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 
      ${size === "small" ? "w-6 h-6" : "w-10 h-10"} `}>
        <span className={` ${size === "small" ? "text-xs" : "text-md"}font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div> 
}