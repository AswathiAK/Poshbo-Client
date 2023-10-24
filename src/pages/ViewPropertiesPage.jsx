import React, { useContext, useEffect, useState } from 'react'
import { toast, Flip } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';
import axios from "../services/axios";
import { Footer, Loader, PropertyHeader } from '../components';

const ViewPropertiesPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState();
  const { user } = useContext(AuthContext); 
  const { data, loading, error } = useFetch(`/hotels/host/${user._id}`);
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
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
        color:'#020274'
      });
      if (result.isConfirmed) {
        const { data } = await axios.delete(`/hotels/${id}`);      
        setList(list.filter((item) => item._id !== id));
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
  }

  return (
    <div>
      <PropertyHeader />
      <main className='min-h-screen px-4 md:px-20'>
        <h1 className="my-8 text-center text-3xl font-semibold">My Properties</h1>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              {error}
            </div>
          ) : list ? (
            <div className='my-8'>
                {list.length > 0 && list.map(item => (
                  <div key={item._id} className="flex flex-col md:flex-row gap-5 relative">                    
                    <Link to={`/host/view_property/${item._id}`}                     
                      className="flex items-center border rounded-xl p-4 mb-4 gap-8 w-full"
                    >
                      <div className="flex items-center justify-center w-40 h-40 md:w-64  border rounded-md shrink-0">
                        <img src={item.photos[0]} alt="" className='p-1 w-full h-full object-cover'/>
                      </div>
                      <div className="md:flex-grow shrink">
                        <h2 className="text-lg font-semibold text-blue-950 font-serif">{item.name}, {item.city}</h2>
                        <p className='mt-2 text-md font-medium'>{item.title}</p>
                        <p className="text-sm mt-2 leading-6">{item.description}</p>
                      </div>
                    </Link>
                    <button onClick={()=>navigate(`/host/edit_property/${item._id}`)}
                      className='text-blue-900 absolute right-16 top-3 border rounded-md px-2 py-1 hover:bg-slate-200'
                    >
                      <EditIcon />
                    </button>
                    <button onClick={() => handleDelete(item._id)}
                      className='text-red-600 absolute right-3 top-3 border px-2 py-1 rounded-md hover:bg-slate-200'
                    >                      
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              No  data available.
            </div>
          )
        }

      </main>
      <Footer />
    </div>
  )
}

export default ViewPropertiesPage
