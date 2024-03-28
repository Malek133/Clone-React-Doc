import { SubmitHandler, useForm } from "react-hook-form"
import Button from "../UI/Button"
import Input from "../UI/Input"
import { REGISTER_FORM } from "../data";
import ErrorMessage from "../errors/ErrorMessage";
import { regiterSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
 import { AxiosError } from "axios";
 import { IErrors } from "../interface";
import { useState } from "react";



interface IFormInput {
  username: string
  email:string
  password:string
}


const Register = () => {

  const [isloading,setIsloading] =useState(false);
  const navigat = useNavigate()
  const {register,handleSubmit,formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(regiterSchema)
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsloading(true)
    try {
     const {status} = await axiosInstance.post('/auth/local/register',data);
     if(status === 200){
      alert('Registered Successfully')
      setTimeout(() =>{
        navigat('/login')
      },1000)
     }
    } catch (error) {
    
       const errorObj = error as AxiosError<IErrors>;
       alert(`${errorObj.response?.data.error.message} changit please`)
    } finally {
      setIsloading(false)
    }
  }

  const renderRegister = REGISTER_FORM.map(({placeholder,
    type,name,validation},idx) => (
       <div key={idx}> <Input  placeholder={placeholder} type={type}
       {...register(name,validation)}/>
       
       {errors[name] && <ErrorMessage 
       msg={errors[name]?.message} />}
       </div>
       ))
       
  return (
    <div className="max-w-md mx-auto">
    <h2 className="text-center mb-3">Register Her.</h2>

    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
     {renderRegister}

<Button isloading={isloading} >
  {isloading ?  'Loading' : 'Register'}
  </Button>

</form>
  </div>
  )
}

export default Register
