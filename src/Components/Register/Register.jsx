import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {

 const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let x = Yup.object({
    name: Yup.string().min(3, 'name minLength is 3').max(10, 'name maxLength is 10').required('Name is required'),
    email: Yup.string().email('invalid email').required('email is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password is too weak Start with upperCase').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "password and rePassword don't match").required('Please type the password again')

  })

  let formik = useFormik({
    initialValues:{
      name:"",
      phone:"",
      email:'',
      password:'',
      rePassword:''
    },validationSchema: x,
    onSubmit:submitRegister
  });

  const [isLoading, setisLoading] = useState(false)
   const [error,changeError] = useState(null);
  let navigate = useNavigate();

   async function submitRegister(values){
    setisLoading (true)
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).catch((error)=> {
      setisLoading (false);
      console.log(error)  
      changeError(error)

    });
    if (data.message === "success"){
      navigate("/login");
    }

  }
  return <>
      <div className='w-75 mx-auto py-5'>
      {error? <div className="alert mt-2 p-4 alert-danger">{error.response.data.message}</div>:""}

        <h3>Register now :</h3>

        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name :</label>
          <input type="text" className='form-control mb-3' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id='name'/>
          {formik.errors.name && formik.touched.name?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div>:""}
          
        
        <label htmlFor="email">Email :</label>
          <input type="email" className='form-control mb-3' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email'/>
          {formik.errors.email && formik.touched.email?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:""}
        
        <label htmlFor="phone">Phone :</label>
          <input type="tel" className='form-control mb-3' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone'/>
          {formik.errors.phone && formik.touched.phone?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div>:""}
        
        
        <label htmlFor="password">Password :</label>
          <input type="password" className='form-control mb-3' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password'/>
          {formik.errors.password && formik.touched.password?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:""}
        
        
        <label htmlFor="rePassword">rePassword :</label>
          <input type="password" className='form-control mb-3' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id='rePassword'/>
          {formik.errors.rePassword && formik.touched.rePassword?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.rePassword}</div>:""}

            
            <div className='text-end'>
              {isLoading?<button className='btn bg-main text-white mt-2'>
              <i className='fas fa-spinner fa-spin'></i>
            </button>:
            <><button disabled= {!(formik.isValid&&formik.dirty)} type='submit' className='btn bg-main text-white text-end'>Register</button>
            </>
}
            
            </div>
      </form>
      </div>

  </>
}
