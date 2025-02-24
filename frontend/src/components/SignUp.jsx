import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const response = await axios.post("http://localhost:8000/api/user/signup", data);
      if (response.status === 200) {
        toast.success(response?.data?.msg || "User created", { autoClose: 1200 });
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-center 
    min-h-screen bg-gradient-to-br from-green-400 to-green-700">

      <div className="bg-white shadow-2xl rounded-lg p-8 w-96 border border-green-600">

        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-green-500 
              rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              {...register("userName", { required: "Username is required" })}
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-green-500 
              rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-green-500 rounded-lg 
              focus:ring-2 focus:ring-green-400 focus:outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white py-2 
            rounded-lg hover:bg-green-600 transition font-semibold"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
