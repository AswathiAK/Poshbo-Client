import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import { useFormik } from "formik";
import { propertyFormValidation } from '../formValidate';
import axios from "../services/axios";
import { availablePerks } from './PerksContents';
import { DocPreview, Footer, Loader, PerksItems, PhotosUploadPreview, PropertyHeader } from '../components';
  
const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    type: "",
    title: "",
    city: "",
    address: "",
    description: "",
    extraInfo: "",
    checkInTime: "",
    checkOutTime: "",
    cheapestPrice: "",
    perks: [],
    documentProof: null,    
    photos: [],
  };
  //base64conversion..  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };  
  const handleAddProperty = async (values, action) => {
    const { documentProof } = values; 
    const { photos } = values; 
    try {
      setLoading(true);   
      const documentProofBase64 = await convertToBase64(documentProof); 
      const photosBase64 = await Promise.all(
        photos.map(async (photo) => {
          return await convertToBase64(photo);
        })
      );  
      const propertyData = { ...values };
      delete propertyData.documentProof;
      delete propertyData.photos;
      propertyData.documentProof = documentProofBase64;
      propertyData.photos = photosBase64;       
      const { data } = await axios.post('/hotels', propertyData); 
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
    } finally {
      setLoading(false);
    }
  }; 
  const { values, errors, touched, handleBlur, handleChange, handleSubmit ,setFieldValue } = useFormik({    
    initialValues: initialValues,
    validationSchema:propertyFormValidation,    
    onSubmit:handleAddProperty
  });  

  return (
    <div>
      <PropertyHeader/>
      <main className='min-h-screen px-4 md:px-20'>
        {loading ?
          <Loader />
          : (            
            <div className="my-8 p-4 border border-neutral-500 rounded-xl">
              <form onSubmit={handleSubmit}>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Name of the property</label>
                  <input type="text" name='name'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.name}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Type of the property</label>
                  <select name='type'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Select Property type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Resort">Resort</option>
                  </select>
                  {errors.type && touched.type ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.type}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Title</label>
                  <input type="text" name='title'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.title}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Location</label>
                  <input type="text" name='city'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.city && touched.city ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.city}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Address</label>
                  <input type="text" name='address'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && touched.address ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.address}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>About the property</label>
                  <textarea name='description'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.description}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Extra Information</label>
                  <textarea type="text" name='extraInfo'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.extraInfo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.extraInfo && touched.extraInfo ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.extraInfo}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Check In & Check Out Times</label>
                  <div className="flex justify-between">
                    <div className="w-1/2">
                      <label className="block mt-2">Check In time</label>
                      <input type="text" name='checkInTime' placeholder='12:00 pm'
                        className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                        value={values.checkInTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.checkInTime && touched.checkInTime ? (
                        <div className="text-red-500 rounded-lg text-sm pt-2">
                          {errors.checkInTime}
                        </div>
                      ): null}
                    </div>
                    <div className="w-1/2">
                      <label className="block mt-2">Check Out time</label>
                      <input type="text" name='checkOutTime' placeholder='11:00 am'
                        className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                        value={values.checkOutTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.checkOutTime && touched.checkOutTime ? (
                        <div className="text-red-500 rounded-lg text-sm pt-2">
                          {errors.checkOutTime}
                        </div>
                      ): null}
                    </div>
                  </div>              
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Price starts from</label>
                  <input type="number" name='cheapestPrice'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.cheapestPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.cheapestPrice && touched.cheapestPrice ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.cheapestPrice}
                    </div>
                  ): null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Select Amenities</label>
                  <PerksItems selectedPerks={values.perks} availablePerks={availablePerks} 
                    onPerkChange={(perkName, isChecked) => {
                      if (isChecked) {
                        setFieldValue('perks', [...values.perks, perkName]);
                      } else {
                        setFieldValue('perks', values.perks.filter(perk => perk !== perkName));
                      }
                    }}
                  />                  
                  {errors.perks && touched.perks ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.perks}
                    </div>
                  ) : null}
                </div>
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Add Property Document</label>
                  {values.documentProof && <DocPreview file={values.documentProof}/> } 
                  <input type="file" name='documentProof' 
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    onChange={(e)=>setFieldValue("documentProof",e.target.files[0])}
                    onBlur={handleBlur}
                  />
                  {errors.documentProof && touched.documentProof ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.documentProof}
                    </div>
                  ) : null}
                </div>   
                <div className="mt-2 mb-5">
                  <label className='font-semibold text-lg'>Upload Photos</label>                  
                  <PhotosUploadPreview photos={values.photos}
                    onChange={(e) => setFieldValue("photos", Array.from(e.target.files))} 
                    onBlur={handleBlur}
                  />                  
                  {errors.photos && touched.photos ? (
                    <div className="text-red-500 rounded-lg text-sm pt-2">
                      {errors.photos}
                    </div>
                  ): null}
                </div>
                <button
                  type='submit'
                  className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
                >
                  Save 
                </button>
              </form>              
            </div>
          )}        
      </main>
      <Footer/>
    </div>
  )
}

export default AddPropertyPage
