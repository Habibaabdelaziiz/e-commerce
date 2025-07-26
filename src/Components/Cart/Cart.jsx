
import { CounterContext } from '../../Conttext/CounterContext';
import Style from './Cart.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Cart() {

  const { cartDetails, isLoading, deleteProduct, clearCart, updateCart, Chickout, getCart, numCartItems } =
    useContext(CounterContext);
  useEffect(() => {
    getCart()

  }, [])


  console.log("Cart Details:", cartDetails);

  if (isLoading) return <div>Loading...</div>;

  if (!cartDetails) return <div>No cart exists</div>;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between mx-8 my-10 ">
        <span className=" text-xl mb-2 sm:mb-0 text-green-500 ">
          Total Price: {cartDetails?.data?.totalCartPrice} 
        </span>
        <span className="text-xl mb-2 sm:mb-0 text-green-500 ">
        num Of Cart Items :{cartDetails?.numOfCartItems}
      
        </span>
        
        <button  className='btn btn-green'> <Link to={'/ShippingAddress'}>Check Out</Link></button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">

              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          {cartDetails?.data?.products?.map((item) => (
            <tbody key={item.product.id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img
                    src={item.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={item.product.title}
                  />
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.product?.title}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <button class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">

                      <svg onClick={() => updateCart(item.product.id, item.count - 1)} class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                      </svg>
                    </button>
                    <p>{item.count}</p>
                    <button class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">

                      <svg onClick={() => updateCart(item.product.id, item.count + 1)} class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteProduct(item.product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>



              </tr>
            </tbody>
          ))}
        </table>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={clearCart}
            className="btn btn-green m-10"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}