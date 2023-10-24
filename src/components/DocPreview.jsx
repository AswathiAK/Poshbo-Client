// import React, { useState } from 'react'

// const DocPreview = ({file}) => { console.log('file',file);
//   const [preview, setPreview] = useState(null);
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     setPreview(reader.result);
//   }
//   return (
//     <div className='mx-2'>
//       <img src={preview} alt="document preview" className='w-48 h-48 object-contain'/>
//     </div>
//   )
// }

// export default DocPreview

import React, { useState, useEffect } from 'react';

const DocPreview = ({ file }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (typeof file === 'object' && file instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    } else if (typeof file === 'string' && file.startsWith('http')) {
      setPreview(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div className='mx-2'>
      {preview ? (
        <img src={preview} alt="document preview" className='w-48 h-48 object-contain' />
      ) : (
        <p>No preview available</p>
      )}
    </div>
  );
};

export default DocPreview;

