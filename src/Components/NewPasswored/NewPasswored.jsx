import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import axios from 'axios';
import toast from 'react-hot-toast';

export default function NewPasswored() {
    const navigate = useNavigate();
    const [loding, setloding] = useState(false);
    // const { counter, setCounter } = useContext(CounterContext);
    const [errMsg, seterrMsg] = useState(null);

    async function handleSubmit(info) {


        try {
            setloding(true);
            const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', info)
            console.log(data);
 
            localStorage.setItem("userToken", data.token)
            navigate('/Home');
            toast.success("Password reset successfully!");
        } catch (err) {

            console.error(err);
            seterrMsg(err.response?.data?.message)
        } finally {
            setloding(false);
        }

    }
    const yupSchema = Yup.object().shape({
        email: Yup.string().required('ples enter email').email('ples enter valied email'),
        newPassword: Yup.string().required().matches(/^[A-Z].{3,}/),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema: yupSchema,

        onSubmit: handleSubmit,


    })


    return (
        <div className='my-10'>
            <h2 className=' text-3xl ms-20 text-green-500 font-bold ' >reset your account password </h2>
            <form onSubmit={formik.handleSubmit} className="mx-auto p-20"  >
            {
                    errMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" placeholder='' role="alert">

                        {errMsg}
                    </div> : null
                }
                <div className="mb-5 ">
                    <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="email" class="text-black block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="enter your email" required />
                    <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your email</label>

                    {formik.errors.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.email}
                    </div> : null}

                </div>
                <div className="mb-5 ">
                    <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} name="newPassword" id="newPassword" class="text-black block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="enter your new passwored" required />
                    <label for="newPassword" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your passwored</label>

                    {formik.errors.newPassword ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.newPassword}
                    </div> : null}

                </div>
                <button type="submit" className="btn-green" disabled={loding}>
                    {loding ? "Loading..." : "Verify"}
                </button>
            </form>

        </div>
    )
}

