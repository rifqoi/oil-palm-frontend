import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useToken from "../hooks/useToken";
import { API_URL } from "../libs/config";

type FormData = {
  username: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  token_type: string;
};

async function login(username: string, password: string) {
  const url = `${API_URL}/api/v1/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    body: new URLSearchParams({
      username: username,
      password: password,
    }),
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });

  if (!response.ok) {
    return null;
  }

  const jsonResponse: LoginResponse = await response.json();

  return jsonResponse;
}

const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const [userFound, setUserFound] = useState<boolean | null>(null);
  const [token, setToken] = useToken();

  if (token) {
    return <Navigate to="/" />;
  }

  const navigate = useNavigate();

  const onSubmit = handleSubmit(({ username, password }) => {
    console.log(username, password);
    login(username, password).then((response: LoginResponse | null) => {
      if (response === null) {
        setUserFound(false);
        return;
      }

      if (response?.access_token === undefined) {
        setUserFound(false);
        return;
      }

      const accessToken = response?.access_token as string;
      setToken(accessToken);
      navigate("/");
      window.location.reload;
      // return <Navigate to="/" />;
    });
  });

  return (
    <>
      <Navbar center={true}></Navbar>
      <div className="my-20 flex min-h-screen flex-col">
        <div className="mx-auto mt-4 w-full max-w-3xl rounded-md border-brightRed  bg-gray-50 p-8 md:border ">
          <form action="" className="space-y-6" onSubmit={onSubmit}>
            <div>
              <div className="py-5 text-xl font-medium text-gray-800 ">
                Please sign in to continue!
              </div>
              <label
                className={`block text-sm font-bold text-gray-400 ${
                  errors.username
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your email here..."
                className={`mt-1 w-full rounded  border p-2 focus:outline-0 ${
                  errors.username
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  // pattern: {
                  // 	value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,63})$/,
                  // 	message: "Username is invalid",
                  // },
                })}
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label
                className={`block text-sm font-bold text-gray-400 ${
                  errors.password
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password here..."
                className={`mt-1 w-full rounded border border-brightRed p-2 focus:outline-0 ${
                  errors.password
                    ? "border-red-500 text-red-500"
                    : "border-brightRedLight"
                }`}
                {...register("password", {
                  // minLength: {
                  // 	value: 8,
                  // 	message: "Password must be greater than 8.",
                  // },
                  // maxLength: {
                  // 	value: 20,
                  // 	message: "Password must be lesser than 20.",
                  // },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              {errors.password && userFound !== false ? (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              ) : null}
              {userFound === false ? (
                <p className="mt-2 text-sm text-red-500">
                  Incorrect username or password!
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-end">
              {/* <div className="flex items-center"> */}
              {/* 	<input */}
              {/* 		type="checkbox" */}
              {/* 		id="remember" */}
              {/* 		className="h-4 w-4 text-blue-300 rounded" */}
              {/* 	/> */}
              {/* 	<label */}
              {/* 		className="ml-2 text-md text-gray-600 hover:cursor-pointer select-none" */}
              {/* 		htmlFor="remember" */}
              {/* 	> */}
              {/* 		Remember me */}
              {/* 	</label> */}
              {/* </div> */}
              <div>
                <a href="#" className="text-md font-medium text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button className="w-full rounded-sm bg-brightRed py-2 px-4 text-sm text-white hover:bg-brightRedLight">
                Login
              </button>
            </div>
          </form>
          <div className=" text-md ml-2 mt-5 text-gray-600">
            Don&apos;t have an account?
            <span>
              <a href="/signup" className="text-blue-500">
                &nbsp;Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
