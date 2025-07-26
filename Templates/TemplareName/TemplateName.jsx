
import Style from './TemplateName.module.css'
import React, { useEffect, useState } from 'react'
export default function TemplateName() {
    const [Counter, setCounter] = useState(0)
    useEffect  (()=>{
        console.log("template name  did mount");
        
    },[])
  return (
    <div>
        <h2>
        TemplateName componant
        </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt expedita ab eius natus consequatur nesciunt id ex fugiat ullam? Voluptate!</p>
        <p>Counter:{Counter}</p>
    </div>
  )
}
