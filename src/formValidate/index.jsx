import * as Yup from "yup";

const mobileNo = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const letters = /^[A-Za-z\s]*$/;
const timeFormat = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s(?:[AaPp][Mm])?$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

export const registerValidation = Yup.object({
  name: Yup.string().matches(letters, "Name can only contain letters and spaces").min(2).max(25).required("Please Enter a Name").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  mobile: Yup.string().matches(mobileNo, "Must be 10 digits").required("Please Enter a Valid Mobile no"),
  email: Yup.string().email().required("Please Enter a Email").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  password: Yup.string().min(8).required("Please Enter a Password").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  role: Yup.string().required("Select what do you want to do"),
});
export const otpValidation = Yup.object({
  otp: Yup.string().required("Please Enter the OTP")
});

export const loginValidation = Yup.object({
  email: Yup.string().email().required("Please Enter a Email"),
  password: Yup.string().required("Please Enter a Password")
});
export const forgotPasswordValidation = Yup.object({
  email: Yup.string().email().required("Please Enter a Email").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    })
});
export const resetPasswordValidation = Yup.object({
  password: Yup.string().min(8).required("Please Enter a Password").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  confirmPassword: Yup.string().min(8).required("Please Re-enter the Password").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }) 
});

export const propertyFormValidation = Yup.object({
  name: Yup.string().min(2).required("Name is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  type: Yup.string().required("Select the type"),
  title: Yup.string().matches(letters, "can only contain letters and spaces").min(2).required("Title is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  city: Yup.string().matches(letters, "can only contain letters and spaces").min(2).max(25).required("Location is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  address: Yup.string().min(5).required("Address is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  description: Yup.string().min(10).required("Add description").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  extraInfo: Yup.string().min(10),
  checkInTime: Yup.string().matches(timeFormat,"Enter a valid time (eg:12:00 pm)").required("Check-in time is required"),
  checkOutTime: Yup.string().matches(timeFormat,"Enter a valid time (eg:12:00 pm)").required("Check-out time is required"),
  cheapestPrice: Yup.string().matches(/^\d+(\.\d+)?$/, "Price must be a positive number").required("Price is required"),
  perks: Yup.array().of(Yup.string()).min(1,'Select at least one perk'),      
  documentProof: Yup.mixed().nullable().required('please upload jpg/jpeg/png/webp formats and size less than 5Mb ')
    .test("FILE_SIZE", 'File size is too large',
      (value) => !value || (value && value.size <= 1024 * 1024 * 1024)
    ).test("FILE_FORMAT", 'Unsupported file formats',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
  photos: Yup.array()    
    .test("FILE_LENGTH", "Upload minimum of five photos", (value) => {
      if (value.length < 6) return false;
      return true;
    })
    .test("FILE_SIZE", 'File size is too large', (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++){
          if (value[i].size > 1024 * 1024 * 1024 ) return false;
        }
      }    
      return true;
    })
    .test("FILE_FORMAT", 'Unsupported file formats', (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++){
          if (!SUPPORTED_FORMATS.includes(value[i]?.type)) return false;          
        }
      }    
      return true;
    })
});

export const editPropertyFormValidation = Yup.object({
  name: Yup.string().min(2).required("Name is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  type: Yup.string().required("Select the type").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  title: Yup.string().matches(letters, "can only contain letters and spaces").min(2).required("Title is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  city: Yup.string().matches(letters, "can only contain letters and spaces").min(2).max(25).required("Location is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  address: Yup.string().min(5).required("Address is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  description: Yup.string().min(10).required("Add description").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  extraInfo: Yup.string().min(10),
  checkInTime: Yup.string().matches(timeFormat,"Enter a valid time (eg:12:00 pm)").required("Check-in time is required"),
  checkOutTime: Yup.string().matches(timeFormat,"Enter a valid time (eg:12:00 pm)").required("Check-out time is required"),
  cheapestPrice: Yup.string().matches(/^\d+(\.\d+)?$/, "Price must be a positive number").required("Price is required"),
  perks: Yup.array().of(Yup.string()).min(1,'Select at least one perk'),      
  // documentProof: Yup.mixed().nullable().required('please upload jpg/jpeg/png/webp formats and size less than 5Mb ')
  //   .test("FILE_SIZE", 'File size is too large',
  //     (value) => !value || (value && value.size <= 1024 * 1024 * 1024)
  //   ).test("FILE_FORMAT", 'Unsupported file formats',
  //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
  //   ),
  // photos: Yup.array()    
  //   .test("FILE_LENGTH", "Upload at least one photo", (value) => {
  //     if (value.length < 1) return false;
  //     return true;
  //   })
  //   .test("FILE_SIZE", 'File size is too large', (value) => {
  //     if (value && value.length > 0) {
  //       for (let i = 0; i < value.length; i++){
  //         if (value[i].size > 1024 * 1024 * 1024 ) return false;
  //       }
  //     }    
  //     return true;
  //   })
  //   .test("FILE_FORMAT", 'Unsupported file formats', (value) => {
  //     if (value && value.length > 0) {
  //       for (let i = 0; i < value.length; i++){
  //         if (!SUPPORTED_FORMATS.includes(value[i]?.type)) return false;          
  //       }
  //     }    
  //     return true;
  //   })
});

export const roomFormValidation = Yup.object({
  title: Yup.string().min(2).required("Name is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  price: Yup.string().matches(/^\d+(\.\d+)?$/, "must be a positive number").required("Price is required"),
  maxGuests: Yup.string().matches(/^\d+(\.\d+)?$/, "must be a positive number").required("No of guests is required"),
  description: Yup.string().min(10).required("Add description").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  // roomNumbers: Yup.array().min(1, "You can't leave this blank.")
});
export const editRoomFormValidation = Yup.object({
  title: Yup.string().min(2).required("Name is required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  price: Yup.string().matches(/^\d+(\.\d+)?$/, "must be a positive number").required("Price is required"),
  maxGuests: Yup.string().matches(/^\d+(\.\d+)?$/, "must be a positive number").required("No of guests is required"),
  description: Yup.string().min(10).required("Add description").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  // roomNumbers: Yup.array().min(1, "You can't leave this blank.")
});

export const editUserValidation = Yup.object({
  name: Yup.string().matches(letters, "Name can only contain letters and spaces").min(2).max(25).required("Please Enter a Name").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  mobile: Yup.string().matches(mobileNo, "Must be 10 digits").required("Please Enter a Valid Mobile no"),
  email: Yup.string().email().required("Please Enter a Email").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
});

export const reviewFormValidation = Yup.object({
  rating: Yup.string().matches(/^\d+(\.\d+)?$/, "must be a positive number")
    .test('is-in-range', 'Rating must be between 1 and 5', (value) => {
      if (value) {
        const ratingValue = parseFloat(value);
        return ratingValue >= 1 && ratingValue <= 5;
      }
      return true; 
    })
    .required("Rate from 1 to 5"),
  title: Yup.string().min(2).required("required").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
  comment: Yup.string().min(10).required("Add your comments").test('no-leading-space', 'Leading spaces are not allowed', (value) => {
      if (typeof value === 'string' && value.trimStart() !== value) {
        return false;
      }
      return true;
    }),
});

