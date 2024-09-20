import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SignupInput } from "@shubhamyadav01/common-blogs";


export const Auth = ({ type }: {type: "signup" | "signin"}) => {
  const navigate=useNavigate();
  const [postInputs,setPostInputs] =useState<SignupInput>({
    name:"",
    email:"",
    password:"",
  })
    
   async function sendRequest(){
      try{
        const res=await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup" ? "signup" : "signin" }`,postInputs);
         const data=res.data;
         console.log(res.data)
         localStorage.setItem("token",data.jwt);
         navigate("/book");
      }catch(e){
        console.log(e);
         alert("Error while signing up")
      } 
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
              <div className="px-10">
               <div className="font-extrabold text-3xl">
                Create an account
               </div>
               <div className="text-slate-400">
                  {type === "signin" ? "Don't have an account?" : " ALready have an account?"}
                  <Link className="pl-2 underline" to={type==="signin" ? "/signup" : "/signin"}>
                  {type === "signin" ? "Sign up" : "Sign in"}
                  </Link>
                </div>
               </div> 
               <div className="pt-8">
                  {type === "signup" ? <LablledInput label="Username" placeholder="John Doe...." onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value
                    })
                   }}/> :null}
                   <LablledInput label="Email" placeholder="Johndeo@gamil.com" onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      email: e.target.value
                    })
                   }}/>
                   <LablledInput label="Password" placeholder="" onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      password: e.target.value
                    })
                   }}/>
                   <div className="pt-6">
                     <button type="button" onClick={sendRequest} className="bg-slate-950 hover:bg-slate-900 text-white font-bold py-2 px-4 border border-slate-950 rounded w-full">
                      { type === "signup" ? "Sign up" : "Sign in"}
                     </button>
                    </div> 
               </div>
            </div> 
        </div>
    </div>
}

interface LablledInputType{
  label:string; 
  placeholder:string;
  onChange:(e: ChangeEvent<HTMLInputElement>)=>void;
}
function LablledInput({label,placeholder, onChange}:LablledInputType){
  return <div className="">
    <div className="gap-5">
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white pt-6">{label}</label>
            <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
  </div>
}