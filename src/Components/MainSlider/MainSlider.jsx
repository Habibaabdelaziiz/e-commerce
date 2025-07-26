
import Style from './MainSlider.module.css'
import React, { useEffect, useState } from 'react'
import img_1 from '../../assets/slider-image-1.jpeg'
import img_2 from '../../assets/slider-image-2.jpeg'
import img_3 from '../../assets/slider-image-3.jpeg'
import img_4 from '../../assets/grocery-banner-2.jpeg'
import img_5 from '../../assets/grocery-banner.png'
import Slider from 'react-slick'

export default function MainSlider() {
  const [Counter, setCounter] = useState(0)
  useEffect(() => {
    console.log("template name  did mount");

  }, [])
  return (
    <div className='grid grid-cols-12 gap-4 mb-5 max-w-3xl m-auto '>
      <div className="col-span-8"><Slider arrows={false}>
        <img className='w-full h-[400px] object-fill' src={img_1} alt="" />
        <img className='w-full h-[400px] object-fill' src={img_4} alt="" />
        <img className='w-full h-[400px] object-fill' src={img_5} alt="" />

      </Slider>
      </div>
      <div className="col-span-4">
        <img className='w-full h-[200px] object-fill' src={img_2} alt="" />
        <img className='w-full h-[200px] object-fill' src={img_3} alt="" />
      </div>
    </div>
  )
}
