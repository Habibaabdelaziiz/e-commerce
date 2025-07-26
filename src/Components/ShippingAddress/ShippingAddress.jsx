import { Button, Label, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react'
import { CounterContext } from '../../Conttext/CounterContext';
import { Link } from 'react-router-dom';
import * as Yup from "yup"
export default function ShippingAddress() {

    const { Chickout, cartDetails } = useContext(CounterContext)
    const yupSchema = Yup.object({
        details: Yup.string().required("detiles are requierde").min(10,"detailse is must be at leste 10 characterse"),
        city: Yup.string().required("city is required").min(2,'city must be at least 2 character'),
        phone: Yup.string().required("phone number is requierd").matches(/^01[0251][0-9]{8}$/, "not valide egyption number")
    })
    const x = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: function (value) {
            console.log(cartDetails, value);
            Chickout(cartDetails.data._id, {
                details: value.details,
                phone: value.phone,
                city: value.city
            });
        },
        validationSchema: yupSchema,

    });

    useEffect(() => {

    }, [cartDetails])

    return (
        <>




            <form onSubmit={x.handleSubmit} className="flex max-w-md flex-col gap-4 m-auto pt-10">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Your phone" />
                    </div>
                    <TextInput {...x.getFieldProps("phone")} onChange={x.handleChange} onBlur={x.handleBlur} value={x.values.name} id="phone" type="tel" placeholder="" required />
                </div>
                {x.errors.phone &&
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {x.errors.phone}
                    </div>
                }
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="details" value="Your details" />
                    </div>
                    <TextInput {...x.getFieldProps("details")} onChange={x.handleChange} onBlur={x.handleBlur} value={x.values.name} id="details" type="text" placeholder="" required />
                </div>
                {x.errors.details &&
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {x.errors.details}
                    </div>
                }
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="city" value="Your city" />
                    </div>
                    <TextInput {...x.getFieldProps("city")} onChange={x.handleChange} onBlur={x.handleBlur} value={x.values.name} id="city" type="text" placeholder="" required />
                </div>
                {x.errors.city &&
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {x.errors.city}
                    </div>
                }
                <Button type="submit" className='btn-green'>Submit</Button>
            </form>
        </>
    )
}
