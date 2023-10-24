import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useFormik } from "formik";
import { toast, Flip } from "react-toastify";
import axios from "../services/axios";
import { editUserValidation } from '../formValidate';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';

const PersonalInfo = () => {
  const { user } = useContext(AuthContext);
  const { data:existUser, loading, error } = useFetch(`/users/${user._id}`); 
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    if (existUser) {
      setInitialValues({
        name: existUser.name || '',
        mobile: existUser.mobile || '',
        email: existUser.email || ''
      });
    }
  }, [existUser]);
  const handleEditUser = async (values) => { 
    try {
      const { data } = await axios.put(`/users/${existUser._id}`, values); 
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
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({ 
    enableReinitialize:true,
    initialValues: initialValues,
    validationSchema:editUserValidation,    
    onSubmit:handleEditUser
  }); 
  
  return (
    <div className='flex items-center w-full flex-col'>
      <h1 className="mt-2.5 py-3 text-3xl font-medium">Personal Information</h1>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : error ? (
          {error}
        ) : (
            <form onSubmit={handleSubmit} className='w-full max-w-md'>
              <div className="mt-2 mb-5">
                <div className="flex justify-between items-center ">
                  <label className='text-lg font-medium'>Name</label>
                  <input type="text" name='name'
                    placeholder='John Doe'
                    className='border border-neutral-400 rounded-lg p-3 mt-2'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.name && touched.name ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.name}
                  </div>
                ) : null}
              </div>
              <div className="mt-2 mb-5">
                <div className="flex justify-between items-center ">
                  <label className='text-lg font-medium'>Mobile No.</label>
                  <input type="number" name='mobile'
                    placeholder='987654321'
                    className='border border-neutral-400 rounded-lg  p-3 mt-2'
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.mobile && touched.mobile ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.mobile}
                  </div>
                ) : null}
              </div>
              <div className="mt-2 mb-5">
                <div className="flex justify-between items-center ">
                  <label className='text-lg font-medium'>Email</label>
                  <input type="email" name='email'
                    placeholder='your@email.com'
                    className='border border-neutral-400 rounded-lg p-3 mt-2'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <button
                type='submit'
                className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
              >
                Save
              </button>   
            </form>
      )}
    </div>
  )
}

export default PersonalInfo
