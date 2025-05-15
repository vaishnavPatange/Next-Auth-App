"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(true);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user, {withCredentials: true});
      if(response.data.success){
        toast.success(response.data.message);
        console.log(response.data);
        router.push("/profile")
      }
    } catch (error:any) {
      toast.error(error.message)
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setDisabled(false);
    } else{
      setDisabled(true);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster/>
        <h1>{loading ? "processing..." : "Login"}</h1>
        <hr />
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
            className={`p-2 border ${isDisabled ? "opacity-35" : ""} border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600`}
            onClick={onLogin}
            disabled = {isDisabled}
          >
            Login here
          </button>  
          <Link href="/signup">Visit Signup page</Link>
        </div>
  )
}

export default LoginPage

