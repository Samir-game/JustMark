import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/user/login", data);
      if (response.status === 200) {
        toast.success(response?.data?.msg || "User logged in", { autoClose: 1200 });
        localStorage.setItem("user", response.data.userName);
        setTimeout(() => navigate("/pin"), 1200);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed", { autoClose: 1200 });
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen 
    bg-gradient-to-br from-green-400 to-green-700">

      <div className="bg-white shadow-2xl rounded-lg p-8 w-96 border border-green-600">

        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-green-500 
              rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-green-500 rounded-lg 
              focus:ring-2 focus:ring-green-400 focus:outline-none"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white py-2 
            rounded-lg hover:bg-green-600 transition font-semibold"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
