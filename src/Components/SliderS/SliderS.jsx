import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function SliderS() {
    const [Categories, setCategories] = useState([])
    async function getCategory() {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategories(data.data);
    
      }
  
      
  useEffect(() => {
    getCategory()
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
    {
      Categories.map((c) => <>
        <div className="p-3">
          <img className='h-[200px] object-cover w-full  ' src={c.image} alt="" />
          <h3 className='text-lg mt-3 text-green-500 font-bold'>{c.name}</h3>
        </div>


      </>)
    }
  </Slider>
  )
}
