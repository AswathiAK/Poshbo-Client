import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import { useFormik } from "formik";
import { roomFormValidation } from '../formValidate';
import axios from "../services/axios";

const AddRoomPage = ({ propertyId }) => {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    price:"",
    maxGuests: "",
    description: "",
    roomNumbers:[]
  }; 
  const handleAddRoom = async (values, action) => {
    const roomNumbersArray = values.roomNumbers.split(',').map(room => ({ number: room }));
    const roomData = { ...values };
    roomData.roomNumbers = roomNumbersArray;
    try {
      const { data } = await axios.post(`/rooms/${propertyId}`, roomData); 
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
      action.resetForm(); 
      navigate('/host/view_properties');
    } catch (error) {
      const errorMessage =  error.response?.data?.message??error.response?.statusText??error.message ; 
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }    
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({    
    initialValues: initialValues,
    validationSchema:roomFormValidation,    
    onSubmit:handleAddRoom
  }); 
  return (
    <main className='flex justify-center'>
      <div className=" border border-neutral-300 rounded-xl w-auto sm:w-[566px] ">        
        <div className="p-4">
          <div className="flex flex-col">            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className='font-semibold'>Name of the Room</label>
                <input type="text" name='title'
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.title}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Price</label>
                <input type="number" name='price'
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.price && touched.price ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.price}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Maximum no. of Guests</label>
                <input type="number" name='maxGuests'
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.maxGuests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.maxGuests && touched.maxGuests ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.maxGuests}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Description</label>
                <textarea name='description' 
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.description}
                  </div>
                ): null}
              </div>
              <div className="mb-3">
                <label className='font-semibold'>Room numbers</label>
                <textarea name='roomNumbers' placeholder='Give comma between room numbers' 
                  className='border border-neutral-400 rounded-lg w-full p-2 mt-2'
                  value={values.roomNumbers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.roomNumbers && touched.roomNumbers ? (
                  <div className="text-red-500 rounded-lg text-sm">
                    {errors.roomNumbers}
                  </div>
                ): null}
              </div>                
              <button
                type='submit'
                className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-2 hover:bg-indigo-950"
              >
                Submit
              </button> 
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddRoomPage
