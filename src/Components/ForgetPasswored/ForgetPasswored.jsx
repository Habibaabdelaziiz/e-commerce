import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import axios from 'axios';
export default function ForgetPasswored() {
    const navigate = useNavigate();
    const [loding, setloding] = useState(false);
    // const { counter, setCounter } = useContext(CounterContext);
    const [errMsg, seterrMsg] = useState(null);

    async function handleSubmit(info) {


        try {
            setloding(true);
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', info)
            console.log(data);
            seterrMsg(null);
            localStorage.setItem("userToken", data.token)
            navigate('/RePasswored');
            toast.success("send code")
        } catch (err) {

            seterrMsg("email not valied")
        }
        finally {
            setloding(false);

        }
    }
    const yupSchema = Yup.object().shape({
        email: Yup.string().required('ples enter email').email('ples enter valied email')
    })

    const formik = useFormik({
        initialValues: {
            email: " ",
        },
        validationSchema: yupSchema,

        onSubmit: handleSubmit,


    })


    return (
        <div className='my-10'>
            <h2 className=' text-3xl ms-20 text-green-500 font-bold ' >please enter your verification code </h2>
            <form onSubmit={formik.handleSubmit} className="mx-auto p-20"  >
                {
                    errMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" placeholder='Email' role="alert">

                        {errMsg}
                    </div> : null
                }

                <div className="mb-5 ">
                    <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="email" class="text-black block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="enter your email"  required />
                    <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your email</label>

                    {formik.errors.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.email}
                    </div> : null}

                </div>
                <button type="submit" className="btn-green">
                    {
                        loding ? "loding...." : "verify "
                    } </button>
            </form>

        </div>
    )
}
