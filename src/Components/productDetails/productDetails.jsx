import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';

export default function ProductDetails() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  const x = useParams()
  console.log(x);

  const [proudectDatiles, setProudectDatiles] = useState()
  const [loding, setloding] = useState(false);

  async function getProudectDatiles() {
    setloding(true)
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + x.id)
    setloding(false)
    setProudectDatiles(data.data)


    console.log(data.data);
  }


  const [counter, setcounter] = useState(0);
  useEffect(() => {
    getProudectDatiles()
  }, [])
  if (loding) {
    return <>
      lodinggg.......
    </>
  }
  return (
    <>

      <div className='grid gap-5 grid-cols-12'>
        <div className="col-span-4">
          <Slider {...settings}>
            {

              proudectDatiles?.images.map((img) => {
                return <div>
                  <img src={img} alt="w-full" />
                </div>
              })
            }
          </Slider>
        </div>
        <div className="col-span-8 flex flex-col  justify-center gap-5 ">
          <h2 className='fa-2xl '>{proudectDatiles?.title}</h2>
          <p>{proudectDatiles?.description}</p>
          <div className='flex justify-between'>
            <span>{proudectDatiles?.price}$</span>
            <span>{proudectDatiles?.ratingsAverage}<i className='fa-solid fa-heart text-yellow-300'></i></span>
          </div>
          <button className='btn-green'>Add Proudect</button>
        </div>
      </div>
    </>
  )
}
