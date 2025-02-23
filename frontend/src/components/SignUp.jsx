import { useForm } from "react-hook-form";
import axios from 'axios'
import {ToastContainer,toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  // const navigate= useNavigate()

  async function onSubmit(data) {
    try {
      console.log("submitting to backend",data)
      const response= await axios.post("http://localhost:8000/api/user/signup",data)
      if(response.status==200){
        toast.success(response?.data?.msg || "user created",{autoClose:1200})
        // setTimeout(() => navigate(), timeout);
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div >

      <div >
        <div>
       
          <form onSubmit={handleSubmit(onSubmit)} >
            <div>
              <label >Username</label>
              <input
                type="text"
                {...register("userName", { required: "Username is required" })}
                
              />
              {errors.username && <p >{errors.username.message}</p>}
            </div>

            <div>
              <label >Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" },
                })}
 
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <label >Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
            
              />
              {errors.password && <p >{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SignUp;
