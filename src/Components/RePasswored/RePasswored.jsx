
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as yup from "yup"
import axios from 'axios'
import { UserContext } from '../../Conttext/UserContext'
import toast from 'react-hot-toast'

export default function RePasswored() {

    const navigate = useNavigate();
    const [loding, setloding] = useState(false);
    const [errMsg, seterrMsg] = useState(null);
    const { token, settoken } = useContext(UserContext)
    async function handleSubmit(info) {
        try {
            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
                info,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(data);

            localStorage.setItem("userToken", data.token);
            settoken(data.token);
         
            navigate('/NewPasswored');
        } catch (err) {

            seterrMsg(err.response?.data?.message );
        } finally {
            setloding(false);
        }
    }

    const yupSchema = yup.object().shape({
        resetCode: yup.string().required("code is requierd"),

    }
    )
    const formik = useFormik({
        initialValues: {
            resetCode: ""

        },
        validationSchema: yupSchema,

        onSubmit: handleSubmit,


    })


    return (<>
        <div className='my-10 p-10'>
            <h2 className=' text-3xl mb-5 text-green-500 font-bold ' >Reset your account password </h2>
            <form onSubmit={formik.handleSubmit} className="mx-auto"  >

                {
                    errMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" placeholder='Email' role="alert">

                        {errMsg}
                    </div> : null
                }
                <div className="mb-5 ">
                    <input type="code" name="resetCode" id="resetCode" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} required />
                    <label for="resetCode" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code</label>
                    {formik.errors.resetCode && formik.touched.resetCode ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.resetCode}
                    </div> : null}

                </div>
                <button type="submit" className="btn-green" disabled={loding}> {loding ? "Loading..." : "Verify"}
                </button>
            </form>

        </div>
    </>

    )
}
