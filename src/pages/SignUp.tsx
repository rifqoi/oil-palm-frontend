import React, { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useToken from "../hooks/useToken";
import { API_URL } from "../libs/config";

interface FormData {
  username: string;
  name: string;
  password: string;
  validatePassword: string;
}

async function signUp(name: string, username: string, password: string) {
  const url = `${API_URL}/api/v1/auth/signup`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      username: username,
      password: password,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  return response;
}

const SignUpScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const password = watch("password");
  const [token, setToken] = useToken();

  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: FormData) => {
    signUp(data.name, data.username, data.password)
      .then((response: Response) => {
        if (!response.ok) {
          console.log(response.json());
          setError("username", {
            message: "Username already exists",
            type: "custom",
          });
          return;
        }
        navigate("/login");
      })
      .catch((e) => {
        const errors = e as Response;
        if (!errors.ok) {
          setError("username", {
            message: "Username already exists",
            type: "custom",
          });
        }
      });
  };

  return (
    <>
      <Navbar center={true}></Navbar>
      <div className="min-h-screen flex flex-col my-20">
        <div className="max-w-3xl w-full mx-auto mt-4 bg-gray-50 p-8  md:border rounded-md border-brightRed ">
          <form
            action=""
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="font-medium text-xl text-gray-800  ">
              Create your account
            </div>

            {/* Name */}
            <div>
              <label
                className={`text-sm font-bold text-gray-400 block ${
                  errors.name
                    ? "text-red-500 border-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name here..."
                className={`w-full p-2 border  rounded mt-1 focus:outline-0 ${
                  errors.name
                    ? "text-red-500 border-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className={`text-sm font-bold text-gray-400 block ${
                  errors.username
                    ? "text-red-500 border-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your email here..."
                className={`w-full p-2 border  rounded mt-1 focus:outline-0 ${
                  errors.username
                    ? "text-red-500 border-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  // pattern: {
                  // 	value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,63})$/,
                  // 	message: "Email is invalid",
                  // },
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className={`text-sm font-bold text-gray-400 block ${
                  errors.password
                    ? "text-red-500 border-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password here..."
                className={`w-full p-2 border border-brightRed rounded mt-1 focus:outline-0 ${
                  errors.password
                    ? "text-red-500 border-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be greater than 8.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be lesser than 20.",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message:
                      "Password must contains one lowercase, one uppercase, one number, and one special characters.",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Validate Password */}
            <div>
              <label
                className={`text-sm font-bold text-gray-400 block ${
                  errors.validatePassword
                    ? "text-red-500 border-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter your password here..."
                className={`w-full p-2 border border-brightRed rounded mt-1 focus:outline-0 ${
                  errors.validatePassword
                    ? "text-red-500 border-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("validatePassword", {
                  validate: (val: string) => {
                    if (password !== val) {
                      return "Password do not match!";
                    }
                  },
                })}
              />
              {errors.validatePassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.validatePassword.message}
                </p>
              )}
            </div>
            <div>
              <button className="w-full py-2 px-4 bg-brightRed hover:bg-brightRedLight rounded-md text-white text-sm">
                Register
              </button>
            </div>
          </form>
          <div className=" ml-2 text-md text-gray-600 mt-5">
            Already have an account?
            <span>
              <a href="/login" className="text-blue-500">
                &nbsp;Login here
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpScreen;
