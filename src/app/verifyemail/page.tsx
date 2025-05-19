"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.data.success) {
        setVerified(true);
      } else {
        setError(true);
        console.log(response.data.message);
      }
    } catch (error: unknown) {
      if(error instanceof Error){
        setError(true);
      } 
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Verification Failed</h2>
        </div>
      )}
    </div>
  );
}
