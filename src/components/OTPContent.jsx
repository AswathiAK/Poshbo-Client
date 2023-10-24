import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import { useFormik } from "formik";
import { otpValidation } from '../formValidate';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from "../services/firebase";
import usePasswordToggle from '../hooks/usePasswordToggle';
import useCountdown from '../hooks/useCountdown';
import axios from "../services/axios";

const OTPContent = ({ confirmOtp, userInfo }) => {
  const navigate = useNavigate();
  const [passwordInputType, toggleIcon] = usePasswordToggle();
  const [confirmResend, setConfirmResend] = useState('');
  const { secondsLeft, startCountdown } = useCountdown();
  const initialValues = {
    otp: "",    
  };

  const resendRecaptcha = async (number) => {
    const mobile = '+91' + number;
    const recaptcha = new RecaptchaVerifier(auth, 'resendotp-captcha', {});
    recaptcha.render();
    return signInWithPhoneNumber(auth, mobile, recaptcha);
  };
  const resendOtp = async () => {
    startCountdown(30);
    try {
      const resendOtpResult = await resendRecaptcha(userInfo.mobile);
      setConfirmResend(resendOtpResult);
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    };
  };  
  const verifyOTP = async (confirmResend, userInfo, values, action) => {
    try {
      let otpResponse = null;
      if (confirmResend) {
        otpResponse = await confirmResend.confirm(values.otp);
      } else {
        otpResponse = await confirmOtp.confirm(values.otp); 
      } 
      const payload = {
        userInfo,
        otpResponsePhone: otpResponse.user.auth.currentUser.phoneNumber
      };
      try {
        const { data } = await axios.post('/users/register', payload);
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
    validationSchema:otpValidation,    
    onSubmit: (values, action) => verifyOTP(confirmResend, userInfo, values, action)
  });
  
  return (
    <div>
      <main className=" pt-3 flex justify-center h-auto sm:h-[678px]">
        <div className="relative top-6  my-8 border border-neutral-500 rounded-xl w-auto sm:w-[566px] h-fit">
          <div className="flex items-center justify-center px-6 border-b h-16">
            <h2 className='text-lg font-semibold'>OTP</h2>
          </div>
          <div className="p-4 sm:p-8">
            <div className="flex flex-col">              
              <form onSubmit={handleSubmit}>
                <div className="mt-2 mb-5 relative">
                  <label className='font-normal'>Enter the OTP</label>
                  <input type={passwordInputType} name='otp'
                    placeholder='********'
                    className='border border-neutral-400 rounded-lg w-full p-3 mt-2'
                    value={values.otp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="absolute top-10 right-2.5 cursor-pointer">{toggleIcon}</span>
                  {errors.otp && touched.otp ? (
                    <div className="text-red-500 rounded-lg text-sm">
                      {errors.otp}
                    </div>
                  ): null}
                </div>                
                <button
                  type='submit'
                  className="bg-fuchsia-500 rounded-lg text-white w-full p-3 my-3 hover:bg-indigo-950"
                >
                  Verify OTP
                </button>
                {secondsLeft>0 ? 
                  <div className="mt-3 text-center text-md font-medium" >Resend OTP in {secondsLeft}</div>
                  :
                  <button className="mt-3 bg-green-600 rounded-md text-white p-2" onClick={resendOtp}>
                    Resend OTP
                  </button>
                }
                <div className='flex justify-center mt-4' id="resendotp-captcha"></div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OTPContent
