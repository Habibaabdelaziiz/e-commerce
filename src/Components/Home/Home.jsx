import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import SliderS from '../SliderS/SliderS'
import { useQuery } from '@tanstack/react-query'
import ProudectCart from '../ProudectCart/ProudectCart'

export default function Home() {
  const [serch, setserch] = useState('')

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['Proudects'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/products'),
    staleTime: 1000,
  })

  async function AddProudect(pId) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.log('No user token found');
        return;
      }
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: pId },
        {
          headers: {
            token: token,
          },
        }
      );

    } catch (error) {
      console.log(error);

    }
  }

  async function handleClick(pId) {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.log('No user token found');
        return;
      }
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId: pId },
        {
          headers: {
            token: token,
          },
        }
      );

    } catch (error) {
      console.log(error);

    }
  }


  function RendumProudect() {

    var Item = data?.data?.data?.filter((proudect) => {
      return serch.toLowerCase() === '' ? proudect : proudect.title?.toLowerCase().includes(serch);
    }).map((proudect) => (
      <ProudectCart
        key={proudect._id}
        proudect={proudect}
        onAddToCart={() => AddProudect(proudect._id)}
        onAddToWishlist={() => handleClick(proudect._id)}
      />
    ));
    return Item;

  }



  return <>
    <MainSlider />
    <SliderS />

    <form>
      <label htmlFor="simple-search" className="sr-only flex items-center max-w-sm mx-auto">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
            />
          </svg>
        </div>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Search branch name..."
          required
        />
      </div>
    </form>

    {isLoading && <p className="text-center text-lg text-green-500">Loading...</p>}

    {data?.data?.data?.length > 0 && (
      <div className="grid grid-cols-5 gap-5 mt-5">{RendumProudect()}</div>
    )}

    {data?.data?.data?.length === 0 && !isLoading && (
      <p className="text-center text-lg text-red-500">No results found.</p>
    )}
  </>
}