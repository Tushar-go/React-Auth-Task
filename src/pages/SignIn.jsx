import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {toast} from "react-toastify"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password : ""
  });

  const {email, password} = formData; 
  const navigate = useNavigate();

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth();;
      const userCredentials = signInWithEmailAndPassword(auth,email,password);
      if(userCredentials.user){
        console.log(userCredentials.user);
        
      }
      toast.success("Sign In Successfully!")
      navigate("/");
      
      
    } catch (error) {
      toast.error("Bad User Credentials!")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        {/* For Image */}
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/login-verified-6251835-5117015.png" alt="Key"
          className='w-full h-[85%] rounded-2xl' />
        </div>
        {/* For Form Data */}
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <div>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="email" id='email' value={email}
                onChange={onChange} placeholder='Email Address' />
            </div>
            <div className='relative mb-6 mt-3'>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type={showPassword ? "text" : "password"} id='password' value={password}
                placeholder='Password' onChange={onChange} />
                {showPassword ? (
                <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=> setShowPassword((prevState)=>!prevState)}/>
              ) : <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)} />}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have a account?
                <Link to="/sign-out" className='text-red-600 hover:text-red-700 font-semibold ml-1 transition duration-200 ease-in-out'>Register</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 font-semibold transition duration-200 ease-in-out'>Forgot Password?</Link>
              </p>
            </div>
            <button type="submit" className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Sign in</button>
            
          </form>
        </div>
      </div>
    </section>
  )
}
