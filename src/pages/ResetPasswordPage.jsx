import React, { useContext } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import { useFormik } from "formik";
import { resetPasswordValidation } from '../formValidate';
import axios from "../services/axios";
import { AuthContext } from '../context/AuthContext';
import usePasswordToggle from '../hooks/usePasswordToggle';
import { Footer, UserHeader } from '../components';

const ResetPasswordPage = () => {
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
  const { token, id } = useParams();
  const [passwordInputType, toggleIcon] = usePasswordToggle();
  const [confirmPasswordInput, confirmToggleIcon] = usePasswordToggle();
  const initialValues = {
    password: "",
    confirmPassword:""
  };
  const handleResetPassword = async (values, action) => {
    try {
      const { data } = await axios.post(`/users/reset-password/${token}/${id}`, values); 
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
    validationSchema:resetPasswordValidation,    
    onSubmit:handleResetPassword
  });
  return (
    <div>
      <UserHeader />
      <main className=" pt-3 flex justify-center h-auto sm:h-[678px]">
        <div className="relative top-6 bottom-0 my-8 border border-neutral-500 rounded-xl w-auto sm:w-[566px] h-fit">
          <div className="flex items-center justify-center px-6 border-b h-16">
            <h2 className='text-lg font-semibold'>Update password?</h2>
          </div>
          <div className="p-4 sm:p-8">
            <div className="flex flex-col">
              <div className="mt-2 mb-6">
                <p>
                  Must include at least 8 characters.                   
                </p>
              </div>
              <form onSubmit={handleSubmit}>
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
                <div className="relative mb-5 mt-2">
                  <label className='font-normal'>Re-enter your Password</label>
                  <input type={confirmPasswordInput} name='confirmPassword'
                    placeholder='************'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />                  
                  <span className="absolute top-10 right-2.5 cursor-pointer">{confirmToggleIcon}</span>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-red-500 rounded-lg text-sm">
                      {errors.confirmPassword}
                    </div>
                  ): null}
                </div> 
                <button
                  type='submit'
                  className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
                >
                  Update
                </button>                
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ResetPasswordPage
