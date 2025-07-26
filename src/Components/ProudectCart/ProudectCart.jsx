import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Style from './ProudecrCart.module.css'
import toast from 'react-hot-toast';

export default function ProudectCart({ proudect }) {


    async function AddProudect(proudect) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId: proudect
                },
                {
                    headers: {
                        token: localStorage.getItem("userToken")
                    }
                }
            )
            console.log(data);
            toast.success("Add to Cart");
        } catch (error) {
            console.log(error);

        }
    }
    const [isActive, setIsActive] = useState(false);

    async function handleClick(proudect) {


        try {

            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    productId: proudect
                },
                {
                    headers: {
                        token: localStorage.getItem("userToken")
                    }
                }
            )

            toast.success("Add to WishList");
            console.log(data);
            setIsActive(true)
        } catch (error) {
            console.log(error);

        }


    };



    return (
        <div className={`${Style.btnT} overflow-hidden    hover:shadow-md hover:shadow-green-500 hover:transition-all max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
            <Link to={"/productDetails/" + proudect.id}>

                <img className="rounded-t-lg" src={proudect.imageCover} alt={proudect.title} />

                <div className="p-5 flex-grow flex  flex-col items-start">

                    <h5 title={proudect.category.name} className="mb-2 text-xl text-green-700  tracking-tight  dark:text-white line-clamp-1">{proudect.category.name.split(" ", 3).join(" ")}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">{proudect.title}</p>
                    <div className='flex  justify-between '>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{proudect.price}EGP</p>

                        <p className="ms-24 font-normal text-gray-700 dark:text-gray-400"><i className='fas fa-star text-yellow-400'></i>{proudect.ratingsAverage}</p>
                    </div>
                </div>
            </Link>
            <button className={`ms-44 mt-0  text-2xl fas fa-heart ${isActive ? "text-red-700" : ""}`} onClick={() => handleClick(proudect._id)}>
            </button>


            <button onClick={() => AddProudect(proudect._id)} className={`m-auto px-14 mb-5 ${Style.sill}  inline-flex  mt-auto items-center  py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>
                +Add
            </button>
        </div>
    )
}
