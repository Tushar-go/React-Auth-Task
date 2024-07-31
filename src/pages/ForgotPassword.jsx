import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");


  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth,email)
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        {/* For Image */}
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/login-verified-6251835-5117015.png" alt="Key"
            className='w-full h-[85%] rounded-2xl' />
        </div>
        {/* For Form Data */}
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <div className=' my-3'>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' type="email" id='email' value={email}
                onChange={onChange} placeholder='Email Address' />
            </div>
          
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have a account?
                <Link to="/sign-out" className='text-red-600 hover:text-red-700 font-semibold ml-1 transition duration-200 ease-in-out'>Register</Link>
              </p>
              <p>
                <Link to="/sign-in" className='text-blue-600 hover:text-blue-800 font-semibold transition duration-200 ease-in-out'>Sign in instead</Link>
              </p>
            </div>
            <button type="submit" className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>Send reset password</button>
            
          </form>
        </div>
      </div>
    </section>
  )
}
