import React, { useState } from 'react'
import BlurOnIcon from '@mui/icons-material/BlurOn';
import ImageModal from './ImageModal';

const ImageGallery = ({ property }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="pt-5 h-full flex relative " >
      <div className="w-1/2 rounded-s-xl" onClick={()=>setOpen(true)}>
        <img src={property.photos?.[0]} alt="1st photo" className='w-full h-full object-cover rounded-s-xl cursor-pointer' />
      </div>
      <div className="pl-2 w-1/4" onClick={()=>setOpen(true)}>
        <div className="h-1/2 ">
          <img src={property.photos?.[1]} alt="2nd photo" className='w-full h-full object-cover cursor-pointer' />
        </div>
        <div className="h-1/2 pt-2">
          <img src={property.photos?.[2]} alt="3rd photo" className='w-full h-full object-cover cursor-pointer' />
        </div>
      </div>
      <div className="pl-2 w-1/4 " onClick={()=>setOpen(true)}>
        <div className="h-1/2 rounded-tr-lg">
          <img src={property.photos?.[3]} alt="4th photo" className='w-full h-full object-cover rounded-tr-lg cursor-pointer' />
        </div>
        <div className="h-1/2 pt-2 rounded-br-lg">
          <img src={property.photos?.[4]} alt="5th photo" className='w-full h-full object-cover rounded-br-lg cursor-pointer' />
        </div>
      </div>    
      <div className="absolute bottom-5 right-5">
        <button onClick={()=>setOpen(true)}
          className='bg-white border border-black px-4 py-2 text-sm font-semibold text-center rounded-lg'
        >
          <BlurOnIcon sx={{fontSize:'22px'}}/> Show all Photos
        </button>
        {open &&
          <ImageModal setOpen={setOpen} property={property} />           
        }
      </div>
    </div>
  )
}

export default ImageGallery
