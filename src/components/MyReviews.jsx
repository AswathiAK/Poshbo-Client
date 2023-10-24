import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import Swal from 'sweetalert2'
import { toast, Flip } from "react-toastify";
import ReviewFormModal from './ReviewFormModal';
import { EditReviewPage } from '../pages';
import axios from "../services/axios";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/reviews/${user._id}`); 
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(data);
  }, [data]);

  const [openEditReview, setOpenEditReview] = useState(false);
 
  const deleteReview = async (reviewId) => {
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
        color: '#020274'
      });
      if (result.isConfirmed) {
        const { data } = await axios.delete(`/reviews/${user._id}/${reviewId}`);
        setList(list.filter((item) => item._id !== reviewId));
        toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          transition: Flip,
          autoClose: 2000
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message ?? error.response?.statusText ?? error.message;
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip,
        autoClose: 2000
      });
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          {error}
        </div>
      ) : list.length > 0 ? (
        <div className="my-8">
          {list.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row gap-5 relative">
              <div
                className="flex items-center border rounded-xl p-4 mb-4 gap-8 w-full"
              >
                <div className="flex items-center justify-center w-20 h-20  border rounded-md shrink-0">
                  <img src={item.hotel?.photos[0]} alt="" className='p-1 w-full h-full object-cover' />
                </div>
                <div className="md:flex-grow shrink">
                  <h2 className="font-semibold font-serif">
                    {item.hotel?.name}, {item.hotel?.address} 
                  </h2>
                  <h2 className="font-serif">
                    Rating: {item.rating} <StarIcon />
                  </h2>
                  <h2 className="font-serif">
                    {item.reviewTitle} 
                  </h2>
                  <h2 className="font-serif">
                    {item.comment}
                  </h2>
                  <button onClick={()=>setOpenEditReview(true)}
                    className='text-blue-900 absolute right-16 top-3 border rounded-md px-2 py-1 hover:bg-slate-200'
                  >
                    <EditIcon />
                  </button>
                  <button onClick={() => deleteReview(item._id)}
                    className='text-red-600 absolute right-3 top-3 border px-2 py-1 rounded-md hover:bg-slate-200'
                  >                      
                    <DeleteIcon />
                  </button>
                
                  {openEditReview &&
                    <ReviewFormModal title="Edit Review" open={openEditReview} setOpen={setOpenEditReview} >
                      <EditReviewPage reviewId={item._id} />
                    </ReviewFormModal>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          No reviews available
        </div>
      )}
    </div>
  );
}

export default MyReviews
