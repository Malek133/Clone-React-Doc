
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form";
import { LOGIN_FORM } from "../data";
import { loginSchema } from "../validation";
import Input from "../UI/Input";
import ErrorMessage from "../errors/ErrorMessage";
import Button from "../UI/Button";
import { axiosInstance } from "../config/axiosConfig";
import { AxiosError } from "axios";
import { IErrors } from "../interface";


interface IFormInput {
  identifier:string
  password:string
}

const LoginPage = () => {

  const { register, handleSubmit, 
    formState:{errors} } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema)
  })

  const renderLogin = LOGIN_FORM.map(({placeholder,
    type,name,validation},idx) => (
       <div key={idx}> <Input  placeholder={placeholder} type={type}
       {...register(name,validation)}/>
       
       {errors[name] && <ErrorMessage 
       msg={errors[name]?.message} />}
       </div>
       ))
       // RENDER //
       const onSubmit: SubmitHandler<IFormInput> = async (data) => {
     
     try {
      const {status,data:res}=await axiosInstance.post('auth/local',data)
       
     if(status === 200){
         localStorage.setItem('routeLoged', JSON.stringify(res));
            setTimeout(() =>{
               location.replace('/')
            },1000)
     }
     } catch (error) {
      const errorObj = error as AxiosError<IErrors>;
       alert(`${errorObj.response?.data.error.message}`)
     }

  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
         {renderLogin}
        <Button >
          Login
          </Button>
      </form>
    </div>
  );
};

export default LoginPage;
