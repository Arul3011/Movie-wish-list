import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const res = await axios.post("/api/login", data);
    if(res.states === 200){
      console.log("Login successful");
    } else {
      console.log("Login failed");
    }
    console.log("Logging in with", data);
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 w-80 m-auto border bg-white p-6 rounded-lg shadow-md">
      <h1 className='text-center '>Login to continue</h1>

        <div>
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full p-2 border rounded"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
<Link to="/register" className="text-blue-500 text-sm  text-center" >create account</Link>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default LoginForm;
