import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async(data) => {
    const res = await axios.post("/api/register", data);
    if(res.status === 200){ 
      console.log("Registration successful");
    } else {
      console.log("Registration failed");
    }
    console.log('Form submitted:', data);
  };

  const password = watch("password");

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
         className="grid gap-5 w-80 m-auto border bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className='text-center '>Enter your detail to create your account</h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email"
              }
            })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters"
              }
            })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="repassword" className="block text-sm font-medium mb-1">Re-enter Password</label>
          <input
            id="repassword"
            type="password"
            placeholder="Confirm password"
            {...register("repassword", {
              required: "Please re-enter password",
              validate: value =>
                value === password || "Passwords do not match"
            })}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
          />
          {errors.repassword && <p className="text-red-500 text-sm">{errors.repassword.message}</p>}
        </div>
        <Link to="/login" className="text-blue-500 text-sm  text-center" >already have account</Link>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
    