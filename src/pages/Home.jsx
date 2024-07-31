import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function Home() {

  const {loggedIn} = useAuthStatus();

 const navigate = useNavigate()
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col" >
        <h1 className="text-3xl text-center font-bold">Welcome To Our Page</h1>
        <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
          <button 
          onClick={()=> loggedIn ? navigate("/profile") : navigate("/sign-out")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Click On Sign In To Get Started
          </button>
        </div>
      </div>
    </div>
  );
}


//className="max-w-6xl mx-auto pt-4 space-y-6 "