"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");

  const verifyToken = async () => {
    try {
      const token = window.location.search.split("=")[1];
      console.log(token);
      const response = await axios.post("/api/users/resetpassword", {token});
      if (response.data.success) {
        setIsVerified(true);
        setUserId(response.data.userId);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message)
      console.log(error);
    }
  }

  const resetPassword = async(e: any) =>{
    try {
      e.preventDefault();
      if(password !== passwordCopy){
        toast.error("Password does not mathch");
      } else{
        const res = await axios.put("/api/users/resetpass", {newPassword : password, userId})
        if(res.data.success){
          toast.success(res.data.message);
          toast.success("Please login again");
          await axios.get("/api/users/logout");
          router.push("/login");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    isVerified ?

      <div className='flex justify-center items-center'>
        <form className='min-h-2/5 min-w-2/4 border-white rounded-3xl'>
          <div>
            <label htmlFor="password">Enter your New password</label>
            <input id="password" className='bg-white text-black p-2 mt-2 rounded-2xl border-white' type="text" placeholder='Enter you password'
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <div>
            <label htmlFor="passwordC">Re-Enter New password</label>
            <input id="passwordC" className='bg-white text-black p-2 mt-2 rounded-2xl border-white' type="text" placeholder='Re-Enter you password'
              onChange={(e) => { setPasswordCopy(e.target.value) }}
            />
          </div>
          <button className='bg-green-500 text-white p-2 rounded-2xl my-4 mx-auto'
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </form>
      </div>

      : <Toaster/>
  )

}

export default ForgotPasswordPage
