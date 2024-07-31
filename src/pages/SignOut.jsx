import React, {useState} from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link } from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {db} from "../firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignOut() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e){
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user
      const formDataCopy = {...formData}
      delete formData.password
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successful")
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong in the registration!")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
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
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="text" id='name' value={name}
                onChange={onChange} placeholder='Full Name' />
            </div>
            <div className='my-3'>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="email" id='email' value={email}
                onChange={onChange} placeholder='Email Address' />
            </div>
            <div className='relative mb-6'>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type={showPassword ? "text" : "password"} id='password' value={password}
                placeholder='Password' onChange={onChange} />
              {showPassword ? (
                <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)} />
              ) : <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)} />}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Have a account?
                <Link to="/sign-in" className='text-red-600 hover:text-red-700 font-semibold ml-1 transition duration-200 ease-in-out'>Sign in</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 font-semibold transition duration-200 ease-in-out'>Forgot Password?</Link>
              </p>
            </div>
            <button type="submit" className=' w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Sign up</button>
            
           
          </form>
        </div>
      </div>
    </section>
  )
}
