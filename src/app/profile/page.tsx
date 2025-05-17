"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import Link from "next/link";
import React, {useState} from "react";

const ProfilePage = () => {
  const [data, setData] = useState("nothing");
  const router = useRouter();
  const logout = async() => {
    try {
      const response = await axios.get("/api/users/logout");
      if(response.data.success){
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error:any) {
      toast.error(error.message)
    }
  }

  const getUserData = async() => {
    const response = await axios.get("/api/users/me");
    if(response.data.success){
      console.log(response.data.data);
      setData(response.data.data);
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <Toaster />
      <h1 className="text-center">Profile page</h1>
      <h2 className="rounded p-1 bg-green-300 mx-auto text-black">{data === "" ? "Nothing" :
        <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
        className="text-xl mt-4 max-w-xl mx-auto bg-blue-400 p-2 rounded-xl"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="text-xl mt-4 max-w-xl mx-auto bg-green-400 p-2 rounded-xl"
        onClick={getUserData}
      >
        getID
      </button>
    </div>
  )
}

export default ProfilePage
