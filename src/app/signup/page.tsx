"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [isDisabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response: any = await axios.post("/api/users/signup", user);
      if(response.data.success){
        toast.success("Signed up successfully");
        router.push("/login");
      } else{
        // console.log(response.data.message);
        toast.error(response.data.message);
      } 
      
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
      setDisabled(false);
    } else{
      setDisabled(true);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Toaster/>
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border bg-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border bg-white  border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border bg-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
          <button 
            className={`p-2 border  ${isDisabled ? "opacity-35" : ""} border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}
            onClick={onSignup}
            disabled = {isDisabled}
          >
             Signup here
          </button>  
          <Link href="/login">Visit Login page</Link>
        </div>
  )
}

export default SignupPage

