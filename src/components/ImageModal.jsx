import React, { useState } from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CancelIcon from '@mui/icons-material/Cancel';

const ImageModal = ({ setOpen, property }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const prevSlide = () => {
    const isFirst = slideNumber === 0;
    const newIndex = isFirst ? property.photos?.length - 1 : slideNumber - 1;
    setSlideNumber(newIndex);
  };
  const nextSlide = () => {
    const isLast = slideNumber === property.photos?.length-1;
    const newIndex = isLast ? 0 : slideNumber + 1;
    setSlideNumber(newIndex);
  };  

  return (     
    <div className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-black/75 flex items-center justify-center 
      w-full h-full z-30'
    >
      <div className="fixed cursor-pointer top-5 right-10" onClick={() => setOpen(false)}>
        <CancelIcon sx={{ fontSize:'25px', color: 'white', '&:hover': { color: 'gray' } }} />
      </div>
      <div className="fixed cursor-pointer top-1/2 left-20 -translate-y-1/2" onClick={prevSlide}>
        <ArrowCircleLeftIcon sx={{ fontSize:'36px', color: 'white', '&:hover': { color: 'gray' } }} />
      </div>
      <div className="fixed cursor-pointer top-1/2 right-20 -translate-y-1/2 " onClick={nextSlide}>
        <ArrowCircleRightIcon sx={{ fontSize:'36px', color: 'white', '&:hover': { color: 'gray' } }} />
      </div>
      <div className="w-[calc(100%-400px)] h-[calc(100%-100px)]">
        <img src={property.photos?.[slideNumber]} alt="photos" className="w-full h-full object-cover" />
      </div>    
    </div>
  )
}

export default ImageModal
