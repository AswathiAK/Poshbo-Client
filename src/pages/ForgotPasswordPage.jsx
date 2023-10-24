import React, { useContext } from 'react'
import { toast, Flip } from "react-toastify";
import { Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { forgotPasswordValidation } from '../formValidate';
import axios from "../services/axios";
import { AuthContext } from '../context/AuthContext';
import { Footer, UserHeader } from '../components';

const ForgotPasswordPage = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    if (user.role === 'guest') {
      return <Navigate to={'/'} />
    } 
    else if (user.role === 'host') {
      return <Navigate to={'/host/home'} />
    } 
  }   
  const navigate = useNavigate();
  const initialValues = {
    email: "",    
  };
  const handleForgotPassword = async (values, action) => {
    try {
      const { data } = await axios.post('/users/forgot-password', values); 
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      action.resetForm();
      navigate('/login');
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
    validationSchema:forgotPasswordValidation,    
    onSubmit:handleForgotPassword
  });
  return (
    <div>
      <UserHeader />
      <main className=" pt-3 flex justify-center h-auto sm:h-[678px]">
        <div className="relative top-6 bottom-0 my-8 border border-neutral-500 rounded-xl w-auto sm:w-[566px] h-fit">
          <div className="flex items-center justify-center px-6 border-b h-16">
            <h2 className='text-lg font-semibold'>Forgotten your password?</h2>
          </div>
          <div className="p-4 sm:p-8">
            <div className="flex flex-col">
              <div className="mt-2 mb-6">
                <p>
                  Enter the email address associated with your account, and we’ll email you a link to 
                  reset your password.                   
                </p>
              </div>
              <form onSubmit={handleSubmit}>
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
                
                <button
                  type='submit'
                  className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
                >
                  Send reset link
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default ForgotPasswordPage
