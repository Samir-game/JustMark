import { useForm } from "react-hook-form";

import axios from'axios'
import {toast,ToastContainer} from 'react-toastify'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
 

  const onSubmit = async (data) => {
    
    try {
      console.log("submitting to backend",data)
      const response= await axios.post("http://localhost:8000/api/user/login",data)
      if(response.status==200){
        toast.success(response?.data?.msg || "user logged in",{autoClose:1200})
        // setTimeout(() => navigate(), timeout);
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div >
      <div >
        <h2 >Login</h2>
  

        <form onSubmit={handleSubmit(onSubmit)} >
          <div>
            <label >Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label >Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              
            />
            {errors.password && <p >{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
           
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
      <ToastContainer/>

    </div>
  );
};

export default Login;
