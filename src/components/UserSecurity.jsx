import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useFormik } from "formik";
import { toast, Flip } from "react-toastify";
import axios from "../services/axios";
import { resetPasswordValidation } from '../formValidate';
import usePasswordToggle from '../hooks/usePasswordToggle';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const UserSecurity = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [passwordInputType, toggleIcon] = usePasswordToggle();
  const [confirmPasswordInput, confirmToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword:""
  };
  const handleChangePassword = async (values) => {
    try {
      const { data } = await axios.patch(`/users/${user._id}`, values); 
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });  
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
    onSubmit:handleChangePassword
  });
  const handleDeleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure ?',
        icon: 'warning',
        iconColor: '#a35',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        width: 450,    
        color:'#020274'
      });
      if (result.isConfirmed) {
        const { data } = await axios.delete(`/users/${id}`);      
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000
        });
        dispatch({ type: "LOGOUT" });
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  }

  return (
    <div className="">
      <div className='flex w-full justify-around items-center border rounded-md py-2'>
        <h1 className="mt-2.5 p-3 text-2xl font-medium">Change Password</h1>
        <form onSubmit={handleSubmit} className='w-full max-w-md' >
          <div className="relative mb-5 mt-2 px-3">
            <div className="flex justify-between items-center ">
              <label className='text-lg font-medium'>Password</label>
              <input type={passwordInputType} name='password'
                // placeholder='************'
                className='border border-neutral-400 rounded-lg p-3 mt-2'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />                  
              <span className="absolute top-5 right-5 cursor-pointer">{toggleIcon}</span>
            </div>
            {errors.password && touched.password ? (
              <div className="text-red-500 rounded-lg text-sm">
                {errors.password}
              </div>
            ): null}
          </div> 
          <div className="relative mb-5 mt-2 px-3">
            <div className="flex justify-between items-center">
              <label className='text-lg font-medium'>Confirm Password</label>
              <input type={confirmPasswordInput} name='confirmPassword'
                // placeholder='************'
                className='border border-neutral-400 rounded-lg p-3 mt-2'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />                  
              <span className="absolute top-5 right-5 cursor-pointer">{confirmToggleIcon}</span>
            </div>
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="text-red-500 rounded-lg text-sm">
                {errors.confirmPassword}
              </div>
            ): null}
          </div> 
          <div className="p-3">
            <button
              type='submit'
              className="bg-fuchsia-500 rounded-lg text-white w-full p-3  hover:bg-indigo-950"
            >
              Update Password
            </button> 
          </div>               
        </form>
      </div>
      <div className="flex w-full m-5 items-center gap-10">
        <h1 className="mt-2.5 text-xl font-medium">Delete Account</h1>
        <button onClick={() => handleDeleteUser(user._id)}
          type='submit'
          className="bg-red-500 rounded-lg text-white p-3 hover:bg-indigo-950"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserSecurity
