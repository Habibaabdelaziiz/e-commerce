
import { useFormik } from 'formik';
import Style from './Login.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Conttext/counterContext';
import * as Yup from "yup"
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [loding, setloding] = useState(false);
  const { counter, setCounter } = useContext(CounterContext);
  const [errMsg, seterrMsg] = useState(null);

  async function handleSubmit(info) {


    try {
      setloding(true);
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', info)
      console.log(data);
      seterrMsg(null);
      localStorage.setItem("userToken", data.token)

      navigate('/Home')
    } catch (err) {

      seterrMsg(err.response.data.message)
    }
    finally {
      setloding(false)
    }
  }
  const yupSchema = Yup.object().shape({
    email: Yup.string().required('ples enter email').email('ples enter valied email'),
    password: Yup.string().required('passwored is requier').matches(/^[A-Z].{6,}/),

  }
  )
  const formik = useFormik({
    initialValues: {
      email: " ",
      password: ""

    },
    validationSchema: yupSchema,

    onSubmit: handleSubmit,


  })

  function forget() {
    navigate('/ForgetPasswored')
  }
  return (
    <>


      <div className='my-10'>
        <h2 className=' text-3xl mb-5 text-green-500 font-bold'>Login Form</h2>
        <form onSubmit={formik.handleSubmit} className="mx-auto">
          {
            errMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

              {errMsg}
            </div> : null
          }

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@flowbite.com" required />
            {formik.errors.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div> : null}

          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
            {formik.errors.password && formik.touched.password ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div> : null}

          </div>
          <div className='flex  justify-between gap-4'>
            <Link onClick={forget}>Forget Passwored?</Link>
            <button type="submit" className="btn-green">
              {

                loding ? "loding...." : "Login "
              } </button>


          </div>

        </form>

      </div>
    </>
  )
}
