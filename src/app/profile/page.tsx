"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";

const ProfilePage = () => {
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

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <Toaster />
      <h1 className="text-center">Profile page</h1>
      <button
        className="text-xl mt-4 max-w-xl mx-auto bg-blue-400 p-2 rounded-xl"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default ProfilePage
