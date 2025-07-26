
import Style from './LayOut.module.css'
import NavBar from '../NavBar/NavBar';

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export default function LayOut() {

  useEffect(() => {
    console.log("template name  did mount");

  }, [])
  return (
    <>
      <NavBar />
      <div className='max-w-screen-xl m-auto container`'> <Outlet /></div>
  
    </>
  )
}
