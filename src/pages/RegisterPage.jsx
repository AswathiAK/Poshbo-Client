import React, { useContext, useState } from 'react'
import { toast, Flip } from "react-toastify";
import { Link, Navigate, } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidation } from '../formValidate';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from "../services/firebase";
import usePasswordToggle from '../hooks/usePasswordToggle';
import { AuthContext } from '../context/AuthContext';
import { Footer, OTPContent, UserHeader } from "../components";

const RegisterPage = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    if (user.role === 'guest') {
      return <Navigate to={'/'} />
    } 
    else if (user.role === 'host') {
      return <Navigate to={'/host/home'} />
    } 
  } 
  const [passwordInputType, toggleIcon] = usePasswordToggle();
  const [confirmOtp, setConfirmOtp] = useState('');
  const [showOtpPage, setShowOtpPage] = useState(false);
  const initialValues = {
    name: "",
    mobile:"",
    email: "",
    password: "",
    role:""
  }; 
  const setUpRecaptcha = (number) => {
    const mobile = '+91' + number;
    const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptcha.render();
    return signInWithPhoneNumber(auth, mobile, recaptcha);
  };
  const userRegister = async (values) => {
    try {
      const otpResult = await setUpRecaptcha(values.mobile);
      setConfirmOtp(otpResult);
      setShowOtpPage(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    };
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({    
    initialValues: initialValues,
    validationSchema:registerValidation,    
    onSubmit:userRegister
  }); 

  return (
    <div>
      <UserHeader />
      {!showOtpPage&& 
      <main className=" pt-3 flex justify-center" >
        <div className="relative top-6 bottom-0 mt-8 mb-20 border border-neutral-500 rounded-xl w-auto sm:w-[566px] h-auto">
          <div className="flex items-center justify-center px-6 border-b h-16">
            <h2 className='text-lg font-semibold'>Sign up</h2>
          </div>
          <div className="p-4 sm:p-8">
            <div className="flex flex-col">
              <div className="mt-2 mb-6">
                <h3 className="text-xl font-semibold text-center text-gray-600">
                  Welcome to <span className='text-violet-900'>POSHBO</span>                  
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mt-2 mb-5">
                  <label className='font-normal'>Name</label>
                  <input type="text" name='name'
                    placeholder='John Doe'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-500 rounded-lg text-sm">
                      {errors.name}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-normal'>Mobile No.</label>
                  <input type="number" name='mobile'
                    placeholder='987654321'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.mobile && touched.mobile ? (
                    <div className="text-red-500 rounded-lg text-sm">
                      {errors.mobile}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-normal'>Email</label>
                  <input type="email" name='email'
                    placeholder='your@email.com'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500 rounded-lg text-sm">
                      {errors.email}
                    </div>
                  ): null}
                </div>
                <div className="relative mb-5 mt-2">
                  <label className='font-normal'>Password</label>
                  <input type={passwordInputType} name='password'
                    placeholder='************'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />                  
                  <span className="absolute top-10 right-2.5 cursor-pointer">{toggleIcon}</span>
                  {errors.password && touched.password ? (
                    <div className="text-red-500 rounded-lg text-sm">
                      {errors.password}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-normal'>What do you want to do?</label>
                  <select name='role'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Choose an action</option>
                    <option value="guest">Book a property</option>
                    <option value="host">List a property</option>
                  </select>
                  {errors.role && touched.role ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.role}
                    </div>
                  ): null}
                </div>
                <button
                  type='submit'
                  className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
                >
                  Register
                </button>                
                <div className="text-center py-2 text-gray-600">
                  Already have an account? 
                  <Link to={'/login'} className='underline text-black'> Click here to login</Link>
                </div>
                <div className='flex justify-center mt-3' id="recaptcha-container"></div>  
              </form>
            </div>
          </div>
        </div>
      </main>}
      {showOtpPage && <OTPContent confirmOtp={confirmOtp} userInfo={values} />}      
      <Footer/>
    </div>
  )
}

export default RegisterPage
