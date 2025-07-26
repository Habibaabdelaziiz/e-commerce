
import toast from 'react-hot-toast';
import Style from './WishList.module.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CounterContext } from '../../Conttext/CounterContext';
export default function WishList() {
  const [Counter, setCounter] = useState(0)
  const [wishlist, setWishlist] = useState([]);
  const [isLoding, setisLoding] = useState(false)
  const { AddProudect } = useContext(CounterContext)

  async function getWishlist() {
    setisLoding(true)
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("User not authenticated");
        return;
      }
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist", error);
    }
    finally {
      setisLoding(false)
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  async function deleteWishlist(productId) {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        toast.error("User not authenticated");
        return;
      }
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token },
      });
      toast.success("Deleted from wishlist");
      getWishlist(); // Refresh wishlist after deletion
    } catch (error) {
      console.error("Error removing product from wishlist", error);
      toast.error("Failed to remove from wishlist");
    }
    finally {
      setisLoding(false)
    }
  }

  if (isLoding) {
    return <>
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    </>
  }


  return (
    <div className="container">
      <h2 className="text-green-600 text-3xl ms-24 mt-10">My Wish List</h2>
      <table className=" text-sm text-left text-gray-500 dark:text-gray-400 container ">
        <thead>
          <tr>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3"></th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>

          {wishlist?.data?.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={item?.imageCover}
                  alt={item?.title}
                  className="w-16 md:w-32"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              <button onClick={() => AddProudect(item._id)} className='border-green-500 border-2 m-auto px-5 mb-5  inline-flex  mt-auto items-center  py-2 text-sm font-medium text-center text-black rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' >
                +Add
              </button>
              </td>
              <td className="px-6 py-4 m-auto font-semibold text-gray-900 dark:text-white">
                {item?.title}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item?.price} EGP
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => deleteWishlist(item.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}