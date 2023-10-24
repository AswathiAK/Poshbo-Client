import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


// const PhotosUploadPreview = ({ photos, onChange, onBlur }) => {
  
//   const [previews, setPreviews] = useState([]);
//   useEffect(() => {
//     const generatePreviews = async () => {
//       const previewList = [];
//       for (let i = 0; i < photos.length; i++) {
//         const file = photos[i];
//         const reader = new FileReader();
//         const readPromise = new Promise((resolve) => {
//           reader.readAsDataURL(file);
//           reader.onload = () => {
//             resolve(reader.result);
//           };
//         });
//         const preview = await readPromise;
//         previewList.push(preview);
//       }
//       setPreviews(previewList);
//     };
//     if (photos && photos.length > 0) {
//       generatePreviews();
//     } else {
//       setPreviews([]);
//     }
//   }, [photos]);

//   const removePhoto = (filename, e) => {
//     e.preventDefault();
//     setPreviews([...previews.filter(preview => preview !== filename)]);
//   }

//   return (
//     <div className="mt-2 mb-5">
//       <div className="gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
//         {previews.length > 0 && previews.map((preview, index) => (
//           <div className="h-32 flex relative" key={index}>
//             <img src={preview} alt="" className="rounded-2xl w-full object-cover" />
//             <button onClick={(e)=>removePhoto(preview,e)} type='button'
//               className="absolute bottom-1 right-1 rounded-2xl py-2 px-3 text-white bg-black bg-opacity-50"
//             >
//               <DeleteIcon/>
//             </button>
//           </div>
//         ))}
//         <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border rounded-2xl text-xl text-gray-600'
//         >
//           <input type="file" multiple name='photos' className='hidden'
//             onChange={onChange}
//             onBlur={onBlur}
//           />
//           <CloudUploadIcon sx={{fontSize:'30px'}}/>
//           Upload
//         </label>
//       </div>
//     </div>
//   );
// };

// export default PhotosUploadPreview;


const PhotosUploadPreview = ({ photos, onChange, onBlur }) => {  
  
  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    const generatePreviews = async () => {
      const previewList = [];
      for (let i = 0; i < photos.length; i++) {
        const file = photos[i];
        if (typeof file === 'string') {
          previewList.push(file);
        } else {
          const reader = new FileReader();
          const readPromise = new Promise((resolve) => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              resolve(reader.result);
            };
          });
          const preview = await readPromise;
          previewList.push(preview); 
        }        
      }
      setPreviews(previewList);
    };
    if (photos && photos.length > 0) {
      generatePreviews();
    } else {
      setPreviews([]);
    }
  }, [photos]);

  const removePhoto = (filename, e) => {
    e.preventDefault();
    setPreviews([...previews.filter(preview => preview !== filename)]);
  }

  return (
    <div className="mt-2 mb-5">
      <div className="gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
        {previews.length > 0 && previews.map((preview, index) => (
          <div className="h-32 flex relative" key={index}>
            <img src={preview} alt="" className="rounded-2xl w-full object-cover" />
            <button onClick={(e)=>removePhoto(preview,e)} type='button'
              className="absolute bottom-1 right-1 rounded-2xl py-2 px-3 text-white bg-black bg-opacity-50"
            >
              <DeleteIcon/>
            </button>
          </div>        
        ))}
        <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border rounded-2xl text-xl text-gray-600'
        >
          <input type="file" multiple name='photos' className='hidden'
            onChange={onChange}
            onBlur={onBlur}
          />
          <CloudUploadIcon sx={{fontSize:'30px'}}/> 
          Upload
        </label>
      </div>      
    </div>
  );
};

export default PhotosUploadPreview;
